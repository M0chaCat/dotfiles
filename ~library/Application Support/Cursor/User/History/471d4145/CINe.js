/* 
User Commands! 

To add a new command, use the addCommand function like the examples included.

*/

function registerUserCommands(addCommand) {
    addCommand("greet", "Greet the user", function(parts) {
        return "Hello, " + (parts[1] || "Guest") + "!";
    });

    addCommand("goodbye", "Say goodbye to the user", function(parts) {
        return "Goodbye, " + (parts[1] || "Guest") + "!";
    });

    addCommand("info", "Display terminal information", function() {
        return `Dusk Emulated Terminal v${version}`;
    });

    addCommand("exit", "Close the window", function() {
        window.close(); // This will attempt to close the current window
    });
}