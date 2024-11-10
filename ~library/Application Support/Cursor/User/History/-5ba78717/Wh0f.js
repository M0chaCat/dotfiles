//Bundle$Terminal
function Bundle$Terminal(Data, Scr) {
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
    var bundleID = "Terminal";
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
        Screens: ["OpenBundle.Terminal"],
        OpenBundle$Terminal: [
            "OpenBundle.Terminal." + instanceIDd + ".Window",
            "OpenBundle.Terminal." + instanceIDd + ".WindowHeader",
            "OpenBundle.Terminal." + instanceIDd + ".Display",
            "OpenBundle.Terminal." + instanceIDd + ".Input",
            "OpenBundle.Terminal." + instanceIDd + ".Bar.1"
        ]
    };

    OpenBundles.RegisterAppBundle("Terminal", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Terminal") {
            var windowWidth = 400;
            var windowHeight = 300;

            BEMA.Element("TextArea", "OpenBundle.Terminal." + instanceIDd + ".Window", 100, 50, windowWidth, windowHeight, false, 10, 0, "", TermBase, TermText, "", "left", 16, "Courier New", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Terminal." + instanceIDd + ".WindowHeader", 100, 50, windowWidth, 25, false, 10, 0, "", TermSurface0, TermText, "Terminal", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Terminal." + instanceIDd + ".Display", 100, 75, windowWidth, windowHeight - 75, false, 10, 0, "", TermBase, TermText, "Welcome to Next Terminal\n", "left", 14, "Courier New", true, "", "");
            BEMA.Element("Input", "OpenBundle.Terminal." + instanceIDd + ".Input", 100, windowHeight + 25, windowWidth, 25, false, 10, 0, "", TermSurface0, TermText, "Command [args]", "left", 14, "Courier New", false, "", "");
            BEMA.Element("Button", "OpenBundle.Terminal." + instanceIDd + ".Bar.1", 100, 50, 25, 25, false, 10, 0, "rgb(0,0,0,0)", TermSurface1, TermText, "", "center", 12, "Tahoma", true, "icon://fa-times", TermText);

            onEvent("OpenBundle.Terminal." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Terminal("HideAll");
            });

            onEvent("OpenBundle.Terminal." + instanceIDd + ".Input", "keydown", function(event) {
                if (event.key === "Enter") {
                    var command = getText("OpenBundle.Terminal." + instanceIDd + ".Input");
                    command = command.replace(/\n/g, "");
                    processCommand(command);
                    setText("OpenBundle.Terminal." + instanceIDd + ".Input", "");
                }
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.Terminal." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.Terminal." + instanceIDd + ".Window", [
                    "OpenBundle.Terminal." + instanceIDd + ".WindowHeader",
                    "OpenBundle.Terminal." + instanceIDd + ".Bar.1",
                    "OpenBundle.Terminal." + instanceIDd + ".Display",
                    "OpenBundle.Terminal." + instanceIDd + ".Input"
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
            setText("OpenBundle.Terminal." + instanceIDd + ".Display", "");
            return;
        } else if (cmd === "date") {
            output = MWK.getTime("HH:mm:ss") + " " + MWK.getDate("mm:dd:yyyy");
        } else if (cmd === "whoami") {
            output = Username || "Guest";
        } else if (cmd === "calc") {
            if (Internal || debug) {
            if (parts.length > 1) {
                try {
                    output = eval(parts.slice(1).join(" "));
                } catch (e) {
                    output = "Invalid expression";
                }
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
        var display = "OpenBundle.Terminal." + instanceIDd + ".Display";
        setText(display, "Welcome to Next Terminal\n" + text);
    }
}
