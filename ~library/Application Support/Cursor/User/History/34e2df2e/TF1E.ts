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

import { Nekocord } from "./Nekocord";
import "../styles/discord.css";
import "../styles/markup.css";

console.log("renderer.min.js loaded");

if (location.pathname.startsWith("/nekocord-directory")) {
    location.href = "/app";
}

const ls = localStorage;
Object.defineProperty(window, "localStorage", {
    value: ls,
    writable: false,
    configurable: false,
});

if (localStorage.getItem("NEKOCORD_DISABLE_ONCE") === "1") {
    localStorage.removeItem("NEKOCORD_DISABLE_ONCE");
    console.log("nekocord has been disabled for this session.");
} else {
    console.log(`welcome to
             _                           _ 
            | |                         | |
  _ __   ___| | _____   ___ ___  _ __ __| |
 | '_ \\ / _ \\ |/ / _ \\ / __/ _ \\| '__/ _\` |
 | | | |  __/   < (_) | (_| (_) | | | (_| |
 |_| |_|\\___|_|\\_\\___/ \\___\\___/|_|  \\__,_|

by nekohaxx and contributors >w<

Version v${__NEKOCORD_VERSION__}, built ${__BUILD_DATE__}.\n${IS_DEV ? "Development" : "Release"} Build\n\n`);

    document.addEventListener("DOMContentLoaded", () => {
        console.log("DOMContentLoaded event fired");
        const element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", NekocordNative.nekocord.getCSS());
        document.head.appendChild(element);
    });

    window.Nekocord = new Nekocord();
    window.Nekocord.init();
    console.log("Nekocord initialized");
}
