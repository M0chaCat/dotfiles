
var Mantle = "#181825";
var Base = "#1e1e2e";
var Text = "#cdd6f4";
var Blank = "rgba(0,0,0,0)";
var Surface0 = "#313244";
var Surface1 = "#45475a";
var Surface2 = "#585b70";
//extras
var bg = "#008080";

var iconCount = 16;




//Next.Main
BEMA("Image", "Next.Main.Image.2", -4.5, -4.5, 820, 607.5, true, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "10-13 5120x2880.png", Text);
setProperty("Next.Main.Image.2", "fit", "fill");
BEMA("TextArea", "Next.Main.Bar", 0, 0, 820, 32, true, 0, 0, "", Mantle, Text, "", "center", 18, "Tahoma", true, "", Text);
BEMA("Button", "Next.Main.Bar.0", 1, 1, 100, 30, true, 0, 2.3, Surface1, Surface0, Text, "Start", "right", 15, "Tahoma", true, "", Text);
BEMA("Image", "Next.Main.Bar.0.img", 3.3, 1, 27.7, 27.7, true, 0, 2.3, Blank, Blank, Blank, "", "right", 0, "Tahoma", true, "normal.PNG", Text);
for (let i = 0; i < iconCount; i++) {
    const iconId = `Next.Main.Bar.${i + 1}`;
    BEMA("Button", iconId, 119 + (i * 35), 1, 30, 30, true, 0, 2.3, Surface1, Surface0, Text, "", "right", 0, "Tahoma", true, "normal.PNG", Text);
}
BEMA("TextArea", "Next.Main.Bar.Time", 680, 1, 130, 30, true, 0, 2.3, Surface1, Surface0, Text, "$TIME$", "center", 15, "Tahoma", true, "", Text);


//Next.Login
BEMA("Image", "Next.Login.Image.2", -4.5, -4.5, 820, 607.5, true, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "10-13 5120x2880.png", Text);
setProperty("Next.Login.Image.2", "fit", "fill");

