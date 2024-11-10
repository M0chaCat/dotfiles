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

import "../preload/NekocordNative";
console.log("browser.min.js loaded");

if (NekocordFS.existsSync("/dist/renderer.min.js")) {
    console.log("renderer.min.js exists");
    const scriptContent = NekocordFS.readFileSync("/dist/renderer.min.js", "utf-8");
    console.log("renderer.min.js content read");
    (0, eval)(scriptContent);
    console.log("renderer.min.js executed");
} else {
    console.error("renderer.min.js does not exist");
}
