var Mantle = "#181825";
var Base = "#1e1e2e";
var Text = "#cdd6f4";
var Blank = "rgba(0,0,0,0)";
var Surface0 = "#313244";
var Surface1 = "#45475a";
var Surface2 = "#585b70";
//extras
var bg = "#008080";

BEMA("TextArea", "Zarn", -4.5, -4.5, 820, 580, true, 0, 0, Base, Base, Text, "Welcome to Dusk Zarn Terminal\n", "left", 15, "Tahoma", true, "", Text);
BEMA("Input", "commandInput", -4.5, 580, 823, 20, true, 0, 0, Surface0, Surface0, Text, "Meow", "left", 15, "Tahoma", false, "", Text);
    

function setScreen(Screen) {
    hideAllScreens();
    if (Screen == "Home") {
        showElement("Zarn");
        showElement("commandInput");
    }
}

function hideAllScreens() {
    hideElement("Zarn");
    hideElement("commandInput");
}

//Code
setScreen("Home");

    onEvent("commandInput", "keydown", function(event) {
        if (event.key === "Enter") {
        var command = getText("commandInput");
        command = command.replace(/\n/g, "");
        processCommand(command);
        setText("commandInput", "");
    }
}); 

// Create a command registry
var commandRegistry = {
    "help": {
        description: "Show this help message",
        action: function() {
            return "Available commands:\n" + Object.keys(commandRegistry).map(cmd => `${cmd} - ${commandRegistry[cmd].description}`).join("\n");
        }
    },
    "echo": {
        description: "Display the given text",
        action: function(parts) {
            return parts.slice(1).join(" ");
        }
    },
    "clear": {
        description: "Clear the terminal screen",
        action: function() {
            setText("Zarn", "");
            return ""; // No output for clear
        }
    },
    "date": {
        description: "Show current date and time",
        action: function() {
            return getTime("HH:mm:ss") + " " + getDate("mm/dd/yyyy");
        }
    },
    "whoami": {
        description: "Display current user",
        action: function() {
            return "Guest";
        }
    },
    "calc": {
        description: "Execute a calculation, or JS code",
        action: function(parts) {
            return eval(parts.slice(1).join(" "));
        }
    }
};

// Function to add new commands to the command registry
function addCommand(name, description, action) {
    commandRegistry[name.toLowerCase()] = {
        description: description,
        action: action
    };
}

// Example usage of addCommand
addCommand("greet", "Greet the user", function(parts) {
    return "Hello, " + (parts[1] || "Guest") + "!";
});

// Update processCommand function
function processCommand(command) {
    var output = "";
    var parts = command.split(" ");
    var cmd = parts[0].toLowerCase();

    if (commandRegistry[cmd]) {
        output = commandRegistry[cmd].action(parts);
    } else {
        output = "Command not recognized. Type 'help' for available commands.";
    }

    appendToDisplay("> " + command + "\n" + output + "\n");
}

function appendToDisplay(text) {
    var display = "Zarn";
    setText(display, getText(display) + text);
}