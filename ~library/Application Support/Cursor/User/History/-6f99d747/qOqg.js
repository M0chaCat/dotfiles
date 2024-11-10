/*

to fix multitasking and have windows layer ontop of eachother use this kinda code:

onEvent("button1", "click", function(event) {
  setStyle("button1", "z-index: 1");
  setStyle("button2", "z-index: 0");
});
onEvent("button2", "click", function(event) {
  setStyle("button2", "z-index: 1");
  setStyle("button1", "z-index: 0");
});

// This file contains the logic for handling drag events for windows in the application.
// It allows for smooth dragging of windows and related elements.
// When a window is dragged, it is moved to the top layer.

*/

var beingDragged = false;
var offsetX = 0;
var offsetY = 0;
var currentWindowElem = null;
var relatedElements = [];

// Function to retrieve all window element IDs
function getAllWindowElements() {
    var windowElements = [];
    for (var bundleID in activeBundles) {
        if (activeBundles.hasOwnProperty(bundleID)) {
            var instanceIDd = activeBundles[bundleID].instanceIDd;
            // Construct the window element ID based on your naming convention
            var windowID = "OpenBundle." + bundleID + "." + instanceIDd + ".Window";
            windowElements.push(windowID);
        }
    }
    return windowElements;
}

// Function to set z-index of all windows
function setZIndex(draggedWindowId) {
    var allWindows = getAllWindowElements();
    allWindows.forEach(function(windowId) {
        if (windowId === draggedWindowId) {
            setStyle(windowId, "z-index", "100"); // High z-index for dragged window
            console.log("Set z-index of " + windowId + " to 100");
        } else {
            setStyle(windowId, "z-index", "99"); // Fixed lower z-index for other windows
            console.log("Set z-index of " + windowId + " to 99");
        }
    });
}

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

        // No need to adjust z-index here
    }
}

function startDrag(event, windowElem, elements) {
    beingDragged = true;
    currentWindowElem = windowElem;
    offsetX = event.x - getXPosition(windowElem);
    offsetY = event.y - getYPosition(windowElem);
    relatedElements = [];

    // Set z-index when drag starts
    setZIndex(currentWindowElem);

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