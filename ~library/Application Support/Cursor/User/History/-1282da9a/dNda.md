hewwo ai models of many kinds! this doc is to help u keep track of all the commands and functions and such in the codebase, so it can be used for reference or for training new ais! if u have any questions or need to add anything, please let me know!

here's a text file explaining how the centralized drag handler works and how to integrate it into other bundles or components.

### DragHandler Integration Guide

#### Overview

This guide explains how to use a centralized drag handler to manage the dragging functionality for various bundles or components in your application. The centralized drag handler ensures that all related elements move together smoothly when dragged.

#### Files Involved

1. **DragHandler.js**: Contains the centralized drag handler logic.
2. **Bundle Files**: Individual bundle files (e.g., `Settings.js`, `Tips.js`, `Stickynote.js`, `CeleWeb.js`) that use the drag handler.

#### DragHandler.js

This file contains the logic for handling drag events. It exports two functions: `startDrag` and `stopDrag`.

```javascript:Bundles/DragHandler.js
var beingDragged = false;
var offsetX = 0;
var offsetY = 0;
var currentWindowElem = null;
var relatedElements = [];

function handleDrag(event) {
    if (beingDragged && currentWindowElem) {
        var newX = event.x - offsetX;
        var newY = event.y - offsetY;
        setPosition(currentWindowElem, newX, newY);

        // Update positions of all related elements
        for (var i = 0; i < relatedElements.length; i++) {
            var elem = relatedElements[i];
            setPosition(elem.id, newX + elem.offsetX, newY + elem.offsetY);
        }
    }
}

function startDrag(event, windowElem, elements) {
    beingDragged = true;
    currentWindowElem = windowElem;
    offsetX = event.x - getXPosition(windowElem);
    offsetY = event.y - getYPosition(windowElem);
    relatedElements = [];
    for (var i = 0; i < elements.length; i++) {
        var id = elements[i];
        relatedElements.push({
            id: id,
            offsetX: getXPosition(id) - getXPosition(windowElem),
            offsetY: getYPosition(id) - getYPosition(windowElem)
        });
    }
    onEvent("Next.Main", "mousemove", handleDrag);
}

function stopDrag() {
    beingDragged = false;
    currentWindowElem = null;
    relatedElements = [];
}

onEvent("Next.Main", "mouseup", stopDrag);

export { startDrag, stopDrag };
```

#### Integrating DragHandler.js into Bundle Files

To use the centralized drag handler in a bundle file, follow these steps:

1. **Import the `startDrag` function** from `DragHandler.js`.
2. **Remove any old `handleDrag` function** and related variables.
3. **Update the `mousedown` event handler** to use the `startDrag` function, passing the window element and related elements.

#### Example: Updating `Settings.js`

```javascript:Bundles/Settings.js
import { startDrag } from './DragHandler';

function Bundle$Settings(Data, Scr) {
    var bundleID = "Settings"; // Identifier for the bundle

    // Check if the bundle is already running and handle requests accordingly
    if (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        return;
    }

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

    var CurrentBundleName = "Bundle$Settings";
    var data = {
        Screens: ["OpenBundle.Settings"],
        OpenBundle$Settings: [
            "OpenBundle.Settings." + instanceIDd + ".Bar.1",
            "OpenBundle.Settings." + instanceIDd + ".Window",
            "OpenBundle.Settings." + instanceIDd + ".WindowHeader",
            "OpenBundle.Settings." + instanceIDd + ".Button.1",
            "OpenBundle.Settings." + instanceIDd + ".Button.2",
            "OpenBundle.Settings." + instanceIDd + ".Button.3"
        ],
    };

    OpenBundles.RegisterAppBundle("Settings", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "Settings") {
            BEMA.Element("TextArea", "OpenBundle.Settings." + instanceIDd + ".Window", 100, 35, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.Settings." + instanceIDd + ".WindowHeader", 100, 35, 300, 25, false, 10, 0, "", Surface0, Text, "Settings", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("Button", "OpenBundle.Settings." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            onEvent("OpenBundle.Settings." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$Settings("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.Settings." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.Settings." + instanceIDd + ".Window", [
                    "OpenBundle.Settings." + instanceIDd + ".WindowHeader",
                    "OpenBundle.Settings." + instanceIDd + ".Bar.1",
                    "OpenBundle.Settings." + instanceIDd + ".Button.1",
                    "OpenBundle.Settings." + instanceIDd + ".Button.2",
                    "OpenBundle.Settings." + instanceIDd + ".Button.3"
                ]);
            });

            // ... existing code ...
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$Settings.length; i++) {
            deleteElement(data.OpenBundle$Settings[i]);
            OpenBundles.showIcons();
        }
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        SFS.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
```

#### Example: Updating `CeleWeb.js`

