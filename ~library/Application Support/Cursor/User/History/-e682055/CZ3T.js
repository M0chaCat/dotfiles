

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
    onEvent("Celeste.Main", "mousemove", handleDrag);
}

function stopDrag() {
    beingDragged = false;
    currentWindowElem = null;
    relatedElements = [];
}

onEvent("Celeste.Main", "mouseup", stopDrag);