BEMA("TextArea", "Next.Login.Window", 326.25, 150, 150, 150, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA("Button", "Next.Login.Image.1", 348.75, 157.5, 112.5, 112.5, true, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "normal.PNG", Text);
setProperty("Next.Login.Image.1", "fit", "fill");

BEMA("Button", "Next.Login.Button.2", 310, 315, 180, 45, true, 5, 0, "", Base, Text, "Login As Guest", "center", 18, "Tahoma", true, "", Text);


//Next.Boot
BEMA("Image", "Next.Boot.Window", -4.5, -4.5, 825, 607.5, true, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
setProperty("Next.Boot.Window", "zIndex", 10); 

BEMA("Button", "Next.Boot.Image.1", 348.75, 202.5, 112.5, 112.5, true, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "normal.PNG", Text);
BEMA("Button", "Next.Boot.Text.1", 247.5, 202.5, 300, 300, true, 5, 0, "", Blank, Text, "Welcome to NextOS", "center", 23, "Tahoma", true, "", Text);
BEMA("Button", "Next.Boot.Image.2", 180, 75, 450, 450, true, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "loading.gif", Text);


function setScreen(scr) {
    hideScreens();

    if (scr === "boot") {
        showElement("Next.Boot.Window");
        showElement("Next.Boot.Image.1");
        showElement("Next.Boot.Text.1");
        showElement("Next.Boot.Image.2");
        return;
    }

    if (scr === "main"){
        showElement("Next.Main.Image.2");
        showElement("Next.Main.Bar");
        showElement("Next.Main.Bar.0");
        showElement("Next.Main.Bar.Time");
        showElement("Next.Main.Bar.0.img");
        return;
    }

    if (scr === "login"){
        showElement("Next.Login.Image.2");
        showElement("Next.Login.Window");
        showElement("Next.Login.Image.1");
        showElement("Next.Login.Button.2");
        return;
    }
}

function hideScreens() {

    //boot
    hideElement("Next.Boot.Window");
    hideElement("Next.Boot.Image.1");
    hideElement("Next.Boot.Text.1");
    hideElement("Next.Boot.Image.2");

    //main screen
    hideElement("Next.Main.Image.2");
    hideElement("Next.Main.Bar");
    hideElement("Next.Main.Bar.0");
    hideElement("Next.Main.Bar.Time");
    hideElement("Next.Main.Bar.0.img");
    for (let i = 1; i <= iconCount+1; i++) {
        hideElement(`Next.Main.Bar.${i}`);
    }

    //login
    hideElement("Next.Login.Image.2");
    hideElement("Next.Login.Window");
    hideElement("Next.Login.Image.1");
    hideElement("Next.Login.Button.2");
    return;
}






//Code
openBundles$Config("NextOS", ".Main.Image.1", ".Main.Bar.");
var Version = "1.0";
var tipsAppText = 'Welcome to the NextOS';
var Apps = {}; //list of apps and app data
var icons = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var BarIcons = [];
var debug = false; //its recomended not to change this
var Internal = false; //its recomended not to change this
var secure = true; //its recomended not to change this
var safemode = false; //its recomended not to change this
var currentWallpaper = "";
var currentSong = "No song playing";
var currentSongURL = "";

openBundles$addApp("Settings", 1, "Arcane", "Bundle$Settings(null, \"Settings\");", "icon://fa-cogs", true, true);
openBundles$addApp("TextFile1", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"text1.mfsf\");", "file.png", true, true);
openBundles$addApp("TextFile2", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"text2.mfsf\");", "file.png", true, true);
openBundles$addApp("TextFile3", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"text3.mfsf\");", "file.png", true, true);
openBundles$addApp("StickyNote", 1, "Arcane", "Bundle$StickyNote(null, \"StickyNote\");", "notes.png", true, true);
openBundles$addApp("Tips", 1, "Arcane", "Bundle$Tips(null, \"Tips\");", "tips.png", true, true);
openBundles$addApp("NetStar", 1, "Arcane", "Bundle$NetStar(null, \"NetStar\");", "cloud.png", true, true);
openBundles$addApp("Calculator", 1, "Arcane", "Bundle$Calculator(null, \"Calculator\");", "calc.png", true, true);
openBundles$addApp("Jukebox", 1, "Arcane", "Bundle$Jukebox(null, \"Jukebox\");", "music.png", true, true);
openBundles$addApp("Terminal", 1, "Arcane", "Bundle$Terminal(null, \"Terminal\");", "term.png", true, true);
Apps.Settings = {mainscreen: "Bundle$Settings(null, \"Settings\");"};
Apps.TextFile1 = {mainscreen: "Bundle$TextEdit(null, \"TextEdit\", \"text1.mfsf\");"};
Apps.TextFile2 = {mainscreen: "Bundle$TextEdit(null, \"TextEdit\", \"text2.mfsf\");"};
Apps.TextFile3 = {mainscreen: "Bundle$TextEdit(null, \"TextEdit\", \"text3.mfsf\");"};
Apps.StickyNote = {mainscreen: "Bundle$StickyNote(null, \"StickyNote\");"};
Apps.Tips = {mainscreen: "Bundle$Tips(null, \"Tips\");"};
Apps.Calculator = {mainscreen: "Bundle$Calculator(null, \"Calculator\");"};
Apps.Jukebox = {mainscreen: "Bundle$Jukebox(null, \"Jukebox\");"};
Apps.Terminal = {mainscreen: "Bundle$Terminal(null, \"Terminal\");"};
Apps.NetStar = {mainscreen: "Bundle$NetStar(null, \"NetStar\");"};

setScreen("boot");

setTimeout(() => {
    boot();
}, 1000);

timedLoop(50, () => { // Update every second
    setText("Next.Main.Bar.Time", getTime("hh:mm:ss a"));
  });


  //sets wallpaper (NUH UH)
function Next$setWallpaper(image) {
    currentWallpaper = image;
    setProperty("Next.Main.Image.2", "image", image);
    setProperty("Next.Main.Image.1", "background-color", Blank);
    setProperty("Next.Login.Image.2", "image", image);
}

// Open an App
function openBundles$openApp(appName) {
    //console.log("Opening app:", appName);
    if (Apps[appName]) {
        const app = Apps[appName];
        //console.log(app.mainscreen);
        eval(app.mainscreen);
    } else {
        console.log("App with name " + appName + " not found.");
    }
}

function Next$InstallApp(appname, iconn) {
    var icon;
    icon = iconn;
    if (icons.indexOf("") !== -1) {
        var index = icons.indexOf("");
        icons[index] = appname;
        setProperty("Next.Main.Bar." + (index + 1) + "-img", "image", iconn);
        showElement("Next.Main.Bar." + (index + 1));
        updateIconVisibility(); // Add this line to update visibility after installation
        return true;
    }
    WriteError("Storage Full!", "Homescreenmgr");
    return false;
}

//Uninstall a App
function Next$UninstallApp(appname) {
    for (var i = 0; i < icons.length; i++) {
        if (icons[i] === appname) {
            icons[i] = "";
            setProperty("Next.Main.Bar." + (i + 1), "image", "icon://fa-question");
            hideElement("Next.Main.Bar." + (i + 1));
            updateIconVisibility(); // Add this line to update visibility after uninstallation
         return;
       }
    }
    WriteError("Can't find app", "Homescreenmgr");
}

// Add this new function to update icon visibility
function updateIconVisibility() {
    for (var i = 0; i < icons.length; i++) {
        var iconId = "Next.Main.Bar." + (i + 1);
        if (icons[i] !== "") {
            showElement(iconId);
        } else {
            hideElement(iconId);
        }
    }
}





function boot() {
    setScreen("main");
    Next$InstallApp("Settings", "cogs.png");
    Next$InstallApp("TextFile1", "file.png");
    Next$InstallApp("TextFile2", "file.png");
    Next$InstallApp("TextFile3", "file.png");
    Next$InstallApp("StickyNote", "notes.png");
    Next$InstallApp("Tips", "tips.png");
    Next$InstallApp("Calculator", "calc.png");
    Next$InstallApp("Jukebox", "music.png");
    Next$InstallApp("Terminal", "term.png");
    Next$InstallApp("NetStar", "cloud.png");

    if (!Internal) {
        Next$UninstallApp("NetStar");
    }

    updateIconVisibility();
}

onEvent("Next.Main.Bar.0", "click", (e) => {
    controlKey();
  });


  for (let i = 0; i < iconCount; i++) {
    onEvent(`Next.Main.Bar.${i + 1}`, "click", (e) => {
        const appName = icons[i];
        openBundles$openApp(appName);
        //console.log(appName);
        //console.log(icons);
        //console.log(Apps);
    });
}




/**
 * Makes a specified element a drag detector and moves multiple target elements when dragging occurs.
 *
 * @param {string} draggerId - The ID of the element that detects the drag (i.e., the user interacts with this element).
 * @param {Array<string>} targetIds - An array of IDs of elements that should move together when dragging occurs.
 */
function dragElement(draggerId, targetIds) {
    //console.log(`dragElement called with draggerId: "${draggerId}" and targetIds: [${targetIds.join(", ")}]`);

    // Ensure the dragger element exists
    const dragger = document.getElementById(draggerId);
    if (!dragger) {
        console.error(`dragElement Error: Dragger element with ID "${draggerId}" does not exist.`);
        return;
    }

    // Ensure all target elements exist
    const targets = targetIds.map(id => {
        const el = document.getElementById(id);
        if (!el) {
            console.error(`dragElement Error: Target element with ID "${id}" does not exist.`);
        }
        return el;
    }).filter(el => el !== undefined && el !== null);

    if (targets.length === 0) {
        console.error(`dragElement Error: No valid target elements to drag.`);
        return;
    }

    // Ensure the target elements are positioned absolutely or relatively
    targets.forEach(target => {
        const position = getProperty(target.id, "position");
        if (position !== "absolute" && position !== "relative") {
            setProperty(target.id, "position", "absolute");
        }
    });

    // Drag state variables encapsulated within the function's closure
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let originalPositions = {}; // To store original positions of all target elements
    const dragThreshold = 5; // Minimum movement in pixels to start dragging

    // Flag to prevent click event after dragging
    let preventClick = false;

    // Mouse down event to initiate drag
    onEvent(draggerId, "mousedown", function(event) {
        //console.log(`mousedown on "${draggerId}" at (${event.clientX}, ${event.clientY})`);
        isDragging = false;
        preventClick = false;
        dragStartX = event.clientX;
        dragStartY = event.clientY;

        // Store original positions of all target elements
        originalPositions = {};
        targets.forEach(target => {
            const currentLeft = parseFloat(getProperty(target.id, "left")) || 0;
            const currentTop = parseFloat(getProperty(target.id, "top")) || 0;
            originalPositions[target.id] = { left: currentLeft, top: currentTop };
        });

        // Define mousemove and mouseup handlers within this scope
        const onMouseMove = function(event) {
            const dx = event.clientX - dragStartX;
            const dy = event.clientY - dragStartY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (!isDragging) {
                if (distance > dragThreshold) {
                    isDragging = true;
                    preventClick = true; // Start dragging, prevent click
                    //console.log(`isDragging started via "${draggerId}"`);
                } else {
                    // Movement not enough to start dragging
                    return;
                }
            }

            if (isDragging) {
                // Move all target elements
                targets.forEach(target => {
                    const newLeft = originalPositions[target.id].left + dx;
                    const newTop = originalPositions[target.id].top + dy;
                    
                    // Optional: Boundary checks to keep elements within viewport
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const elementWidth = parseFloat(getProperty(target.id, "width")) || target.offsetWidth;
                    const elementHeight = parseFloat(getProperty(target.id, "height")) || target.offsetHeight;
                    
                    const boundedLeft = Math.max(0, Math.min(newLeft, viewportWidth - elementWidth));
                    const boundedTop = Math.max(0, Math.min(newTop, viewportHeight - elementHeight));
                    
                    setProperty(target.id, "left", `${boundedLeft}px`);
                    setProperty(target.id, "top", `${boundedTop}px`);
                    //console.log(`Dragging "${target.id}" to (left: ${boundedLeft}px, top: ${boundedTop}px)`);
                });
            }
        };

        const onMouseUp = function(event) {
            if (isDragging) {
               // console.log(`mouseup on "${draggerId}", stopping drag`);
            }
            isDragging = false;
            dragStartX = null;
            dragStartY = null;

            // Remove global listeners once drag ends
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        // Attach global listeners
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
}














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

            BEMA("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Window", 100+100, 35+101, windowWidth, 260, false, 0, 0, "", Base, Text, "", "left", 16, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".WindowHeader", 100+100, 35+101, windowWidth, 25, false, 0, 0, "", Surface0, Text, "Calculator", "center", 12, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Display", 100+100, 60+101, windowWidth, 50, false, 0, 0, "", Base, Text, "0", "right", 20, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".Bar.1", 100+100, 35+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);

            // Add buttons for digits and operations
            var buttons = [
                { label: "7", x: 110+100, y: 90+101 }, { label: "8", x: 160+100, y: 90+101 }, { label: "9", x: 210+100, y: 90+101 }, { label: "/", x: 260+100, y: 90+101 },
                { label: "4", x: 110+100, y: 140+101 }, { label: "5", x: 160+100, y: 140+101 }, { label: "6", x: 210+100, y: 140+101 }, { label: "*", x: 260+100, y: 140+101 },
                { label: "1", x: 110+100, y: 190+101 }, { label: "2", x: 160+100, y: 190+101 }, { label: "3", x: 210+100, y: 190+101 }, { label: "-", x: 260+100, y: 190+101 },
                { label: "0", x: 110+100, y: 240+101 }, { label: ".", x: 160+100, y: 240+101 }, { label: "=", x: 210+100, y: 240+101 }, { label: "+", x: 260+100, y: 240+101 },
                { label: "C", x: 310+100, y: 240+101 } // Add clear button
            ];

            buttons.forEach(function(button) {
                BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, button.x, button.y, 45, 45, false, 0, 0, "", Surface1, Text, button.label, "center", 16, "Tahoma", true, "", "");
                onEvent("OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, "click", function() {
                    handleCalculatorInput(button.label);
                });
            });
            dragElement("OpenBundle.Calculator." + instanceIDd + ".WindowHeader", data.OpenBundle$Calculator);
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
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }

    function handleCalculatorInput(input) {
        var displayElement = "OpenBundle.Calculator." + instanceIDd + ".Display";
        var currentDisplay = getText(displayElement);
        
        if (input === "=") {
            try {
                var result = eval(currentDisplay).toFixed(2);
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
//Bundle$Jukebox
function Bundle$Jukebox(Data, Scr) {
    var songs = [
        { id: "Cwitsh - OneShot Aftermath Demo Soundtrack - Dreams from a Feather.mp3", name: "Dreams from a Feather" },
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

    openBundles$RegisterAppBundle("Jukebox", data.Screens);
    openBundles$hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Jukebox") {
            BEMA("TextArea", "OpenBundle.Jukebox." + instanceIDd + ".Window", 100+100, 35+101, 410, 160, false, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", ""); // Reduced width by 15px
            BEMA("Button", "OpenBundle.Jukebox." + instanceIDd + ".WindowHeader", 100+100, 35+101, 410, 25, false, 0, 0, "", Surface0, Text, "Jukebox", "center", 12, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.Jukebox." + instanceIDd + ".Text.1", 100+100, 65+101, 410, 50, false, 0, 0, "", Base, Text, currentSong, "center", 20, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Jukebox." + instanceIDd + ".Bar.1", 100+100, 35+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);
            BEMA("Button", "OpenBundle.Jukebox." + instanceIDd + ".Bar.2", 130+100, 35+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "pause.png", Text);
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
                BEMA("Button", buttonID, btnX+100, btnY+101, buttonWidth, buttonHeight, false, 0, 0, "", Surface0, Text, songs[i].name, "center", 9, "Tahoma", true, "", ""); // Reduced font size

                (function(song) {
                    onEvent(buttonID, "click", function() {
                        stopSound(currentSongURL);
                        currentSong = "Playing " + song.name + "...";
                        currentSongURL = song.id;
                        setText("OpenBundle.Jukebox." + instanceIDd + ".Text.1", currentSong);
                        playSound(currentSongURL, false);
                    });
                })(songs[i]);

                if (i > 0) {
                    hideElement(buttonID);
                }
            }

            dragElement("OpenBundle.Jukebox." + instanceIDd + ".WindowHeader", data.OpenBundle$Jukebox);
            onEvent("OpenBundle.Jukebox." + instanceIDd + ".Bar.2", "click", function() {
                stopSound(currentSongURL);
                currentSong = "No song playing";
                currentSongURL = "";
                setText("OpenBundle.Jukebox." + instanceIDd + ".Text.1", currentSong);
            });
            onEvent("OpenBundle.Jukebox." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Jukebox("HideAll");
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Jukebox.length; i++) {
            deleteElement(data.OpenBundle$Jukebox[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        stopSound();
    } else {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
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

    openBundles$RegisterAppBundle("NetStar", data.Screens);
    openBundles$hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "NetStar") {
            BEMA("TextArea", "OpenBundle.NetStar." + instanceIDd + ".Window", 100+100, 35+101, 390, 260, false, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.NetStar." + instanceIDd + ".WindowHeader", 100+100, 35+101, 390, 25, false, 0, 0, "", Surface0, Text, "NetStar", "center", 12, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.NetStar." + instanceIDd + ".Text.1", 100+100, 65+101, 390, 260, false, 0, 0, "", Base, Text, "ok so like NetStar has not *actually* started dev, mainly cuz its a large project with dynamic locations, WebBundles, and more so like its hard n stuff uhhh yea, just wait till 1.0 or 2.0 or smth", "left", 11, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.NetStar." + instanceIDd + ".Bar.1", 100+100, 35+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);
            dragElement("OpenBundle.NetStar." + instanceIDd + ".WindowHeader", data.OpenBundle$NetStar);
            onEvent("OpenBundle.NetStar." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$NetStar("HideAll");
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$NetStar.length; i++) {
            deleteElement(data.OpenBundle$NetStar[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
//Bundle$Settings
function Bundle$Settings(Data, Scr) {
    var wallpaperImages = [
        "10-13 5120x2880.png",
        "Next 10-7-6k.png",
        "10-8-6k.jpg",
        "10-12-6k.jpg", 
        "",
        "",
    ];

    preloadImage(wallpaperImages[0]);
    preloadImage(wallpaperImages[1]);
    preloadImage(wallpaperImages[2]);
    preloadImage(wallpaperImages[3]);
    preloadImage(wallpaperImages[4]);
    preloadImage(wallpaperImages[5]);

    var bundleID = "Settings"; // Identifier for the bundle

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

    var CurrentBundleName = "Bundle$Settings";
    var data = {
        Screens: ["OpenBundle.Settings", "OpenBundle.SettingsAbout", "OpenBundle.Wallpaper"],
        OpenBundle$Settings: [
            "OpenBundle.Settings." + instanceIDd + ".Bar.1",
            "OpenBundle.Settings." + instanceIDd + ".Window",
            "OpenBundle.Settings." + instanceIDd + ".WindowHeader",
            "OpenBundle.Settings." + instanceIDd + ".Button.1",
            "OpenBundle.Settings." + instanceIDd + ".Button.2",
        ],
        OpenBundle$SettingsAbout: [
            "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1",
            "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.2",
            "OpenBundle.SettingsAbout." + instanceIDd + ".Window",
            "OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader",
            "OpenBundle.SettingsAbout." + instanceIDd + ".Text.1",
        ],
        OpenBundle$Wallpapers: [
            "OpenBundle.Wallpaper." + instanceIDd + ".Bar.1",
            "OpenBundle.Wallpaper." + instanceIDd + ".Bar.2",
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

    openBundles$RegisterAppBundle("Settings", data.Screens);
    openBundles$hideIcons();


    
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
            BEMA("TextArea", "OpenBundle.Settings." + instanceIDd + ".Window", windowX+100, windowY+101, 300, 200, false, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".WindowHeader", windowX+100, headerY+101, 300, 25, false, 0, 0, "", Surface0, Text, "Settings", "center", 12, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".Button.1", buttonX+100, buttonY+101, 80, 25, false, 0, 0, "", Surface0, Text, "Wallpapers", "center", 11, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".Button.2", buttonX + 85+100, buttonY+101, 80, 25, false, 0, 0, "", Surface0, Text, "About", "center", 11, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".Bar.1", barX+100, barY+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);
            dragElement("OpenBundle.Settings." + instanceIDd + ".WindowHeader", data.OpenBundle$Settings);
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
            BEMA("TextArea", "OpenBundle.SettingsAbout." + instanceIDd + ".Window", windowX+100, windowY+101, 300, 200, false, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader", windowX+100, headerY+101, 300, 25, false, 0, 0, "", Surface0, Text, "Settings - About", "center", 12, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1", barX+100, barY+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);
            BEMA("Button", "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.2", barX + 30+100, barY+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "center", 11, "Tahoma", true, "left-arrow.png", "");
            BEMA("TextArea", "OpenBundle.SettingsAbout." + instanceIDd + ".Text.1", textX+100, textY+101, 300, 175, false, 0, 0, "", Base, Text, "", "left", 10, "Tahoma", true, "", "");
            dragElement("OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader", data.OpenBundle$SettingsAbout);
            setText("OpenBundle.SettingsAbout." + instanceIDd + ".Text.1", "NextOS version "+Version);

            onEvent("OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$SettingsAbout");
            });
            onEvent("OpenBundle.SettingsAbout." + instanceIDd + ".Bar.2", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$SettingsAbout");
                Bundle$Settings("", "Settings");
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
            BEMA("TextArea", "OpenBundle.Wallpaper." + instanceIDd + ".Window", windowX+100, windowY+101, windowWidth, windowHeight, false, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Wallpaper." + instanceIDd + ".WindowHeader", windowX+100, headerY+101, windowWidth, 25, false, 0, 0, "", Surface0, Text, "Wallpapers", "center", 12, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Wallpaper." + instanceIDd + ".Bar.1", barX+100, barY+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);
            BEMA("Button", "OpenBundle.Wallpaper." + instanceIDd + ".Bar.2", barX + 30+100, barY+101, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "center", 11, "Tahoma", true, "left-arrow.png", "");
            for (var i = 0; i < numColumns * numRows; i++) {
                var col = i % numColumns;
                var row = Math.floor(i / numColumns);

                var btnX = windowX + (buttonWidth + buttonSpacing) * col + 12.5; // Shifted right by 10px
                var btnY = windowY + 30 + (buttonHeight + buttonSpacing) * row + 10;

                BEMA("Image", "OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1), btnX+100, btnY+101, buttonWidth, buttonHeight, false, 0, 0, "", Surface0, Text, "", "left", 11, "Tahoma", true, "", "");
                setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1), "fit", "fill");
                if (wallpaperImages[i] == "") {
                    hideElement("OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1));
                }
            }

            // Re-add images to the buttons
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "image", wallpaperImages[0]);
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.2", "image", wallpaperImages[1]);
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.3", "image", wallpaperImages[2]);
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.4", "image", wallpaperImages[3]);
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.5", "image", wallpaperImages[4]);
            setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.6", "image", wallpaperImages[5]);

            dragElement("OpenBundle.Wallpaper." + instanceIDd + ".WindowHeader", data.OpenBundle$Wallpapers);
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "click", function() {
                Next$setWallpaper(wallpaperImages[0]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.2", "click", function() {
                Next$setWallpaper(wallpaperImages[1]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.3", "click", function() {
                Next$setWallpaper(wallpaperImages[2]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.4", "click", function() {
                Next$setWallpaper(wallpaperImages[3]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.5", "click", function() {
                Next$setWallpaper(wallpaperImages[4]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.6", "click", function() {
                Next$setWallpaper(wallpaperImages[5]);
            });

            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$Wallpapers");
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Bar.2", "click", function() {
                Bundle$Settings("HideAll", "OpenBundle$Wallpapers");
                Bundle$Settings("", "Settings");
            });
        }
    } else if (Data == "HideAll") {
        eval("for (var i = 0; i < data."+Scr+".length; i++) {deleteElement(data."+Scr+"[i]);openBundles$showIcons();}");
          
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
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

    var CurrentBundleName = "Bundle$StickyNote";
    var data = {
        Screens: ["OpenBundle.StickyNote"],
        OpenBundle$StickyNote: [
            "OpenBundle.StickyNote." + instanceIDd + ".Window",
            "OpenBundle.StickyNote." + instanceIDd + ".WindowHeader",
            "OpenBundle.StickyNote." + instanceIDd + ".Text.1",
            "OpenBundle.StickyNote." + instanceIDd + ".Bar.1",
        ],
    };

    openBundles$RegisterAppBundle("StickyNote", data.Screens);
    openBundles$hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "StickyNote") {
            
            BEMA("TextArea", "OpenBundle.StickyNote." + instanceIDd + ".Window", 100+100, 100+100, 200, 200, false, 0, 0, "", Blank, Base, "", "center", 16, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.StickyNote." + instanceIDd + ".Text.1", 100+100, 115+100, 200, 185, false, 0, 0, "", "#f9e2af", Base, currentNote, "left", 11, "Tahoma", false, "", "");
            BEMA("Button", "OpenBundle.StickyNote." + instanceIDd + ".WindowHeader", 100+100, 100+100, 200, 15, false, 0, 0, "", "#e8d19e", Base, "", "center", 5, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.StickyNote." + instanceIDd + ".Bar.1", 100+100, 100+100, 15, 15, false, 0, 0, "rgb(0,0,0,0)", "#e8d19e", Base, "", "left", 0, "Tahoma", true, "times_mantle.png", "");
            dragElement("OpenBundle.StickyNote." + instanceIDd + ".WindowHeader", data.OpenBundle$StickyNote);
            onEvent("OpenBundle.StickyNote." + instanceIDd + ".Bar.1", "click", function() {
                currentNote = getText("OpenBundle.StickyNote." + instanceIDd + ".Text.1");
                Bundle$StickyNote("HideAll");
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$StickyNote.length; i++) {
            deleteElement(data.OpenBundle$StickyNote[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        //not needed for this app
    } else {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
//Bundle$Terminal
function Bundle$Terminal(Data, Scr) {
    var TermText = Text;
    var TermBase = Base;
    var TermSurface0 = Surface0;
    var TermSurface1 = Surface1;
    if (Internal || debug) {
        TermText = "#00ff00";
        TermBase = "#000000";
        TermSurface0 = "#111111";
        TermSurface1 = "#222222";
    }
    var bundleID = "Terminal";
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

    var data = {
        Screens: ["OpenBundle.Terminal"],
        OpenBundle$Terminal: [
            "OpenBundle.Terminal." + instanceIDd + ".Window",
            "OpenBundle.Terminal." + instanceIDd + ".WindowHeader",
            "OpenBundle.Terminal." + instanceIDd + ".Display",
            "OpenBundle.Terminal." + instanceIDd + ".Input",
            "OpenBundle.Terminal." + instanceIDd + ".Bar.1"
        ]
    };

    openBundles$RegisterAppBundle("Terminal", data.Screens);
    openBundles$hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Terminal") {
            var windowWidth = 400;
            var windowHeight = 300;

            BEMA("TextArea", "OpenBundle.Terminal." + instanceIDd + ".Window", 100+100, 50+100, windowWidth, windowHeight, false, 0, 0, "", TermBase, TermText, "", "left", 16, "Courier New", true, "", "");
            BEMA("Button", "OpenBundle.Terminal." + instanceIDd + ".WindowHeader", 100+100, 50+100, windowWidth, 25, false, 0, 0, "", TermSurface0, TermText, "Terminal", "center", 12, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.Terminal." + instanceIDd + ".Display", 100+100, 75+100, windowWidth, windowHeight - 75, false, 0, 0, "", TermBase, TermText, "Welcome to Next Terminal\n", "left", 14, "Courier New", true, "", "");
            BEMA("Input", "OpenBundle.Terminal." + instanceIDd + ".Input", 100+100, windowHeight + 25+100, windowWidth, 25, false, 0, 0, "", TermSurface0, TermText, "Command [args]", "left", 14, "Courier New", false, "", "");
            BEMA("Button", "OpenBundle.Terminal." + instanceIDd + ".Bar.1", 100+100, 50+100, 25, 25, false, 0, 0, "rgb(0,0,0,0)", TermSurface1, TermText, "", "center", 12, "Tahoma", true, "times.png", TermText);
            dragElement("OpenBundle.Terminal." + instanceIDd + ".WindowHeader", data.OpenBundle$Terminal);
            onEvent("OpenBundle.Terminal." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Terminal("HideAll");
            });

            onEvent("OpenBundle.Terminal." + instanceIDd + ".Input", "keydown", function(event) {
                if (event.key === "Enter") {
                    var command = getText("OpenBundle.Terminal." + instanceIDd + ".Input");
                    command = command.replace(/\n/g, "");
                    processCommand(command);
                    setText("OpenBundle.Terminal." + instanceIDd + ".Input", "");
                }
            });
        }
    } else if (Data == "DeleteApp") {
        //not needed for this app
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Terminal.length; i++) {
            var elementId = data.OpenBundle$Terminal[i];
            deleteElement(elementId);
        }
        openBundles$showIcons();
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    }

    function processCommand(command) {
        var output = "";
        var parts = command.split(" ");
        var cmd = parts[0].toLowerCase();

        if (cmd === "help") {
            output = "Available commands:\n" +
                     "help - Show this help message\n" +
                     "echo [text] - Display the given text\n" +
                     "clear - Clear the terminal screen\n" +
                     "date - Show current date and time\n" +
                     "whoami - Display current user\n" +
                     "calc [expression] - Simple calculator, only available for developers";

        } else if (cmd === "echo") {
            output = parts.slice(1).join(" ");

        } else if (cmd === "clear") {
            setText("OpenBundle.Terminal." + instanceIDd + ".Display", "");
            return;

        } else if (cmd === "date") {
            output = getTime("HH:mm:ss") + " " + getDate("mm/dd/yyyy");

        } else if (cmd === "whoami") {
            output = "Guest";
            
        } else if (cmd === "calc") {
            if (Internal || debug) {
            if (parts.length > 1) {
                output = eval(parts.slice(1).join(" "));
            } else {
                output = "Usage: calc [expression]";
            }
        } else {
            output = "calc command is not available";
        }
        
        } else {
            output = "Command not recognized. Type 'help' for available commands.";
        }

        appendToDisplay("> " + command + "\n" + output + "\n");
    }

    function appendToDisplay(text) {
        var display = "OpenBundle.Terminal." + instanceIDd + ".Display";
        setText(display, "Welcome to Next Terminal\n" + text);
    }
}
//Bundle$TextEdit
var documents = {}; // Store multiple documents
function Bundle$TextEdit(Data, Scr, docID) {
    // Load documents into memory (no file operations)
    function loadDocuments() {
        // Initialize documents with default content
        documents["text1.mfsf"] = "Type your document here!";
        documents["text2.mfsf"] = "Type your document here!";
        documents["text3.mfsf"] = "Type your document here!";
    }

    //loadDocuments(); // Load documents at the start

    var bundleID = "TextEdit"; // Identifier for the bundle

    // Check if the bundle is already running and handle requests accordingly
    if (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
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

    openBundles$RegisterAppBundle("TextEdit", data.Screens);
    openBundles$hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "TextEdit") {
            if (!documents[docID]) {
                documents[docID] = "Type your document here!";
            }
            BEMA("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Window", 100+100, 35+100, 300, 200, false, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", 100+100, 35+100, 300, 25, false, 0, 0, "", Surface0, Text, "Text Edit", "center", 12, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Text.1", 100+100, 65+100, 300, 200, false, 0, 0, "", Base, Text, documents[docID], "left", 11, "Tahoma", false, "", "");
            BEMA("Button", "OpenBundle.TextEdit." + instanceIDd + ".Bar.1", 100+100, 35+100, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);
            dragElement("OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", data.OpenBundle$TextEdit);
            onEvent("OpenBundle.TextEdit." + instanceIDd + ".Bar.1", "click", function() {
                // Save changes to the documents variable (no file operations)
                var currentText = getText("OpenBundle.TextEdit." + instanceIDd + ".Text.1"); // Get the current text
                console.log(docID); // Log the document ID
                console.log(currentText); // Log the current text being saved
                documents[docID] = currentText; // Update the document with the current text
                Bundle$TextEdit("HideAll"); // Hide the editor
                console.log(documents); // Log the updated documents object
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$TextEdit.length; i++) {
            deleteElement(data.OpenBundle$TextEdit[i]);
        }
        openBundles$showIcons();
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
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

    openBundles$RegisterAppBundle("Tips", data.Screens);
    openBundles$hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Tips") {
            BEMA("TextArea", "OpenBundle.Tips." + instanceIDd + ".Window", 100+100, 35+100, 300, 200, false, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Tips." + instanceIDd + ".WindowHeader", 100+100, 35+100, 300, 25, false, 0, 0, "", Surface0, Text, "Tips", "center", 12, "Tahoma", true, "", "");
            BEMA("TextArea", "OpenBundle.Tips." + instanceIDd + ".Text.1", 100+100, 65+100, 300, 200, false, 0, 0, "", Base, Text, tipsAppText, "left", 11, "Tahoma", true, "", "");
            BEMA("Button", "OpenBundle.Tips." + instanceIDd + ".Bar.1", 100+100, 35+100, 25, 25, false, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "times.png", Text);
            dragElement("OpenBundle.Tips." + instanceIDd + ".WindowHeader", data.OpenBundle$Tips);
            onEvent("OpenBundle.Tips." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Tips("HideAll");
            });
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Tips.length; i++) {
            deleteElement(data.OpenBundle$Tips[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
