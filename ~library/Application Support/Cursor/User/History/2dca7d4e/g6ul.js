//these are all Celeste.* functions

console.clear();
//Returns SolsticeFirmware Version
function FirmwareVersion() {
  return 2;
}


//Checks if alpha access key is correct
function CheckValid() {
  isBanned(getUserId(), function(banned) {
    if (!banned) {
      isAlpha(getUserId(), function(result) {
        if (result) {
          setScreen("Celeste.Login");
          return true;
        } else {
          var userinput = "";
          getKeyValue("alphakey", function (alphakey) {
            SFS.PromptNum("Input Alpha Access Key", true, function(result) {
              userinput = result;
              if (SFS.sha256(userinput) == alphakey) {
                setScreen("Celeste.Boot");
                setTimeout(function() {
                  setScreen("Celeste.Login");
                  if (safemode) {
                        SFS.Alert("Your device is running in safemode, the appstore and other components have been disabled");
                  }
                }, 600);
                return true;
              }
              CheckValid();
              SFS.Alert("Incorrect Alpha Access Key");
              return false;
            });
          });
        }
      });
    } else {
      setScreen("Celeste.Old");
      setText("Celeste.Old.Text.1", "You are banned from Celeste, please contact MochaLabs for details.");
      setProperty("Celeste.Text.Image.1", "icon-color", "#f38ba8");
      stopTimedLoop();
      return false;
    }
  });
}


//Boots Celeste
function Boot(args, CompatableFirmware) {
  setScreen("Celeste.Boot");
  if (!(FirmwareVersion() == CompatableFirmware)) {
    SFS.WriteError("Incompatable firmware version! Please Use Version " + CompatableFirmware, " of SolsticeFirmware", true);
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
  if (online) {
    getKeyValue("newestversion", function (newestversion) {
      if (newestversion != Version) {
        setKeyValue("newestversion", Version, function () {
          
        });
      }
    });
    timedLoop(1000, function() {
      getKeyValue("newestversion", function (newestversion) {
        if (newestversion != Version) {
          setScreen("Solstice.Old");
          stopTimedLoop();
        }
      });
    });
  }
  InstallApp("Settings", "icon://fa-cogs");
  OpenBundles.addApp("Settings", 1, "Arcane", "Bundle$Settings(null, \"Settings\");", "icon://fa-cogs", true, true);
  if (online && secure) {
    //install appstore here
  }
  //Actually Boot
  setTimeout(function() {
    if (Internal) {
      CheckValid();
    } else {
      isBanned(getUserId(), function(banned) {
        if (!banned) {
          setScreen("Celeste.Boot");
          setTimeout(function() {
            setScreen("Celeste.Login");
            if (safemode) {
                  SFS.Alert("Your device is running in safemode, the appstore and other components have been disabled");
            }
          }, 600);
        } else {
          setScreen("Celeste.Old.1");
          setText("Celeste.Old.Text.1", "You are banned from Celeste, please contact MochaLabs for details.");
          setProperty("Celeste.Text.Image.1", "icon-color", "#f38ba8");
          stopTimedLoop();
        }
      });
    }
  }, 1000);
}


//Functions
function controlKey() {
console.log("TODO");
}

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
  SFS.WriteError("Storage Full!", "Homescreenmgr");
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
  SFS.WriteError("Can't find app", "Homescreenmgr");
}
var encodedusrid = SFS.sha256(getUserId());
//Create Account
function CreateAccount(username, pass) {
  var usrnm = username.toLowerCase();
  if (usrnm != "") {
    var encodedpass = SFS.sha256(pass);
    createRecord("Accounts", {
      note: currentNote,
      isBeta: false,
      token: SFS.generateRandomString(50),
      lastloggedintime: SFS.gettime("HH:mm:ss"),
      lastloggedindate: SFS.getdate("mm:dd:yyyy"),
      username: usrnm,
      isdisabled: false,
      wallpaper: "",
      displayname: usrnm,
      epassword: encodedpass,
      isadmin: false,
      onetimecode: SFS.sha256(randomNumber(111111, 999999)),
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
            if (records[i].epassword == SFS.sha256(pass) || records[i].onetimecode == SFS.sha256(pass)) {
              acctoken = records[i].token;
              Username = usrnm;
              updateRecord("Accounts", {
                id: (i + 1),
                note: records[i].note,
                isBeta: records[i].isBeta,
                token: records[i].token,
                lastloggedintime: SFS.gettime("HH:mm:ss"),
                lastloggedindate: SFS.getdate("mm:dd:yyyy"),
                username: records[i].username,
                isdisabled: records[i].isdisabled,
                wallpaper: records[i].wallpaper,
                displayname: records[i].displayname,
                epassword: records[i].epassword,
                isadmin: records[i].isadmin,
                onetimecode: SFS.sha256(randomNumber(111111, 999999)),
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
              SFS.Alert("Incorrect Password or OTC");
              return false;
            }
          } else {
            SFS.Alert("This account is banned");
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
                    lastloggedintime:SFS.gettime("HH:mm:ss"), 
                    lastloggedindate:SFS.getdate("mm:dd:yyyy"), 
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
          SFS.Alert("This account is banned");
          return false;
        }
      }
      }
    );
  }
}



