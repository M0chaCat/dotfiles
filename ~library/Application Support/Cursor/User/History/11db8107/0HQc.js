"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Real implementations of ChannelStore and GuildStore since nekocord doesnt have it yet :P

class GuildStore {
  constructor(dispatcher, eventHandlers) {
    this.dispatcher = dispatcher;
    this.eventHandlers = eventHandlers;
    this.guilds = {};
  }

  getGuild(guildId) {
      return this.guilds[guildId];
  }

  getGuildCount() {
      return Object.keys(this.guilds).length;
  }

  getGuilds() {
      return this.guilds;
  }

  getGuildIds() {
      return Object.keys(this.guilds);
  }

  getRole(guildId, roleId) {
      const guild = this.guilds[guildId];
      if (guild) {
          return guild.roles[roleId];
      }
      return null;
  }

  getRoles(guildId) {
      const guild = this.guilds[guildId];
      if (guild) {
          return guild.roles;
      }
      return {};
  }

  getAllGuildRoles() {
      const allRoles = {};
      for (const guildId in this.guilds) {
          allRoles[guildId] = this.guilds[guildId].roles;
      }
      return allRoles;
  }
}


class ChannelStore {
  constructor(dispatcher, eventHandlers) {
    this.dispatcher = dispatcher;
    this.eventHandlers = eventHandlers;
    this.channels = {};
}

  getChannel(channelId) {
      return this.channels[channelId];
  }

  getChannelCount() {
      return Object.keys(this.channels).length;
  }

  getChannels() {
      return this.channels;
  }

  getChannelIds() {
      return Object.keys(this.channels);
  }

  addChannel(channel) {
      this.channels[channel.id] = channel;
  }
}

class Summaries {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    this.channelStore = new ChannelStore();
  }

  info = {
    name: "Summaries",
    id: "arcane:Summaries",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Enables Discord's experimental Summaries feature on every server, displaying AI generated summaries of conversations",
    version: "0.1.0",
    patches: [
      {
        find: "SUMMARIZEABLE.has",
        replacement: {
          match: /\i\.hasFeature\(\i\.\i\.SUMMARIES_ENABLED\w+?\)/g,
          replace: "true"
        }
      },
      {
        find: "RECEIVE_CHANNEL_SUMMARY(",
        replacement: {
          match: /shouldFetch\((\i),\i\){/,
          replace: "$& if(!$self.shouldFetch($1)) return false;"
        }
      }
    ],
    preferences: [
      {
        name: "summaryExpiryThresholdDays",
        description: "The time in days before a summary is removed. Note that only up to 50 summaries are kept per channel",
        type: "slider",
        default: 3,
        options: {
          markers: [1, 3, 5, 7, 10, 15, 20, 25, 30],
          stickToMarkers: false
        }
      }
    ]
  };

  async start() {
    await DataStore.update("summaries-data", summaries => {
      summaries = summaries || {};
      for (const key of Object.keys(summaries)) {
        for (let i = summaries[key].length - 1; i >= 0; i--) {
          if (summaries[key][i].time < Date.now() - 1000 * 60 * 60 * 24 * this.userPreferences.summaryExpiryThresholdDays) {
            summaries[key].splice(i, 1);
          }
        }
        if (summaries[key].length === 0) {
          delete summaries[key];
        }
      }
      Object.assign(SummaryStore.allSummaries(), summaries);
      return summaries;
    });
  }

  shouldFetch(channelId) {
    const channel = this.channelStore.getChannel(channelId);
    if (!channel) {
      console.log(`Channel not found for ID: ${channelId}`);
      return false;
    }
    if (!channel.guild_id) {
      console.log(`Guild ID not found for channel ID: ${channelId}`);
      return false;
    }
    const guild = GuildStore.getGuild(channel.guild_id);
    if (!guild) {
      console.log(`Guild not found for ID: ${channel.guild_id}`);
      return false;
    }
    // @ts-ignore
    const hasFeature = guild.hasFeature("SUMMARIES_ENABLED_GA");
    console.log(`Guild ${channel.guild_id} has feature SUMMARIES_ENABLED_GA: ${hasFeature}`);
    return hasFeature;
  }

  flux = {
    CONVERSATION_SUMMARY_UPDATE: (data) => {
      const incomingSummaries = data.summaries.map(summary => ({
        ...createSummaryFromServer(summary),
        time: Date.now()
      }));
      
      DataStore.update("summaries-data", summaries => {
        summaries = summaries || {};
        if (summaries[data.channel_id]) {
          summaries[data.channel_id].unshift(...incomingSummaries);
        } else {
          summaries[data.channel_id] = incomingSummaries;
        }
        if (summaries[data.channel_id].length > 50) {
          summaries[data.channel_id] = summaries[data.channel_id].slice(0, 50);
        }
        return summaries;
      });
    }
  };
}

exports.default = Summaries;