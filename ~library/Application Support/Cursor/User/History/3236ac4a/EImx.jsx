"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require('react');

function M0chaLibraryTab() {
  return (
    <div>
      <h1 class="defaultColor_a595eb text-md/normal_dc00ef">M0chaLibrary Settings</h1>
      <div class="defaultColor_a595eb text-md/normal_dc00ef">
        <p>Welcome to the M0chaLibrary settings page. Here you can configure your preferences.</p>
      </div>
      {/* Add more settings and controls here */}
    </div>
  );
}

class M0chaLibrary {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    Nekocord.webpackPatcher.onInitializationFinish(() => {
      this.WebpackModules = Nekocord.webpackModules;
      this.MenuGroup = Nekocord.webpackModules.commonModules.MenuGroup;
      this.MenuItem = Nekocord.webpackModules.commonModules.MenuItem;
    });
  }
  info = {
    name: "M0chaLibrary",
    id: "arcane:M0chaLibrary",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Minor tweaks that make discord better!",
    version: "1.0.0",
    patches: [],
    menu: {
      ["edit-profile-popout"]: [
          {
              type: "insert",
              position: 0,
              render: () => {
                  return (
                      <this.MenuGroup>
                          <this.MenuItem id="test" label="test" action={() => {}} />
                      </this.MenuGroup>
                  );
              }
          }
      ]
    },
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

function simpleFunction() {
  console.log("This is a simple function.");
}

exports.default = M0chaLibrary;
exports.simpleFunction = simpleFunction;
