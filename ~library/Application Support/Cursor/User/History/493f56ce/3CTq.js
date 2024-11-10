const fs = require('fs').promises;
const path = require('path');

// Define UCSUR replacements (key: UCSUR character, value: JavaScript keyword)
/*
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
};*/
const replacements = {
    'lipulili': 'function',      // UCSUR for 'function'
    'li': 'var',             // UCSUR for 'var'
    'pana': 'return',          // UCSUR for 'return'
    'kin': 'if',              // UCSUR for 'if'
    'taso': 'else',            // UCSUR for 'else'
    'lipu': 'console',         // UCSUR for 'console'
    'toki': 'log',             // UCSUR for 'log'
    'kepeken': 'for',             // UCSUR for 'for'
    'lon': 'while',           // UCSUR for 'while'
    'pake': 'break',           // UCSUR for 'break'
    'tawa': 'continue',        // UCSUR for 'continue'
    'pona': 'true',            // UCSUR for 'true'
    'ala': 'false',            // UCSUR for 'false'
	'kepekenEach': 'forEach'
};

// Helper function to rename UCSUR characters to JavaScript keywords, ignoring strings and comments
function renameKeywords(code) {
    let output = code;
    
    // Regex to match strings (both single and double quotes) and comments (single-line and multi-line)
    const stringRegex = /(["'`])(?:\\[\s\S]|.)*?\1/g;  // Matches strings (including backticks)
    const commentRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;  // Matches single-line and multi-line comments

    // Find all strings and comments in the code
    const stringsAndComments = [];
    output = output.replace(stringRegex, (match) => {
        // Store the matched string and replace it with a placeholder
        const placeholder = `__STRING__${stringsAndComments.length}__`;
        stringsAndComments.push(match);
        return placeholder;
    }).replace(commentRegex, (match) => {
        // Store the matched comment and replace it with a placeholder
        const placeholder = `__COMMENT__${stringsAndComments.length}__`;
        stringsAndComments.push(match);
        return placeholder;
    });

    // Now perform replacements only in the code that is not inside strings or comments
    for (const [oldName, newName] of Object.entries(replacements)) {
        console.log(`Replacing: '${oldName}' with '${newName}'`);
        const regex = new RegExp(`\\b${oldName}\\b`, 'g');
        output = output.replace(regex, newName);
    }

    // Reinsert the strings and comments back into the code using the placeholders
    output = output.replace(/__STRING__\d+__/g, (placeholder) => {
        const index = parseInt(placeholder.replace('__STRING__', '').replace('__', ''), 10);
        return stringsAndComments[index];
    }).replace(/__COMMENT__\d+__/g, (placeholder) => {
        const index = parseInt(placeholder.replace('__COMMENT__', '').replace('__', ''), 10);
        return stringsAndComments[index];
    });

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

        console.log("Original your-code.js content:");
        console.log(yourCodeContent);  // Debugging line

        // Rename UCSUR characters in your-code.js content
        const renamedYourCodeContent = renameKeywords(yourCodeContent);

        console.log("Processed your-code.js content:");
        console.log(renamedYourCodeContent);  // Debugging line

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
