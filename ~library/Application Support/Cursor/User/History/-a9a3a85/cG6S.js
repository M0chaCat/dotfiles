"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require('react');

function EssentialzTab() {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Essentialz Settings'),
    React.createElement('p', null, 'Welcome to the Essentialz settings page. Here you can configure your preferences.'),
    // Add more settings and controls here
  );
}

// Ensure the default export is the Essentialz class


class Essentialz {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    Nekocord.webpackPatcher.onInitializationFinish(() => {
      this.WebpackModules = Nekocord.webpackModules;
    });
  }
  info = {
    name: "Essentialz",
    id: "arcane:Essentialz",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Minor tweaks that make discord better!",
    version: "1.0.0",
    patches: [],
    preferences: [
      {
        name: "ArcaneTweaks",
        description: "CSS Tweaks called ArcaneTweaks",
        id: "ArcaneTweaks",
        type: "boolean",
        default: true
      },
    ],
    settingsTabs: {
      ESSENTIALZ: {
          section: "Essentialz",
          searchableTitles: ["Essentialz"],
          label: "Essentialz",
          element: EssentialzTab, // Ensure this is correctly set
      }
    }
  };
}

exports.default = Essentialz;