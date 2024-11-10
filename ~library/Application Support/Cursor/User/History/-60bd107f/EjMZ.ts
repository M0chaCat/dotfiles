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
    { scheme: 'nekocord', privileges: { bypassCSP: true, standard: true, secure: true, supportFetchAPI: true } }
]);

protocol.registerSchemesAsPrivileged = () => {};

class BrowserWindow extends electron.BrowserWindow {
    constructor(options) {
        if (options?.webPreferences?.preload && options.title) {
            const original = options.webPreferences.preload; 
            options.webPreferences.preload = join(__dirname, "preload.min.js");
            options.webPreferences.sandbox = false;
            options.webPreferences.devTools = true;
            
            process.env.DISCORD_PRELOAD = original;
            
            super(options);
            //initIpc(this);
        } else super(options);
    }
}

Object.assign(BrowserWindow, electron.BrowserWindow);
Object.defineProperty(BrowserWindow, "name", { value: "BrowserWindow", configurable: true });

const electronPath = require.resolve("electron");
delete require.cache[electronPath]!.exports;
require.cache[electronPath]!.exports = {
    ...electron,
    BrowserWindow
};

const originalAsar = join(dirname(require.main!.filename), "..", "_app.asar");
require.main!.filename = join(originalAsar, require(join(originalAsar, "package.json")).main);
app.setAppPath(originalAsar);

app.whenReady().then(() => {
    protocol.handle("nekocord", (request) => {
        let path = request.url.slice("nekocord://".length);
        let dir = path.split('/')[0];
        if (!["dist", "plugins", "themes"].includes(dir)) return null;
        if (path.split('/').length < 2) {
            return new Response(new Blob([JSON.stringify(fs.readdirSync(join(__dirname, "..", dir)))], {
                type: 'application/json'
            }));
        }
        let file = path.split('/')[1];
        if (!/^[a-zA-Z0-9\_\-\.]+(\.js|\.css|\.map)$/.test(file)) return null;

        return net.fetch(pathToFileURL(join(__dirname, "..", path)));
    });

    const findHeader = (headers: Record<string, string[]>, headerName: Lowercase<string>) => {
        return Object.keys(headers).find(h => h.toLowerCase() === headerName);
    };

    session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders, resourceType }, cb) => {
        if (responseHeaders) {
            if (resourceType === "mainFrame")
                responseHeaders["content-security-policy"] = "";

            // Fix hosts that don't properly set the css content type, such as
            // raw.githubusercontent.com
            if (resourceType === "stylesheet") {
                const header = findHeader(responseHeaders, "content-type");
                if (header)
                    responseHeaders[header] = ["text/css"];
            }
        }

        cb({ cancel: false, responseHeaders });
    });

    // assign a noop to onHeadersReceived to prevent other mods from adding their own incompatible ones.
    // For instance, OpenAsar adds their own that doesn't fix content-type for stylesheets which makes it
    // impossible to load css from github raw despite our fix above
    session.defaultSession.webRequest.onHeadersReceived = () => { };
});

import { findByPropsLazy, waitForStore } from "./internal";
import type * as Stores from "discord-types/stores";

export let ChannelStore: Stores.ChannelStore & t.FluxStore;

waitForStore("ChannelStore", m => ChannelStore = m);

require(require.main!.filename);

export {};