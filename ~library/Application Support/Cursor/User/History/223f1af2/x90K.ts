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

export function onceDefined(target: any, property: any, callback: (v: any) => void): void {
    if (property in target) {
        return void callback(target[property]);
    }

    Object.defineProperty(target, property, {
        set(value) {
            if (this !== target) {
                Object.defineProperty(this, property, {
                    value,
                    configurable: true
                });
            } else {
                delete this[property];
                this[property] = value;
            }
            callback(value);
        },
        configurable: true,
        enumerable: false
    });
}

export function findByPropsLazy(...props: string[]) {
    if (IS_REPORTER) lazyWebpackSearchHistory.push(["findByProps", props]);

    return proxyLazy(() => findByProps(...props));
}

export function waitForStore(name: string, cb: (v: any) => void) {
    if (IS_REPORTER) lazyWebpackSearchHistory.push(["waitForStore", [name]]);

    waitFor(filters.byStoreName(name), cb, { isIndirect: true });
}

export let ChannelStore: Stores.ChannelStore & t.FluxStore;

waitForStore("ChannelStore", m => ChannelStore = m);
