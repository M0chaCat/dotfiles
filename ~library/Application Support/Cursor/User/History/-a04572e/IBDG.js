"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

import EssentialzTab from "./essentialztab.js";
exports.default = void 0;
class Essentialz {
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
          element: EssentialzTab,
      }
    }
  };

  constructor(userPreferences) {
    this.userPreferences = userPreferences;
  }
  onPreferencesChange(userPreferences) {
    this.userPreferences = userPreferences;
   this.tryToEnableTweaks();
   this.enableSitelenPona();
  }

  tryToEnableTweaks() {
    if (this.userPreferences.ArcaneTweaks === true) {
      const Css = `@import url('https://arcane.kitties.cat/Themes/ArcaneTweaks.nktheme.css');`;
      const updatedCss = Css.replace("be silly :3", "use þ, be silly :3");
      // Ensure the DOM is fully loaded before applying CSS
      if (document.readyState === 'complete') {
        this.applyCss(updatedCss);
      } else {
        window.addEventListener('load', () => this.applyCss(updatedCss));
      }
    }
  }
  enableSitelenPona() {
      const Css = `@import url('https://arcane.kitties.cat/Themes/sitelenpona.nktheme.css');`;
      // Ensure the DOM is fully loaded before applying CSS
      if (document.readyState === 'complete') {
        this.applyCss(Css);
      } else {
        window.addEventListener('load', () => this.applyCss(Css));
      }
  }
  // Function to apply css
  applyCss(css) {
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    
    if (document.head) {
      document.head.appendChild(styleElement);
      console.log(`Essentialz: ArcaneTweaks applied successfully`);
    } else {
      console.error("Essentialz: document.head is null or undefined");
    }
  }
}
exports.default = Essentialz;