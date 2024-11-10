//Bundle$TextEdit
var documents = {}; // Store multiple documents
function Bundle$TextEdit(Data, Scr, docID) {
    // Parse documents only if it's a string
    if (typeof documents === 'string') {
        documents = JSON.parse(documents);
    }
    if (Username) {
        documents = accData.documents;
        // Parse accData.documents if it's a string
        if (typeof documents === 'string') {
            documents = JSON.parse(documents);
        }
    }
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

    // New function to handle saving documents
    function saveDocuments(callback) {
        if (Username) {
        readRecords("Accounts", {}, function(records) {
            for (var i = 0; i < records.length; i++) {
                if (records[i].token == acctoken) {
                    updateRecord("Accounts", {
                        id: records[i].id,
                        isBeta: records[i].isBeta,
                        lastloggedintime: SFS.gettime("HH:mm:ss"),
                        lastloggedindate: SFS.getdate("mm:dd:yyyy"),
                        username: records[i].username,
                        isdisabled: records[i].isdisabled,
                        wallpaper: records[i].wallpaper,
                        displayname: records[i].displayname,
                        epassword: records[i].epassword,
                        isadmin: records[i].isadmin,
                        onetimecode: records[i].onetimecode,
                        userid: records[i].userid,
                        documents: JSON.stringify(documents)
                    }, function() {
                        if (callback) callback();
                    });
                    break;
                }
            }
        });
        setTimeout(function() {
            readRecords("Accounts", {}, function(records) {
                for (var i = 0; i < records.length; i++) {
                    if (records[i].token == acctoken) {
                    accData = records[i];
                    break;
                }
                }
            }); 
        }, 25);
    } else {
            if (callback) callback();
        }
    }

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "TextEdit") {
            if (!documents[docID]) {
                documents[docID] = "Type your document here!";
            }
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Window", 100, 35, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", 100, 35, 300, 25, false, 10, 0, "", Surface0, Text, "Text Edit", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Text.1", 100, 65, 300, 200, false, 10, 0, "", Base, Text, documents[docID], "left", 11, "Tahoma", false, "", "");
            BEMA.Element("Button", "OpenBundle.TextEdit." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            onEvent("OpenBundle.TextEdit." + instanceIDd + ".Bar.1", "click", function() {
                // Save changes before hiding
                documents[docID] = getText("OpenBundle.TextEdit." + instanceIDd + ".Text.1");
                saveDocuments(function() {
                    Bundle$TextEdit("HideAll");
                });
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
        }
        OpenBundles.showIcons();
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        SFS.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
