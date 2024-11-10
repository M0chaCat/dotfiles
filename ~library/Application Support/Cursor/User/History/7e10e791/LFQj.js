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
    patches: [
      {
        find: ".Messages.FORM_LABEL_MUTED",
        replacement: {
            // Make GuildChannelStore.getChannels return hidden channels
            match: /(?<=getChannels\(\i)(?=\))/,
            replace: ",true"
        }
    },
    {
        find: '="NowPlayingViewStore",',
        replacement: {
            // Make active now voice states on hidden channels
            match: /(getVoiceStateForUser.{0,150}?)&&\i\.\i\.canWithPartialContext.{0,20}VIEW_CHANNEL.+?}\)(?=\?)/,
            replace: "$1"
        }
    }
    ]
  };

}
exports.default = showHiddenChannels;