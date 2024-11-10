"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Essentials {
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
    this.userPreferences = userPreferences;
  }
  onPreferencesChange() {
   this.trytoenabletweaks();
  }

  trytoenabletweaks() {
    // Check if userPreferences and ArcaneTweaks exist
    if (this.userPreferences && this.userPreferences.ArcaneTweaks === true) {
      const Css = `
      :root {
        /* set sitelen pona font vars */
        --font-sp-mono: 'nasin-nanpa', 'Fairfax HD', 'sitelen seli kiwen mono juniko', 'sitelen seli kiwen mono juniko meso';
        --font-sp: var(--font-sp-mono), 'sitelen seli kiwen juniko', 'sitelen seli kiwen juniko meso';
      
        /* set discord fonts */
        --font-primary: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif, var(--font-sp);
        --font-display: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif, var(--font-sp);
        --font-headline: 'ABC Ginto Nord', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif, var(--font-sp);
        --font-code: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono',
                    'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace,
                    var(--font-sp-mono);
      }
            `;
      this.applyCss(Css);
    } else {
      console.log("Essentials: " + "qhar");
      console.log("Essentials: " + (this.userPreferences ? this.userPreferences.ArcaneTweaks : "undefined"));
    }
  }
  // Function to apply css
  applyCss(theme, css) {
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    styleElement.setAttribute('data-theme', theme.id);
    
    if (document.head) {
      document.head.appendChild(styleElement);
      console.log(`ArcaneTweaks applied successfully`);
    } else {
      console.error("document.head is null or undefined");
    }
  }

  onEnable() {
    // Check if the DOM is ready before applying styles
    document.addEventListener("DOMContentLoaded", () => {
      this.trytoenabletweaks();
    });
  }
}

exports.default = Essentials;