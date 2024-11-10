//Bundles

//Bundle$Settings
function Bundle$Settings(Data, Scr) {
    var bundleID = "Settings"; // Identifier for the bundle

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

    var CurrentBundleName = "Bundle$Settings";
    var data = {
        Screens: ["OpenBundle.Settings", "OpenBundle.SettingsAbout", "OpenBundle.Wallpaper"],
        OpenBundle$Settings: [
            "OpenBundle.Settings." + instanceIDd + ".Bar.1",
            "OpenBundle.Settings." + instanceIDd + ".Window",
            "OpenBundle.Settings." + instanceIDd + ".WindowHeader",
            "OpenBundle.Settings." + instanceIDd + ".Button.1",
            "OpenBundle.Settings." + instanceIDd + ".Button.2",
            "OpenBundle.Settings." + instanceIDd + ".Button.3",
        ],
        OpenBundle$SettingsAbout: [
            "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1",
            "OpenBundle.SettingsAbout." + instanceIDd + ".Window",
            "OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader",
            "OpenBundle.SettingsAbout." + instanceIDd + ".Text.1",
        ],
        OpenBundle$Wallpapers: [
            "OpenBundle.Wallpaper." + instanceIDd + ".Bar.1",
            "OpenBundle.Wallpaper." + instanceIDd + ".Window",
            "OpenBundle.Wallpaper." + instanceIDd + ".WindowHeader",
            "OpenBundle.Wallpaper." + instanceIDd + ".Button.1",
            "OpenBundle.Wallpaper." + instanceIDd + ".Button.2",
            "OpenBundle.Wallpaper." + instanceIDd + ".Button.3",
            "OpenBundle.Wallpaper." + instanceIDd + ".Button.4",
            "OpenBundle.Wallpaper." + instanceIDd + ".Button.5",
            "OpenBundle.Wallpaper." + instanceIDd + ".Button.6",
        ],
    };

    OpenBundles.RegisterAppBundle("Settings", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr === "Settings") {
            // Define initial positions relative to the window
            var windowX = 100;
            var windowY = 35;
            var headerY = windowY;
            var barX = windowX;
            var barY = windowY;
            var buttonX = windowX + 5; // Adjust as needed
            var buttonY = windowY + 30;

            // Create elements
            BEMA.Element("TextArea", "OpenBundle.Settings." + instanceIDd + ".Window", windowX, windowY, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Settings." + instanceIDd + ".WindowHeader", windowX, headerY, 300, 25, false, 10, 0, "", Surface0, Text, "Settings", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Settings." + instanceIDd + ".Button.1", buttonX, buttonY, 80, 25, false, 10, 0, "", Surface0, Text, "Wallpapers", "left", 11, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Settings." + instanceIDd + ".Button.2", buttonX + 85, buttonY, 80, 25, false, 10, 0, "", Surface0, Text, "About", "left", 11, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Settings." + instanceIDd + ".Button.3", buttonX + 170, buttonY, 80, 25, false, 10, 0, "", Surface0, Surface0, "Edit Mode", "left", 9, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Settings." + instanceIDd + ".Bar.1", barX, barY, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            onEvent("OpenBundle.Settings." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$Settings");
            });
            onEvent("OpenBundle.Settings." + instanceIDd + ".Button.1", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$Settings");
                Bundle$Settings("", "Wallpapers");
            });
            onEvent("OpenBundle.Settings." + instanceIDd + ".Button.2", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$Settings");
                Bundle$Settings("", "About");
            });
            if (lockIcons) {
                setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#f38ba8");
            } else {
                setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#a6e3a1");
            }
            onEvent("OpenBundle.Settings." + instanceIDd + ".Button.3", "click", function() {
                if (!lockIcons) {
                    setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#f38ba8");
                    lockIcons = true;
                } else {
                    setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#a6e3a1");
                    lockIcons = false;
                }
            });

            var beingDragged = false;
            var offsetX = 0;
            var offsetY = 0;

            // Function to handle dragging
            function handleDrag(event) {
                if (beingDragged) {
                    var windowElem = "OpenBundle.Settings." + instanceIDd + ".Window";
                    var newX = event.x - offsetX;
                    var newY = event.y - offsetY;

                    // Update positions of all elements relative to the new window position
                    setPosition(windowElem, newX, newY, 300, 200);
                    setPosition("OpenBundle.Settings." + instanceIDd + ".WindowHeader", newX, newY, 300, 25);
                    setPosition("OpenBundle.Settings." + instanceIDd + ".Bar.1", newX, newY, 25, 25);
                    setPosition("OpenBundle.Settings." + instanceIDd + ".Button.1", newX + 5, newY + 30);
                    setPosition("OpenBundle.Settings." + instanceIDd + ".Button.2", newX + 90, newY + 30);
                    setPosition("OpenBundle.Settings." + instanceIDd + ".Button.3", newX + 175, newY + 30);
                }
            }

            // Mouse down event: Start dragging
            onEvent("OpenBundle.Settings." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                beingDragged = true;
                var windowElem = "OpenBundle.Settings." + instanceIDd + ".Window";
                offsetX = event.x - getXPosition(windowElem);
                offsetY = event.y - getYPosition(windowElem);

                // Add a mouse move event listener to handle dragging
                onEvent("Celeste.Main", "mousemove", handleDrag); // Attach to document for continuous dragging
            });

            // Mouse up event: Stop dragging
            onEvent("Celeste.Main", "mouseup", function(event) {
                beingDragged = false;
            });
        }
        if (Scr === "About") {
            // Define initial positions relative to the window
            var windowX = 100;
            var windowY = 35;
            var headerY = windowY;
            var barX = windowX;
            var barY = windowY;
            var textX = windowX; // Adjust as needed
            var textY = windowY + 25;

            // Create elements
            BEMA.Element("TextArea", "OpenBundle.SettingsAbout." + instanceIDd + ".Window", windowX, windowY, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader", windowX, headerY, 300, 25, false, 10, 0, "", Surface0, Text, "Settings - About", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1", barX, barY, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);
            BEMA.Element("TextArea", "OpenBundle.SettingsAbout." + instanceIDd + ".Text.1", textX, textY, 300, 175, false, 10, 0, "rgb(0,0,0,0)", Base, Text, "", "left", 10, "Tahoma", true, "icon://fa-times", Text);
            setText("OpenBundle.SettingsAbout." + instanceIDd + ".Text.1", "Celeste version "+Version+"\nSFS version "+SFS.SFSVersion()+"");

            onEvent("OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$SettingsAbout");
            });

            var beingDragged = false;
            var offsetX = 0;
            var offsetY = 0;

            // Function to handle dragging
            function handleDraggg(event) {
                if (beingDragged) {
                    var windowElem = "OpenBundle.SettingsAbout." + instanceIDd + ".Window";
                    var newX = event.x - offsetX;
                    var newY = event.y - offsetY;

                    // Update positions of all elements relative to the new window position
                    setPosition(windowElem, newX, newY, 300, 200);
                    setPosition("OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader", newX, newY, 300, 25);
                    setPosition("OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1", newX, newY, 25, 25);
                    setPosition("OpenBundle.SettingsAbout." + instanceIDd + ".Text.1", newX, newY + 25, 300, 175);
                }
            }

            // Mouse down event: Start dragging
            onEvent("OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                beingDragged = true;
                var windowElem = "OpenBundle.SettingsAbout." + instanceIDd + ".Window";
                offsetX = event.x - getXPosition(windowElem);
                offsetY = event.y - getYPosition(windowElem);

                // Add a mouse move event listener to handle dragging
                onEvent("Celeste.Main", "mousemove", handleDraggg); // Attach to document for continuous dragging
            });

            // Mouse up event: Stop dragging
            onEvent("Celeste.Main", "mouseup", function(event) {
                beingDragged = false;
            });
        }
        if (Scr === "Wallpapers") {
            // Define initial positions relative to the window
            var windowX = 100;
            var windowY = 35;
            var headerY = windowY;
            var barX = windowX;
            var barY = windowY;
            var buttonWidth = 85;
            var buttonHeight = 47;
            var buttonSpacing = 5; // Space between buttons
            var numColumns = 3; // Number of columns
            var numRows = 2; // Number of rows

            // Adjusted window dimensions
            var windowWidth = 290; // 300 - 10
            var windowHeight = 150; // 200 - 20

            // Create elements
            BEMA.Element("TextArea", "OpenBundle.Wallpaper." + instanceIDd + ".Window", windowX, windowY, windowWidth, windowHeight, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Wallpaper." + instanceIDd + ".WindowHeader", windowX, headerY, windowWidth, 25, false, 10, 0, "", Surface0, Text, "Wallpapers", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Wallpaper." + instanceIDd + ".Bar.1", barX, barY, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            for (var i = 0; i < numColumns * numRows; i++) {
                var col = i % numColumns;
                var row = Math.floor(i / numColumns);

                var btnX = windowX + (buttonWidth + buttonSpacing) * col + 12.5; // Shifted right by 10px
                var btnY = windowY + 30 + (buttonHeight + buttonSpacing) * row + 10;

                BEMA.Element("Image", "OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1), btnX, btnY, buttonWidth, buttonHeight, false, 10, 0, "", Surface0, Text, "", "left", 11, "Tahoma", true, "", "");
                setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1), "fit", "fill");
            }

            // Re-add images to the buttons
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "image", "10-13-5120x2880.png");
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.2", "image", "10-7-6k-6016x3760.png");
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.3", "image", "https://512pixels.net/downloads/macos-wallpapers-6k/10-8-6k.jpg");
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.4", "image", "https://512pixels.net/downloads/macos-wallpapers-6k/10-12-6k.jpg");

            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "click", function() {
                Celeste.setWallpaper(getProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "image"));
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.2", "click", function() {
                Celeste.setWallpaper(getProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.2", "image"));
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.3", "click", function() {
                Celeste.setWallpaper(getProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.3", "image"));
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.4", "click", function() {
                Celeste.setWallpaper(getProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.4", "image"));
            });

            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$Wallpapers");
            });

            // Draggable functionality for Wallpapers window
            var beingDragged = false;
            var offsetX = 0;
            var offsetY = 0;

            function handleDragg(event) {
                if (beingDragged) {
                    var windowElem = "OpenBundle.Wallpaper." + instanceIDd + ".Window";
                    var newX = event.x - offsetX;
                    var newY = event.y - offsetY;

                    // Update positions of all elements relative to the new window position
                    setPosition(windowElem, newX, newY, windowWidth, windowHeight);
                    setPosition("OpenBundle.Wallpaper." + instanceIDd + ".WindowHeader", newX, newY, windowWidth, 25);
                    setPosition("OpenBundle.Wallpaper." + instanceIDd + ".Bar.1", newX, newY, 25, 25);

                    // Update positions of the buttons
                    for (var i = 0; i < numColumns * numRows; i++) {
                        var btnElem = "OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1);
                        var col = i % numColumns;
                        var row = Math.floor(i / numColumns);

                        var btnX = newX + (buttonWidth + buttonSpacing) * col + 12.5; // Shifted right by 10px
                        var btnY = newY + 30 + (buttonHeight + buttonSpacing) * row + 10;

                        setPosition(btnElem, btnX, btnY, buttonWidth, buttonHeight);
                    }
                }
            }

            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                beingDragged = true;
                var windowElem = "OpenBundle.Wallpaper." + instanceIDd + ".Window";
                offsetX = event.x - getXPosition(windowElem);
                offsetY = event.y - getYPosition(windowElem);

                onEvent("Celeste.Main", "mousemove", handleDragg); // Attach to document for continuous dragging
            });

            onEvent("Celeste.Main", "mouseup", function(event) {
                beingDragged = false;
            });
        }
    } else if (Data == "HideAll") {
        eval("for (var i = 0; i < data."+Scr+".length; i++) {deleteElement(data."+Scr+"[i]);OpenBundles.showIcons();}");
          
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        SFS.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}