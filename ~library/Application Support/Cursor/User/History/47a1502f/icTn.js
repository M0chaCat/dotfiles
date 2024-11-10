//eUDLW48adTppJ-0o8buW_Red3eZ88VxvgI8wGCry7Xo
var IDstarter = "Solstice";
var HomescreenWindow = ".Homescreen.Window";
var BarIconID = ".Homescreen.icon.";

//Configure OpenBundles, all are REQUIRED
//IDstarter is like "Solstice"
//HomescreenWindow is like ".Homescreen.Window"
//BarIconID is like ".Homescreen.icon."
export function openBundles$Config(IDstarterr, HomescreenWindoww, BarIconIDd) {
 IDstarter = IDstarterr;
 HomescreenWindow = HomescreenWindoww;
 BarIconID = BarIconIDd;
}

//Returns IDstarter
export function openBundles$getIDstarter() {
 return IDstarter;
}

// Open an App
export function openBundles$openApp(appName) {
    console.log("Opening app:", appName);
    for (var i = 0; i < apps.length; i++) {
        var app = apps[i];
        if (app.name === appName) {
            if (app.isbundle === true) {
                // Check if mainscreen contains a specific keyword
                if (app.mainscreen.indexOf("Bundle$") !== -1) {
                    // Perform evaluation if "Bundle$" is found in mainscreen
                    eval(app.mainscreen);
                } else {
                    console.log("The mainscreen does not contain the expected keyword.");
                }
            } else {
                // Navigate to the mainscreen if isbundle is false
                setScreen(app.mainscreen);
            }
            return; // Exit the function once the app is found and processed
        }
    }
    console.log("App with name " + appName + " not found.");
}

//Install a Shortcut
export function openBundles$InstallShortcut(appname, iconn) {
  var icon;
  icon = iconn;
if (BarIcons.indexOf("") !== -1) {
  BarIcons[BarIcons.indexOf("")] = appname;
  setProperty(IDstarter + BarIconID + (BarIcons.indexOf("") + 0), "image", icon);
  showElement(IDstarter + BarIconID + (BarIcons.indexOf("") + 0));
  return BarIcons.indexOf(appname);
}
  SFS.WriteError("Storage Full!", "OpenBundles");
  return false;
}

//Uninstall a Shortcut
export function openBundles$UninstallShortcut(appname) {
  for (var i = 0; i < BarIcons.length; i++) {
    if (BarIcons[i] === appname) {
      BarIcons[i] = "";
      setProperty(IDstarter + BarIconID + (i + 1), "image", "icon://fa-question");
      hideElement(IDstarter + BarIconID + (i + 1));
      return;
    }
  }
  SFS.WriteError("Can't find BarIcon", "OpenBundles");
}

// Function to return all AppBundleIDs
export function openBundles$displayLinks() {
    for (var key in Apps) {
        if (Apps.hasOwnProperty(key)) {
            console.log(key + " : " + Apps[key]);
        }
    }
}

// Function to register a AppBundle
export function openBundles$RegisterAppBundle(BundleID, Screens) {
  Apps[BundleID] = Screens;
}

// Hide all icons, use when opening an app bundle
export function openBundles$hideIcons() {
  showElement(IDstarter + HomescreenWindow);
}

// Show all icons, use when closing an app bundle
export function openBundles$showIcons() {
hideElement(IDstarter + HomescreenWindow);
}

var apps = [];
// Function to add an app to the end of the list
export function openBundles$addApp(name, version, author, mainscreen, icon, isbundle, showinappstore) {
    apps.push({
        name: name,
        version: version,
        author: author,
        mainscreen: mainscreen,
        icon: icon,
        isbundle: isbundle,
        showinappstore: showinappstore,
    });
}

// Function to return apps
export function openBundles$getApps() {
    return apps;
}

var activeBundles = {};





document.addEventListener("DOMContentLoaded", function() {
const { setPosition, getXPosition, getYPosition, BEMA, checkSha256, setupEventListeners, onEvent, setText, getText, deleteElement, generateRandomString, timedLoop, showElement, hideElement, getTime, getDate, setProperty } = api.commands;
    




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
            instanceIDd: generateRandomString(10), // Generate unique ID
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
            "OpenBundle.Calculator." + instanceIDd + ".Button.C",
        ],
    };

    openBundles$RegisterAppBundle("Calculator", data.Screens);
    openBundles$hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Calculator") {
            var windowWidth = 4 * 45 + 15 + 70; // 4 buttons per row, each 45px wide, plus 15px padding, plus 70px extra width

            BEMA("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Window", 100, 35, windowWidth, 260, false, 10, 0, "", Base, Text, "", "left", 16, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.Calculator." + instanceIDd + ".WindowHeader", 100, 35, windowWidth, 25, false, 10, 0, "", Surface0, Text, "Calculator", "center", 12, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Display", 100, 60, windowWidth, 50, false, 10, 0, "", Base, Text, "0", "right", 20, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            // Add buttons for digits and operations
            var buttons = [
                { label: "7", x: 110, y: 90 }, { label: "8", x: 160, y: 90 }, { label: "9", x: 210, y: 90 }, { label: "/", x: 260, y: 90 },
                { label: "4", x: 110, y: 140 }, { label: "5", x: 160, y: 140 }, { label: "6", x: 210, y: 140 }, { label: "*", x: 260, y: 140 },
                { label: "1", x: 110, y: 190 }, { label: "2", x: 160, y: 190 }, { label: "3", x: 210, y: 190 }, { label: "-", x: 260, y: 190 },
                { label: "0", x: 110, y: 240 }, { label: ".", x: 160, y: 240 }, { label: "=", x: 210, y: 240 }, { label: "+", x: 260, y: 240 },
                { label: "C", x: 310, y: 240 } // Add clear button
            ];

            buttons.forEach(function(button) {
                BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, button.x, button.y, 45, 45, false, 10, 0, "", Surface1, Text, button.label, "center", 16, "Tahoma", true, "", "");
                onEvent("OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, "click", function() {
                    handleCalculatorInput(button.label);
                });
            });

            onEvent("OpenBundle.Calculator." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Calculator("HideAll");
            });

        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Calculator.length; i++) {
            deleteElement(data.OpenBundle$Calculator[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        MWK.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }

    function handleCalculatorInput(input) {
        var displayElement = "OpenBundle.Calculator." + instanceIDd + ".Display";
        var currentDisplay = getText(displayElement);
        
        if (input === "=") {
            try {
                var result = eval(currentDisplay);
                setText(displayElement, result.toString().substring(0, 50)); // Limit result to 50 chars
            } catch (e) {
                setText(displayElement, "Error");
            }
        } else if (input === "C") {
            setText(displayElement, "0");
        } else {
            if (currentDisplay === "0" || currentDisplay === "Error") {
                setText(displayElement, input);
            } else {
                // Check if adding the new input would exceed 15 characters
                if (currentDisplay.length < 15) {
                    setText(displayElement, (currentDisplay + input).substring(0, 15));
                }
                // If it's already at 15 characters, don't add more
            }
        }
    }
  }
});