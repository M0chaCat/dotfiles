//Bundle$NetStar
function Bundle$NetStar(Data, Scr) {
    var bundleID = "NetStar"; // Identifier for the bundle

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

    var CurrentBundleName = "Bundle$NetStar";
    var data = {
        Screens: ["OpenBundle.NetStar"],
        OpenBundle$NetStar: [
            "OpenBundle.NetStar." + instanceIDd + ".Bar.1",
            "OpenBundle.NetStar." + instanceIDd + ".Window",
            "OpenBundle.NetStar." + instanceIDd + ".WindowHeader",
            "OpenBundle.NetStar." + instanceIDd + ".Text.1",
        ],
    };

    OpenBundles.RegisterAppBundle("NetStar", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "NetStar") {
            BEMA.Element("TextArea", "OpenBundle.NetStar." + instanceIDd + ".Window", 100, 35, 390, 260, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.NetStar." + instanceIDd + ".WindowHeader", 100, 35, 390, 25, false, 10, 0, "", Surface0, Text, "NetStar", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.NetStar." + instanceIDd + ".Text.1", 100, 65, 390, 260, false, 10, 0, "", Base, Text, "ok so like NetStar has not *actually* started dev, mainly cuz its a large project with dynamic locations, WebBundles, and more so like its hard n stuff uhhh yea, just wait till 1.0 or 2.0 or smth", "left", 11, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.NetStar." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            onEvent("OpenBundle.NetStar." + instanceIDd + ".Bar.1", "click", function() {
                    Bundle$NetStar("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.NetStar." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.NetStar." + instanceIDd + ".Window", [
                    "OpenBundle.NetStar." + instanceIDd + ".WindowHeader",
                    "OpenBundle.NetStar." + instanceIDd + ".Bar.1",
                    "OpenBundle.NetStar." + instanceIDd + ".Text.1"
                ]);
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$NetStar.length; i++) {
            deleteElement(data.OpenBundle$NetStar[i]);
            OpenBundles.showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        MWK.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
