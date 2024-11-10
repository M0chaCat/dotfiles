var Mantle = "#181825";
var Base = "#1e1e2e";
var Text = "#cdd6f4";
var Blank = "rgba(0,0,0,0)";
var Surface0 = "#313244";
var Surface1 = "#45475a";
var Surface2 = "#585b70";
//extras
var bg = "#008080";

BEMA("TextArea", "Zarn", -4.5, -4.5, 820, 580, true, 0, 0, Base, Base, Text, "Welcome to Dusk Zarn Terminal\n> ", "left", 15, "Tahoma", true, "", Text);
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

function processCommand(command) {
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
        setText("Zarn", "");
        return;

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

    appendToDisplay("> " + command + "\n" + output + "\n");
}

function appendToDisplay(text) {
    var display = "Zarn";
    setText(display, getText(display) + text + "\n> ");
}