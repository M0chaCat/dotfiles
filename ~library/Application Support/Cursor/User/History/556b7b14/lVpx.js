"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

  const ErrorBoundary = require("@components/ErrorBoundary");

class BetterNotesBox {
  info = {
    name: "Better Notes Box",
    description: "Hide notes or disable spellcheck (Configure in settings!!)",
    id: "arcane:BetterNotesBox",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    version: "1.0.0",
    patches: [
      {
        find: "hideNote:",
        all: true,
        noWarn: true,
        predicate: () => this.userPreferences.hide,
        replacement: {
          match: /hideNote:.+?(?=([,}].*?\)))/g,
          replace: (m, rest) => {
            const destructuringMatch = rest.match(/}=.+/);
            if (destructuringMatch) {
              const defaultValueMatch = m.match(/hideNote:(\i)=!?\d/);
              return defaultValueMatch ? `hideNote:${defaultValueMatch[1]}=!0` : m;
            }
            return "hideNote:!0";
          }
        }
      },
      {
        find: "Messages.NOTE_PLACEHOLDER",
        replacement: {
          match: /\.NOTE_PLACEHOLDER,/,
          replace: "$&spellCheck:!this.userPreferences.noSpellCheck,"
        }
      },
      {
        find: ".popularApplicationCommandIds,",
        replacement: {
          match: /lastSection:(!?\i)}\),/,
          replace: "$&this.patchPadding({lastSection:$1}),"
        }
      }
    ],
    preferences: [
      {
        name: "Hide Notes",
        description: "Hide notes",
        id: "hide",
        type: "boolean",
        default: false,
      },
      {
        name: "Disable Spellcheck in Notes",
        description: "Disable spellcheck in notes",
        id: "noSpellCheck",
        type: "boolean",
        default: false,
      }
    ]
  };

  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    this.patchPadding = this.patchPadding.bind(this); // Binding patchPadding method to the class instance
  }

  patchPadding = ({ lastSection }) => {
    if (!lastSection) return null;
    return `<div class="${UserPopoutSectionCssClasses.lastSection}"></div>`;
  }


  onRegister(userPreferences) {
    this.userPreferences = userPreferences;
  }
}

exports.default = BetterNotesBox;