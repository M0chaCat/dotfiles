//https://github.com/Domis-Vencord-Plugins/KeyboardSounds/blob/main/index.ts
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const sounds = {
  click1: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click1.wav"),
  click2: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click2.wav"),
  click3: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click3.wav"),
  backspace: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/backspace.wav")
};

const ignoredKeys = [
  "CapsLock",
  "ShiftLeft",
  "ShiftRight",
  "ControlLeft",
  "ControlRight",
  "AltLeft",
  "AltRight",
  "MetaLeft",
  "MetaRight",
  "ArrowUp",
  "ArrowRight",
  "ArrowLeft",
  "ArrowDown",
  "MediaPlayPause",
  "MediaStop",
  "MediaTrackNext",
  "MediaTrackPrevious",
  "MediaSelect",
  "MediaEject",
  "MediaVolumeUp",
  "MediaVolumeDown",
  "AudioVolumeUp",
  "AudioVolumeDown"
];

const keydown = (e) => {
  if (ignoredKeys.includes(e.code)) return;
  for (const sound of Object.values(sounds)) sound.pause();
  if (e.code === "Backspace") {
      sounds.backspace.currentTime = 0;
      sounds.backspace.play();
      console.log("Playing backspace sound");
  } else {
      const click = sounds[`click${Math.floor(Math.random() * 3) + 1}`];
      click.currentTime = 0;
      click.play();
      console.log("Playing click sound");
  }
};

class KeyboardSounds {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    Nekocord.webpackPatcher.onInitializationFinish(() => {
      this.ChannelStore = Nekocord.webpackModules.findByStoreName("ChannelStore");
      this.GuildStore = Nekocord.webpackModules.findByStoreName("GuildStore");
      this.ReadStateStore = Nekocord.webpackModules.findByStoreName("ReadStateStore");
      this.useStateFromStores = Nekocord.webpackModules.findByStoreName("useStateFromStores");
    });
  }
  info = {
    name: "KeyboardSounds",
    id: "arcane:KeyboardSounds",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Play sounds when you press a key",
    version: "0.1.0",
    patches: [],
    preferences: [{
      name: "Volume",
      description: "Volume",
      id: "volume",
      type: "number",
      default: 100,
      options: {
        minValue: 3,
        maxValue: 100,
      },
    }, {
      name: "Sound Type",
      description: "Click Sounds or softer sounds, true for clicky sounds, false for tactile sounds",
      id: "soundType",
      type: "boolean",
      default: true,
    }],
  };
  onEnable() {
    const volume = this.userPreferences.volume;
    const isClickySounds = this.userPreferences.soundType;
    if (isClickySounds) {
      // Load clicky sounds
      sounds.click1 = new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click1.wav");
      sounds.click2 = new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click2.wav");
      sounds.click3 = new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click3.wav");
      sounds.backspace = new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/backspace.wav");
    } else {
      // Load softer sounds
      sounds.click1 = new Audio("https://github.com/opera-gaming/gxmods/raw/main/mods/Tactile/sounds/tactile1.wav"); // Replace with actual URL
      sounds.click2 = new Audio("https://github.com/opera-gaming/gxmods/raw/main/mods/Tactile/sounds/tactile2.wav"); // Replace with actual URL
      sounds.click3 = new Audio("https://github.com/opera-gaming/gxmods/raw/main/mods/Tactile/sounds/tactile3.wav"); // Replace with actual URL
      sounds.backspace = new Audio("https://github.com/opera-gaming/gxmods/raw/main/mods/Tactile/sounds/tactilebackspace.wav"); // Replace with actual URL
    }
    for (const sound of Object.values(sounds)) sound.volume = volume / 100;
    document.addEventListener("keydown", keydown);
    console.log("Keydown event listener added");
  }
  onDisable() {
    document.removeEventListener("keydown", keydown);
  }
  handleVolumeChange(value) {
    for (const sound of Object.values(sounds)) sound.volume = value / 100;
  }
  onPreferencesChange(userPreferences) {
    this.userPreferences = userPreferences;
    this.handleVolumeChange(userPreferences.volume);
  }
}
exports.default = KeyboardSounds;