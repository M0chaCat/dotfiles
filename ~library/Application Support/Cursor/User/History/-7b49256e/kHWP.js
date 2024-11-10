//these are all Celeste.* functions
const { setScreen, setText, setProperty, showElement, hideElement, setImageURL, setWallpaper, getUserId, readRecords, createRecord, updateRecord, generateRandomString, getTime, getDate, stopTimedLoop, Alert, CheckValid, Internal } = require("./commands.js");
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
      showElement("Celeste.Login.Input.1");
      showElement("Celeste.Login.Input.2");
      showElement("Celeste.Login.Button.1");
      showElement("Celeste.Login.Button.2");
      if (safemode) {
        console.log("Your device is running in safemode, the appstore and other components have been disabled");
      }
    }, 600);
}


//Functions

//sets wallpaper (NUH UH)
function setWallpaper(image) {
  currentWallpaper = image;
  setProperty("Celeste.Main.Image.2", "image", image);
  setProperty("Celeste.Main.Image.1", "background-color", Blank);
  setProperty("Celeste.Login.Image.2", "image", image);
}

//checks if userid is alpha
function isAlpha(userid, callback) {
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
function isBanned(userid, callback) {
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
function InstallApp(appname, iconn) {
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
function UninstallApp(appname) {
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
var encodedusrid = sha256(getUserId());
//Create Account
function CreateAccount(username, pass) {
  var usrnm = username.toLowerCase();
  if (usrnm != "") {
    var encodedpass = sha256(pass);
    createRecord("Accounts", {
      note: currentNote,
      isBeta: false,
      token: generateRandomString(50),
      lastloggedintime: getTime("HH:mm:ss"),
      lastloggedindate: getDate("mm:dd:yyyy"),
      username: usrnm,
      isdisabled: false,
      wallpaper: "",
      displayname: usrnm,
      epassword: encodedpass,
      isadmin: false,
      onetimecode: sha256(randomNumber(111111, 999999)),
      userid: encodedusrid,
      note: currentNote,
      documents: JSON.stringify(documents) // Stringify once here
    });
    console.log(LoginAccount(username, pass));
  }
}
var accotc = null;

//Login to Account
function LoginAccount(username, pass) {
  var usrnm = username.toLowerCase();
  if (usrnm != "") {
    readRecords("Accounts", {}, function(records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].username == usrnm) {
          if (!records[i].isdisabled) {
            if (records[i].epassword == sha256(pass) || records[i].onetimecode == sha256(pass)) {
              acctoken = records[i].token;
              Username = usrnm;
              updateRecord("Accounts", {
                id: (i + 1),
                note: records[i].note,
                isBeta: records[i].isBeta,
                token: records[i].token,
                lastloggedintime: getTime("HH:mm:ss"),
                lastloggedindate: getDate("mm:dd:yyyy"),
                username: records[i].username,
                isdisabled: records[i].isdisabled,
                wallpaper: records[i].wallpaper,
                displayname: records[i].displayname,
                epassword: records[i].epassword,
                isadmin: records[i].isadmin,
                onetimecode: sha256(randomNumber(111111, 999999)),
                userid: records[i].userid,
                note: records[i].note,
                documents: records[i].documents // Ensure this is not stringified again
              });
              currentNote = records[i].note;
              accData = records[i];
              documents = records[i].documents; 
              if (records[i].isadmin) {
                debug = true;
              }
              if (records[i].wallpaper != "") {
                setWallpaper(records[i].wallpaper);
              }
              accotc = records[i].onetimecode;
            } else {
              Alert("Incorrect Password or OTC");
              return false;
            }
          } else {
            Alert("This account is banned");
            return false;
          }
        }
      }
    });
  }
}

//Login to Account from a token
function LoginAccountFromToken(token) {
  if (token != "") {
    readRecords("Accounts", {}, function(records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].token == token) {
          if (!records[i].isdisabled){
            acctoken = records[i].token;
            Username = records[i].username;
            updateRecord("Accounts", 
                {
                    id:(i+1), 
                    note:records[i].note, 
                    isBeta:records[i].isBeta, 
                    token:records[i].token, 
                    lastloggedintime:getTime("HH:mm:ss"), 
                    lastloggedindate:getDate("mm:dd:yyyy"), 
                    username:records[i].username,
                    isdisabled:records[i].isdisabled, 
                    wallpaper:records[i].wallpaper, 
                    displayname:records[i].displayname, 
                    epassword:records[i].epassword, 
                    isadmin:records[i].isadmin, 
                    onetimecode:records[i].onetimecode, 
                    userid:records[i].userid,
                    note: records[i].note,
                    documents: records[i].documents
                });
            accData = records[i];
            currentNote = records[i].note;
            documents = records[i].documents; // Load documents from JSON string
            if (records[i].isadmin) {
              debug = true;
            }
            if (records[i].wallpaper != "") {
              setWallpaper((records[i]).wallpaper);
            }
            accotc = (records[i]).onetimecode;
          }
        } else {
          Alert("This account is banned");
          return false;
        }
      }
      }
    );
  }
}



