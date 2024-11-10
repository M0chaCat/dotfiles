// Example usage of the BEMA.Element function
function BEMA_Element(elementType, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl) {
    window.api.createElement(elementType, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl);
}

// Example of creating elements
document.addEventListener("DOMContentLoaded", function() {
    BEMA_Element("button", "Celeste.Boot.Image.1", 232.5, 135, 75, 75, false, 5, "transparent", "#cdd6f4", "", "left", 5, "Arial", true, "normal.PNG");
    BEMA_Element("button", "Celeste.Boot.Text.1", 165, 135, 200, 200, false, 5, "transparent", "#cdd6f4", "Welcome to Celeste", "center", 15, "Tahoma", true, "");
    BEMA_Element("button", "Celeste.Boot.Image.2", 120, 50, 300, 300, false, 5, "transparent", "#cdd6f4", "", "left", 5, "Arial", true, "https://superstorefinder.net/support/wp-content/uploads/2018/01/grey_style.gif");
    BEMA_Element("textarea", "Celeste.Boot.Text.2", 10, 410, 300, 30, false, 0, "#313244", "#cdd6f4", "Install Equinox Desktop to use Celeste", "center", 15, "Tahoma", true, "");
});