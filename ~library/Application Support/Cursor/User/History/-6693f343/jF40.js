//https://github.com/Masterjoona/vc-atsomeone/blob/main/index.ts
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class PlusReacts {
  constructor(userPreferences) {
    const { getMessages } = this.findByPropsLazy("getMessages");
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
    description: "The amount of plusses before an emoji is the message to add it to",
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
  message = null;
  getMsgReference() {
      const { message } = this;
      this.message = null;
      return message;
  }
  setMsgReference(plusses, channelId) {
      // Calculate the number of plusses and adjust the index accordingly
      const plusCount = plusses.split("+").length - 1; // Count the number of plusses
      this.message = this.getMessages(channelId).getByIndex(this.getMessages(channelId).length - plusCount);
  }

  findByPropsLazy(...props) {
    const module = Object.values(Nekocord.webpackModules.modules).find(mod => 
      props.every(prop => prop in mod)
    );
    return module ? module : null;
  }
}
exports.default = PlusReacts;