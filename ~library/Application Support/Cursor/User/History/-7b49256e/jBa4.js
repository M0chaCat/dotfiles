//these are all Celeste.* functions
const { setScreen, setText, setProperty, showElement, hideElement, setImageURL, setWallpaper, getUserId, readRecords, createRecord, updateRecord, generateRandomString, getTime, getDate, stopTimedLoop, Alert, CheckValid, Internal } = require("./Commands.js");
const { openBundles$addApp, openBundles$getIDstarter, openBundles$openApp, openBundles$Config, } = require("./openbundles.js");
console.clear();
//Returns CelesteFirmware Version
export function Celeste$FirmwareVersion() {
  return 3;
}

//Boots Celeste
export function Celeste$Boot(args, CompatableFirmware) {
  if (!(Celeste$FirmwareVersion() == CompatableFirmware)) {
    WriteError("Incompatable firmware version! Please Use Version " + CompatableFirmware, " of CelesteFirmware", true);
    return false;
  }
  //Args
  secure = args.includes("-s");
  online = args.includes("-o");
  lockIcons = args.includes("-li");
  debug = args.includes("-d");
  military = args.includes("-m");
  safemode = args.includes("-sm");
  if (!args.includes("-nw")) {
        setWallpaper("10-13-5120x2880.png");
  }
  if (safemode) {
        SetWallpaper("");
        secure = true;
        online = false;
        debug = true;
  }
  //Extra Boot Code
  if (debug) {
    setImageURL("Celeste.Boot", "Bootlicker.gif");
  }

  InstallApp("Settings", "icon://fa-cogs");
  OpenBundles$addApp("Settings", 1, "Arcane", "Bundle$Settings(null, \"Settings\");", "icon://fa-cogs", true, true);
  if (online && secure) {
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
      if (safemode) {
        console.log("Your device is running in safemode, the appstore and other components have been disabled");
      }
    }, 600);
  });
}

//Functions

//sets wallpaper (NUH UH)
export function Celeste$setWallpaper(image) {
  currentWallpaper = image;
  setProperty("Celeste.Main.Image.2", "image", image);
  setProperty("Celeste.Main.Image.1", "background-color", Blank);
  setProperty("Celeste.Login.Image.2", "image", image);
}

//checks if userid is alpha
export function Celeste$isAlpha(userid, callback) {
  readRecords("Alpha", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      if (userid == (records[i]).IDS) {
        callback(true);
        return true;
      }
    }
    callback(false);
    return false;
  });
}

//checks if userid is banned
export function Celeste$isBanned(userid, callback) {
  readRecords("BannedIDS", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      if (userid == (records[i]).IDS) {
        callback(true);
        return true;
      }
    }
    callback(false);
    return false;
  });
}

//Install a App
export function Celeste$InstallApp(appname, iconn) {
  var icon;
  icon = iconn;
if (icons.indexOf("") !== -1) {
  icons[icons.indexOf("")] = appname;
  setProperty("Celeste.Main.Icon." + (icons.indexOf("") + 0), "image", icon);
  showElement("Celeste.Main.Icon." + (icons.indexOf("") + 0));
  return true;
}
  WriteError("Storage Full!", "Homescreenmgr");
  return false;
}

//Uninstall a App
export function Celeste$UninstallApp(appname) {
  for (var i = 0; i < icons.length; i++) {
    if (icons[i] === appname) {
      icons[i] = "";
      setProperty("Celeste.Main.Icon." + (i + 1), "image", "icon://fa-question");
      hideElement("Celeste.Main.Icon." + (i + 1));
      return;
    }
  }
  WriteError("Can't find app", "Homescreenmgr");
}

