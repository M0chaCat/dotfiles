const fs = require('fs').promises;
const path = require('path');

async function combineScripts() {
	try {
		const commandsPath = path.join(__dirname, 'commands.js');
		const yourCodePath = path.join(__dirname, 'your-code.js');
		const combinedPath = path.join(__dirname, 'combined.js');

		const [commandsContent, openbundlesContent, yourCodeContent] = await Promise.all([
			fs.readFile(commandsPath, 'utf8'),
			fs.readFile(openbundlesPath, 'utf8'),
			fs.readFile(yourCodePath, 'utf8')
		]);

		const combinedContent = `
        document.addEventListener("DOMContentLoaded", function() {
            // commands.js
            ${commandsContent}

            // your-code.js
            ${yourCodeContent}
        });
        `;

		await fs.writeFile(combinedPath, combinedContent);
	} catch (error) {
		console.error('Error combining scripts:', error.message);
	}
}

combineScripts();