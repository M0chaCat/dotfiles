//Code
setScreen("Solaris.Boot");
OpenBundles.config("Celeste", ".Main.Image.1", ".Main.Dock.");
var Version = "0.4";
var CompatableFirmware = 1;
var tipsAppText = "Welcome to the Celeste semi-public alpha wave 1";
var Apps = {}; //list of apps and app data
var icons = ["", "", "", "", "", "", "", "", ""];
var BarIcons = ["", "", "", "", ""];
var activeBundles = {};
var debug = false; //dont config here, use -d
var Internal = true; //its recomended not to change this
var secure = true; //dont config here, use -s
var online = true; //dont config here, use -o
var lockIcons = false; //dont config here, use -li
var safemode = false; //dont config here, use -sm
var acctoken = null; //its recomended not to change this on your own
var Username = null; //its recomended not to change this on your own
var PID = "024-03-0ef-050-087-0a0-0cb-066-02a-059-0ee-02*0a4-01-0d7-0a8-087-0a0-0cb-066-0d6-03f-057-096-0aa-026-097-046-0c-0a5-0d0-0d5-03b-0cc-09-010-056-050-013-0ea-08b-07e-039-031-066-03b-0d7-0c9-01b-0c8-05f-0f3-05e-01d-083-03d-0d9-07f-068-04-07a-0da-03f-047-042-0c7-0c9-0a6-0da-03d-0a0-01e-010-0e9-0b8-08d-01-069-04b-077-0d0-0a7-0de-095-055-037-0fb-06a-0d3-01b-06d-01a-039-0bb-068-0f4-013-06e-0c3-05-0e6-0c8-068-01e-0b4-0b-0b1-041-0d7-0d4-010-0f8-02e-031-020-0c7-013-054-0d5-030-0b0-0-0a5-06f-026-095-0-0b6-0da-0a4-0d9-052-0a-021-08e-05c-065-091-052-07b-0ae-011-079-0f4-0c4-082-0ad-078-0a6-0d6-071-096-01d-075-080-0cb-0f9-052-09-025-063-033-035-049-0d4-057-0b4-062-017-084-0a7-029-06d-0db-0ba-09e-077-03b-067-079*083-03-0e7-04c-087-0a0-0cb-066-08d-07d-019-0-0ca-01a-01f-058-07a-0e7-0ea-06b-0da-0fa-0d5-012-090-027-047-09c-0c0-027-097-03e-0b1-0f6-01-045-074-0c5-0d4-0fc-0b3-019-0f1-0fc-0e1-0b4-0de-06a-026-0c2-0c-097-011-0e3-0-042-089-0f0-0a1-08d-089-056-02c-094-0dc-06c-04a-05c-078-04a-038-0eb";
var currentWallpaper = "";

OpenBundles.addApp("Text File 1", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"0\");", "icon://fa-file-text-o", true, true);
OpenBundles.addApp("Text File 2", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"1\");", "icon://fa-file-text-o", true, true);
OpenBundles.addApp("Text File 3", 1, "Arcane", "Bundle$TextEdit(null, \"TextEdit\", \"2\");", "icon://fa-file-text-o", true, true);
OpenBundles.addApp("Sticky Note", 1, "Arcane", "Bundle$StickyNote(null, \"StickyNote\");", "icon://fa-sticky-note-o", true, true);
OpenBundles.addApp("Tips", 1, "Arcane", "Bundle$Tips(null, \"Tips\");", "icon://fa-lightbulb-o", true, true);
OpenBundles.addApp("NetStar", 1, "Arcane", "Bundle$NetStar(null, \"NetStar\");", "icon://fa-cloud", true, true);
OpenBundles.addApp("Calculator", 1, "Arcane", "Bundle$Calculator(null, \"Calculator\");", "icon://fa-calculator", true, true);
OpenBundles.addApp("Jukebox", 1, "Arcane", "Bundle$Jukebox(null, \"Jukebox\");", "icon://fa-music", true, true);

getKeyValue("PIDKey", function tion(PIDKey) { //verify system security
  if (!PVS2.checkPID(PID, PIDKey)) {
    createRecord("BannedIDS", {IDS:(getUserId())}, function tion(record) {}); //ban if bad
      console.log("BAN!!1!11!!");
  }
});

