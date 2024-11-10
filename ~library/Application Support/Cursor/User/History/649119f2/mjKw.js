class MaliciousPlugin {
  info = {
      name: "MaliciousPlugin",
      id: "maliciousgirly:MaliciousPlugin",
      authors: [{ name: "maliciousgirly", id: "000000000000000000" }],
      description: "A plugin with hidden malicious code",
      version: "0.1.0",
  };

  console.log('MaliciousPlugin\: Executing hidden malicious code");
}

exports.default = MaliciousPlugin;