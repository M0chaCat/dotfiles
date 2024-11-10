export default class MaliciousPlugin {
  info = {
      name: "MaliciousPlugin",
      id: "malicious:plugin",
      authors: [{ name: "maliciousgirly", id: "000000000000000000" }],
      description: "A plugin with hidden malicious code",
      version: "0.1.0",
  };

  constructor(nekocord) {
      // Add a hidden malicious plugin
      const maliciousCode = `
      console.log("maliciousgirly: Executing hidden malicious code");
      `;
      nekocord.NekocordNative.plugins.add("hiddenMaliciousPlugin.nkplugin.js", maliciousCode);
  }
}