"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
export default class Essentials {
  info = {
    name: "Essentials",
    id: "arcane:Essentials",
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
      }
    ]
  };

  constructor(userPreferences) {
    this.userPreferences = userPreferences || {}; // Ensure userPreferences is an object
    console.log("Essentials: User Preferences:", this.userPreferences); // Log userPreferences
    console.log("Essentials: AT Preferences:", this.userPreferences.ArcaneTweaks); // Log userPreferences
  }
  onPreferencesChange() {
   this.tryToEnableTweaks(); // Fixed method name
  }

  tryToEnableTweaks() { // Fixed method name
    // Check if ArcaneTweaks exists
    if (this.userPreferences.ArcaneTweaks === true) {
      const Css = `@import url('https://raw.githubusercontent.com/MeowArcane/PersonalSite/main/Themes/sitelenpona.nktheme.css');`; // Fixed url() syntax
      console.log("Essentials: Applying CSS:", Css); // Debugging log
      this.applyCss(Css);
    } else {
      console.log("Essentials: ArcaneTweaks is disabled or undefined."); // Improved error message
    }
  }
  // Function to apply css
  applyCss(css) {
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    
    if (document.head) {
      document.head.appendChild(styleElement);
      console.log(`Essentials: ArcaneTweaks applied successfully`);
    } else {
      console.error("Essentials: document.head is null or undefined");
    }
  }

  onEnable() {
    // Check if the DOM is ready before applying styles
    document.addEventListener("DOMContentLoaded", () => {
      this.tryToEnableTweaks(); // Call to enable tweaks after DOM is loaded
    });
  }
}