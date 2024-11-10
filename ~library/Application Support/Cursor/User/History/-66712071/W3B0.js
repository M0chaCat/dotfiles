const fs = require('fs');
const path = require('path');

function compileMochaScript(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, mochaCode) => {
            if (err) {
                console.error('Error reading the file:', err);
                reject(err);
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
                    if (!inString && !inComment && char === '/' && nextChar === '/') {
                        inComment = true;
                    }
                    if (inComment && char === '\n') {
                        inComment = false;
                    }

                    // Handle multi-line comments
                    if (!inString && !inComment && char === '/' && nextChar === '*') {
                        inComment = true;
                    }
                    if (inComment && char === '*' && nextChar === '/') {
                        inComment = false;
                        i++; // Skip the '/' character
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

            // Function to replace patterns outside of strings
            function replaceOutsideStrings(code, pattern, replacement) {
                let inString = false;
                let stringChar = '';
                let result = '';
                let i = 0;

                while (i < code.length) {
                    const char = code[i];

                    // Toggle string state, considering escaped quotes
                    if (!inString && (char === '"' || char === "'" || char === '`')) {
                        inString = true;
                        stringChar = char;
                    } else if (inString && char === stringChar && code[i - 1] !== '\\') {
                        inString = false;
                    }

                    // Apply replacement if not in string
                    if (!inString) {
                        const match = code.slice(i).match(pattern);
                        if (match && match.index === 0) {
                            result += replacement.replace('$1', match[1]);
                            i += match[0].length;
                            continue;
                        }
                    }

                    result += char;
                    i++;
                }

                return result;
            }

            // Process and clean up MochaScript code
            let jsCode = mochaCode;

            // Check if rac() is present to remove comments
            const removeComments = /rac\(\)\s*~/.test(jsCode);

            // If rac() is present, remove it and strip all comments
            if (removeComments) {
                jsCode = jsCode.replace(/rac\(\)\s*~/, ''); // Remove rac() command
                jsCode = jsCode.replace(/\/\/.*$/gm, ''); // Remove single-line comments
                jsCode = jsCode.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
            }

            // Replace 'func()' with 'function()' outside of strings
            jsCode = replaceOutsideStrings(jsCode, /func\s*(\w+)\s*\(/g, 'function $1(');

            // Replace 'set' with 'var' outside of strings
            jsCode = replaceOutsideStrings(jsCode, /set\s+(\w+)\s*=\s*/g, 'var $1 = ');

            // Replace 'yes' with 'true' and 'no' with 'false' outside of strings
            jsCode = replaceOutsideStrings(jsCode, /\byes\b/g, 'true');
            jsCode = replaceOutsideStrings(jsCode, /\bno\b/g, 'false');

            // Use custom function to replace '~' with ';' appropriately
            jsCode = replaceTildeOutsideSegments(jsCode);

            // Print the compiled JavaScript code for debugging
            console.log('Compiled JavaScript:\n', jsCode);

            // Resolve with the compiled code instead of evaluating it
            resolve(jsCode);
        });
    });
}

// Usage example:
const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: node compileMochaScript.js <file>');
    process.exit(1);
}

const filePath = path.resolve(args[0]);

compileMochaScript(filePath)
    .then(compiledCode => {
        console.log('Compilation successful. You can now use the compiled code.');
        // Here you can decide what to do with the compiled code,
        // such as writing it to a file or passing it to another function
    })
    .catch(error => {
        console.error('Compilation failed:', error);
    });