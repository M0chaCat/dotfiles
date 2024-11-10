//Bundle$TextEdit
var currentDoc = "Type your document here!";
function Bundle$TextEdit(Data, Scr) {
    var bundleID = "TextEdit"; // Identifier for the bundle

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

    var CurrentBundleName = "Bundle$TextEdit";
    var data = {
        Screens: ["OpenBundle.TextEdit"],
        OpenBundle$TextEdit: [
            "OpenBundle.TextEdit." + instanceIDd + ".Bar.1",
            "OpenBundle.TextEdit." + instanceIDd + ".Window",
            "OpenBundle.TextEdit." + instanceIDd + ".WindowHeader",
            "OpenBundle.TextEdit." + instanceIDd + ".Text.1",
        ],
    };

    OpenBundles.RegisterAppBundle("TextEdit", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "TextEdit") {
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Window", 100, 35, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", 100, 35, 300, 25, false, 10, 0, "", Surface0, Text, "Text Edit", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Text.1", 100, 65, 300, 200, false, 10, 0, "", Base, Text, currentDoc, "left", 11, "Tahoma", false, "", "");
            BEMA.Element("Button", "OpenBundle.TextEdit." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            onEvent("OpenBundle.TextEdit." + instanceIDd + ".Bar.1", "click", function() {
                currentDoc = getText("OpenBundle.TextEdit." + instanceIDd + ".Text.1");
                Bundle$TextEdit("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.TextEdit." + instanceIDd + ".Window", [
                    "OpenBundle.TextEdit." + instanceIDd + ".WindowHeader",
                    "OpenBundle.TextEdit." + instanceIDd + ".Bar.1",
                    "OpenBundle.TextEdit." + instanceIDd + ".Text.1"
                ]);
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$TextEdit.length; i++) {
            deleteElement(data.OpenBundle$TextEdit[i]);
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

