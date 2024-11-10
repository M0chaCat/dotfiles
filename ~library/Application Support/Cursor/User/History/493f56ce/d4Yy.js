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

		var obfuscatedContent = JavaScriptObfuscator.obfuscate(combinedContent, {
			compact: false, // Keep the code formatting
			controlFlowFlattening: false, // Do not flatten control flow
			deadCodeInjection: false, // Do not inject dead code
			debugProtection: false, // No debug protection
			disableConsoleOutput: false, // Allow console output
			identifierNamesGenerator: 'mangled', // Use a simpler identifier names generator
			ignoreImports: false,
			inputFileName: '',
			log: false,
			numbersToExpressions: false,
			optionsPreset: 'default',
			renameGlobals: false, // Do not rename global variables
			renameProperties: false,
			reservedNames: ['Bundle$Settings'], 
			reservedStrings: [],
			seed: 0,
			selfDefending: false, // No self-defending code
			simplify: false, // Do not simplify code
			sourceMap: false,
			sourceMapBaseUrl: '',
			sourceMapFileName: '',
			sourceMapMode: 'separate',
			sourceMapSourcesMode: 'sources-content',
			splitStrings: false,
			splitStringsChunkLength: 10,
			stringArray: false, // Do not use a string array
			stringArrayCallsTransform: true,
			stringArrayCallsTransformThreshold: 0.5,
			stringArrayEncoding: [],
			stringArrayIndexesType: [
				'hexadecimal-number'
			],
			stringArrayIndexShift: true,
			stringArrayRotate: true,
			stringArrayShuffle: true,
			stringArrayWrappersCount: 1,
			stringArrayWrappersChainedCalls: true,
			stringArrayWrappersParametersMaxCount: 2,
			stringArrayWrappersType: 'variable',
			stringArrayThreshold: 0.75,
			target: 'browser',
			transformObjectKeys: false, // Do not transform object keys
			unicodeEscapeSequence: false // Do not use unicode escape sequences
		}).getObfuscatedCode();
		await fs.writeFile(combinedPath, obfuscatedContent);
	} catch (error) {
		console.error('Error combining scripts:', error.message);
	}
}

combineScripts();