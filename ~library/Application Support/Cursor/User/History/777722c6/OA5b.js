"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class UnreadMessageCount {
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
    name: "UnreadMessageCount",
    id: "arcane:UnreadMessageCount",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Show unread count in the channel list",
    version: "0.1.0",
    patches: [
      // Kanged from typingindicators
      {
          find: "UNREAD_IMPORTANT:",
          replacement: {
              match: /\.name\),.{0,120}\.children.+?:null(?<=,channel:(\i).+?)/,
              replace: "$&,$self.CountBadge({channelId:$1.id})"
          }
      },
  ],
    preferences: []
  };
  CountBadge(channelId) {
    const unreadCount = useStateFromStores([ReadStateStore], function() {
      return ReadStateStore.getUnreadCount(channelId);
    });
    if (!unreadCount) return null;
    return React.createElement(NumberBadge, { count: unreadCount, color: "var(--brand-500)", className: "unreadCountBadge" });
  }
}
  exports.default = UnreadMessageCount;