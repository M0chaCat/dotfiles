//https://github.com/Domis-Vencord-Plugins/KeyboardSounds/blob/main/index.ts
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class showHiddenChannels {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    Nekocord.webpackPatcher.onInitializationFinish(() => {
      this.ChannelStore = Nekocord.webpackModules.findByStoreName("ChannelStore");
      this.GuildStore = Nekocord.webpackModules.findByStoreName("GuildStore");
      this.ReadStateStore = Nekocord.webpackModules.findByStoreName("ReadStateStore");
      this.useStateFromStores = Nekocord.webpackModules.findByStoreName("useStateFromStores");
    });
  }
  info = {
    name: "showHiddenChannels",
    id: "arcane:showHiddenChannels",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "",
    version: "0.1.0",
    patches: [],
    preferences: [],
  };

}
exports.default = showHiddenChannels;