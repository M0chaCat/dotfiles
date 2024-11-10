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
  } else {
      const click = sounds[`click${Math.floor(Math.random() * 3) + 1}`];
      click.currentTime = 0;
      click.play();
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
    this.onPreferencesChange("volume", this.handleVolumeChange.bind(this)); // Corrected method name
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
    }],
  };
  start() {
    const volume = this.userPreferences.plugins.KeyboardSounds.volume;
    for (const sound of Object.values(sounds)) sound.volume = volume / 100;
    document.addEventListener("keydown", keydown);
  }
  stop() {
    document.removeEventListener("keydown", keydown);
  }
  handleVolumeChange(value) {
    for (const sound of Object.values(sounds)) sound.volume = value / 100;
  }
}
exports.default = KeyboardSounds;