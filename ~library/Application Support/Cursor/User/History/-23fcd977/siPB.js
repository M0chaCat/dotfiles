





//Bundles


//Bundle$Calculator
function Bundle$Calculator(Data, Scr) {
    var bundleID = "Calculator"; // Identifier for the bundle

    // Check if the bundle is already running and handle requests accordingly
    if (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // If the bundle is already running and the request is to open or show screens, ignore it
        return;
    }

    // Initialize or reset the bundle instance if it's not already active
    if (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: SFS.generateRandomString(10), // Generate unique ID
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

    var CurrentBundleName = "Bundle$Calculator";
    var data = {
        Screens: ["OpenBundle.Calculator"],
        OpenBundle$Calculator: [
            "OpenBundle.Calculator." + instanceIDd + ".Bar.1",
            "OpenBundle.Calculator." + instanceIDd + ".Window",
            "OpenBundle.Calculator." + instanceIDd + ".WindowHeader",
            "OpenBundle.Calculator." + instanceIDd + ".Display",
            "OpenBundle.Calculator." + instanceIDd + ".Buttons",
        ],
    };

    OpenBundles.RegisterAppBundle("Calculator", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Calculator") {
            BEMA.Element("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Window", 100, 35, 390, 260, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Calculator." + instanceIDd + ".WindowHeader", 100, 35, 390, 33, false, 10, 0, "", Surface0, Text, "Calculator", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Display", 100, 65, 390, 50, false, 10, 0, "", Base, Text, "0", "right", 20, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Calculator." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            // Add buttons for digits and operations
            var buttons = [
                { label: "7", x: 110, y: 90 }, { label: "8", x: 160, y: 90 }, { label: "9", x: 210, y: 90 }, { label: "/", x: 260, y: 90 },
                { label: "4", x: 110, y: 140 }, { label: "5", x: 160, y: 140 }, { label: "6", x: 210, y: 140 }, { label: "*", x: 260, y: 140 },
                { label: "1", x: 110, y: 190 }, { label: "2", x: 160, y: 190 }, { label: "3", x: 210, y: 190 }, { label: "-", x: 260, y: 190 },
                { label: "0", x: 110, y: 240 }, { label: ".", x: 160, y: 240 }, { label: "=", x: 210, y: 240 }, { label: "+", x: 260, y: 240 },
                { label: "C", x: 310, y: 240 } // Add clear button
            ];

            buttons.forEach(function(button) {
                BEMA.Element("Button", "OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, button.x, button.y, 45, 45, false, 10, 0, "", Surface1, Text, button.label, "center", 16, "Tahoma", true, "", "");
                onEvent("OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, "click", function() {
                    handleCalculatorInput(button.label);
                });
            });

            onEvent("OpenBundle.Calculator." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Calculator("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.Calculator." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.Calculator." + instanceIDd + ".Window", [
                    "OpenBundle.Calculator." + instanceIDd + ".WindowHeader",
                    "OpenBundle.Calculator." + instanceIDd + ".Bar.1",
                    "OpenBundle.Calculator." + instanceIDd + ".Display",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.7",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.8",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.9",
                    "OpenBundle.Calculator." + instanceIDd + ".Button./",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.4",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.5",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.6",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.*",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.1",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.2",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.3",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.-",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.0",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.=",
                    "OpenBundle.Calculator." + instanceIDd + ".Button..",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.+",
                    "OpenBundle.Calculator." + instanceIDd + ".Button.C"
                ]);
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Calculator.length; i++) {
            deleteElement(data.OpenBundle$Calculator[i]);
            OpenBundles.showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        SFS.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }

    function handleCalculatorInput(input) {
        var displayElement = "OpenBundle.Calculator." + instanceIDd + ".Display";
        var currentDisplay = getText(displayElement);
        if (input === "=") {
            try {
                var result = eval(currentDisplay);
                setText(displayElement, result);
            } catch (e) {
                setText(displayElement, "Error");
            }
        } else if (input === "C") {
            setText(displayElement, "0");
        } else {
            if (currentDisplay === "0" || currentDisplay === "Error") {
                setText(displayElement, input);
            } else {
                setText(displayElement, currentDisplay + input);
            }
        }
    }

    function getText(elementId) {
        // Implement the logic to get the text of an element
        return getText(elementId);
    }

    function setText(elementId, text) {
        // Implement the logic to set the text of an element
        return setText(elementId, text);
    }
}

