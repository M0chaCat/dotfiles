const { ipcRenderer } = window.api;

// Now you can use ipcRenderer.send and ipcRenderer.on as intended

ipcRenderer('create-element', (Type, ID, X, Y, Width, Height, Autohide, Rounded, borderwidth, Borderc, Bg, Textc, Text, Textalign, Fontsize, Font, Readonly, Icon, Iconc) => {
    //console.log(`Creating element in renderer: ${Type}, ID: ${ID}`); // Debugging log
    let element;

    if (Type === "TextArea") {
        element = document.createElement('textarea');
        element.readOnly = Readonly;
        element.value = Text; 
    } else if (Type === "Button") {
        element = document.createElement('button');
        element.textContent = Text;
        if (Icon) {
            const icon = document.createElement('img');
            icon.src = Icon;
            icon.style.color = Iconc;
            element.insertBefore(icon, element.firstChild);
        }
    } else if (Type === "Input") {
        element = document.createElement('input');
        element.placeholder = Text;
    } else if (Type === "Image") {
        element = document.createElement('img');
        element.src = Icon;
        console.log(`Image element created with src: ${element.src}`); // Debugging log
    } else if (Type === "Dropdown") {
        element = document.createElement('select');
        // You might want to add options here based on the Text parameter
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

    //console.log(`Appending element to bema-container: ${ID}`); // Debugging log
    document.getElementById('bema-container').appendChild(element);
    //console.log(`Element appended:`, element); // Debugging log
});