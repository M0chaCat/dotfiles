const fs = require('fs').promises;
const path = require('path');

// Define replacements (key: old name, value: new funny name)
const replacements = {
    'function': 'doMagic',
    'var': 'secretPotion',
    'let': 'promiseToKeep',
    'const': 'mightyForce',
    'return': 'bringBack',
    'if': 'maybe',
    'else': 'nope',
    'console': 'loudspeaker',
    'log': 'yell',
    'for': 'journeyThrough',
    'while': 'aroundAndAround',
    'break': 'oopsieBreak',
    'continue': 'keepGoing',
    'true': 'totallyTrue',
    'false': 'totallyFalse'
};

// Helper function to rename JavaScript keywords
function renameKeywords(code) {
    let output = code;
    for (const [oldName, newName] of Object.entries(replacements)) {
        const regex = new RegExp(`\\b${oldName}\\b`, 'g');
        output = output.replace(regex, newName);
    }
    return output;
}

async function combineScripts() {
    try {
        const commandsPath = path.join(__dirname, 'commands.js');
        const openbundlesPath = path.join(__dirname, 'openbundles.js');
        const yourCodePath = path.join(__dirname, 'your-code.js');
        const combinedPath = path.join(__dirname, 'combined.js');

        // Read the content of the scripts
        const [commandsContent, openbundlesContent, yourCodeContent] = await Promise.all([
            fs.readFile(commandsPath, 'utf8'),
            fs.readFile(openbundlesPath, 'utf8'),
            fs.readFile(yourCodePath, 'utf8')
        ]);

        // Rename keywords in your-code.js content
        const renamedYourCodeContent = renameKeywords(yourCodeContent);

        const combinedContent = `
        document.addEventListener("DOMContentLoaded", function() {
            // commands.js
            ${commandsContent}

            // openbundles.js
            ${openbundlesContent}

            // your-code.js
            ${renamedYourCodeContent}
        });
        `;

        // Write the combined and renamed content to a new file
        await fs.writeFile(combinedPath, combinedContent);
        console.log('Combined script with renamed keywords saved as combined.js');
    } catch (error) {
        console.error('Error combining scripts:', error.message);
    }
}

combineScripts();
