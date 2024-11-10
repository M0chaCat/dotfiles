//https://github.com/Masterjoona/vc-atsomeone/blob/main/index.ts
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const { getMessages } = findByPropsLazy("getMessages");

class PlusReacts {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    Nekocord.webpackPatcher.onInitializationFinish(() => {
      this.ChannelStore = Nekocord.webpackModules.findByStoreName("ChannelStore");
      this.GuildStore = Nekocord.webpackModules.findByStoreName("GuildStore");
    });
  }
  info = {
    name: "PlusReacts",
    id: "arcane:PlusReacts",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "The amount of pluses before an emoji is the message to add it to",
    version: "0.1.0",
    patches: [
      {
          find: ".SLASH_COMMAND_USED,",
          replacement: [
              {
                  match: /\\\+/,
                  replace: "$&*"
              },
              {
                  match: /\i.trim\(\)/,
                  replace: "$&.replace(/^\\++/, '+')"
              },
              {
                  match: /=(\i\.\i\.getMessages\(\i\.id\))\.last\(\)(?=.{78,85}.getByName\((\i)\.)/,
                  replace: "=$self.getMsgReference()"
              }
          ]
      },
      {
          find: "this.props.activeCommandOption,",
          replacement:[
              // Enable auto complete for multiple plusses
              // and set the message reference
              {
                  match: /:this.props.currentWord/,
                  replace: "$&.replace(/^\\++/, '+')"
              },
              {
                  match: /this.props.editorRef.current\)return;/,
                  replace: "$&$self.setMsgReference(this.props.currentWord.split(':')[0],this.props.channel.id);"
              }
          ]
      },
  ],
    preferences: []
  };
  message = null
  getMsgReference() {
      const message = this.message;
      this.message = null;
      return message;
  }
  setMsgReference(plusses, channelId) {
      const plusCount = plusses.split("+").length; // Count the number of plusses
      const messages = getMessages(channelId); // Get all messages in the channel
      if (plusCount > 0 && messages.length >= plusCount) {
          this.message = messages[messages.length - plusCount]; // Get the correct message based on plusCount
      } else {
          this.message = null; // Reset message if no plusses or not enough messages
      }
  }

  findByPropsLazy(...props) {
    const module = Object.values(Nekocord.webpackModules.modules).find(mod => 
      props.every(prop => prop in mod)
    );
    return module ? module : null;
  }
}
exports.default = PlusReacts;