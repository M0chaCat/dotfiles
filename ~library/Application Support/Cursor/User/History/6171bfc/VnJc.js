const fs = require('fs').promises;
const path = require('path');

async function combineScripts() {
	try {
		const commandsPath = path.join(__dirname, 'commands.js');
		const openbundlesPath = path.join(__dirname, 'openbundles.js');
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

            // openbundles.js
            ${openbundlesContent}

            // your-code.js
            ${yourCodeContent}
        });
        `;

		await fs.writeFile(combinedPath, combinedContent);
		console.log('Scripts combined successfully.');
	} catch (error) {
		console.error('Error combining scripts:', error);
	}
}

combineScripts();