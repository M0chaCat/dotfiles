"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AlwaysTrust {
  info = {
    name: "Always Trust",
    id: "arcane:AlwaysTrust",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Removes the annoying untrusted domain and suspicious file popup",
    version: "0.1.0",
    patches: [
      {
        find: '="MaskedLinkStore",',
        replacement: {
          match: /(?<=isTrustedDomain\(\i\){)return \i\(\i\)/,
          replace: "return true"
        },
        predicate: () => this.userPreferences.domain
      },
      {
        find: "bitbucket.org",
        replacement: {
          match: /function \i\(\i\){(?=.{0,60}\.parse\(\i\))/,
          replace: "$&return null;"
        },
        predicate: () => this.userPreferences.file
      }
    ],
    preferences: [
      {
        name: "Untrusted Domain",
        description: "Remove the untrusted domain popup when opening links",
        id: "untrusteddomain",
        type: "boolean",
        default: true
      },
      {
        name: "Potentially Dangerous Download",
        description: "Remove the 'Potentially Dangerous Download' popup when opening links",
        id: "PotentiallyDangerousDownload",
        type: "boolean",
        default: true
      }
    ]
  };
  
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
  }
  
  onRegister(userPreferences) {
    this.userPreferences = userPreferences;
  }
}

exports.default = AlwaysTrust;