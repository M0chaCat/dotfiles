//Bundle$Tips
function Bundle$Tips(Data, Scr) {
    var bundleID = "Tips"; // Identifier for the bundle

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

    var CurrentBundleName = "Bundle$Tips";
    var data = {
        Screens: ["OpenBundle.Tips"],
        OpenBundle$Tips: [
            "OpenBundle.Tips." + instanceIDd + ".Bar.1",
            "OpenBundle.Tips." + instanceIDd + ".Window",
            "OpenBundle.Tips." + instanceIDd + ".WindowHeader",
            "OpenBundle.Tips." + instanceIDd + ".Text.1",
        ],
    };

    OpenBundles.RegisterAppBundle("Tips", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Tips") {
            BEMA.Element("TextArea", "OpenBundle.Tips." + instanceIDd + ".Window", 100, 35, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Tips." + instanceIDd + ".WindowHeader", 100, 35, 300, 25, false, 10, 0, "", Surface0, Text, "Tips", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Tips." + instanceIDd + ".Text.1", 100, 65, 300, 200, false, 10, 0, "", Base, Text, tipsAppText, "left", 11, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Tips." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            onEvent("OpenBundle.Tips." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Tips("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.Tips." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.Tips." + instanceIDd + ".Window", [
                    "OpenBundle.Tips." + instanceIDd + ".WindowHeader",
                    "OpenBundle.Tips." + instanceIDd + ".Bar.1",
                    "OpenBundle.Tips." + instanceIDd + ".Text.1"
                ]);
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Tips.length; i++) {
            deleteElement(data.OpenBundle$Tips[i]);
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