```javascript:Bundles/CeleWeb.js
import { startDrag } from './DragHandler';

//Bundle$CeleWeb
function Bundle$CeleWeb(Data, Scr) {
    var bundleID = "CeleWeb"; // Identifier for the bundle

    // Check if the bundle is already running and handle requests accordingly
    if (activeBundles[bundleID] && (Data === "Open" || Data === null || Data === "")) {
        return;
    }

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

    var CurrentBundleName = "Bundle$CeleWeb";
    var data = {
        Screens: ["OpenBundle.CeleWeb"],
        OpenBundle$CeleWeb: [
            "OpenBundle.CeleWeb." + instanceIDd + ".Bar.1",
            "OpenBundle.CeleWeb." + instanceIDd + ".Window",
            "OpenBundle.CeleWeb." + instanceIDd + ".WindowHeader",
            "OpenBundle.CeleWeb." + instanceIDd + ".Text.1",
        ],
    };

    OpenBundles.RegisterAppBundle("CeleWeb", data.Screens);
    OpenBundles.hideIcons();

    if (data[Data]) {
        return data[Data];
    } else if (Data == null || Data == "") {
        if (Scr == "CeleWeb") {
            BEMA.Element("TextArea", "OpenBundle.CeleWeb." + instanceIDd + ".Window", 100, 35, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.CeleWeb." + instanceIDd + ".WindowHeader", 100, 35, 300, 25, false, 10, 0, "", Surface0, Text, "CeleWeb", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.CeleWeb." + instanceIDd + ".Text.1", 100, 65, 300, 200, false, 10, 0, "", Base, Text, "ok so like CeleWeb has not *actually* started dev, mainly cuz its a large project with dynamic locations, WebBundles, and more so like its hard n stuff uhhh yea, just wait till 1.0 or 2.0 or smth", "left", 11, "Tahoma", false, "", "");
            BEMA.Element("Button", "OpenBundle.CeleWeb." + instanceIDd + ".Bar.1", 100, 35, 25, 25, false, 10, 0, "rgb(0,0,0,0)", Surface1, Text, "", "left", 0, "Tahoma", true, "icon://fa-times", Text);

            onEvent("OpenBundle.CeleWeb." + instanceIDd + ".Bar.1", "click", function() {
                Bundle$CeleWeb("HideAll");
            });

            // Mouse down event: Start dragging
            onEvent("OpenBundle.CeleWeb." + instanceIDd + ".WindowHeader", "mousedown", function(event) {
                startDrag(event, "OpenBundle.CeleWeb." + instanceIDd + ".Window", [
                    "OpenBundle.CeleWeb." + instanceIDd + ".WindowHeader",
                    "OpenBundle.CeleWeb." + instanceIDd + ".Bar.1",
                    "OpenBundle.CeleWeb." + instanceIDd + ".Text.1"
                ]);
            });

            // ... existing code ...
        }
    } else if (Data == "HideAll") {
        for (var i = 0; i < data.OpenBundle$CeleWeb.length; i++) {
            deleteElement(data.OpenBundle$CeleWeb[i]);
            OpenBundles.showIcons();
        }
        delete activeBundles[bundleID];
    } else if (Data == "DeleteApp") {
        // Handle app deletion
    } else {
        SFS.WriteError("Unknown error with " + CurrentBundleName, CurrentBundleName, true);
        return "";
    }
}
```

#### Conclusion

By following this guide, you can integrate the centralized drag handler into any bundle or component in your application. This approach ensures that all related elements move together smoothly when dragged, making the code more maintainable and consistent.









### Commands:
```infofor AIs.txt
### Commands:
```
write all custom commands not in normal js used throughout the project here and name what they do and an example

1. **BEMA.Element**: Creates a UI element.
   - **Example**:
   
```50:52:Bundles/TextEdit.js
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Window", 100, 35, 300, 200, false, 10, 0, "", Base, Text, "", "center", 16, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".WindowHeader", 100, 35, 300, 25, false, 10, 0, "", Surface0, Text, "Text Edit", "center", 12, "Tahoma", true, "", "");
            BEMA.Element("TextArea", "OpenBundle.TextEdit." + instanceIDd + ".Text.1", 100, 65, 300, 200, false, 10, 0, "", Base, Text, documents[docID], "left", 11, "Tahoma", false, "", "");
```


2. **onEvent**: Attaches an event handler to an element.
   - **Example**:
   
```55:57:Bundles/TextEdit.js
            onEvent("OpenBundle.TextEdit." + instanceIDd + ".Bar.1", "click", function() {
                documents[docID] = getText("OpenBundle.TextEdit." + instanceIDd + ".Text.1");
                Bundle$TextEdit("HideAll");
```


3. **setText**: Sets the text content of an element.
   - **Example**:
   
```144:145:Bundles/Calculator.js
                setText(displayElement, result);
            } catch (e) {
```


4. **getText**: Gets the text content of an element.
   - **Example**:
   
