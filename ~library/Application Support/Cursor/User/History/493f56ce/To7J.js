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
			compact: true,
			controlFlowFlattening: false,
			controlFlowFlatteningThreshold: 0.75,
			deadCodeInjection: false,
			deadCodeInjectionThreshold: 0.4,
			debugProtection: false,
			debugProtectionInterval: 0,
			disableConsoleOutput: false,
			domainLock: [],
			domainLockRedirectUrl: 'about:blank',
			forceTransformStrings: [],
			identifierNamesCache: null,
			identifierNamesGenerator: 'hexadecimal',
			identifiersDictionary: [],
			identifiersPrefix: '',
			ignoreImports: false,
			inputFileName: '',
			log: false,
			numbersToExpressions: false,
			optionsPreset: 'default',
			renameGlobals: false,
			renameProperties: false,
			renamePropertiesMode: 'safe',
			reservedNames: [],
			reservedStrings: [],
			seed: 0,
			selfDefending: false,
			simplify: true,
			sourceMap: false,
			sourceMapBaseUrl: '',
			sourceMapFileName: '',
			sourceMapMode: 'separate',
			sourceMapSourcesMode: 'sources-content',
			splitStrings: false,
			splitStringsChunkLength: 10,
			stringArray: true,
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
			transformObjectKeys: false,
			unicodeEscapeSequence: false
		}).getObfuscatedCode();
		await fs.writeFile(combinedPath, obfuscatedContent);
	} catch (error) {
		console.error('Error combining scripts:', error.message);
	}
}

combineScripts();