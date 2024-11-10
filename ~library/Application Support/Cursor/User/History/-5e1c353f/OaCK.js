"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeProfileThemes {
  info = {
    name: "FakeProfileThemes",
    id: "arcane:FakeProfileThemes",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Allows profile theming by hiding the colors in your bio thanks to invisible encoding",
    version: "1.0.0",
    patches: [],
    preferences: [
      {
        name: "nitroFirst",
        description: "Default color source if both are present",
        id: "nitroFirst",
        type: "boolean",
        default: true
      },
    ]
  };

  constructor(userPreferences) {
    this.userPreferences = userPreferences;
  }

  onPreferencesChange(userPreferences) {
    this.userPreferences = userPreferences;
    // Call necessary methods to apply changes
  }

  encode(primary, accent) {
    const message = `[#${primary.toString(16).padStart(6, "0")},#${accent.toString(16).padStart(6, "0")}]`;
    return Array.from(message)
      .map(x => x.codePointAt(0))
      .filter(x => x >= 0x20 && x <= 0x7f)
      .map(x => String.fromCodePoint(x + 0xe0000))
      .join("");
  }

  decode(bio) {
    if (bio == null) return null;
    const colorString = bio.match(
      /\u{e005b}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]{1,6})\u{e002c}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]{1,6})\u{e005d}/u,
    );
    if (colorString != null) {
      const parsed = [...colorString[0]]
        .map(x => String.fromCodePoint(x.codePointAt(0) - 0xe0000))
        .join("");
      return parsed
        .substring(1, parsed.length - 1)
        .split(",")
        .map(x => parseInt(x.replace("#", "0x"), 16));
    }
    return null;
  }

  // Function to apply color decoding
  colorDecodeHook(user) {
    if (user) {
      if (this.userPreferences.nitroFirst && user.themeColors) return user;
      const colors = this.decode(user.bio);
      if (colors) {
        return { ...user, premiumType: 2, themeColors: colors };
      }
    }
    return user;
  }

  // Function to add copy button
  addCopyButton(primary, accent) {
    const colorString = this.encode(primary, accent);
    console.log(`Copy 3y3: ${colorString}`);
  }
}

exports.default = FakeProfileThemes;