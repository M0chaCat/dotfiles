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

import { EnableExperiments } from "../plugins/EnableExperiments";
import { NekocordSettings } from "../plugins/NekocordSettings";
import { DisableTracking } from "../plugins/DisableTracking";
import { Nekocord } from "../renderer/Nekocord";
import { NekocordPlugin } from "../plugins/Nekocord";
import { Logger } from "./Logger";
import { Earthquake } from "../plugins/Earthquake";
import { NoDelete } from "../plugins/NoDelete";
import { NoDevtoolsWarning } from "../plugins/NoDevtoolsWarning";
import { NerdLoading } from "../plugins/NerdLoading";
import { England } from "../plugins/England";
import { NoOnboardingDelay } from "../plugins/NoOnboardingDelay";
import { LoadedPlugin, Plugin } from "../types/PluginManager";
import { ResizableSidebars } from "../plugins/ResizableSidebars";
import { LocalBlock } from "../plugins/LocalBlock";
import { BetterSed } from "../plugins/BetterSed";

export class PluginManager {
    public plugins = new Map<String, LoadedPlugin>();
    private nekocord: Nekocord;
    private logger = new Logger("PluginManager", "#6060ff");

    public pluginlist = [ // List of built-in plugins
        NekocordPlugin,
        NekocordSettings,
        EnableExperiments,
        DisableTracking,
        Earthquake,
        NoDelete,
        NoDevtoolsWarning,
        NerdLoading,
        England,
        NoOnboardingDelay,
        ResizableSidebars,
        LocalBlock,
        BetterSed
    ];

    constructor(nekocord: Nekocord) {
        this.nekocord = nekocord;
        this.logger.log("Initializing PluginManager");
        this.logger.log(`Loading ${this.pluginlist.length} built-in plugins`);
        for (let plugin of this.pluginlist) {
            this.loadPlugin(new plugin(nekocord));
        }
        this.logger.log(`Loading ${NekocordNative.plugins.list().length} external plugins`);
        this._loadExternalPlugins();
    }

    _loadExternalPlugins() {
        for (const name of NekocordNative.plugins.list()) {
            this.logger.log(`Loading external plugin ${name}`);
            var content = NekocordNative.plugins.get(name);
            if (!content) {
                this.logger.error(`Failed to load external plugin ${name}`);
                continue;
            }
            try {
                this.compileAndLoadPlugin(content, name);
            } catch (e) {
                this.logger.error(`Failed to load external plugin ${name}`);
                this.logger.error(e);
            }
        }
    }

    public loadNewPlugins(): number {
        var alreadyInstalled = [...this.plugins.values()].map((p: LoadedPlugin) => p.filename).filter(n => !!n);
        var success = 0;
        for (var filename of NekocordNative.plugins.list()) {
            if (!alreadyInstalled.includes(filename)) {
                var content = NekocordNative.plugins.get(filename);
                if (!content) {
                    this.logger.error(`Failed to load external plugin ${filename}`);
                    continue;
                }
                try {
                    this.compileAndLoadPlugin(content, filename);
                    success++;
                } catch (e) {
                    this.logger.error(`Failed to load external plugin ${filename}`);
                    this.logger.error(e);
                }
            }
        }
        return success;
    }

    public compileAndLoadPlugin(src: string, filename?: string): LoadedPlugin {
        var module: { exports: { default?: unknown } } = { exports: {} };
        const factory = new Function("module", "exports", "require", src);
        factory(module, module.exports, () => {});
        if (typeof module.exports.default !== "function") {
            throw new Error("Plugin must export a function as default");
        }
        const instance = new (module.exports.default as (new (nekocord: Nekocord) => Plugin))(this.nekocord);
        if (instance.info?._core) {
            this.logger.error("Compiled plugin had _core set to true, this is not allowed");
            throw new Error("Compiled plugin had _core set to true, this is not allowed");
        }
        return this.loadPlugin(instance, true, filename);
    }

    public loadPlugin(instance: Plugin, external = false, filename?: string) {
        var plugin: LoadedPlugin = {
            name: instance.info.name,
            id: instance.info.id,
            description: instance.info.description,
            authors: instance.info.authors,
            version: instance.info.version,
            patches: instance.info.patches ?? [],
            preferences: instance.info.preferences ?? [],
            _core: instance.info._core ?? false,
            instance: instance,
            enabled: false,
            external: external,
            filename: filename,
            userPreferences: {},
        };
        this.registerPlugin(plugin);
        return plugin;
    }

    public registerPlugin(plugin: LoadedPlugin) {
        if (this.plugins.has(plugin.id)) {
            this.logger.error(`Plugin ${plugin.id} is already registered`);
            throw new Error(`Plugin ${plugin.id} is already registered`);
        }
        this.logger.log(`Registering plugin ${plugin.id}`);
        var userPrefs = NekocordNative.preferences.getAllForPlugin(plugin.id);
        plugin.userPreferences = userPrefs;
        if (plugin._core) {
            userPrefs.enabled = true;
            NekocordNative.preferences.setForPlugin(plugin.id, "enabled", true);
        }
        for (var preference of plugin.preferences) {
            if (userPrefs[preference.id] === undefined) {
                userPrefs[preference.id] = preference.default;
                NekocordNative.preferences.setForPlugin(plugin.id, preference.id, preference.default);
            }
        }
        plugin.instance.onRegister?.(userPrefs);
        if (userPrefs.enabled) {
            plugin.instance.onEnable?.();
            this.nekocord.webpackPatcher.addPatches(plugin.patches.map(patch => {
                patch.plugin = plugin;
                return patch;
            }));
        }
        this.plugins.set(plugin.id, plugin);
    }

    public setEnabled(id: string, enabled: boolean) {
        if (!this.plugins.has(id)) {
            this.logger.error(`Plugin ${id} is not registered`);
            throw new Error(`Plugin ${id} is not registered`);
        }
        this.logger.log(`${enabled ? "Enabling" : "Disabling"} plugin ${id}`);
        var plugin = this.plugins.get(id);
        if (!plugin) {
            throw new Error(`Plugin ${id} is not registered`);
        }
        var currentlyEnabled = plugin.userPreferences.enabled;
        plugin.userPreferences.enabled = enabled;
        NekocordNative.preferences.setForPlugin(id, "enabled", enabled);
        if (enabled && !currentlyEnabled) {
            plugin.instance.onEnable?.();
        }
        if (!enabled && currentlyEnabled) {
            plugin.instance.onDisable?.();
        }
    }

    public uninstallPlugin(id: string) {
        this.logger.log(`Uninstalling plugin ${id}`);
        if (!this.plugins.has(id)) {
            this.logger.error(`Plugin ${id} is not registered`);
            throw new Error(`Plugin ${id} is not registered`);
        }
        var plugin = this.plugins.get(id);
        if (!plugin.filename) {
            this.logger.error(`Plugin ${id} has no filename`);
            throw new Error(`Plugin ${id} has no filename`);
        }
        NekocordNative.preferences.clearAllForPlugin(id);
        NekocordNative.plugins.delete(plugin.filename);
        this.plugins.delete(plugin.id);
    }
}
