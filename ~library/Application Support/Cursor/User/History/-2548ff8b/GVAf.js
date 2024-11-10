const { ipcRenderer } = require('electron');

ipcRenderer.on('create-element', (event, elementType, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl) => {
    console.log(`Creating element in renderer: ${elementType}, ID: ${id}`); // Debugging log
    const element = document.createElement(elementType);
    element.id = id;
    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.zIndex = zIndex;
    element.style.backgroundColor = bgColor;
    element.style.color = textColor;
    element.style.textAlign = textAlign;
    element.style.fontSize = `${fontSize}px`;
    element.style.fontFamily = fontFamily;
    element.style.display = visible ? 'block' : 'none';

    if (elementType === 'button' || elementType === 'textarea') {
        element.innerText = text;
    }

    if (imageUrl) {
        element.style.backgroundImage = `url(${imageUrl})`;
        element.style.backgroundSize = 'cover';
    }

    document.body.appendChild(element);

    if (draggable) {
        element.addEventListener('mousedown', (e) => {
            const offsetX = e.clientX - element.getBoundingClientRect().left;
            const offsetY = e.clientY - element.getBoundingClientRect().top;

            function onMouseMove(e) {
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }
});

ipcRenderer.on('delete-element', (event, id) => {
    console.log(`Attempting to delete element with ID: ${id}`); // Debugging log
    const element = document.getElementById(id);
    if (element) {
        console.log(`Element found:`, element); // Log the element
        element.remove();
        console.log(`Element with ID: ${id} has been removed`); // Confirm removal
    } else {
        console.error(`Element with ID: ${id} not found`); // Error if element not found
    }
});

ipcRenderer.on('show-element', (event, id) => {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'block';
    }
});

ipcRenderer.on('hide-element', (event, id) => {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'none';
    }
});

ipcRenderer.on('set-property', (event, id, property, value) => {
    const element = document.getElementById(id);
    if (element) {
        element.style[property] = value;
    }
});

ipcRenderer.on('set-text', (event, id, text) => {
    const element = document.getElementById(id);
    if (element) {
        element.innerText = text;
    }
});
