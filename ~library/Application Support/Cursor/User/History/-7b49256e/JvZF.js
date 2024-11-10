document.addEventListener("DOMContentLoaded", function() {
window.icons = ["", "", "", "", "", "", "", "", "", "", "", ""];
window.BarIcons = ["", "", "", "", ""];
const { BEMA, checkSha256, setupEventListeners, onEvent, setText, getText, deleteElement, generateRandomString, timedLoop, showElement, hideElement, getTime, getDate, setProperty } = window.api.commands;
// Check if openBundles exists before destructuring
let { openBundles$Config, openBundles$getIDstarter, openBundles$InstallShortcut, openBundles$UninstallShortcut, openBundles$displayLinks, openBundles$RegisterAppBundle, openBundles$addApp, openBundles$getApps, openBundles$hideIcons, openBundles$showIcons, openBundles$openApp } = window.api.openBundles;

console.clear();
//Returns CelesteFirmware Version
export function Celeste$FirmwareVersion() {
  return 3;
}

//Boots Celeste
export function Celeste$Boot(args, CompatableFirmware) {
  if (!(Celeste$FirmwareVersion() == CompatableFirmware)) {
    WriteError("Incompatable firmware version! Please Use Version " + window.CompatableFirmware, " of CelesteFirmware", true);
    return false;
  }
  //Args
  window.secure = args.includes("-s");
  window.online = args.includes("-o");
  window.lockIcons = args.includes("-li");
  window.debug = args.includes("-d");
  window.military = args.includes("-m");
  window.safemode = args.includes("-sm");
  if (!args.includes("-nw")) {
        Celeste$setWallpaper("10-13-5120x2880.png");
  }
  if (window.safemode) {
        Celeste$setWallpaper("");
        window.secure = true;
        window.online = false;
        window.debug = true;
  }
  //Extra Boot Code
  if (window.debug) {
    setImageURL("Celeste.Boot", "Bootlicker.gif");
  }

  Celeste$InstallApp("Settings", "icon://fa-cogs");
  openBundles$addApp("Settings", 1, "Arcane", "Bundle$Settings(null, \"Settings\");", "icon://fa-cogs", true, true);
  if (window.online && window.secure) {
    //install appstore here
  }
  //Actually Boot
  setTimeout(function() {
    showElement("Celeste.Boot.Text.1");
    showElement("Celeste.Boot.Image.1");
    showElement("Celeste.Boot.Image.2");
    setTimeout(function() {
      hideElement("Celeste.Boot.Text.1");
      hideElement("Celeste.Boot.Image.1");
      hideElement("Celeste.Boot.Image.2");
    
      showElement("Celeste.Login.Window");
      showElement("Celeste.Login.Image.2");
      showElement("Celeste.Login.Image.1");
      showElement("Celeste.Login.Button.2");
      if (window.safemode) {
        console.log("Your device is running in safemode, the appstore and other components have been disabled");
      }
    }, 600);
  });
}

//Functions

//sets wallpaper (NUH UH)
export function Celeste$setWallpaper(image) {
    window.currentWallpaper = image;
  setProperty("Celeste.Main.Image.2", "image", image);
  setProperty("Celeste.Main.Image.1", "background-color", window.Blank);
  setProperty("Celeste.Login.Image.2", "image", image);
}

//checks if userid is alpha
export function Celeste$isAlpha(userid, callback) {
  return true;
}

//checks if userid is banned
export function Celeste$isBanned(userid, callback) {
  return false;
}

//Install a App
export function Celeste$InstallApp(appname, iconn) {
  var icon;
  icon = iconn;
  if (window.icons.indexOf("") !== -1) {
    window.icons[window.icons.indexOf("")] = appname;
    setProperty("Celeste.Main.Icon." + (window.icons.indexOf("") + 0), "image", icon);
  showElement("Celeste.Main.Icon." + (window.icons.indexOf("") + 0));
  return true;
}
  WriteError("Storage Full!", "Homescreenmgr");
  return false;
}

//Uninstall a App
export function Celeste$UninstallApp(appname) {
  for (var i = 0; i < window.icons.length; i++) {
    if (window.icons[i] === appname) {
      window.icons[i] = "";
      setProperty("Celeste.Main.Icon." + (i + 1), "image", "icon://fa-question");
      hideElement("Celeste.Main.Icon." + (i + 1));
      return;
    }
  }
  WriteError("Can't find app", "Homescreenmgr");
}

});