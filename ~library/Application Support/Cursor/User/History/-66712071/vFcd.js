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

            function replaceOutsideStrings(code, pattern, replacement) {
                let inString = false;
                let stringChar = '';
                let result = '';
                let i = 0;

                while (i < code.length) {
                    const char = code[i];

                    if (!inString && (char === '"' || char === "'" || char === '`')) {
                        inString = true;
                        stringChar = char;
                    } else if (inString && char === stringChar && code[i - 1] !== '\\') {
                        inString = false;
                    }

                    if (!inString) {
                        const match = code.slice(i).match(pattern);
                        if (match && match.index === 0) {
                            result += typeof replacement === 'function' ? replacement(match) : replacement;
                            i += match[0].length;
                            continue;
                        }
                    }

                    result += char;
                    i++;
                }

                return result;
            }

            let jsCode = mochaCode;

            // Replace 'func' with 'function'
            jsCode = replaceOutsideStrings(jsCode, /\bfunc\b/g, 'function');

            // Replace 'set' with 'let'
            jsCode = replaceOutsideStrings(jsCode, /\bset\b/g, 'let');

            // Replace 'yes' with 'true' and 'no' with 'false'
            jsCode = replaceOutsideStrings(jsCode, /\byes\b/g, 'true');
            jsCode = replaceOutsideStrings(jsCode, /\bno\b/g, 'false');

            // Replace '~' with ';'
            jsCode = replaceOutsideStrings(jsCode, /~/g, ';');

            console.log('Compiled JavaScript:\n', jsCode);
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