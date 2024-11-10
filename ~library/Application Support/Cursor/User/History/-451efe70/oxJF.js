//Bundle$StickyNote
var currentNote = "Type your note here!";
function Bundle$StickyNote(Data, Scr) {
    var bundleID = "StickyNote"; // Identifier for the bundle

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

    var CurrentBundleName = "Bundle$StickyNote";
    var data = {
        Screens: ["OpenBundle.StickyNote"],
        OpenBundle$StickyNote: [
            "OpenBundle.StickyNote." + instanceIDd + ".Bar.1",
            "OpenBundle.StickyNote." + instanceIDd + ".Window",
            "OpenBundle.StickyNote." + instanceIDd + ".WindowHeader",
            "OpenBundle.StickyNote." + instanceIDd + ".Text.1",
        ],
    };

    OpenBundles.RegisterAppBundle("StickyNote", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "StickyNote") {
            BEMA.Element("TextArea", "OpenBundle.StickyNote." + instanceIDd + ".Window", 100, 100, 200, 200, false, 0, 0, "", Blank, Base, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.StickyNote." + instanceIDd + ".WindowHeader", 100, 100, 200, 15, false, 0, 0, "", "#e8d19e", Base, "", "center", 5, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.StickyNote." + instanceIDd + ".Text.1", 100, 115, 200, 185, false, 0, 0, "", "#f9e2af", Base, currentNote, "left", 11, "Tahoma", false, "", "");
            BEMA.Element("Button", "OpenBundle.StickyNote." + instanceIDd + ".Bar.1", 100, 100, 1, 15, false, 0, 0, "rgb(0,0,0,0)", "#e8d19e", Base, "", "left", 0, "Tahoma", true, "icon://fa-times", Surface0);
            onEvent("OpenBundle.StickyNote." + instanceIDd + ".Bar.1", "click", function() {
                currentNote = getText("OpenBundle.StickyNote." + instanceIDd + ".Text.1");
                Bundle$StickyNote("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.StickyNote." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.StickyNote." + instanceIDd + ".Window", [
                    "OpenBundle.StickyNote." + instanceIDd + ".WindowHeader",
                    "OpenBundle.StickyNote." + instanceIDd + ".Bar.1",
                    "OpenBundle.StickyNote." + instanceIDd + ".Text.1"
                ]);
            });

            var beingDragged = false;
            var offsetX = 0;
            var offsetY = 0;

            // Function to handle dragging
            function handleDrag(event) {
                if (beingDragged) {
                    var newX = event.x - offsetX;
                    var newY = event.y - offsetY;

                    // Update positions of all elements relative to the new window position
                    setPosition("OpenBundle.StickyNote." + instanceIDd + ".Window", newX, newY);
                    setPosition("OpenBundle.StickyNote." + instanceIDd + ".WindowHeader", newX, newY);
                    setPosition("OpenBundle.StickyNote." + instanceIDd + ".Bar.1", newX, newY, 15, 15);
                    setPosition("OpenBundle.StickyNote." + instanceIDd + ".Text.1", newX, newY + 15);
                }
            }

            // Mouse up event: Stop dragging
            onEvent("Celeste.Main", "mouseup", function(event) {
                beingDragged = false;
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$StickyNote.length; i++) {
            deleteElement(data.OpenBundle$StickyNote[i]);
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
}

