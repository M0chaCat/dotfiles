//https://github.com/Masterjoona/vc-atsomeone/blob/main/index.ts
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class atSomeone {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
  }
  info = {
    name: "atSomeone",
    id: "arcane:atSomeone",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Mention someone randomly with @someone",
    version: "0.1.0",
    patches: [
      {
          find: ".LAUNCHABLE_APPLICATIONS;",
          replacement: [
              {
                  match: /&(\i)\(\)\((\i),\i\(\)\.test\)&&(\i)\.push\(\i\(\)\)/g,
                  replace: "$&,$1()($2,/someone/.test)&&$3.push({text:'@someone',description:'Mention someone randomly'})"
              },
          ],
      },
      {
          find: "inQuote:",
          replacement: {
              match: /\|Clyde/,
              replace: "$&|someone"
          }
      }
    ],
    preferences: []
  };
  start() {
    this.preSend = addPreSendListener((_, msg) => {
        msg.content = msg.content.replace(/@someone/g, ()=>`<@${this.randomUser()}>`);
        msg.content = msg.content.replace(/<@&(\d+)>\*/g, (_, roleId) => {
            return `<@${this.randomUser(roleId)}>`;
        });
    });
}

stop() {
    removePreSendListener(this.preSend);
}

randomUser(roleId = "") {
    const guildId = SelectedGuildStore.getGuildId();
    if (guildId === null) {
        const dmUsers = ChannelStore.getChannel(SelectedChannelStore.getChannelId()).recipients;
        return dmUsers[~~(dmUsers.length * Math.random())];
    }
    let members = GuildMemberStore.getMembers(guildId);
    if (roleId) {
        members = members.filter(m => m.roles.includes(roleId));
    }
    return members[~~(members.length * Math.random())].userId;
}
}

exports.default = atSomeone;