```52:52:Bundles/Stickynote.js
                currentNote = getText("OpenBundle.StickyNote." + instanceIDd + ".Text.1");
```


5. **deleteElement**: Deletes a UI element.
   - **Example**:
   
```71:71:Bundles/TextEdit.js
            deleteElement(data.OpenBundle$TextEdit[i]);
```


6. **startDrag**: Initiates a drag event for an element.
   - **Example**:
   
```110:116:Bundles/Settings.js
                startDrag(event, "OpenBundle.Settings." + instanceIDd + ".Window", [
                    "OpenBundle.Settings." + instanceIDd + ".WindowHeader",
                    "OpenBundle.Settings." + instanceIDd + ".Bar.1",
                    "OpenBundle.Settings." + instanceIDd + ".Button.1",
                    "OpenBundle.Settings." + instanceIDd + ".Button.2",
                    "OpenBundle.Settings." + instanceIDd + ".Button.3"
                ]);
```


7. **stopDrag**: Stops a drag event.
   - **Example**:
   
```56:56:Bundles/DragHandler.js

```


8. **OpenBundles.RegisterAppBundle**: Registers an app bundle.
   - **Example**:
   
```40:40:Bundles/TextEdit.js
    OpenBundles.RegisterAppBundle("TextEdit", data.Screens);
```


9. **OpenBundles.hideIcons**: Hides icons.
   - **Example**:
   
```41:41:Bundles/TextEdit.js
    OpenBundles.hideIcons();
```


10. **OpenBundles.showIcons**: Shows icons.
    - **Example**:
    
```72:72:Bundles/TextEdit.js
            OpenBundles.showIcons();
```


11. **SFS.generateRandomString**: Generates a random string.
    - **Example**:
    
```15:15:Bundles/TextEdit.js
            instanceIDd: SFS.generateRandomString(10), // Generate unique ID
```


12. **SFS.WriteError**: Logs an error message.
    - **Example**:
    
```154:154:Bundles/TextEdit.js

```


13. **timedLoop**: Executes a function repeatedly at specified intervals.
    - **Example**:
    
```23:27:Bundles/TextEdit.js
    timedLoop(50, function() {
        if (!isRunning) {
            return;
        }
    });
```


14. **setProperty**: Sets a property of an element.
    - **Example**:
    
```94:104:Bundles/Settings.js
                setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#f38ba8");
            } else {
                setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#a6e3a1");
            }
            onEvent("OpenBundle.Settings." + instanceIDd + ".Button.3", "click", function() {
                if (!lockIcons) {
                    setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#f38ba8");
                    lockIcons = true;
                } else {
                    setProperty("OpenBundle.Settings." + instanceIDd + ".Button.3", "background-color", "#a6e3a1");
                    lockIcons = false;
```


15. **getProperty**: Gets a property of an element.
    - **Example**:
    
```189:189:Bundles/Settings.js
                Next.setWallpaper(getProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "image"));
```


16. **Next.setWallpaper**: Sets the wallpaper.
    - **Example**:
    
```189:189:Bundles/Settings.js
                Next.setWallpaper(getProperty("OpenBundle.Wallpaper." + instanceIDd + ".Button.1", "image"));
```


17. **OpenBundles.addApp**: Adds an app to the system.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 22
    endLine: 26
    ```

18. **OpenBundles.openApp**: Opens an app.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 111
    endLine: 123
    ```

19. **OpenBundles.InstallShortcut**: Installs a shortcut for an app.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 44
    endLine: 46
    ```

20. **Next.InstallApp**: Installs an app.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 39
    endLine: 43
    ```

21. **Next.UninstallApp**: Uninstalls an app.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 52
    endLine: 52
    ```

22. **OpenBundles.UninstallShortcut**: Uninstalls a shortcut for an app.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 53
    endLine: 53
    ```

23. **Solaris.addOS**: Adds an operating system.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 57
    endLine: 57
    ```

24. **Solaris.enableAutoBoot**: Enables auto-boot for an operating system.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 59
    endLine: 59
    ```

25. **setScreen**: Sets the current screen.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 36
    endLine: 36
    ```

26. **showElement**: Shows a UI element.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 79
    endLine: 79
    ```

27. **hideElement**: Hides a UI element.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 48
    endLine: 50
    ```

28. **getKeyValue**: Retrieves a key-value pair.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 28
    endLine: 33
    ```

29. **createRecord**: Creates a record in the database.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 30
    endLine: 30
    ```

30. **Next.LoginAccount**: Logs in a user account.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 71
    endLine: 71
    ```

31. **Next.controlKey**: Handles the control key event.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 103
    endLine: 103
    ```

32. **SFS.gettime**: Gets the current time.
    - **Example**:
    ```javascript:Main Code.js
    startLine: 62
    endLine: 62
    ```
```