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

console.log("browser.min.js loaded");

import "../preload/NekocordNative";

// Check if NekocordFS is defined and accessible
if (typeof NekocordFS === 'undefined') {
    console.error("NekocordFS is not defined");
} else {
    console.log("NekocordFS is defined");
}

// Check if the file exists
if (NekocordFS.existsSync("/dist/renderer.min.js")) {
    console.log("renderer.min.js exists");

    // Read the file content
    const scriptContent = NekocordFS.readFileSync("/dist/renderer.min.js", "utf-8");
    console.log("renderer.min.js content read");

    // Log the content length to ensure it's not empty
    console.log(`renderer.min.js content length: ${scriptContent.length}`);

    try {
        // Execute the script content
        (0, eval)(scriptContent);
        console.log("renderer.min.js executed");
    } catch (e) {
        console.error("Error executing renderer.min.js:", e);
    }
} else {
    console.error("renderer.min.js does not exist");
}
