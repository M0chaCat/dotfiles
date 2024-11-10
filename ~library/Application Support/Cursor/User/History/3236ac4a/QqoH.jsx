"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require('react');


function M0chaLibraryTab() {


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px' }}>
        M0chaLibrary Settings
      </h1>
      <p style={{ color: '#AAAAAA', fontSize: '16px', lineHeight: '1.5' }}>
        Welcome to the M0chaLibrary settings page. Here you can configure your preferences.
      </p>
    </div>
  );
}

class M0chaLibrary {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    Nekocord.webpackPatcher.onInitializationFinish(() => {
      this.WebpackModules = Nekocord.webpackModules;
    });
  }
  info = {
    name: "M0chaLibrary",
    id: "arcane:M0chaLibrary",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "General library that M0cha/Arcane plugins use",
    version: "1.0.0",
    patches: [],
    preferences: [],
  };
    settingsSections = [
      {
          header: "M0chaLibrary",
          divider: true,
          settings: [
              "M0chaLibrary",
          ],
      },
    ]
    settingsTabs = {
      M0chaLibrary: {
          section: "M0chaLibrary",
          searchableTitles: ["M0chaLibrary"],
          label: "M0chaLibrary",
          element: M0chaLibraryTab, // Ensure this is correctly set
      }
    }
}

exports.default = M0chaLibrary;