function boot() {
  setScreen("Celeste.Boot"); 
  //InstallApp("HDD", "icon://fa-hdd-o");
  Celeste.Boot("-s -o -li", CompatableFirmware);
  Celeste.InstallApp("Text File 1", "icon://fa-file-text-o");
  Celeste.InstallApp("Text File 2", "icon://fa-file-text-o");
  Celeste.InstallApp("Text File 3", "icon://fa-file-text-o");
  Celeste.InstallApp("Sticky Note", "icon://fa-sticky-note-o");
  Celeste.InstallApp("Tips", "icon://fa-lightbulb-o");
  Celeste.InstallApp("NetStar", "icon://fa-cloud");
  Celeste.InstallApp("Jukebox", "icon://fa-music");
  Celeste.InstallApp("Calculator", "icon://fa-calculator");
  OpenBundles.InstallShortcut("Sticky Note", "icon://fa-sticky-note-o");
  OpenBundles.InstallShortcut("Tips", "icon://fa-lightbulb-o");
  OpenBundles.InstallShortcut("NetStar", "icon://fa-cloud");
  if (!Internal) {
   hideElement("Celeste.Login.Input.1");
   hideElement("Celeste.Login.Input.2");
   hideElement("Celeste.Login.Button.1");
   setPosition("Celeste.Login.Button.2", 207.5, 200);
   Celeste.UninstallApp("CeleWeb");
   OpenBundles.UninstallShortcut("CeleWeb");
  }
}

Solaris.addOS("Celeste", Version, "boot();", "normal.PNG");

Solaris.enableAutoBoot("Celeste");

timedLoop(900, function() { //clock
  setText("Celeste.Main.Dock", SFS.gettime("hh:mm:ss"));
});





//Login
onEvent("Celeste.Login.Button.1", "click", function( ) {
  if(Celeste.LoginAccount(getText("Celeste.Login.Input.1"), getText("Celeste.Login.Input.2")) != false) {
    setText("Celeste.Boot.Text.1", "Logging In");
    setScreen("Celeste.Boot");
   setTimeout(function() {
  setScreen("Celeste.Main");
  setText("Celeste.Boot.Text.1", "Welcome to Celeste");
}, 2000);
} else {
  showElement("Celeste.Login.Text.1")
    setTimeout(function() {
  hideElement("Celeste.Login.Text.1")
    }, 500);
}
});

onEvent("Celeste.Login.Button.2", "click", function( ) {
  setText("Celeste.Boot.Text.1", "Logging In");
  setScreen("Celeste.Boot");
  setTimeout(function() {
  setScreen("Celeste.Main");
  setText("Celeste.Boot.Text.1", "Welcome to Celeste");
}, 2000);
});





//Main

onEvent("Celeste.Main", "keydown", function(event) {
  if (event.key == "Control") {
    Celeste.controlKey();
  }
});

onEvent("Celeste.Main.Dock.0", "click", function( ) {
  Celeste.controlKey();
});
onEvent("Celeste.Main.Dock.1", "click", function( ) {
  OpenBundles.openApp(BarIcons[0]);
});
onEvent("Celeste.Main.Dock.2", "click", function( ) {
  OpenBundles.openApp(BarIcons[1]);
});
onEvent("Celeste.Main.Dock.3", "click", function( ) {
  OpenBundles.openApp(BarIcons[2]);
});
onEvent("Celeste.Main.Dock.4", "click", function( ) {
  OpenBundles.openApp(BarIcons[3]);
});
onEvent("Celeste.Main.Dock.5", "click", function( ) {
  OpenBundles.openApp(BarIcons[4]);
});

var clickAllowed = true; // Allow clicks initially
var iconBeingDragged = null; // Track the currently dragged icon

// Function to handle icon clicks
function handleClick(iconIndex) {
  if (clickAllowed) {
    OpenBundles.openApp(icons[iconIndex]);
  }
}

// Attach event handlers to icons
for (var i = 1; i <= 8; i++) {
    var iconId = "Celeste.Main.Icon." + i;

    onEvent(iconId, "click", (function(index) {
        return function(event) {
            handleClick(index - 1); // Pass icon index to handleClick function
        };
    })(i));

    onEvent(iconId, "mousedown", (function(id) {
        return function(event) {
            startDrag(event, id, [id]);
        };
    })(iconId));
}

onEvent("Celeste.Main", "mouseup", stopDrag);

