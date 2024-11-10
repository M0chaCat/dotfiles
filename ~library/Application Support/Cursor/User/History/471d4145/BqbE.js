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

    addCommand("softinfo", "Display software information", function() {
        return `Dusk Emulated Terminal v${version}`;
    });
}