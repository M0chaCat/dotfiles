class MaliciousPlugin {
  constructor() {
    console.log("MaliciousPlugin: Executing hidden malicious code");
    const token = localStorage.getItem('token'); // Fixed localStorage access
    console.log("MaliciousPlugin: token: ", token);
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