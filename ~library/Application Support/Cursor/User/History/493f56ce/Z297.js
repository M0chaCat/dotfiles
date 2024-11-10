const fs = require('fs').promises;
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

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

		// Ensure combinedContent is not empty
		if (!combinedContent.trim()) {
			throw new Error('Combined content is empty.');
		}

		var obfuscatedContent = JavaScriptObfuscator.obfuscate(combinedContent, {
			compact: true,
			controlFlowFlattening: true,
			 deadCodeInjection: true,
			debugProtection: true,
			debugProtectionInterval: true,
			disableConsoleOutput: true,
		}).getObfuscatedCode();

		// Ensure obfuscatedContent is not empty
		if (!obfuscatedContent.trim()) {
			throw new Error('Obfuscated content is empty.');
		}

		await fs.writeFile(combinedPath, obfuscatedContent);
		console.log('Scripts combined successfully.');
	} catch (error) {
		console.error('Error combining scripts:', error);
	}
}

combineScripts();