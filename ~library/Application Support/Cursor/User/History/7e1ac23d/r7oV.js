"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;


class ConsoleJanitor {
  info = {
      name: "Console Janitor",
      description: "Disables annoying console messages/errors",
      authors: [{
        name: "Arcane",
        id: "808802000224518264"
      }],
      version: "0.1.0",
      id: "arcane:ConsoleJanitor",
      patches: [
        {
            find: 'console.warn("Window state not initialized"',
            replacement: {
                match: /console\.warn\("Window state not initialized",\i\),/,
                replace: ""
            }
        },
        {
            find: "is not a valid locale.",
            replacement: {
                match: /\i\.error\(""\.concat\(\i," is not a valid locale."\)\);/,
                replace: ""
            }
        },
        {
            find: "notosans-400-normalitalic",
            replacement: {
                match: /,"notosans-.+?"/g,
                replace: ""
            }
        },
        {
            find: 'console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");',
            all: true,
            replacement: {
                match: /console\.warn\("\[DEPRECATED\] Please use `subscribeWithSelector` middleware"\);/,
                replace: ""
            }
        },
        {
            find: "RPCServer:WSS",
            replacement: {
                match: /\i\.error\("Error: "\.concat\((\i)\.message/,
                replace: '!$1.message.includes("EADDRINUSE")&&$&'
            }
        },
        {
            find: "Tried getting Dispatch instance before instantiated",
            replacement: {
                match: /null==\i&&\i\.warn\("Tried getting Dispatch instance before instantiated"\),/,
                replace: ""
            }
        },
        {
            find: "Unable to determine render window for element",
            replacement: {
                match: /console\.warn\("Unable to determine render window for element",\i\),/,
                replace: ""
            }
        },
        {
            find: "failed to send analytics events",
            replacement: {
                match: /console\.error\("\[analytics\] failed to send analytics events query: "\.concat\(\i\)\)/,
                replace: ""
            }
        },
        {
            find: "Slow dispatch on",
            replacement: {
                match: /\i\.totalTime>100&&\i\.verbose\("Slow dispatch on ".+?\)\);/,
                replace: ""
            }
        },
        ...[
            '("MessageActionCreators")', '("ChannelMessages")',
            '("Routing/Utils")', '("RTCControlSocket")',
            '("ConnectionEventFramerateReducer")', '("RTCLatencyTestManager")',
            '("OverlayBridgeStore")', '("RPCServer:WSS")'
        ].map(logger => ({
            find: logger,
            predicate: () => this.userPreferences.disableNoisyLoggers,
            all: true,
            replacement: {
                match: new RegExp(String.raw`new \i\.\i${logger.replace(/([()])/g, "\\$1")}`),
                replace: `$self.NoopLogger${logger}`
            }
        })),
        {
            find: '"Experimental codecs: "',
            predicate: () => this.userPreferences.disableNoisyLoggers,
            replacement: {
                match: /new \i\.\i\("Connection\("\.concat\(\i,"\)"\)\)/,
                replace: "$self.NoopLogger()"
            }
        },
        {
            find: '"Handling ping: "',
            predicate: () => this.userPreferences.disableNoisyLoggers,
            replacement: {
                match: /new \i\.\i\("RTCConnection\("\.concat.+?\)\)(?=,)/,
                replace: "$self.NoopLogger()"
            }
        },
        {
            find: '("Spotify")',
            predicate: () => this.userPreferences.disableSpotifyLogger,
            replacement: {
                match: /new \i\.\i\("Spotify"\)/,
                replace: "$self.NoopLogger()"
            }
        }
    ],
    preferences: [
        {
          name: "disableNoisyLoggers",
          description: "Disable noisy loggers like the MessageActionCreators",
          id: "disableNoisyLoggers",
          type: "boolean",
          default: false,
        },
        {
            name: "disableSpotifyLogger",
            description: "Disable the Spotify logger, which leaks account information and access token",
            id: "disableSpotifyLogger",
            type: "boolean",
            default: true,
          }
      ],
  }


};

exports.default = ConsoleJanitor;