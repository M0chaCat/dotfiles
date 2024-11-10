

//Bundle$Solstis
function Bundle$Solstis(Data, Scr) {
    var bundleID = "Solstis"; // Identifier for the bundle

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

    var CurrentBundleName = "Bundle$Solstis";
    var data = {
        Screens: ["OpenBundle.Solstis"],
        OpenBundle$Solstis: [
            "OpenBundle.Solstis." + instanceIDd + ".Bar.1",
            "OpenBundle.Solstis." + instanceIDd + ".Window",
            "OpenBundle.Solstis." + instanceIDd + ".WindowHeader",
            "OpenBundle.Solstis." + instanceIDd + ".Content"
        ],
    };

    OpenBundles.RegisterAppBundle("Solstis", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr === "Solstis") {
            // Define initial positions relative to the window
            var windowX = 100;
            var windowY = 50;
            var windowWidth = 288 * 0.9;
            var windowHeight = 405 * 0.9;

            // Create elements
            BEMA.Element("TextArea", "OpenBundle.Solstis." + instanceIDd + ".Window", windowX, windowY, windowWidth, windowHeight, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Solstis." + instanceIDd + ".WindowHeader", windowX, windowY, windowWidth, 25, false, 10, 0, "", Surface0, Text, "Solstis", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Solstis." + instanceIDd + ".Bar.1", windowX, windowY, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "center", 12, "Tahoma", true, "icon://fa-times", Text);
            
            // Add a blank image as content instead of the text area
            BEMA.Element("Image", "OpenBundle.Solstis." + instanceIDd + ".Content", windowX, windowY + 25, windowWidth, windowHeight - 25, false, 10, 0, "", Base, Text, "", "center", 14, "Tahoma", true, "macOS-Big-Sur-Vector-Wave-Dark-Wallpaper-iDownloadBlog.jpg", "");

            setProperty("OpenBundle.Solstis." + instanceIDd + ".Content", "fit", "fill");
            // Close Button Event
            onEvent("OpenBundle.Solstis." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Solstis("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.Solstis." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.Solstis." + instanceIDd + ".Window", [
                    "OpenBundle.Solstis." + instanceIDd + ".WindowHeader",
                    "OpenBundle.Solstis." + instanceIDd + ".Bar.1",
                    "OpenBundle.Solstis." + instanceIDd + ".Content"
                ]);
            });
        }
        
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Solstis.length; i++) {
            deleteElement(data.OpenBundle$Solstis[i]);
        }
        OpenBundles.showIcons();
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion if necessary
    } else {
        MWK.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
