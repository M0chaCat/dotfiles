//Bundle$TBasicTerminal
function Bundle$TBasicTerminal(Data, Scr) {
    var TermText = Text;
    var TermBase = Base;
    var TermSurface0 = Surface0;
    var TermSurface1 = Surface1;
    if (Internal || debug) {
        TermText = "#00ff00";
        TermBase = "#000000";
        TermSurface0 = "#111111";
        TermSurface1 = "#222222";
    }
    var bundleID = "BasicTerminal";
    if (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // If the bundle is already running and the request is to open or show screens, ignore it
        return;
    }

    // Initialize or reset the bundle instance if it's not already active
    if (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: MWK.generateRandomString(10), // Generate unique ID
            isRunning: true // Mark as running
            };
    }

    var instanceIDd = activeBundles[bundleID].instanceIDd;
    var isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, function() {
        if (!isRunning) {
            return;
        }
    });

    var data = {
        Screens: ["OpenBundle.BasicTerminal"],
        OpenBundle$Terminal: [
            "OpenBundle.BasicTerminal." + instanceIDd + ".Window",
            "OpenBundle.BasicTerminal." + instanceIDd + ".WindowHeader",
            "OpenBundle.BasicTerminal." + instanceIDd + ".Display",
            "OpenBundle.BasicTerminal." + instanceIDd + ".Input",
            "OpenBundle.BasicTerminal." + instanceIDd + ".Bar.1"
        ]
    };

    OpenBundles.RegisterAppBundle("BasicTerminal", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Terminal") {
            var windowWidth = 400;
            var windowHeight = 300;

            BEMA.Element("TextArea", "OpenBundle.BasicTerminal." + instanceIDd + ".Window", 100, 50, windowWidth, windowHeight, false, 10, 0, "", TermBase, TermText, "", "left", 16, "Courier New", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.BasicTerminal." + instanceIDd + ".WindowHeader", 100, 50, windowWidth, 25, false, 10, 0, "", TermSurface0, TermText, "BasicTerminal", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.BasicTerminal." + instanceIDd + ".Display", 100, 75, windowWidth, windowHeight - 75, false, 10, 0, "", TermBase, TermText, "Welcome to Celeste BasicTerminal\n", "left", 14, "Courier New", true, "", "");
            BEMA.Element("Input", "OpenBundle.BasicTerminal." + instanceIDd + ".Input", 100, windowHeight + 25, windowWidth, 25, false, 10, 0, "", TermSurface0, TermText, "Command [args]", "left", 14, "Courier New", false, "", "");
            BEMA.Element("Button", "OpenBundle.BasicTerminal." + instanceIDd + ".Bar.1", 100, 50, 25, 25, false, 10, 0, "rgb(0,0,0,0)", TermSurface1, TermText, "", "center", 12, "Tahoma", true, "icon://fa-times", TermText);

            onEvent("OpenBundle.BasicTerminal." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Terminal("HideAll");
            });

            onEvent("OpenBundle.BasicTerminal." + instanceIDd + ".Input", "keydown", function(event) {
                if (event.key === "Enter") {
                    var command = getText("OpenBundle.BasicTerminal." + instanceIDd + ".Input");
                    command = command.replace(/\n/g, "");
                    processCommand(command);
                    setText("OpenBundle.BasicTerminal." + instanceIDd + ".Input", "");
                }
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.BasicTerminal." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.BasicTerminal." + instanceIDd + ".Window", [
                    "OpenBundle.BasicTerminal." + instanceIDd + ".WindowHeader",
                    "OpenBundle.BasicTerminal." + instanceIDd + ".Bar.1",
                    "OpenBundle.BasicTerminal." + instanceIDd + ".Display",
                    "OpenBundle.BasicTerminal." + instanceIDd + ".Input"
                ]);
            });
        }
    } else if (Data == "DeleteApp") {
        //not needed for this app
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Terminal.length; i++) {
            var elementId = data.OpenBundle$Terminal[i];
            deleteElement(elementId);
        }
        OpenBundles.showIcons();
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    }

    function processCommand(command) {
        var output = "";
        // Basic interpreter logic
        try {
            output = interpretBasic(command);
        } catch (e) {
            output = "Error: " + e.message;
        }

        appendToDisplay("> " + command + "\n" + output + "\n");
    }

    var variables = {}; // Object to store variable values

    function interpretBasic(command) {
        command = command.trim();
        
        if (command.startsWith("PRINT ")) {
            return command.slice(6); // Return the text after PRINT
        } else if (command.startsWith("LET ")) {
            // Handle variable assignment (e.g., LET A = 5)
            var parts = command.slice(4).split("=");
            if (parts.length === 2) {
                var variable = parts[0].trim();
                var value = eval(parts[1].trim()); // Evaluate the expression
                variables[variable] = value; // Store the variable
                return variable + " = " + value;
            }
        } else if (command.startsWith("INPUT ")) {
            // Handle input command (e.g., INPUT A)
            var inputParts = command.slice(6).split(",");
            var variable = inputParts[0].trim();
            // Simulate user input (for demonstration purposes)
            var userInput = prompt("Enter value for " + variable + ":");
            variables[variable] = userInput; // Store the input value
            return variable + " = " + userInput;
        } else if (command.startsWith("IF ")) {
            // Handle simple IF statements (e.g., IF A > 5 THEN PRINT A)
            var condition = command.slice(3, command.indexOf("THEN")).trim();
            var action = command.slice(command.indexOf("THEN") + 5).trim();
            if (eval(condition)) {
                return interpretBasic(action); // Execute the action if condition is true
            }
            return ""; // No output if condition is false
        } else if (command.startsWith("GOTO ")) {
            // Handle GOTO statements (for simplicity, just return a message)
            return "GOTO command is not implemented.";
        }
        return "Command not recognized.";
    }

    function appendToDisplay(text) {
        var display = "OpenBundle.BasicTerminal." + instanceIDd + ".Display";
        setText(display, "Welcome to Celeste BasicTerminal\n" + text);
    }
}