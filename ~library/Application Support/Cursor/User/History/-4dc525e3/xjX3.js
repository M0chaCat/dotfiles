//Bundle$Jukebox
function Bundle$Jukebox(Data, Scr) {
    var songs = [
        { id: "Cwitsh---OneShot--Aftermath---Demo-Soundtrack---02-Dreams-from-a-Feather.mp3", name: "Dreams from a Feather" },
        { id: "song2.mp3", name: "Song 2" },
        { id: "song3.mp3", name: "Song 3" },
        { id: "song4.mp3", name: "Song 4" },
        { id: "song5.mp3", name: "Song 5" },
        { id: "song6.mp3", name: "Song 6" }
    ];
    var bundleID = "Jukebox"; // Identifier for the bundle

    // Check if the bundle is already running and handle requests accordingly
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

    var CurrentBundleName = "Bundle$Jukebox";
    var data = {
        Screens: ["OpenBundle.Jukebox"],
        OpenBundle$Jukebox: [
            "OpenBundle.Jukebox." + instanceIDd + ".Bar.1",
            "OpenBundle.Jukebox." + instanceIDd + ".Bar.2",
            "OpenBundle.Jukebox." + instanceIDd + ".Window",
            "OpenBundle.Jukebox." + instanceIDd + ".WindowHeader",
            "OpenBundle.Jukebox." + instanceIDd + ".Text.1",
            "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.1",
            "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.2",
            "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.3",
            "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.4",
            "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.5",
            "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.6"
        ],
    };

    OpenBundles.RegisterAppBundle("Jukebox", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Jukebox") {
            BEMA.Element("TextArea", "OpenBundle.Jukebox." + instanceIDd + ".Window", 100, 35, 410, 160, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", ""); // Reduced width by 15px
            BEMA.Element("TextArea", "OpenBundle.Jukebox." + instanceIDd + ".WindowHeader", 100, 35, 410, 25, false, 10, 0, "", Surface0, Text, "Jukebox", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Jukebox." + instanceIDd + ".Text.1", 100, 65, 410, 50, false, 10, 0, "", Base, Text, currentSong, "center", 20, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Jukebox." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);
            BEMA.Element("Button", "OpenBundle.Jukebox." + instanceIDd + ".Bar.2", 130, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-pause", Text);
            var numColumns = 3;
            var numRows = 2;
            var buttonWidth = 120;
            var buttonHeight = 25;
            var buttonSpacing = 10;

            for (var i = 0; i < numColumns * numRows; i++) {
                var col = i % numColumns;
                var row = Math.floor(i / numColumns);

                var btnX = 115 + (buttonWidth + buttonSpacing) * col; // Aligned to the left and shifted 15px to the right
                var btnY = 120 + (buttonHeight + buttonSpacing) * row;

                var buttonID = "OpenBundle.Jukebox." + instanceIDd + ".Button.Play." + (i + 1);
                BEMA.Element("Button", buttonID, btnX, btnY, buttonWidth, buttonHeight, false, 10, 0, "", Surface0, Text, songs[i].name, "center", 9, "Tahoma", true, "", ""); // Reduced font size

                (function(song) {
                    onEvent(buttonID, "click", function() {
                        currentSong = "Playing " + song.name + "...";
                        setText("OpenBundle.Jukebox." + instanceIDd + ".Text.1", currentSong);
                        playSound(song.id, false);
                    });
                })(songs[i]);

                if (i > 0) {
                    hideElement(buttonID);
                }
            }
            onEvent("OpenBundle.Jukebox." + instanceIDd + ".Bar.2", "click", function() {
                stopSound();
            });
            onEvent("OpenBundle.Jukebox." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Jukebox("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.Jukebox." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.Jukebox." + instanceIDd + ".Window", [
                    "OpenBundle.Jukebox." + instanceIDd + ".WindowHeader",
                    "OpenBundle.Jukebox." + instanceIDd + ".Bar.1",
                    "OpenBundle.Jukebox." + instanceIDd + ".Bar.2",
                    "OpenBundle.Jukebox." + instanceIDd + ".Text.1",
                    "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.1",
                    "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.2",
                    "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.3",
                    "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.4",
                    "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.5",
                    "OpenBundle.Jukebox." + instanceIDd + ".Button.Play.6"
                ]);
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Jukebox.length; i++) {
            deleteElement(data.OpenBundle$Jukebox[i]);
            OpenBundles.showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        stopSound();
    } else {
        MWK.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
