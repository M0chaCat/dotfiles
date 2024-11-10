const fs = require('fs');
const path = require('path');

function compileMochaScript(filePath) {
    fs.readFile(filePath, 'utf8', (err, mochaCode) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Process and clean up MochaScript code
        let jsCode = mochaCode;

        // Check if rac() is present to remove comments
        const removeComments = /rac$begin:math:text$$end:math:text$\s*~/.test(jsCode);

        // If rac() is present, remove it and strip all comments
        if (removeComments) {
            jsCode = jsCode.replace(/rac$begin:math:text$$end:math:text$\s*~/, '');
            jsCode = jsCode.replace(/\/\/.*$/gm, '');
            jsCode = jsCode.replace(/\/\*[\s\S]*?\*\//g, '');
        }

        // Replace 'func()' with 'function()'
        jsCode = jsCode.replace(/func\s*(\w+)\s*\(/g, 'function $1(');

        // Replace 'set' with 'var' outside of strings
        jsCode = jsCode.replace(/(\bset\b)(?=(?:[^"'`]*["'`][^"'`]*["'`])*[^"'`]*$)/g, 'var');

        // Replace 'yes' with 'true' and 'no' with 'false'
        jsCode = jsCode.replace(/\byes\b/g, 'true');
        jsCode = jsCode.replace(/\bno\b/g, 'false');

        // Replace tildes with semicolons outside of strings
        jsCode = jsCode.replace(/(~)(?=(?:[^"'`]*["'`][^"'`]*["'`])*[^"'`]*$)/g, ';');

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