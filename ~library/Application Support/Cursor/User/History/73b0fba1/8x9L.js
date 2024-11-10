
󱤧 Mantle = "#181825";
󱤧 Base = "#1e1e2e";
󱤧 Text = "#cdd6f4";
󱤧 Blank = "rgba(0,0,0,0)";
󱤧 Surface0 = "#313244";
󱤧 Surface1 = "#45475a";
󱤧 Surface2 = "#585b70";
//extras
󱤧 bg = "#008080";

󱤧 iconCount = 16;




//Next.Main
BEMA("Image", "Next.Main.Image.2", -4.5, -4.5, 820, 607.5, 󱥔, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", 󱥔, "10-13 5120x2880.png", Text);
setProperty("Next.Main.Image.2", "fit", "fill");
BEMA("TextArea", "Next.Main.Bar", 0, 0, 820, 32, 󱥔, 0, 0, "", Mantle, Text, "", "center", 18, "Tahoma", 󱥔, "", Text);
BEMA("Button", "Next.Main.Bar.0", 1, 1, 100, 30, 󱥔, 0, 2.3, Surface1, Surface0, Text, "Start", "right", 15, "Tahoma", 󱥔, "", Text);
BEMA("Image", "Next.Main.Bar.0.img", 3.3, 1, 27.7, 27.7, 󱥔, 0, 2.3, Blank, Blank, Blank, "", "right", 0, "Tahoma", 󱥔, "normal.PNG", Text);
󱤙 (let i = 0; i < iconCount; i++) {
    const iconId = `Next.Main.Bar.${i + 1}`;
    BEMA("Button", iconId, 119 + (i * 35), 1, 30, 30, 󱥔, 0, 2.3, Surface1, Surface0, Text, "", "right", 0, "Tahoma", 󱥔, "normal.PNG", Text);
}
BEMA("TextArea", "Next.Main.Bar.Time", 680, 1, 130, 30, 󱥔, 0, 2.3, Surface1, Surface0, Text, "$TIME$", "center", 15, "Tahoma", 󱥔, "", Text);


//Next.login
BEMA("Image", "Next.login.Image.2", -4.5, -4.5, 820, 607.5, 󱥔, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", 󱥔, "10-13 5120x2880.png", Text);
setProperty("Next.login.Image.2", "fit", "fill");

BEMA("TextArea", "Next.login.Window", 326.25, 150, 150, 150, 󱥔, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", 󱥔, "", Text);
BEMA("Button", "Next.login.Image.1", 348.75, 157.5, 112.5, 112.5, 󱥔, 5, 0, "", Blank, Text, "", "left", 5, "Arial", 󱥔, "normal.PNG", Text);
setProperty("Next.login.Image.1", "fit", "fill");

BEMA("Button", "Next.login.Button.2", 310, 315, 180, 45, 󱥔, 5, 0, "", Base, Text, "login As Guest", "center", 18, "Tahoma", 󱥔, "", Text);


//Next.Boot
BEMA("Image", "Next.Boot.Window", -4.5, -4.5, 825, 607.5, 󱥔, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", 󱥔, "", Text);
setProperty("Next.Boot.Window", "zIndex", 10); 

BEMA("Button", "Next.Boot.Image.1", 348.75, 202.5, 112.5, 112.5, 󱥔, 5, 0, "", Blank, Text, "", "left", 5, "Arial", 󱥔, "normal.PNG", Text);
BEMA("Button", "Next.Boot.Text.1", 247.5, 202.5, 300, 300, 󱥔, 5, 0, "", Blank, Text, "Welcome to NextOS", "center", 23, "Tahoma", 󱥔, "", Text);
BEMA("Button", "Next.Boot.Image.2", 180, 75, 450, 450, 󱥔, 5, 0, "", Blank, Text, "", "left", 5, "Arial", 󱥔, "loading.gif", Text);


󱤪󱤨 setScreen(scr) {
    hideScreens();

    󱥹 (scr === "boot") {
        showElement("Next.Boot.Window");
        showElement("Next.Boot.Image.1");
        showElement("Next.Boot.Text.1");
        showElement("Next.Boot.Image.2");
        󱥌;
    }

    󱥹 (scr === "main"){
        showElement("Next.Main.Image.2");
        showElement("Next.Main.Bar");
        showElement("Next.Main.Bar.0");
        showElement("Next.Main.Bar.Time");
        showElement("Next.Main.Bar.0.img");
        󱥌;
    }

    󱥹 (scr === "login"){
        showElement("Next.login.Image.2");
        showElement("Next.login.Window");
        showElement("Next.login.Image.1");
        showElement("Next.login.Button.2");
        󱥌;
    }
}

󱤪󱤨 hideScreens() {

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
    󱤙 (let i = 1; i <= iconCount+1; i++) {
        hideElement(`Next.Main.Bar.${i}`);
    }

    //login
    hideElement("Next.login.Image.2");
    hideElement("Next.login.Window");
    hideElement("Next.login.Image.1");
    hideElement("Next.login.Button.2");
    󱥌;
}






//Code
openBundles$Config("NextOS", ".Main.Image.1", ".Main.Bar.");
󱤧 Version = "1.0";
󱤧 tipsAppText = 'Welcome to the NextOS';
󱤧 Apps = {}; //list of apps and app data
󱤧 icons = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
󱤧 BarIcons = [];
󱤧 debug = 󱤂; //its recomended not to change this
󱤧 Internal = 󱤂; //its recomended not to change this
󱤧 secure = 󱥔; //its recomended not to change this
󱤧 safemode = 󱤂; //its recomended not to change this
󱤧 currentWallpaper = "";
󱤧 currentSong = "No song playing";
󱤧 currentSongURL = "";

openBundles$addApp("Settings", 1, "Arcane", "Bundle$Settings(null, \"Settings\");", "icon://fa-cogs", 󱥔, 󱥔);
openBundles$addApp("TextFile1", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"text1.mfsf\");", "file.png", 󱥔, 󱥔);
openBundles$addApp("TextFile2", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"text2.mfsf\");", "file.png", 󱥔, 󱥔);
openBundles$addApp("TextFile3", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"text3.mfsf\");", "file.png", 󱥔, 󱥔);
openBundles$addApp("StickyNote", 1, "Arcane", "Bundle$StickyNote(null, \"StickyNote\");", "notes.png", 󱥔, 󱥔);
openBundles$addApp("Tips", 1, "Arcane", "Bundle$Tips(null, \"Tips\");", "tips.png", 󱥔, 󱥔);
openBundles$addApp("NetStar", 1, "Arcane", "Bundle$NetStar(null, \"NetStar\");", "cloud.png", 󱥔, 󱥔);
openBundles$addApp("Calculator", 1, "Arcane", "Bundle$Calculator(null, \"Calculator\");", "calc.png", 󱥔, 󱥔);
openBundles$addApp("Jukebox", 1, "Arcane", "Bundle$Jukebox(null, \"Jukebox\");", "music.png", 󱥔, 󱥔);
openBundles$addApp("Terminal", 1, "Arcane", "Bundle$Terminal(null, \"Terminal\");", "term.png", 󱥔, 󱥔);
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
󱤪󱤨 Next$setWallpaper(image) {
    currentWallpaper = image;
    setProperty("Next.Main.Image.2", "image", image);
    setProperty("Next.Main.Image.1", "background-color", Blank);
    setProperty("Next.login.Image.2", "image", image);
}

// Open an App
󱤪󱤨 openBundles$openApp(appName) {
    //lipu.󱥬("Opening app:", appName);
    󱥹 (Apps[appName]) {
        const app = Apps[appName];
        //lipu.󱥬(app.mainscreen);
        eval(app.mainscreen);
    } 󱥨 {
        lipu.󱥬("App with name " + appName + " not found.");
    }
}

󱤪󱤨 Next$InstallApp(appname, iconn) {
    󱤧 icon;
    icon = iconn;
    󱥹 (icons.indexOf("") !== -1) {
        󱤧 index = icons.indexOf("");
        icons[index] = appname;
        setProperty("Next.Main.Bar." + (index + 1) + "-img", "image", iconn);
        showElement("Next.Main.Bar." + (index + 1));
        updateIconVisibility(); // Add this line to update visibility after installation
        󱥌 󱥔;
    }
    WriteError("Storage Full!", "Homescreenmgr");
    󱥌 󱤂;
}

//Uninstall a App
󱤪󱤨 Next$UninstallApp(appname) {
    󱤙 (󱤧 i = 0; i < icons.length; i++) {
        󱥹 (icons[i] === appname) {
            icons[i] = "";
            setProperty("Next.Main.Bar." + (i + 1), "image", "icon://fa-question");
            hideElement("Next.Main.Bar." + (i + 1));
            updateIconVisibility(); // Add this line to update visibility after uninstallation
         󱥌;
       }
    }
    WriteError("Can't find app", "Homescreenmgr");
}

// Add this new 󱤪󱤨 to update icon visibility
󱤪󱤨 updateIconVisibility() {
    󱤙 (󱤧 i = 0; i < icons.length; i++) {
        󱤧 iconId = "Next.Main.Bar." + (i + 1);
        󱥹 (icons[i] !== "") {
            showElement(iconId);
        } 󱥨 {
            hideElement(iconId);
        }
    }
}





󱤪󱤨 boot() {
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

    󱥹 (!Internal) {
        Next$UninstallApp("NetStar");
    }

    updateIconVisibility();
}

onEvent("Next.Main.Bar.0", "click", (e) => {
    controlKey();
  });


  󱤙 (let i = 0; i < iconCount; i++) {
    onEvent(`Next.Main.Bar.${i + 1}`, "click", (e) => {
        const appName = icons[i];
        openBundles$openApp(appName);
        //lipu.󱥬(appName);
        //lipu.󱥬(icons);
        //lipu.󱥬(Apps);
    });
}




/**
 * Makes a spec󱥹ied element a drag detector and moves multiple target elements when dragging occurs.
 *
 * @param {string} draggerId - The ID of the element that detects the drag (i.e., the user interacts with this element).
 * @param {Array<string>} targetIds - An array of IDs of elements that should move together when dragging occurs.
 */
󱤪󱤨 dragElement(draggerId, targetIds) {
    //lipu.󱥬(`dragElement called with draggerId: "${draggerId}" and targetIds: [${targetIds.join(", ")}]`);

    // Ensure the dragger element exists
    const dragger = document.getElementById(draggerId);
    󱥹 (!dragger) {
        lipu.error(`dragElement Error: Dragger element with ID "${draggerId}" does not exist.`);
        󱥌;
    }

    // Ensure all target elements exist
    const targets = targetIds.map(id => {
        const el = document.getElementById(id);
        󱥹 (!el) {
            lipu.error(`dragElement Error: Target element with ID "${id}" does not exist.`);
        }
        󱥌 el;
    }).filter(el => el !== undefined && el !== null);

    󱥹 (targets.length === 0) {
        lipu.error(`dragElement Error: No valid target elements to drag.`);
        󱥌;
    }

    // Ensure the target elements are positioned absolutely or relatively
    targets.󱤙Each(target => {
        const position = getProperty(target.id, "position");
        󱥹 (position !== "absolute" && position !== "relative") {
            setProperty(target.id, "position", "absolute");
        }
    });

    // Drag state 󱤧iables encapsulated within the 󱤪󱤨's closure
    let isDragging = 󱤂;
    let dragStartX = 0;
    let dragStartY = 0;
    let originalPositions = {}; // To store original positions of all target elements
    const dragThreshold = 5; // Minimum movement in pixels to start dragging

    // Flag to prevent click event after dragging
    let preventClick = 󱤂;

    // Mouse down event to initiate drag
    onEvent(draggerId, "mousedown", 󱤪󱤨(event) {
        //lipu.󱥬(`mousedown on "${draggerId}" at (${event.clientX}, ${event.clientY})`);
        isDragging = 󱤂;
        preventClick = 󱤂;
        dragStartX = event.clientX;
        dragStartY = event.clientY;

        // Store original positions of all target elements
        originalPositions = {};
        targets.󱤙Each(target => {
            const currentLeft = parseFloat(getProperty(target.id, "left")) || 0;
            const currentTop = parseFloat(getProperty(target.id, "top")) || 0;
            originalPositions[target.id] = { left: currentLeft, top: currentTop };
        });

        // Define mousemove and mouseup handlers within this scope
        const onMouseMove = 󱤪󱤨(event) {
            const dx = event.clientX - dragStartX;
            const dy = event.clientY - dragStartY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            󱥹 (!isDragging) {
                󱥹 (distance > dragThreshold) {
                    isDragging = 󱥔;
                    preventClick = 󱥔; // Start dragging, prevent click
                    //lipu.󱥬(`isDragging started via "${draggerId}"`);
                } 󱥨 {
                    // Movement not enough to start dragging
                    󱥌;
                }
            }

            󱥹 (isDragging) {
                // Move all target elements
                targets.󱤙Each(target => {
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
                    //lipu.󱥬(`Dragging "${target.id}" to (left: ${boundedLeft}px, top: ${boundedTop}px)`);
                });
            }
        };

        const onMouseUp = 󱤪󱤨(event) {
            󱥹 (isDragging) {
               // lipu.󱥬(`mouseup on "${draggerId}", stopping drag`);
            }
            isDragging = 󱤂;
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
  󱤪󱤨 Bundle$Calculator(Data, Scr) {
    󱤧 bundleID = "Calculator"; // Ident󱥹ier 󱤙 the bundle

    // Check 󱥹 the bundle is already running and handle requests accordingly
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // 󱥹 the bundle is already running and the request is to open or show screens, ignore it
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
        };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 CurrentBundleName = "Bundle$Calculator";
    󱤧 data = {
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

    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr == "Calculator") {
            󱤧 windowWidth = 4 * 45 + 15 + 70; // 4 buttons per row, each 45px wide, plus 15px padding, plus 70px extra width

            BEMA("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Window", 100+100, 35+101, windowWidth, 260, 󱤂, 0, 0, "", Base, Text, "", "left", 16, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".WindowHeader", 100+100, 35+101, windowWidth, 25, 󱤂, 0, 0, "", Surface0, Text, "Calculator", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("TextArea", "OpenBundle.Calculator." + instanceIDd + ".Display", 100+100, 60+101, windowWidth, 50, 󱤂, 0, 0, "", Base, Text, "0", "right", 20, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".Bar.1", 100+100, 35+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);

            // Add buttons 󱤙 digits and operations
            󱤧 buttons = [
                { label: "7", x: 110+100, y: 90+101 }, { label: "8", x: 160+100, y: 90+101 }, { label: "9", x: 210+100, y: 90+101 }, { label: "/", x: 260+100, y: 90+101 },
                { label: "4", x: 110+100, y: 140+101 }, { label: "5", x: 160+100, y: 140+101 }, { label: "6", x: 210+100, y: 140+101 }, { label: "*", x: 260+100, y: 140+101 },
                { label: "1", x: 110+100, y: 190+101 }, { label: "2", x: 160+100, y: 190+101 }, { label: "3", x: 210+100, y: 190+101 }, { label: "-", x: 260+100, y: 190+101 },
                { label: "0", x: 110+100, y: 240+101 }, { label: ".", x: 160+100, y: 240+101 }, { label: "=", x: 210+100, y: 240+101 }, { label: "+", x: 260+100, y: 240+101 },
                { label: "C", x: 310+100, y: 240+101 } // Add clear button
            ];

            buttons.󱤙Each(󱤪󱤨(button) {
                BEMA("Button", "OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, button.x, button.y, 45, 45, 󱤂, 0, 0, "", Surface1, Text, button.label, "center", 16, "Tahoma", 󱥔, "", "");
                onEvent("OpenBundle.Calculator." + instanceIDd + ".Button." + button.label, "click", 󱤪󱤨() {
                    handleCalculatorInput(button.label);
                });
            });
            dragElement("OpenBundle.Calculator." + instanceIDd + ".WindowHeader", data.OpenBundle$Calculator);
            onEvent("OpenBundle.Calculator." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$Calculator("HideAll");
            });

        }
    } 󱥨 󱥹 (Data == "HideAll") {
        󱤙 (󱤧 i = 0; i < data.OpenBundle$Calculator.length; i++) {
            deleteElement(data.OpenBundle$Calculator[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } 󱥨 󱥹 (Data == "DeleteApp") {
        // Handle app deletion
    } 󱥨 {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, 󱥔);
        󱥌 "";
    }

    󱤪󱤨 handleCalculatorInput(input) {
        󱤧 displayElement = "OpenBundle.Calculator." + instanceIDd + ".Display";
        󱤧 currentDisplay = getText(displayElement);
        
        󱥹 (input === "=") {
            try {
                󱤧 result = eval(currentDisplay).toFixed(2);
                setText(displayElement, result.toString().substring(0, 50)); // Limit result to 50 chars
            } catch (e) {
                setText(displayElement, "Error");
            }
        } 󱥨 󱥹 (input === "C") {
            setText(displayElement, "0");
        } 󱥨 {
            󱥹 (currentDisplay === "0" || currentDisplay === "Error") {
                setText(displayElement, input);
            } 󱥨 {
                // Check 󱥹 adding the new input would exceed 15 characters
                󱥹 (currentDisplay.length < 15) {
                    setText(displayElement, (currentDisplay + input).substring(0, 15));
                }
                // 󱥹 it's already at 15 characters, don't add more
            }
        }
    }
}
//Bundle$Jukebox
󱤪󱤨 Bundle$Jukebox(Data, Scr) {
    󱤧 songs = [
        { id: "Cwitsh - OneShot Aftermath Demo Soundtrack - Dreams from a Feather.mp3", name: "Dreams from a Feather" },
        { id: "song2.mp3", name: "Song 2" },
        { id: "song3.mp3", name: "Song 3" },
        { id: "song4.mp3", name: "Song 4" },
        { id: "song5.mp3", name: "Song 5" },
        { id: "song6.mp3", name: "Song 6" }
    ];
    󱤧 bundleID = "Jukebox"; // Ident󱥹ier 󱤙 the bundle

    // Check 󱥹 the bundle is already running and handle requests accordingly
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // 󱥹 the bundle is already running and the request is to open or show screens, ignore it
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
        };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 CurrentBundleName = "Bundle$Jukebox";
    󱤧 data = {
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

    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr == "Jukebox") {
            BEMA("TextArea", "OpenBundle.Jukebox." + instanceIDd + ".Window", 100+100, 35+101, 410, 160, 󱤂, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", 󱥔, "", ""); // Reduced width by 15px
            BEMA("Button", "OpenBundle.Jukebox." + instanceIDd + ".WindowHeader", 100+100, 35+101, 410, 25, 󱤂, 0, 0, "", Surface0, Text, "Jukebox", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("TextArea", "OpenBundle.Jukebox." + instanceIDd + ".Text.1", 100+100, 65+101, 410, 50, 󱤂, 0, 0, "", Base, Text, currentSong, "center", 20, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Jukebox." + instanceIDd + ".Bar.1", 100+100, 35+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);
            BEMA("Button", "OpenBundle.Jukebox." + instanceIDd + ".Bar.2", 130+100, 35+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "pause.png", Text);
            󱤧 numColumns = 3;
            󱤧 numRows = 2;
            󱤧 buttonWidth = 120;
            󱤧 buttonHeight = 25;
            󱤧 buttonSpacing = 10;

            󱤙 (󱤧 i = 0; i < numColumns * numRows; i++) {
                󱤧 col = i % numColumns;
                󱤧 row = Math.floor(i / numColumns);

                󱤧 btnX = 115 + (buttonWidth + buttonSpacing) * col; // Aligned to the left and sh󱥹ted 15px to the right
                󱤧 btnY = 120 + (buttonHeight + buttonSpacing) * row;

                󱤧 buttonID = "OpenBundle.Jukebox." + instanceIDd + ".Button.Play." + (i + 1);
                BEMA("Button", buttonID, btnX+100, btnY+101, buttonWidth, buttonHeight, 󱤂, 0, 0, "", Surface0, Text, songs[i].name, "center", 9, "Tahoma", 󱥔, "", ""); // Reduced font size

                (󱤪󱤨(song) {
                    onEvent(buttonID, "click", 󱤪󱤨() {
                        stopSound(currentSongURL);
                        currentSong = "Playing " + song.name + "...";
                        currentSongURL = song.id;
                        setText("OpenBundle.Jukebox." + instanceIDd + ".Text.1", currentSong);
                        playSound(currentSongURL, 󱤂);
                    });
                })(songs[i]);

                󱥹 (i > 0) {
                    hideElement(buttonID);
                }
            }

            dragElement("OpenBundle.Jukebox." + instanceIDd + ".WindowHeader", data.OpenBundle$Jukebox);
            onEvent("OpenBundle.Jukebox." + instanceIDd + ".Bar.2", "click", 󱤪󱤨() {
                stopSound(currentSongURL);
                currentSong = "No song playing";
                currentSongURL = "";
                setText("OpenBundle.Jukebox." + instanceIDd + ".Text.1", currentSong);
            });
            onEvent("OpenBundle.Jukebox." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$Jukebox("HideAll");
            });
        }
    } 󱥨 󱥹 (Data == "HideAll") {
        󱤙 (󱤧 i = 0; i < data.OpenBundle$Jukebox.length; i++) {
            deleteElement(data.OpenBundle$Jukebox[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } 󱥨 󱥹 (Data == "DeleteApp") {
        stopSound();
    } 󱥨 {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, 󱥔);
        󱥌 "";
    }
}
//Bundle$NetStar
󱤪󱤨 Bundle$NetStar(Data, Scr) {
    󱤧 bundleID = "NetStar"; // Ident󱥹ier 󱤙 the bundle

    // Check 󱥹 the bundle is already running and handle requests accordingly
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // 󱥹 the bundle is already running and the request is to open or show screens, ignore it
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
        };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 CurrentBundleName = "Bundle$NetStar";
    󱤧 data = {
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

    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr == "NetStar") {
            BEMA("TextArea", "OpenBundle.NetStar." + instanceIDd + ".Window", 100+100, 35+101, 390, 260, 󱤂, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.NetStar." + instanceIDd + ".WindowHeader", 100+100, 35+101, 390, 25, 󱤂, 0, 0, "", Surface0, Text, "NetStar", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("TextArea", "OpenBundle.NetStar." + instanceIDd + ".Text.1", 100+100, 65+101, 390, 260, 󱤂, 0, 0, "", Base, Text, "ok so like NetStar has not *actually* started dev, mainly cuz its a large project with dynamic locations, WebBundles, and more so like its hard n stuff uhhh yea, just wait till 1.0 or 2.0 or smth", "left", 11, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.NetStar." + instanceIDd + ".Bar.1", 100+100, 35+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);
            dragElement("OpenBundle.NetStar." + instanceIDd + ".WindowHeader", data.OpenBundle$NetStar);
            onEvent("OpenBundle.NetStar." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$NetStar("HideAll");
            });
        }
    } 󱥨 󱥹 (Data == "HideAll") {
        󱤙 (󱤧 i = 0; i < data.OpenBundle$NetStar.length; i++) {
            deleteElement(data.OpenBundle$NetStar[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } 󱥨 󱥹 (Data == "DeleteApp") {
        // Handle app deletion
    } 󱥨 {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, 󱥔);
        󱥌 "";
    }
}
//Bundle$Settings
󱤪󱤨 Bundle$Settings(Data, Scr) {
    󱤧 wallpaperImages = [
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

    󱤧 bundleID = "Settings"; // Ident󱥹ier 󱤙 the bundle

    // Check 󱥹 the bundle is already running and handle requests accordingly
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // 󱥹 the bundle is already running and the request is to open or show screens, ignore it
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
        };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 CurrentBundleName = "Bundle$Settings";
    󱤧 data = {
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


    
    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr === "Settings") {
            // Define initial positions relative to the window
            󱤧 windowX = 100;
            󱤧 windowY = 35;
            󱤧 headerY = windowY;
            󱤧 barX = windowX;
            󱤧 barY = windowY;
            󱤧 buttonX = windowX + 5; // Adjust as needed
            󱤧 buttonY = windowY + 30;

            // Create elements
            BEMA("TextArea", "OpenBundle.Settings." + instanceIDd + ".Window", windowX+100, windowY+101, 300, 200, 󱤂, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".WindowHeader", windowX+100, headerY+101, 300, 25, 󱤂, 0, 0, "", Surface0, Text, "Settings", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".Button.1", buttonX+100, buttonY+101, 80, 25, 󱤂, 0, 0, "", Surface0, Text, "Wallpapers", "center", 11, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".Button.2", buttonX + 85+100, buttonY+101, 80, 25, 󱤂, 0, 0, "", Surface0, Text, "About", "center", 11, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Settings." + instanceIDd + ".Bar.1", barX+100, barY+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);
            dragElement("OpenBundle.Settings." + instanceIDd + ".WindowHeader", data.OpenBundle$Settings);
            onEvent("OpenBundle.Settings." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$Settings("HideAll", "OpenBundle$Settings");
            });
            onEvent("OpenBundle.Settings." + instanceIDd + ".Button.1", "click", 󱤪󱤨() {
                Bundle$Settings("HideAll", "OpenBundle$Settings");
                Bundle$Settings("", "Wallpapers");
            });
            onEvent("OpenBundle.Settings." + instanceIDd + ".Button.2", "click", 󱤪󱤨() {
                Bundle$Settings("HideAll", "OpenBundle$Settings");
                Bundle$Settings("", "About");
            });
        }
        󱥹 (Scr === "About") {
            // Define initial positions relative to the window
            󱤧 windowX = 100;
            󱤧 windowY = 35;
            󱤧 headerY = windowY;
            󱤧 barX = windowX;
            󱤧 barY = windowY;
            󱤧 textX = windowX; // Adjust as needed
            󱤧 textY = windowY + 25;

            // Create elements
            BEMA("TextArea", "OpenBundle.SettingsAbout." + instanceIDd + ".Window", windowX+100, windowY+101, 300, 200, 󱤂, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader", windowX+100, headerY+101, 300, 25, 󱤂, 0, 0, "", Surface0, Text, "Settings - About", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1", barX+100, barY+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);
            BEMA("Button", "OpenBundle.SettingsAbout." + instanceIDd + ".Bar.2", barX + 30+100, barY+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "center", 11, "Tahoma", 󱥔, "left-arrow.png", "");
            BEMA("TextArea", "OpenBundle.SettingsAbout." + instanceIDd + ".Text.1", textX+100, textY+101, 300, 175, 󱤂, 0, 0, "", Base, Text, "", "left", 10, "Tahoma", 󱥔, "", "");
            dragElement("OpenBundle.SettingsAbout." + instanceIDd + ".WindowHeader", data.OpenBundle$SettingsAbout);
            setText("OpenBundle.SettingsAbout." + instanceIDd + ".Text.1", "NextOS version "+Version);

            onEvent("OpenBundle.SettingsAbout." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$Settings("HideAll", "OpenBundle$SettingsAbout");
            });
            onEvent("OpenBundle.SettingsAbout." + instanceIDd + ".Bar.2", "click", 󱤪󱤨() {
                Bundle$Settings("HideAll", "OpenBundle$SettingsAbout");
                Bundle$Settings("", "Settings");
            });
        }
        󱥹 (Scr === "Wallpapers") {
            // Define initial positions relative to the window
            󱤧 windowX = 100;
            󱤧 windowY = 35;
            󱤧 headerY = windowY;
            󱤧 barX = windowX;
            󱤧 barY = windowY;
            󱤧 buttonWidth = 85;
            󱤧 buttonHeight = 47;
            󱤧 buttonSpacing = 5; // Space between buttons
            󱤧 numColumns = 3; // Number of columns
            󱤧 numRows = 2; // Number of rows

            // Adjusted window dimensions
            󱤧 windowWidth = 290; // 300 - 10
            󱤧 windowHeight = 150; // 200 - 20

            // Create elements
            BEMA("TextArea", "OpenBundle.Wallpaper." + instanceIDd + ".Window", windowX+100, windowY+101, windowWidth, windowHeight, 󱤂, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Wallpaper." + instanceIDd + ".WindowHeader", windowX+100, headerY+101, windowWidth, 25, 󱤂, 0, 0, "", Surface0, Text, "Wallpapers", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Wallpaper." + instanceIDd + ".Bar.1", barX+100, barY+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);
            BEMA("Button", "OpenBundle.Wallpaper." + instanceIDd + ".Bar.2", barX + 30+100, barY+101, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "center", 11, "Tahoma", 󱥔, "left-arrow.png", "");
            󱤙 (󱤧 i = 0; i < numColumns * numRows; i++) {
                󱤧 col = i % numColumns;
                󱤧 row = Math.floor(i / numColumns);

                󱤧 btnX = windowX + (buttonWidth + buttonSpacing) * col + 12.5; // Sh󱥹ted right by 10px
                󱤧 btnY = windowY + 30 + (buttonHeight + buttonSpacing) * row + 10;

                BEMA("Image", "OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1), btnX+100, btnY+101, buttonWidth, buttonHeight, 󱤂, 0, 0, "", Surface0, Text, "", "left", 11, "Tahoma", 󱥔, "", "");
                setProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button." + (i + 1), "fit", "fill");
                󱥹 (wallpaperImages[i] == "") {
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
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "click", 󱤪󱤨() {
                Next$setWallpaper(wallpaperImages[0]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.2", "click", 󱤪󱤨() {
                Next$setWallpaper(wallpaperImages[1]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.3", "click", 󱤪󱤨() {
                Next$setWallpaper(wallpaperImages[2]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.4", "click", 󱤪󱤨() {
                Next$setWallpaper(wallpaperImages[3]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.5", "click", 󱤪󱤨() {
                Next$setWallpaper(wallpaperImages[4]);
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Button.6", "click", 󱤪󱤨() {
                Next$setWallpaper(wallpaperImages[5]);
            });

            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$Settings("HideAll", "OpenBundle$Wallpapers");
            });
            onEvent("OpenBundle.Wallpaper." + instanceIDd + ".Bar.2", "click", 󱤪󱤨() {
                Bundle$Settings("HideAll", "OpenBundle$Wallpapers");
                Bundle$Settings("", "Settings");
            });
        }
    } 󱥨 󱥹 (Data == "HideAll") {
        eval("󱤙 (󱤧 i = 0; i < data."+Scr+".length; i++) {deleteElement(data."+Scr+"[i]);openBundles$showIcons();}");
          
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } 󱥨 󱥹 (Data == "DeleteApp") {
        // Handle app deletion
    } 󱥨 {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, 󱥔);
        󱥌 "";
    }
}
//Bundle$StickyNote
󱤧 currentNote = "Type your note here!";
󱤪󱤨 Bundle$StickyNote(Data, Scr) {

    󱤧 bundleID = "StickyNote"; // Ident󱥹ier 󱤙 the bundle

    // Check 󱥹 the bundle is already running and handle requests accordingly
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // 󱥹 the bundle is already running and the request is to open or show screens, ignore it
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
        };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 CurrentBundleName = "Bundle$StickyNote";
    󱤧 data = {
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

    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr == "StickyNote") {
            
            BEMA("TextArea", "OpenBundle.StickyNote." + instanceIDd + ".Window", 100+100, 100+100, 200, 200, 󱤂, 0, 0, "", Blank, Base, "", "center", 16, "Tahoma", 󱥔, "", "");
            BEMA("TextArea", "OpenBundle.StickyNote." + instanceIDd + ".Text.1", 100+100, 115+100, 200, 185, 󱤂, 0, 0, "", "#f9e2af", Base, currentNote, "left", 11, "Tahoma", 󱤂, "", "");
            BEMA("Button", "OpenBundle.StickyNote." + instanceIDd + ".WindowHeader", 100+100, 100+100, 200, 15, 󱤂, 0, 0, "", "#e8d19e", Base, "", "center", 5, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.StickyNote." + instanceIDd + ".Bar.1", 100+100, 100+100, 15, 15, 󱤂, 0, 0, "rgb(0,0,0,0)", "#e8d19e", Base, "", "left", 0, "Tahoma", 󱥔, "times_mantle.png", "");
            dragElement("OpenBundle.StickyNote." + instanceIDd + ".WindowHeader", data.OpenBundle$StickyNote);
            onEvent("OpenBundle.StickyNote." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                currentNote = getText("OpenBundle.StickyNote." + instanceIDd + ".Text.1");
                Bundle$StickyNote("HideAll");
            });
        }
    } 󱥨 󱥹 (Data == "HideAll") {
        󱤙 (󱤧 i = 0; i < data.OpenBundle$StickyNote.length; i++) {
            deleteElement(data.OpenBundle$StickyNote[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } 󱥨 󱥹 (Data == "DeleteApp") {
        //not needed 󱤙 this app
    } 󱥨 {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, 󱥔);
        󱥌 "";
    }
}
//Bundle$Terminal
󱤪󱤨 Bundle$Terminal(Data, Scr) {
    󱤧 TermText = Text;
    󱤧 TermBase = Base;
    󱤧 TermSurface0 = Surface0;
    󱤧 TermSurface1 = Surface1;
    󱥹 (Internal || debug) {
        TermText = "#00ff00";
        TermBase = "#000000";
        TermSurface0 = "#111111";
        TermSurface1 = "#222222";
    }
    󱤧 bundleID = "Terminal";
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // 󱥹 the bundle is already running and the request is to open or show screens, ignore it
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
            };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 data = {
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

    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr == "Terminal") {
            󱤧 windowWidth = 400;
            󱤧 windowHeight = 300;

            BEMA("TextArea", "OpenBundle.Terminal." + instanceIDd + ".Window", 100+100, 50+100, windowWidth, windowHeight, 󱤂, 0, 0, "", TermBase, TermText, "", "left", 16, "Courier New", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Terminal." + instanceIDd + ".WindowHeader", 100+100, 50+100, windowWidth, 25, 󱤂, 0, 0, "", TermSurface0, TermText, "Terminal", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("TextArea", "OpenBundle.Terminal." + instanceIDd + ".Display", 100+100, 75+100, windowWidth, windowHeight - 75, 󱤂, 0, 0, "", TermBase, TermText, "Welcome to Next Terminal\n", "left", 14, "Courier New", 󱥔, "", "");
            BEMA("Input", "OpenBundle.Terminal." + instanceIDd + ".Input", 100+100, windowHeight + 25+100, windowWidth, 25, 󱤂, 0, 0, "", TermSurface0, TermText, "Command [args]", "left", 14, "Courier New", 󱤂, "", "");
            BEMA("Button", "OpenBundle.Terminal." + instanceIDd + ".Bar.1", 100+100, 50+100, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", TermSurface1, TermText, "", "center", 12, "Tahoma", 󱥔, "times.png", TermText);
            dragElement("OpenBundle.Terminal." + instanceIDd + ".WindowHeader", data.OpenBundle$Terminal);
            onEvent("OpenBundle.Terminal." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$Terminal("HideAll");
            });

            onEvent("OpenBundle.Terminal." + instanceIDd + ".Input", "keydown", 󱤪󱤨(event) {
                󱥹 (event.key === "Enter") {
                    󱤧 command = getText("OpenBundle.Terminal." + instanceIDd + ".Input");
                    command = command.replace(/\n/g, "");
                    processCommand(command);
                    setText("OpenBundle.Terminal." + instanceIDd + ".Input", "");
                }
            });
        }
    } 󱥨 󱥹 (Data == "DeleteApp") {
        //not needed 󱤙 this app
    } 󱥨 󱥹 (Data == "HideAll") {
        󱤙 (󱤧 i = 0; i < data.OpenBundle$Terminal.length; i++) {
            󱤧 elementId = data.OpenBundle$Terminal[i];
            deleteElement(elementId);
        }
        openBundles$showIcons();
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    }

    󱤪󱤨 processCommand(command) {
        󱤧 output = "";
        󱤧 parts = command.split(" ");
        󱤧 cmd = parts[0].toLowerCase();

        󱥹 (cmd === "help") {
            output = "Available commands:\n" +
                     "help - Show this help message\n" +
                     "echo [text] - Display the given text\n" +
                     "clear - Clear the terminal screen\n" +
                     "date - Show current date and time\n" +
                     "whoami - Display current user\n" +
                     "calc [expression] - Simple calculator, only available 󱤙 developers";

        } 󱥨 󱥹 (cmd === "echo") {
            output = parts.slice(1).join(" ");

        } 󱥨 󱥹 (cmd === "clear") {
            setText("OpenBundle.Terminal." + instanceIDd + ".Display", "");
            󱥌;

        } 󱥨 󱥹 (cmd === "date") {
            output = getTime("HH:mm:ss") + " " + getDate("mm/dd/yyyy");

        } 󱥨 󱥹 (cmd === "whoami") {
            output = "Guest";
            
        } 󱥨 󱥹 (cmd === "calc") {
            󱥹 (Internal || debug) {
            󱥹 (parts.length > 1) {
                output = eval(parts.slice(1).join(" "));
            } 󱥨 {
                output = "Usage: calc [expression]";
            }
        } 󱥨 {
            output = "calc command is not available";
        }
        
        } 󱥨 {
            output = "Command not recognized. Type 'help' 󱤙 available commands.";
        }

        appendToDisplay("> " + command + "\n" + output + "\n");
    }

    󱤪󱤨 appendToDisplay(text) {
        󱤧 display = "OpenBundle.Terminal." + instanceIDd + ".Display";
        setText(display, "Welcome to Next Terminal\n" + text);
    }
}
//Bundle$TextEdit
󱤧 documents = {}; // Store multiple documents
󱤪󱤨 Bundle$TextEdit(Data, Scr, docID) {
    // Load documents into memory (no file operations)
    󱤪󱤨 loadDocuments() {
        // Initialize documents with default content
        documents["text1.mfsf"] = "Type your document here!";
        documents["text2.mfsf"] = "Type your document here!";
        documents["text3.mfsf"] = "Type your document here!";
    }

    //loadDocuments(); // Load documents at the start

    󱤧 bundleID = "TextEdit"; // Ident󱥹ier 󱤙 the bundle

    // Check 󱥹 the bundle is already running and handle requests accordingly
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
        };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 CurrentBundleName = "Bundle$TextEdit";
    󱤧 data = {
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

    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr == "TextEdit") {
            󱥹 (!documents[docID]) {
                documents[docID] = "Type your document here!";
            }
            BEMA("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Window", 100+100, 35+100, 300, 200, 󱤂, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", 100+100, 35+100, 300, 25, 󱤂, 0, 0, "", Surface0, Text, "Text Edit", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Text.1", 100+100, 65+100, 300, 200, 󱤂, 0, 0, "", Base, Text, documents[docID], "left", 11, "Tahoma", 󱤂, "", "");
            BEMA("Button", "OpenBundle.TextEdit." + instanceIDd + ".Bar.1", 100+100, 35+100, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);
            dragElement("OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", data.OpenBundle$TextEdit);
            onEvent("OpenBundle.TextEdit." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                // Save changes to the documents 󱤧iable (no file operations)
                󱤧 currentText = getText("OpenBundle.TextEdit." + instanceIDd + ".Text.1"); // Get the current text
                lipu.󱥬(docID); // 󱥬 the document ID
                lipu.󱥬(currentText); // 󱥬 the current text being saved
                documents[docID] = currentText; // Update the document with the current text
                Bundle$TextEdit("HideAll"); // Hide the editor
                lipu.󱥬(documents); // 󱥬 the updated documents object
            });
        }
    } 󱥨 󱥹 (Data == "HideAll") {
        󱤙 (󱤧 i = 0; i < data.OpenBundle$TextEdit.length; i++) {
            deleteElement(data.OpenBundle$TextEdit[i]);
        }
        openBundles$showIcons();
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } 󱥨 󱥹 (Data == "DeleteApp") {
        // Handle app deletion
    } 󱥨 {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, 󱥔);
        󱥌 "";
    }
}
//Bundle$Tips
󱤪󱤨 Bundle$Tips(Data, Scr) {
    󱤧 bundleID = "Tips"; // Ident󱥹ier 󱤙 the bundle

    // Check 󱥹 the bundle is already running and handle requests accordingly
    󱥹 (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        // 󱥹 the bundle is already running and the request is to open or show screens, ignore it
        󱥌;
    }

    // Initialize or reset the bundle instance 󱥹 it's not already active
    󱥹 (!activeBundles[bundleID]) {
        activeBundles[bundleID] = {
            instanceIDd: generateRandomString(10), // Generate unique ID
            isRunning: 󱥔 // Mark as running
        };
    }

    󱤧 instanceIDd = activeBundles[bundleID].instanceIDd;
    󱤧 isRunning = activeBundles[bundleID].isRunning;

    timedLoop(50, 󱤪󱤨() {
        󱥹 (!isRunning) {
            󱥌;
        }
    });

    󱤧 CurrentBundleName = "Bundle$Tips";
    󱤧 data = {
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

    󱥹 (data[Data]) {
        󱥌 data[Data];
    } 󱥨 󱥹 (Data == null || Data == "") {
        󱥹 (Scr == "Tips") {
            BEMA("TextArea", "OpenBundle.Tips." + instanceIDd + ".Window", 100+100, 35+100, 300, 200, 󱤂, 0, 0, "", Base, Text, "", "center", 16, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Tips." + instanceIDd + ".WindowHeader", 100+100, 35+100, 300, 25, 󱤂, 0, 0, "", Surface0, Text, "Tips", "center", 12, "Tahoma", 󱥔, "", "");
            BEMA("TextArea", "OpenBundle.Tips." + instanceIDd + ".Text.1", 100+100, 65+100, 300, 200, 󱤂, 0, 0, "", Base, Text, tipsAppText, "left", 11, "Tahoma", 󱥔, "", "");
            BEMA("Button", "OpenBundle.Tips." + instanceIDd + ".Bar.1", 100+100, 35+100, 25, 25, 󱤂, 0, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", 󱥔, "times.png", Text);
            dragElement("OpenBundle.Tips." + instanceIDd + ".WindowHeader", data.OpenBundle$Tips);
            onEvent("OpenBundle.Tips." + instanceIDd + ".Bar.1", "click", 󱤪󱤨() {
                Bundle$Tips("HideAll");
            });
        }
    } 󱥨 󱥹 (Data == "HideAll") {
        󱤙 (󱤧 i = 0; i < data.OpenBundle$Tips.length; i++) {
            deleteElement(data.OpenBundle$Tips[i]);
            openBundles$showIcons();
        }
        // Remove the bundle instance from activeBundles
        delete activeBundles[bundleID];
    } 󱥨 󱥹 (Data == "DeleteApp") {
        // Handle app deletion
    } 󱥨 {
        WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, 󱥔);
        󱥌 "";
    }
}

