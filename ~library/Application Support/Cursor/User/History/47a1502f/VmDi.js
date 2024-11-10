//eUDLW48adTppJ-0o8buW_Red3eZ88VxvgI8wGCry7Xo
var IDstarter = "Solstice";
var HomescreenWindow = ".Homescreen.Window";
var BarIconID = ".Homescreen.icon.";

//Configure OpenBundles, all are REQUIRED
//IDstarter is like "Solstice"
//HomescreenWindow is like ".Homescreen.Window"
//BarIconID is like ".Homescreen.icon."
export function openBundles$Config(IDstarterr, HomescreenWindoww, BarIconIDd) {
 IDstarter = IDstarterr;
 HomescreenWindow = HomescreenWindoww;
 BarIconID = BarIconIDd;
}

//Returns IDstarter
export function openBundles$getIDstarter() {
 return IDstarter;
}



//Install a Shortcut
export function openBundles$InstallShortcut(appname, iconn) {
  var icon;
  icon = iconn;
if (BarIcons.indexOf("") !== -1) {
  BarIcons[BarIcons.indexOf("")] = appname;
  setProperty(IDstarter + BarIconID + (BarIcons.indexOf("") + 0), "image", icon);
  showElement(IDstarter + BarIconID + (BarIcons.indexOf("") + 0));
  return BarIcons.indexOf(appname);
}
  SFS.WriteError("Storage Full!", "OpenBundles");
  return false;
}

//Uninstall a Shortcut
export function openBundles$UninstallShortcut(appname) {
  for (var i = 0; i < BarIcons.length; i++) {
    if (BarIcons[i] === appname) {
      BarIcons[i] = "";
      setProperty(IDstarter + BarIconID + (i + 1), "image", "icon://fa-question");
      hideElement(IDstarter + BarIconID + (i + 1));
      return;
    }
  }
  SFS.WriteError("Can't find BarIcon", "OpenBundles");
}

// Function to return all AppBundleIDs
export function openBundles$displayLinks() {
    for (var key in Apps) {
        if (Apps.hasOwnProperty(key)) {
            console.log(key + " : " + Apps[key]);
        }
    }
}

// Function to register a AppBundle
export function openBundles$RegisterAppBundle(BundleID, Screens) {
  Apps[BundleID] = Screens;
}

// Hide all icons, use when opening an app bundle
export function openBundles$hideIcons() {
  showElement(IDstarter + HomescreenWindow);
}

// Show all icons, use when closing an app bundle
export function openBundles$showIcons() {
hideElement(IDstarter + HomescreenWindow);
}

var apps = [];
// Function to add an app to the end of the list
export function openBundles$addApp(name, version, author, mainscreen, icon, isbundle, showinappstore) {
    apps.push({
        name: name,
        version: version,
        author: author,
        mainscreen: mainscreen,
        icon: icon,
        isbundle: isbundle,
        showinappstore: showinappstore,
    });
}

// Function to return apps
export function openBundles$getApps() {
    return apps;
}

var activeBundles = {};




