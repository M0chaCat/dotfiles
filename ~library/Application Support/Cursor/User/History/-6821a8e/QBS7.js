var state = {}; // Create a state object to hold variables

function getState(ID) {
    return state[ID];
}

function setState(ID, value, oncolor, offcolor, x, y) {
    if (value) {
        setProperty(ID+".bg", "background-color", oncolor); // Set to oncolor
        setPosition(ID+".orb", x, y, 0, 25);
    } else {
        setProperty(ID+".bg", "background-color", offcolor); // Set to offcolor
        setPosition(ID+".orb", x + 20, y, 0, 25);
    }
    state[ID] = value; // Update the state object with the new value
}

function Switch(ID, x, y, oncolor, offcolor, starton) {
    state[ID] = starton; // Store the state in the object
    textArea(ID+".bg", "");
    setProperty(ID+".bg", "font-size", 0);
    setPosition(ID+".bg", x, y, 50, 25);
    
    textArea(ID+".orb", "");
    setProperty(ID+".orb", "font-size", 0);
    setPosition(ID+".orb", x, y, 0, 25);
    
    button(ID, "");
    setProperty(ID, "font-size", 0);
    setPosition(ID, x, y, 50, 25);  
    
    // Set the initial background color based on the starton value
    setProperty(ID+".bg", "background-color", starton ? oncolor : offcolor); // Set initial color

    // Ensure the initial state is set correctly
    setState(ID, starton, oncolor, offcolor, x, y); // Pass colors and coordinates

    onEvent(ID, "click", function() {
        const currentState = getState(ID);
        setState(ID, !currentState, oncolor, offcolor, x, y); // Toggle state
    });

    // Additional properties for UI elements
    setProperty(ID+".bg", "border-width", 0);
    setProperty(ID+".bg", "border-radius", 1000);
    setProperty(ID+".bg", "readonly", true);

    setProperty(ID+".orb", "readonly", true);
    setProperty(ID+".orb", "border-width", 0);
    setProperty(ID+".orb", "border-radius", 1000);
    
    setProperty(ID, "border-width", 0);
    setProperty(ID, "border-radius", 1000);
    setProperty(ID, "background-color", "rgba(0,0,0,0)");
}

// Example usage
Switch("meow", 50, 100, "#00dd00", "#ff0000", false);
getState("meow");
