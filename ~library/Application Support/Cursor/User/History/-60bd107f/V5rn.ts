/**
 * nekocord, a Discord client mod
 * Copyright (C) 2024 nekohaxx and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

import { onceDefined } from "./util";
import { SignatureVerifier } from "./util/SignatureVerifier";

const { dirname, join } = require("path");
const electron = require("electron");
const { pathToFileURL } = require("url");
const { app, net, protocol, session } = electron;
const fs = require("fs");

console.log(`welcome to
             _                           _ 
            | |                         | |
  _ __   ___| | _____   ___ ___  _ __ __| |
 | '_ \\ / _ \\ |/ / _ \\ / __/ _ \\| '__/ _\` |
 | | | |  __/   < (_) | (_| (_) | | | (_| |
 |_| |_|\\___|_|\\_\\___/ \\___\\___/|_|  \\__,_|

by nekohaxx and contributors >w<

Version v${__NEKOCORD_VERSION__}, built ${__BUILD_DATE__}.\n${IS_DEV ? "Development" : "Release"} Build\n\n`);

protocol.registerSchemesAsPrivileged([
    {
        scheme: "nekocord",
        privileges: {
            bypassCSP: true,
            standard: true,
            secure: true,
            supportFetchAPI: true,
        },
    },
]);

protocol.registerSchemesAsPrivileged = () => {};

class BrowserWindow extends electron.BrowserWindow {
    constructor(options) {
        if (options?.webPreferences?.preload && options.title) {
            const original = options.webPreferences.preload;
            options.webPreferences.preload = join(__dirname, "preload.min.js");
            options.webPreferences.sandbox = false;
            options.webPreferences.devTools = true;
            options.show = true;

            process.env.DISCORD_PRELOAD = original;

            super(options);
            //initIpc(this);
        } else super(options);
    }
}

Object.assign(BrowserWindow, electron.BrowserWindow);
Object.defineProperty(BrowserWindow, "name", {
    value: "BrowserWindow",
    configurable: true,
});

const electronPath = require.resolve("electron");
delete require.cache[electronPath]!.exports;
require.cache[electronPath]!.exports = {
    ...electron,
    BrowserWindow,
};

onceDefined(global, "appSettings", settings => {
    settings.set(
        "DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",
        true,
    );
});

const originalAsar = join(dirname(require.main!.filename), "..", "_app.asar");
require.main!.filename = join(
    originalAsar,
    require(join(originalAsar, "package.json")).main,
);
app.setAppPath(originalAsar);

app.setVersion(__NEKOCORD_VERSION__);
let discordVersion = "0";
app.setVersion = e => {
    discordVersion = e;
};

app.whenReady().then(() => {
    protocol.handle("nekocord", request => {
        const path = request.url.slice("nekocord://".length);
        const dir = path.split("/")[0];
        if (!["dist", "plugins", "themes"].includes(dir)) {
            console.log("bad dir");
            return null;
        }
        if (path.split("/").length < 2) {
            return new Response(
                new Blob(
                    [
                        JSON.stringify(
                            fs.readdirSync(join(__dirname, "..", dir)),
                        ),
                    ],
                    {
                        type: "application/json",
                    },
                ),
            );
        }
        const file = path.split("/")[1];
        if (!/^[a-zA-Z0-9\_\-\.]+(\.js|\.css|\.map)$/.test(file)) {
            console.log("bad file");
            return null;
        }

        return net.fetch(pathToFileURL(join(__dirname, "..", path)));
    });

    const findHeader = (
        headers: Record<string, string[]>,
        headerName: Lowercase<string>,
    ) => {
        return Object.keys(headers).find(h => h.toLowerCase() === headerName);
    };

    session.defaultSession.webRequest.onHeadersReceived(
        ({ responseHeaders, resourceType }, cb) => {
            if (responseHeaders) {
                if (resourceType === "mainFrame") {
                    responseHeaders["content-security-policy"] = "";
                }
                cb({ cancel: false, responseHeaders });
            }
        },
    );

    session.defaultSession.webRequest.onBeforeSendHeaders(
        ({ requestHeaders, url }, cb) => {
            if (requestHeaders) {
                const header = findHeader(requestHeaders, "user-agent");
                if (header && new URL(url).hostname.endsWith("discord.com"))
                    requestHeaders[header] = requestHeaders[header].replace(
                        /nekocord\/[^ ]+/,
                        `discord/${discordVersion}`,
                    );
            }

            cb({ cancel: false, requestHeaders });
        },
    );

    // assign a noop to onHeadersReceived to prevent other mods from adding their own incompatible ones.
    // For instance, OpenAsar adds their own that doesn't fix content-type for stylesheets which makes it
    // impossible to load css from github raw despite our fix above
    session.defaultSession.webRequest.onHeadersReceived = () => {};
});

const pluginsDir = join(process.env.NEKOCORD_DATA_DIR, "plugins");
const pluginRegex = /^[a-z0-9\-\_\.]+\.nkplugin\.js$/i;
const pluginList = fs
    .readdirSync(pluginsDir)
    .filter((file: string) => pluginRegex.test(file));

(async() => {
    const key = await crypto.subtle.importKey(
        "jwk",
        {
            key_ops: [ 'verify' ],
            ext: true,
            kty: 'EC',
            x: 'XjLLn05Quw_kr27d9X-42FueiOhVzXsqL5PwXdUD5cI',
            y: 'g_lQdFX1-A8bn3-C7qSVqPZO8MQZdPj_vX6Ba65McgQ',
            crv: 'P-256'
        },
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify']
    );
    const signatureVerifier = new SignatureVerifier(key);
    const validPlugins = [];
    for (const plugin of pluginList) {
        const contents = fs.readFileSync(join(pluginsDir, plugin), 'utf8');
        if (await signatureVerifier.verifyPluginSignature(contents)) {
            validPlugins.push(plugin);
        }
    }
    process.env.VALID_NEKOCORD_PLUGINS = JSON.stringify(validPlugins);
})();

require(require.main!.filename);

export {};
