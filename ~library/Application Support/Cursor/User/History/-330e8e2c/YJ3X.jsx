"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require('react');

function EssentialzTab() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px' }}>
        Essentialz Settings
      </h1>
      <p style={{ color: '#AAAAAA', fontSize: '16px', lineHeight: '1.5' }}>
        Welcome to the Essentialz settings page. Here you can configure your preferences.
      </p>
      {/* Add more settings and controls here */}
    </div>
  );
}

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
    ]
  };
    settingsSections = [
      {
          header: "Essentialz",
          divider: true,
          settings: [
              "ESSENTIALZ",
          ],
      },
    ]
    settingsTabs = {
      ESSENTIALZ: {
          section: "Essentialz",
          searchableTitles: ["Essentialz"],
          label: "Essentialz",
          element: EssentialzTab, // Ensure this is correctly set
      }
    }
}

exports.default = Essentialz;