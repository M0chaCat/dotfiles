const { ipcRenderer } = window.api;

// Now you can use ipcRenderer.send and ipcRenderer.on as intended

ipcRenderer.on('create-element', (event, Type, ID, X, Y, Width, Height, Autohide, Rounded, borderwidth, Borderc, Bg, Textc, Text, Textalign, Fontsize, Font, Readonly, Icon, Iconc) => {
    console.log(`Creating element in renderer: ${Type}, ID: ${ID}`); // Debugging log
    let element;

    if (Type === "TextArea") {
        element = document.createElement('textarea');
        element.readOnly = Readonly;
        element.value = Text; 
    } else if (Type === "Button") {
        element = document.createElement('button');
        element.innerText = Text;
        if (Icon) {
            const icon = document.createElement('img');
            icon.src = Icon;
            icon.style.color = Iconc;
            element.appendChild(icon);
        }
    } else if (Type === "Input") {
        element = document.createElement('input');
        element.placeholder = Text;
    } else if (Type === "Image") {
        element = document.createElement('img');
        element.src = Icon; // Correctly set the src attribute
        element.style.color = Iconc; // This line might not be necessary for images
    } else if (Type === "Dropdown") {
        element = document.createElement('select');
    } else {
        console.log("Incorrect Element type");
        return;
    }

    element.id = ID;
    element.style.position = 'absolute';
    element.style.left = `${X}px`;
    element.style.top = `${Y}px`;
    element.style.width = `${Width}px`;
    element.style.height = `${Height}px`;
    element.style.backgroundColor = Bg;
    element.style.borderWidth = `${borderwidth}px`;
    element.style.borderRadius = `${Rounded}px`;
    element.style.borderColor = Borderc;
    element.style.textAlign = Textalign;
    element.style.fontSize = `${Fontsize}px`;
    element.style.fontFamily = Font;
    element.style.color = Textc;
    element.style.display = Autohide ? 'none' : 'block';
    element.src = Icon;

    console.log(`Appending element to bema-container: ${ID}`); // Debugging log
    document.getElementById('bema-container').appendChild(element);
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