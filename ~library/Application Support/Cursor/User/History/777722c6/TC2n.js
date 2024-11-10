//https://github.com/Masterjoona/vc-atsomeone/blob/main/index.ts
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
              match: /\.name\),.{0,120}\.children.+?:null(?<=,channel:<(\w+>)/,
              replace: "$&,$self.CountBadge({channelId:$1})"
          }
      },
  ],
    preferences: []
  };
  CountBadge(channelId) {
    return ErrorBoundary.wrap(function() {
      const unreadCount = useStateFromStores([ReadStateStore], function() {
        return ReadStateStore.getUnreadCount(channelId);
      });
      if (!unreadCount) return null;
      return React.createElement(NumberBadge, { count: unreadCount, color: "var(--brand-500)", className: "unreadCountBadge" });
    }, { noop: true });
  }

  exports.default = UnreadMessageCount;