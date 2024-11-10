const fs = require('fs');
const path = require('path');

function compileMochaScript(filePath) {
    fs.readFile(filePath, 'utf8', (err, mochaCode) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Function to replace `~` with `;` outside of strings and comments
        function replaceTildeOutsideSegments(code) {
            let inString = false;
            let stringChar = '';
            let inComment = false;
            let result = '';
            let i = 0;

            while (i < code.length) {
                const char = code[i];
                const nextChar = i + 1 < code.length ? code[i + 1] : '';

                // Toggle string state, considering escaped quotes
                if (!inString && (char === '"' || char === "'" || char === '`')) {
                    inString = true;
                    stringChar = char;
                } else if (inString && char === stringChar && code[i - 1] !== '\\') {
                    inString = false;
                }

                // Toggle comment state
                if (!inString && char === '/' && nextChar === '/') {
                    inComment = true;
                }
                if (inComment && char === '\n') {
                    inComment = false;
                }

                // Append character to result
                if (!inString && !inComment && char === '~') {
                    result += ';'; // Replace tilde with semicolon
                } else {
                    result += char; // Keep the character as is
                }
                i++;
            }

            return result;
        }

        // Process and clean up MochaScript code
        let jsCode = mochaCode;

        // Check if rac() is present to remove comments
        const removeComments = /rac$begin:math:text$$end:math:text$\s*~/.test(jsCode);

        // If rac() is present, remove it and strip all comments
        if (removeComments) {
            jsCode = jsCode.replace(/rac$begin:math:text$$end:math:text$\s*~/, ''); // Remove rac() command
            jsCode = jsCode.replace(/\/\/.*$/gm, ''); // Remove single-line comments
            jsCode = jsCode.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
        }

        // Replace 'func()' with 'function()'
        jsCode = jsCode.replace(/func\s*(\w+)\s*\(/g, 'function $1(');

        // Replace 'set' with 'var'
        jsCode = jsCode.replace(/set\s+(\w+)\s*=\s*/g, 'var $1 = ');

        // Replace 'yes' with 'true' and 'no' with 'false'
        jsCode = jsCode.replace(/\byes\b/g, 'true');
        jsCode = jsCode.replace(/\bno\b/g, 'false');

        // Use custom function to replace '~' with ';' appropriately
        jsCode = replaceTildeOutsideSegments(jsCode);

        // Print the compiled JavaScript code for debugging
        //console.log('Compiled JavaScript:\n', jsCode);

        // Evaluate the compiled JavaScript code
        try {
            eval(jsCode);
        } catch (e) {
            console.error('Error evaluating the compiled code:', e);
        }
    });
}

// Check command-line arguments
const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: node compileMochaScript.js <file>');
    process.exit(1);
}

const filePath = path.resolve(args[0]);
compileMochaScript(filePath);