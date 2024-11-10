const fs = require('fs');
const path = require('path');

const openbundlesPath = path.join(__dirname, 'openbundles.js');
const yourCodePath = path.join(__dirname, 'your-code.js');
const combinedPath = path.join(__dirname, 'combined.js');

const openbundlesContent = fs.readFileSync(openbundlesPath, 'utf8');
const yourCodeContent = fs.readFileSync(yourCodePath, 'utf8');

const combinedContent = `
// openbundles.js
${openbundlesContent}

document.addEventListener("DOMContentLoaded", function() {
    const { setPosition, getXPosition, getYPosition, BEMA, checkSha256, setupEventListeners, onEvent, setText, getText, deleteElement, generateRandomString, timedLoop, showElement, hideElement, getTime, getDate, setProperty } = api.commands;
    
// your-code.js
${yourCodeContent}
});
`;

fs.writeFileSync(combinedPath, combinedContent);

console.log('Combined script created successfully!');