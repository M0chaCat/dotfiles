var Mantle = "#181825";
var Base = "#1e1e2e";
var Text = "#cdd6f4";
var Blank = "rgba(0,0,0,0)";
var Surface0 = "#313244";
var Surface1 = "#45475a";
var Surface2 = "#585b70";
//extras
var bg = "#008080";

BEMA("TextArea", "Zarn", -4.5, -4.5, 820, 607.5, true, 0, 0, Base, Base, Text, "Meow", "left", 15, "Tahoma", false, "", Text);

function setScreen(Screen) {
    hideAllScreens();
    if (Screen == "Home") {
        showElement("Zarn");
    }
}

function hideAllScreens() {
    hideElement("Zarn");
}

//Code
setScreen("Home");

// Create an input field for command entry
var commandInput = "commandInput"; // ID for the input field
setText(commandInput, ""); // Clear the input field initially

// Add an event listener for the input field
onEvent(commandInput, "keydown", function(event) {
    if (event.key === "Enter") {
        var command = getText(commandInput);
        displayCommand(command); // Process the command
        setText(commandInput, ""); // Clear the input field after processing
    }
});

// Replace the command processing with a direct display of commands
function displayCommand(command) {
    var output = "";
    var parts = command.split(" ");
    var cmd = parts[0].toLowerCase();

    if (cmd === "help") {
        output = "Available commands:\n" +
                 "help - Show this help message\n" +
                 "echo [text] - Display the given text\n" +
                 "clear - Clear the terminal screen\n" +
                 "date - Show current date and time\n" +
                 "whoami - Display current user\n" +
                 "calc [expression] - Simple calculator, only available for developers";

    } else if (cmd === "echo") {
        output = parts.slice(1).join(" ");

    } else if (cmd === "clear") {
        output = ""; // Clear output

    } else if (cmd === "date") {
        output = getTime("HH:mm:ss") + " " + getDate("mm/dd/yyyy");

    } else if (cmd === "whoami") {
        output = "Guest";
        
    } else if (cmd === "calc") {
        if (Internal || debug) {
            if (parts.length > 1) {
                output = eval(parts.slice(1).join(" "));
            } else {
                output = "Usage: calc [expression]";
            }
        } else {
            output = "calc command is not available";
        }
    
    } else {
        output = "Command not recognized. Type 'help' for available commands.";
    }

    // Append the command and its output to the display
    appendToDisplay("> " + command + "\n" + output + "\n");
}

// Update the appendToDisplay function to handle direct command display
function appendToDisplay(text) {
    var display = "Zarn";
    var currentText = getText(display); // Get current display text
    setText(display, currentText + text); // Append new text to the display
}

// Example usage
displayCommand("help"); // Call this function to display commands


