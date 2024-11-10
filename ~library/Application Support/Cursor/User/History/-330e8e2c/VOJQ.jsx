"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require('react');
const DiscordComponents = require('discord-components'); // Assuming this is how you import Discord's components

function EssentialzTab() {
  return (
    <DiscordComponents.Container>
      <DiscordComponents.Header>Essentialz Settings</DiscordComponents.Header>
      <DiscordComponents.Text>
        Welcome to the Essentialz settings page. Here you can configure your preferences.
      </DiscordComponents.Text>
      {/* Add more settings and controls here */}
    </DiscordComponents.Container>
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