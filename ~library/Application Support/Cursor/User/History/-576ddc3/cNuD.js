// This is a simple file system named MFS (Mocha File System), it is used to store files on the device
//it will be used to store apps, wallpapers, and other data, but celeste was build before it
//so the next OS will use MFS instead.

// File constructor
function File(name, content, isSystemFile) {
    this.name = name;
    this.content = content || "";
    this.type = "file";
    this.isSystemFile = isSystemFile;
}

// Directory constructor
function Directory(name, parent) {
    this.name = name;
    this.type = "directory";
    this.contents = {};
    this.parent = parent;
}

Directory.prototype.addItem = function(item) {
    this.contents[item.name] = item;
};

Directory.prototype.removeItem = function(name) {
    delete this.contents[name];
};

Directory.prototype.getItem = function(name) {
    return this.contents[name];
};

// FileSystem constructor
function FileSystem(deviceName, rootDirName, isSystemDevice) {
    this.root = new Directory(rootDirName, null);
    this.currentDirectory = this.root;
    this.deviceName = deviceName;
    this.isSystemDevice = isSystemDevice;
    this.systemPassword = isSystemDevice ? "admin123" : null; // Simple password for demo
}

FileSystem.prototype.createFile = function(name, content, isSystemFile) {
    if (this.isSystemDevice && !isSystemFile) {
        throw new Error("Cannot create non-system file '" + name + "' on system device in directory '" + this.getCurrentPath() + "'");
    }
    var newFile = new File(name, content, isSystemFile);
    this.currentDirectory.addItem(newFile);
};

FileSystem.prototype.deleteFile = function(name, password) {
    var file = this.currentDirectory.getItem(name);
    if (file && file.type === "file") {
        if (this.isSystemDevice && file.isSystemFile && password !== this.systemPassword) {
            throw new Error("Unauthorized: Cannot delete system file without password");
        }
        this.currentDirectory.removeItem(name);
    } else {
        throw new Error("File not found or is not a file");
    }
};

FileSystem.prototype.editFile = function(name, newContent, password) {
    var file = this.currentDirectory.getItem(name);
    if (file && file.type === "file") {
        if (this.isSystemDevice && file.isSystemFile && password !== this.systemPassword) {
            throw new Error("Unauthorized: Cannot edit system file without password");
        }
        file.content = newContent;
    } else {
        throw new Error("File not found or is not a file");
    }
};

FileSystem.prototype.renameFile = function(oldName, newName, password) {
    var file = this.currentDirectory.getItem(oldName);
    if (file && file.type === "file") {
        if (this.isSystemDevice && file.isSystemFile && password !== this.systemPassword) {
            throw new Error("Unauthorized: Cannot rename system file without password");
        }
        if (this.currentDirectory.getItem(newName)) {
            throw new Error("A file with the new name already exists");
        }
        file.name = newName;
        this.currentDirectory.removeItem(oldName);
        this.currentDirectory.addItem(file);
    } else {
        throw new Error("File not found or is not a file");
    }
};

FileSystem.prototype.createDirectory = function(name) {
    var newDir = new Directory(name, this.currentDirectory);
    this.currentDirectory.addItem(newDir);
};

FileSystem.prototype.changeDirectory = function(path) {
    if (path === "/") {
        this.currentDirectory = this.root;
        return;
    }

    var parts = path.split("/");
    var current = this.currentDirectory;

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part === "..") {
            if (current.parent) {
                current = current.parent;
            }
        } else if (part !== "") {
            var next = current.getItem(part);
            if (next && next.type === "directory") {
                current = next;
            } else {
                throw new Error("Invalid path");
            }
        }
    }

    this.currentDirectory = current;
};

FileSystem.prototype.listContents = function() {
    return Object.keys(this.currentDirectory.contents);
};

FileSystem.prototype.getPath = function(dir) {
    var path = [];
    var current = dir;

    while (current !== null) {
        if (current.name !== "root") {
            path.unshift(current.name);
        }
        current = current.parent;
    }

    return "$" + path.join("$");
};

FileSystem.prototype.getCurrentPath = function() {
    return this.getPath(this.currentDirectory);
};

// Initialize two different devices
var sysDevice = new FileSystem("SysDevice", "system", true);
var userDevice = new FileSystem("UserDevice", "user");

// Setup SysDevice (system files)
sysDevice.createFile("CelesteFirmware.sys", "Firmware binary", true);
sysDevice.createFile("SolarisBootloader.bin", "Boot loader binary", true);
sysDevice.createFile("config.plist", "Configuration file", true);
sysDevice.createFile("initramfs.img", "Initial RAM filesystem image", true);

sysDevice.createDirectory("kexts");
sysDevice.changeDirectory("kexts");
sysDevice.createFile("MWK.kext", "MeowWare Kernel Extension", true);  // Add true here
sysDevice.createFile("AES256.kext", "AES 256-bit Encryption Extension", true);  // Add true here
sysDevice.changeDirectory("..");

sysDevice.createDirectory("logs");
sysDevice.changeDirectory("logs");
sysDevice.createFile("system.log", "System log file", true);
sysDevice.createFile("error.log", "Error log file", true);
sysDevice.createFile("security.log", "Security log file", true);
sysDevice.changeDirectory("..");

sysDevice.createDirectory("temp");

sysDevice.createDirectory("cache");
sysDevice.changeDirectory("cache");
sysDevice.createFile("bundle_cache.bin", "Bundled cache file", true);  // Add true here
sysDevice.changeDirectory("..");

// Setup UserDevice (user files)
userDevice.createDirectory("documents");
userDevice.changeDirectory("documents");
userDevice.createFile("note.txt", "Hello from UserDevice!");
userDevice.changeDirectory("..");
userDevice.createDirectory("pictures");
userDevice.changeDirectory("pictures");
userDevice.createFile("vacation.jpg", "Vacation photo");
userDevice.changeDirectory("..");

// Display file system structure for both devices
//console.log("SYS:");
//console.log(displayFileSystem(sysDevice.root));
//console.log("\nUser:");
//console.log(displayFileSystem(userDevice.root));

// Add this function at the end of the file
function displayFileSystem(node, prefix) {
    prefix = prefix || '';
    var result = prefix;
    
    if (node.type === 'directory') {
        result += '📁 ' + node.name + '\n';
    } else {
        result += '📄 ' + node.name + (node.isSystemFile ? ' (S)' : '') + '\n';
    }
    
    if (node.type === 'directory') {
        var keys = Object.keys(node.contents);
        for (var i = 0; i < keys.length; i++) {
            var item = node.contents[keys[i]];
            var isLast = (i === keys.length - 1);
            var newPrefix = prefix + (isLast ? '└── ' : '├── ');
            var childPrefix = prefix + (isLast ? '    ' : '│   ');
            result += displayFileSystem(item, newPrefix, childPrefix);
        }
    }
    return result;
}