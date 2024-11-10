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
setScreen("Celeste.Boot");
BEMA.Element("Button", "Celeste.Boot.Image.1", 232.5, 135, 75, 75, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "normal.PNG", Text);
BEMA.Element("Button", "Celeste.Boot.Text.1", 165, 135, 200, 200, false, 5, 0, "", Blank, Text, "Welcome to Celeste", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Boot.Image.2", 120, 50, 300, 300, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "https://superstorefinder.net/support/wp-content/uploads/2018/01/grey_style.gif", Text);
//BEMA.Element("Button", "Celeste.Boot.Image.3", 170, 150, 200, 200, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "Bootlicker.gif", Text);
BEMA.Element("TextArea", "Celeste.Boot.Text.2", 10, 410, 300, 30, false, 0, 0, "", Surface0, Text, "Install Equinox Desktop to use Celeste", "center", 15, "Tahoma", true, "", Text);

setScreen("Celeste.Old");
BEMA.Element("TextArea", "Celeste.Old.Text.2", 10, 410, 300, 30, false, 0, 0, "", Blank, Text, "Install Equinox Desktop to use Celeste", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Image", "Celeste.Old.Image.1", 220, 180, 100, 100, false, 0, 0, "", Blank, Text, "", "center", 15, "Tahoma", true, "icon://fa-exclamation-triangle", "#f9e2af");
BEMA.Element("TextArea", "Celeste.Old.Text.1", 20, 110, 500, 200, false, 0, 0, "", Blank, Text, "Your Celeste version is out of date, please reload!", "center", 15, "Tahoma", true, "", Text);

setScreen("Celeste.Main");
BEMA.Element("TextArea", "Celeste.Main.Text.1", 10, 410, 300, 30, false, 0, 0, "", Base, Text, "Install Equinox Desktop to use Celeste", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Image", "Celeste.Main.Image.2", -3, -3, 550, 405, false, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
setProperty("Celeste.Main.Image.2", "fit", "fill");

BEMA.Element("TextArea", "Celeste.Main.Dock", 15, 340, 510, 50, false, 10, 0, "", Mantle, Text, "", "right", 30, "Lucida", true, "", Text);
BEMA.Element("TextArea", "Celeste.Main.Dock.Time", 420, 350, 100, 25, false, 10, 0, "", Blank, Text, "", "right", 15, "Lucida", true, "", Text);

EMA.Element("Button", "Celeste.Main.Dock.0", 15, 340, 50, 50, false, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "normal.PNG", Text);
BEMA.Element("Button", "Celeste.Main.Dock.1", 70, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Main.Dock.2", 125, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Main.Dock.3", 180, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Main.Dock.4", 235, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Main.Dock.5", 290, 340, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);

BEMA.Element("Button", "Celeste.Main.Icon.1", 5, 5, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-hdd-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.2", 5, 60, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-text-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.3", 5, 115, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-word-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.4", 5, 170, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-text-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.5", 5, 225, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-code-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.6", 5, 280, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.7", 60, 5, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.8", 60, 60, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-excel-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.9", 60, 115, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-powerpoint-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.10", 60, 170, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.11", 60, 225, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);
BEMA.Element("Button", "Celeste.Main.Icon.12", 60, 280, 50, 50, true, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "icon://fa-file-o", Text);

BEMA.Element("TextArea", "Celeste.Main.Image.1", -3, -3, 0, 0, true, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);


setScreen("Celeste.Login");
BEMA.Element("TextArea", "Celeste.Login.Text.2", 10, 410, 300, 30, false, 0, 0, "", Surface0, Text, "Install Equinox Desktop to use Celeste", "center", 15, "Tahoma", true, "", Text);
BEMA.Element("Image", "Celeste.Login.Image.2", -3, -3, 550, 405, false, 0, 0, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
setProperty("Celeste.Login.Image.2", "fit", "fill");

BEMA.Element("TextArea", "Celeste.Login.Text.1", 140, 200, 250, 25, true, 5, 0, "", Base, Text, "Incorrect Username/Password", "center", 12, "Tahoma", true, "", Text);
//BEMA.Element("TextArea", "Celeste.Login.Window", 140, 65, 250, 170, false, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("TextArea", "Celeste.Login.Window", 217.5, 80, 100, 100, false, 10, 3, Base, Base, Text, "", "left", 5, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Login.Image.1", 232.5, 85, 75, 75, false, 5, 0, "", Blank, Text, "", "left", 5, "Arial", true, "normal.PNG", Text);
//BEMA.Element("Button", "Celeste.Login.Text.1", 165, 85, 200, 200, false, 5, 0, "", Blank, Text, "Welcome to Celeste", "center", 15, "Tahoma", true, "", Text);

BEMA.Element("Input", "Celeste.Login.Input.1", 140, 250, 250, 30, false, 5, 0, "", Base, Text, "Username", "center", 12, "Tahoma", true, "", Text);
BEMA.Element("Input", "Celeste.Login.Input.2", 140, 285, 250, 30, false, 5, 0, "", Base, Text, "Password", "center", 12, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Login.Button.1", 140, 320, 120, 30, false, 5, 0, "", Base, Text, "Login", "center", 12, "Tahoma", true, "", Text);
BEMA.Element("Button", "Celeste.Login.Button.2", 270, 320, 120, 30, false, 5, 0, "", Base, Text, "Login As Guest", "center", 12, "Tahoma", true, "", Text);

