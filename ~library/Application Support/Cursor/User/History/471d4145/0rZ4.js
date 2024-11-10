// userCommands.js

// Function to register user-defined commands
function registerUserCommands(addCommand) {
    addCommand("greet", "Greet the user", function(parts) {
        return "Hello, " + (parts[1] || "Guest") + "!";
    });

    addCommand("goodbye", "Say goodbye to the user", function(parts) {
        return "Goodbye, " + (parts[1] || "Guest") + "!";
    });

    // Add more commands as needed
}

// Export the function for use in other files
export { registerUserCommands };