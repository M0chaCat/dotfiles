"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ShowHiddenThings {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
  }

    info = {
      name: "Show Hidden Things",
      id: "arcane:ShowHiddenThings",
      authors: [{
        name: "Arcane",
        id: "808802000224518264"
      }],
      description: "Displays various hidden & moderator-only things regardless of permissions.",
      version: "0.1.0",
      patches: [
        {
          find: "showCommunicationDisabledStyles",
          predicate: () => this.userPreferences.showTimeouts,
          replacement: {
            match: /&&\i\.\i\.canManageUser\(\i\.\i\.MODERATE_MEMBERS,\i\.author,\i\)/,
            replace: ""
          }
        },
        {
          find: "2022-07_invites_disabled",
          predicate: () => this.userPreferences.showInvitesPaused,
          replacement: {
            match: /\i\.\i\.can\(\i\.\i.MANAGE_GUILD,\i\)/,
            replace: "true"
          }
        },
        {
          find: /context:\i,checkElevated:!1\}\),\i\.\i.{0,200}autoTrackExposure/,
          predicate: () => this.userPreferences.showModView,
          replacement: {
            match: /return \i\.\i\(\i\.\i\(\{user:\i,context:\i,checkElevated:!1\}\),\i\.\i\)/,
            replace: "return true"
          }
        },
        {
          find: "prod_discoverable_guilds",
          predicate: () => this.userPreferences.disableDiscoveryFilters,
          replacement: {
            match: /\{"auto_removed:.*?\}/,
            replace: "{}"
          }
        },
        {
          find: '">200"',
          predicate: () => this.userPreferences.disableDiscoveryFilters,
          replacement: {
            match: '">200"',
            replace: '">0"'
          }
        },
        {
          find: '"horny","fart"',
          predicate: () => this.userPreferences.disableDisallowedDiscoveryFilters,
          replacement: {
            match: /=\["egirl",.+?\]/,
            replace: "=[]"
          }
        },
        {
          find: ".GUILD_DISCOVERY_VALID_TERM",
          predicate: () => this.userPreferences.disableDisallowedDiscoveryFilters,
          all: true,
          replacement: {
            match: /\i\.\i\.get\(\{url:\i\.\i\.GUILD_DISCOVERY_VALID_TERM,query:\{term:\i\},oldFormErrors:!0\}\);/g,
            replace: "Promise.resolve({ body: { valid: true } });"
          }
        }
      ],
      preferences: [
        {
          name: "showTimeouts",
          description: "Show member timeout icons in chat.",
          id: "showTimeouts",
          type: "boolean",
          default: true
        },
        {
          name: "showInvitesPaused",
          description: "Show the invites paused tooltip in the server list.",
          id: "showInvitesPaused",
          type: "boolean",
          default: true
        },
        {
          name: "showModView",
          description: "Show the member mod view context menu item in all servers.",
          id: "showModView",
          type: "boolean",
          default: true
        },
        {
          name: "disableDiscoveryFilters",
          description: "Disable filters in Server Discovery search that hide servers that don't meet discovery criteria.",
          id: "disableDiscoveryFilters",
          type: "boolean",
          default: true
        },
        {
          name: "disableDisallowedDiscoveryFilters",
          description: "Disable filters in Server Discovery search that hide NSFW & disallowed servers.",
          id: "disableDisallowedDiscoveryFilters",
          type: "boolean",
          default: true
        }
      ]
  }

  onRegister(userPreferences) {
    this.userPreferences = userPreferences;
  }
}

exports.default = ShowHiddenThings;