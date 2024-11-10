"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CtrlEnterSend {
  info = {
    name: "Ctrl Enter Send",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Use Ctrl+Enter to send messages (customizable)",
    id: "arcane:CtrlEnterSend",
    version: "1.0.0",
    preferences: [
      {
        name: "Submit Rule",
        description: "The way to send a message, \"ctrl+enter\", \"shift+enter\", \"enter\", \"cmd+enter\"",
        id: "submitRule",
        type: "string",
        default: "ctrl+enter",
      },
      {
        name: "Send Message in Code Block",
        description: "Whether to send a message in the middle of a code block",
        id: "sendMessageInTheMiddleOfACodeBlock",
        type: "boolean",
        default: true,
      }
    ],
    patches: [
      {
        find: "KeyboardKeys.ENTER&&(!",
        replacement: {
          match: /(?<=(\i)\.which===\i\.KeyboardKeys.ENTER&&).{0,100}(\(0,\i\.hasOpenPlainTextCodeBlock\)\(\i\)).{0,100}(?=&&\(\i\.preventDefault)/,
          replace: "$self.shouldSubmit($1, $2)"
        }
      }
    ]
  };
  
  onEnable() {
    this.shouldSubmit = this.shouldSubmit.bind(this); // Bind the function to this instance
  }
  
  shouldSubmit(event, codeblock) {
    let result = false;
    const submitRule = this.settings?.store?.submitRule;
    
    switch (submitRule) {
      case "shift+enter":
        result = event.shiftKey;
        break;
      case "ctrl+enter":
        result = !navigator.platform.includes("Mac") ? event.ctrlKey : false;
        break;
      case "cmd+enter":
        result = navigator.platform.includes("Mac") ? event.metaKey : false;
        break;
      case "enter":
        result = !event.shiftKey && !event.ctrlKey && !event.metaKey;
        break;
      default:
        result = false; // Default to false if submitRule is not recognized
        break;
    }
    
    if (!this.settings?.store?.sendMessageInTheMiddleOfACodeBlock) {
      result &&= !codeblock;
    }
    
    return result;
  }
}
  
  exports.default = CtrlEnterSend;