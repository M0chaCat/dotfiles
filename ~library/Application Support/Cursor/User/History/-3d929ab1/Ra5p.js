var Mantle = "#181825";
var Base = "#1e1e2e";
var Text = "#cdd6f4";
var Blank = "rgba(0,0,0,0)";
var Surface0 = "#313244";
var Surface1 = "#45475a";
var Surface2 = "#585b70";
//extras
var bg = "#008080";

BEMA("TextArea", "Zarn", -4.5, -4.5, 820, 607.5, true, 0, 0, Base, Base, Text, "Meow", "left", 15, "Tahoma", true, "", Text);
BEMA("Input", "commandInput", -4.5, 650, 820, 10, true, 0, 0, Surface0, Surface0, Text, "Meow", "left", 15, "Tahoma", false, "", Text);
    

function setScreen(Screen) {
    hideAllScreens();
    if (Screen == "Home") {
        showElement("Zarn");
        showElement("commandInput");
    }
}

function hideAllScreens() {
    hideElement("Zarn");
    hideElement("commandInput");
}

//Code
setScreen("Home");
