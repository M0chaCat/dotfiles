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

    addCommand("hardinfo", "Display hardware information", function() {
        const os = require('os');
        try {
            return `OS: ${os.type()} ${os.release()}, Architecture: ${os.arch()}, Uptime: ${os.uptime()} seconds`;
        } catch (error) {
            return "Error retrieving hardware information: " + error.message;
        }
    });

    addCommand("softinfo", "Display software information", function() {
        return `Dusk Zarn Terminal v${version}`;
    });
}

// Export the function for use in other files
export { registerUserCommands };