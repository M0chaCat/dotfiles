console.clear();
//Colors
var Mantle = "#181825";
var Base = "#1e1e2e";
var Text = "#cdd6f4";
var Blank = "rgba(0,0,0,0)";
var Surface0 = "#313244";
var Surface1 = "#45475a";
var Surface2 = "#585b70";

//Screens
setScreen("Next.Boot");
BEMA.Element("Button", "Next.Boot.Image.1", 232.5, 135, 75, 75, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "normal.PNG", Text);
BEMA.Element("Button", "Next.Boot.Text.1", 165, 135, 200, 200, false, 5, 0, "", Blank, Text, "Welcome to Next", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Boot.Image.2", 120, 50, 300, 300, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "https://superstorefinder.net/support/wp-content/uploads/2018/01/grey_style.gif", Text);
//BEMA.Element("Button", "Next.Boot.Image.3", 170, 150, 200, 200, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "Bootlicker.gif", Text);
BEMA.Element("TextArea", "Next.Boot.Text.2", 10, 410, 300, 30, false, 0, 0, "", Surface0, Text, "Install Equinox Desktop to use Next", "center", 15, "Tahoma", true, "", Text);

setScreen("Next.Old");
BEMA.Element("TextArea", "Next.Old.Text.2", 10, 410, 300, 30, false, 0, 0, "", Blank, Text, "Install Equinox Desktop to use Next", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Image", "Next.Old.Image.1", 220, 180, 100, 100, false, 0, 0, "", Blank, Text, "", "center", 15, "Tahoma", true, "icon://fa-exclamation-triangle", "#f9e2af");
BEMA.Element("TextArea", "Next.Old.Text.1", 20, 110, 500, 200, false, 0, 0, "", Blank, Text, "Your Next version is out of date, please reload!", "center", 15, "Tahoma", true, "", Text);

setScreen("Next.Main");
BEMA.Element("TextArea", "Next.Main.Text.1", 10, 410, 300, 30, false, 0, 0, "", Base, Text, "Install Equinox Desktop to use Next", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Image", "Next.Main.Image.2", -3, -3, 550, 405, false, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
setProperty("Next.Main.Image.2", "fit", "fill");

BEMA.Element("TextArea", "Next.Main.Dock", 15, 340, 510, 50, false, 10, 0, "", Mantle, Text, "", "right", 30, "Lucida", true, "", Text);
BEMA.Element("TextArea", "Next.Main.Dock.Time", 320, 350, 200, 25, false, 10, 0, "", Blank, Text, "", "right", 15, "Lucida", true, "", Text);
setStyle("Next.Main.Dock", "z-index: 10");
setStyle("Next.Main.Dock.Time", "z-index: 10");

BEMA.Element("Button", "Next.Main.Dock.0", 15, 340, 50, 50, false, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "normal.PNG", Text);
BEMA.Element("Button", "Next.Main.Dock.1", 70, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Main.Dock.2", 125, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Main.Dock.3", 180, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Main.Dock.4", 235, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Main.Dock.5", 290, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
setStyle("Next.Main.Dock.0", "z-index: 11");
setStyle("Next.Main.Dock.1", "z-index: 11");
setStyle("Next.Main.Dock.2", "z-index: 11");
setStyle("Next.Main.Dock.3", "z-index: 11");
setStyle("Next.Main.Dock.4", "z-index: 11");
setStyle("Next.Main.Dock.5", "z-index: 11");

BEMA.Element("Button", "Next.Main.Icon.1", 5, 5, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-hdd-o", Text);
BEMA.Element("Button", "Next.Main.Icon.2", 5, 60, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-text-o", Text);
BEMA.Element("Button", "Next.Main.Icon.3", 5, 115, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-word-o", Text);
BEMA.Element("Button", "Next.Main.Icon.4", 5, 170, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-text-o", Text);
BEMA.Element("Button", "Next.Main.Icon.5", 5, 225, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-code-o", Text);
BEMA.Element("Button", "Next.Main.Icon.6", 5, 280, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Next.Main.Icon.7", 60, 5, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Next.Main.Icon.8", 60, 60, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-excel-o", Text);
BEMA.Element("Button", "Next.Main.Icon.9", 60, 115, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-powerpoint-o", Text);
 BEMA.Element("Button", "Next.Main.Icon.10", 60, 170, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Next.Main.Icon.11", 60, 225, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Next.Main.Icon.12", 60, 280, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);

BEMA.Element("TextArea", "Next.Main.Image.1", -3, -3, 0, 0, true, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);


setScreen("Next.Login");
BEMA.Element("TextArea", "Next.Login.Text.2", 10, 410, 300, 30, false, 0, 0, "", Surface0, Text, "Install Equinox Desktop to use Next", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Image", "Next.Login.Image.2", -3, -3, 550, 405, false, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
setProperty("Next.Login.Image.2", "fit", "fill");

BEMA.Element("TextArea", "Next.Login.Text.1", 140, 200, 250, 25, true, 5, 0, "", Base, Text, "Incorrect Username/Password", "center", 12, "Tahoma", true, "", Text);
//BEMA.Element("TextArea", "Next.Login.Window", 140, 65, 250, 170, false, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("TextArea", "Next.Login.Window", 217.5, 80, 100, 100, false, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Login.Image.1", 232.5, 85, 75, 75, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "normal.PNG", Text);
//BEMA.Element("Button", "Next.Login.Text.1", 165, 85, 200, 200, false, 5, 0, "", Blank, Text, "Welcome to Next", "center", 15, "Tahoma", true, "", Text);

BEMA.Element("Input", "Next.Login.Input.1", 140, 250, 250, 30, false, 5, 0, "", Base, Text, "Username", "center", 12, "Tahoma", true, "", Text);
BEMA.Element("Input", "Next.Login.Input.2", 140, 285, 250, 30, false, 5, 0, "", Base, Text, "Password", "center", 12, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Login.Button.1", 140, 320, 120, 30, false, 5, 0, "", Base, Text, "Login", "center", 12, "Tahoma", true, "", Text);
BEMA.Element("Button", "Next.Login.Button.2", 270, 320, 120, 30, false, 5, 0, "", Base, Text, "Login As Guest", "center", 12, "Tahoma", true, "", Text);
