const fs = require('fs').promises;
const path = require('path');

// Define UCSUR replacements (key: UCSUR character, value: JavaScript keyword)
const replacements = {
    '󱤪󱤨': 'function',      // UCSUR for 'function'
    '󱤧': 'var',             // UCSUR for 'var'
    '󱥌': 'return',          // UCSUR for 'return'
    '󱥹': 'if',              // UCSUR for 'if'
    '󱥨': 'else',            // UCSUR for 'else'
    '󱤪': 'console',         // UCSUR for 'console'
    '󱥬': 'log',             // UCSUR for 'log'
    '󱤙': 'for',             // UCSUR for 'for'
    '󱤬': 'while',           // UCSUR for 'while'
    '󱦠': 'break',           // UCSUR for 'break'
    '󱥩': 'continue',        // UCSUR for 'continue'
    '󱥔': 'true',            // UCSUR for 'true'
    '󱤂': 'false'            // UCSUR for 'false'
};

// Helper function to rename UCSUR characters to JavaScript keywords
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

        // Rename UCSUR characters in your-code.js content
        const renamedYourCodeContent = renameKeywords(yourCodeContent);

        // Combine all scripts, with renamed content for your-code.js
        const combinedContent = `
        document.addEventListener("DOMContentLoaded", function() {
            // commands.js
            ${commandsContent}

            // openbundles.js
            ${openbundlesContent}

            // your-code.js (converted from Toki Pona to JavaScript)
            ${renamedYourCodeContent}
        });
        `;

        // Write the combined content to a new file
        await fs.writeFile(combinedPath, combinedContent);
        console.log('Combined script with renamed UCSUR characters saved as combined.js');
    } catch (error) {
        console.error('Error combining scripts:', error.message);
    }
}

// Call combineScripts to process the code
combineScripts();
