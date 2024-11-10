// Define all custom commands here


 function onEvent(id, event, callback) {
    //console.log(`Setting up ${event} event for ${id}`);
    const element = document.getElementById(id);
    if (element) {
        //console.log(`Element found for ${id}, adding ${event} listener`);
        element.addEventListener(event, (e) => {
            //console.log(`${event} event triggered for ${id}`);
            callback(e);
        });
    } else {
        console.warn(`Element with id '${id}' not found. Event '${event}' not attached.`);
    }
}

 function BEMA(type, id, x, y, width, height, autohide, rounded, borderWidth, borderColor, bgColor, textColor, text, textAlign, fontSize, fontFamily, readOnly, icon, iconColor) {
    //console.log(`Creating BEMA element: ${type}, ID: ${id}`);
    let element;
    
    if (type === "Button") {
        element = document.createElement('button');
    } else if (type === "Image") {
        element = document.createElement('img');
        if (icon) {
            element.src = icon;
            element.style.width = '100%';
            element.style.height = '100%';
            element.style.objectFit = 'fill';
        }
    } else if (type === "Input") {
        element = document.createElement('input');
        element.type = 'text';  // Set the input type to 'text'
    } else {
        element = document.createElement(type);
    }
    
    element.id = id;
    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.borderWidth = `${borderWidth}px`;
    element.style.borderColor = borderColor;
    element.style.backgroundColor = bgColor;
    element.style.color = textColor;
    element.style.textAlign = textAlign;
    element.style.fontSize = `${fontSize}px`;
    element.style.fontFamily = fontFamily;
    element.style.borderRadius = `${rounded}px`;

    if (readOnly) {
        element.readOnly = true;
        element.style.userSelect = 'none';
        element.style.pointerEvents = 'none';
    }

    if (autohide) {
        element.style.display = 'none';
    }

    // Make all elements clickable
    element.style.pointerEvents = 'auto';

    if (type === "Button") {
        element.style.cursor = 'pointer';
        const img = document.createElement('img');
        img.id = id + '-img';  // Assign an ID to the img element
        if (!icon) {
            img.src = 'brain.png';  // Set no image if icon is falsy
        } else {
            img.src = icon;  // Set the src to icon if it's not falsy
        }
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        element.appendChild(img);
        if (text) {
            element.textContent = text;
        }
    } else if (type === "TextArea") {
        element.value = text;
        element.style.outline = 'none';
        element.style.display = 'flex';
        element.style.alignItems = 'center'; // Vertically center the text
        element.style.textAlign = textAlign; // Keep horizontal alignment as specified
        element.style.padding = '0'; // Remove default padding for proper alignment
        if (readOnly) {
            element.style.userSelect = 'none';
            element.style.pointerEvents = 'none';
            element.style.cursor = 'default';
            element.style.overflow = 'hidden';  // Prevent scrolling
        }
    } else if (type === "Input") {
        element.placeholder = text;  // Set placeholder instead of value for Input
    } else if (type === "Image" && icon) {
        element.src = icon;
    } else {
        element.style.cursor = 'default';  // Ensure non-button elements have the default cursor
    }

    const container = document.getElementById('bema-container');
    if (container) {
        container.appendChild(element);
        //console.log(`Added ${id} to #bema-container`);
    } else {
        console.error('bema-container not found');
    }
}

 function setupEventListeners(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.add('listening');
        console.log(`Setup event listeners for ID: ${id}`, element);
        element.addEventListener('click', () => {
            console.log(`Click event fired for ${id}`);
        });
    } else {
        console.error(`Element with ID: ${id} not found for setting up event listeners.`);
    }
}

 function setText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
            element.value = text;
        } else {
            element.innerText = text;
        }
        //console.log(`Set text for element ${elementId}: ${text}`);
    } else {
        console.log(`Element not found: ${elementId}`);
    }
}

 function getText(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.innerText : '';
}

 function deleteElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
    }
}

 function generateRandomString(length) {
    var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}

 function timedLoop(interval, callback) {
    setInterval(callback, interval);
}

function setProperty(elementId, property, value) {
    const element = document.getElementById(elementId);
    if (element) {
        if (property === 'image') {
            element.src = value;  // Directly set the src attribute
        } else {
            element.style.setProperty(property, value);
        }
    }
}

 function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

 function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

 function getTime(format) {
    var dateCheck = new Date();
    var hours = dateCheck.getHours();
    var minutes = dateCheck.getMinutes();
    var seconds = dateCheck.getSeconds();
    let period = "";

    // Check for 12-hour format
    if (format.includes("hh") || format.includes("hh:mm a") || format.includes("hh:mm:ss a")) {
      period = hours >= 12 ? "PM" : "AM";
      // Convert to 12-hour format
      hours = hours % 12 || 12; 
    }
    // Add leading zeroes if needed
    var hoursStr = hours < 10 ? '0' + hours : hours;
    var minutesStr = minutes < 10 ? '0' + minutes : minutes;
    var secondsStr = seconds < 10 ? '0' + seconds : seconds;
    // Replace format tokens wiþ actual time values
    var formattedTime = ((((format
      .replace("hh", hoursStr))
      .replace("HH", hoursStr))
      .replace("mm", minutesStr))
      .replace("ss", secondsStr))
      .replace("a", period);
    return formattedTime;
}

 function getDate(format) {
    var dateCheck = new Date();
    var month = (dateCheck.getMonth() + 1);
    var day = dateCheck.getDate();
    var year = dateCheck.getFullYear();
     // Get last two digits of þe year
    var yy = year.toString().slice(-2);
    // Add leading zeroes if needed
    var monthStr = month < 10 ? '0' + month : month.toString();
    var dayStr = day < 10 ? '0' + day : day.toString();
    // Replace format tokens wiþ actual date values
    var formattedDate = format
      .replace("mm", monthStr)
      .replace("dd", dayStr)
      .replace("yyyy", year.toString())
      .replace("yy", yy);
    return formattedDate;
}

 function shiftString(inputText, key) {
    var encodedString = "";
    for (var i = 0; i < inputText.length; i++) {
      var charCode = inputText.charCodeAt(i);
      var shiftedCharCode = charCode + key;
      var encodedCharacter = String.fromCharCode(shiftedCharCode);
      encodedString += encodedCharacter;
    }
    return encodedString;
}

 function unshiftString(encodedString, key) {
    var decodedString = "";
    for (var i = 0; i < encodedString.length; i++) {
      var encodedCharCode = encodedString.charCodeAt(i);
      var originalCharCode = encodedCharCode - key;
      var decodedCharacter = String.fromCharCode(originalCharCode);
      decodedString += decodedCharacter;
    }
    return decodedString;
}

var uptimeS = 0;
timedLoop(1000, function() {
  uptimeS = uptimeS + 1;
});

//Returns þe system uptime since boot in seconds
 function getUptimeS() {
  return (Math.round(uptimeS));
}

var uptimeMS = 0;
timedLoop(1, function() {
  uptimeMS = uptimeMS + 1;
});

//Returns þe system uptime since boot in ms
 function getUptimeMS() {
  return (Math.round(uptimeMS));
}

// SHA-256 Checker Function
 function checkSha256(message, expectedHash) {
    var computedHash = sha256(message);
    return (computedHash === expectedHash);
}
//SHA-256 Hashing Function
 function sha256(message) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }
    function utf8Encode(str) {
        return unescape(encodeURIComponent(str));
    }

    var K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    var initialHashValues = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];

    message = utf8Encode(message);
    var lengthInBits = message.length * 8;

    // Pre-processing
    message += String.fromCharCode(0x80); // Append '1' bit
    while (message.length % 64 !== 56) {
        message += String.fromCharCode(0x00); // Append '0' bits
    }
    message += String.fromCharCode((lengthInBits >>> 56) & 0xFF);
    message += String.fromCharCode((lengthInBits >>> 48) & 0xFF);
    message += String.fromCharCode((lengthInBits >>> 40) & 0xFF);
    message += String.fromCharCode((lengthInBits >>> 32) & 0xFF);
    message += String.fromCharCode((lengthInBits >>> 24) & 0xFF);
    message += String.fromCharCode((lengthInBits >>> 16) & 0xFF);
    message += String.fromCharCode((lengthInBits >>> 8) & 0xFF);
    message += String.fromCharCode((lengthInBits) & 0xFF);

    var chunks = [];
    for (var i = 0; i < message.length; i += 64) {
        chunks.push(message.slice(i, i + 64));
    }

    var hash = initialHashValues.slice();
    chunks.forEach(function(chunk) {
        var words = new Array(64);
        for (var i = 0; i < 16; i++) {
            words[i] = (chunk.charCodeAt(i * 4) << 24) |
                       (chunk.charCodeAt(i * 4 + 1) << 16) |
                       (chunk.charCodeAt(i * 4 + 2) << 8) |
                       (chunk.charCodeAt(i * 4 + 3));
        }

        for (var i = 16; i < 64; i++) {
            var s0 = rightRotate(words[i - 15], 7) ^ rightRotate(words[i - 15], 18) ^ (words[i - 15] >>> 3);
            var s1 = rightRotate(words[i - 2], 17) ^ rightRotate(words[i - 2], 19) ^ (words[i - 2] >>> 10);
            words[i] = (words[i - 16] + s0 + words[i - 7] + s1) & 0xFFFFFFFF;
        }

        var a = hash[0], b = hash[1], c = hash[2], d = hash[3], e = hash[4], f = hash[5], g = hash[6], h = hash[7];

        for (var i = 0; i < 64; i++) {
            var s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
            var ch = (e & f) ^ (~e & g);
            var temp1 = (h + s1 + ch + K[i] + words[i]) & 0xFFFFFFFF;
            var s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
            var maj = (a & b) ^ (a & c) ^ (b & c);
            var temp2 = (s0 + maj) & 0xFFFFFFFF;

            h = g;
            g = f;
            f = e;
            e = (d + temp1) & 0xFFFFFFFF;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) & 0xFFFFFFFF;
        }

        hash[0] = (hash[0] + a) & 0xFFFFFFFF;
        hash[1] = (hash[1] + b) & 0xFFFFFFFF;
        hash[2] = (hash[2] + c) & 0xFFFFFFFF;
        hash[3] = (hash[3] + d) & 0xFFFFFFFF;
        hash[4] = (hash[4] + e) & 0xFFFFFFFF;
        hash[5] = (hash[5] + f) & 0xFFFFFFFF;
        hash[6] = (hash[6] + g) & 0xFFFFFFFF;
        hash[7] = (hash[7] + h) & 0xFFFFFFFF;
    });

    var result = '';
    for (var b = 0; b < 8; b++) {
        result += ('00000000' + (hash[b]).toString(16)).slice(-8);
    }
    return result;
}

 function setPosition(elementId, x, y) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with id '${elementId}' not found in setPosition.`);
        return;
    }
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    console.log(`Set position of ${elementId} to X: ${x}, Y: ${y}`);
}

 function getXPosition(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with id '${elementId}' not found in getXPosition.`);
        return 0;
    }
    const rect = element.getBoundingClientRect();
    console.log(`getXPosition for ${elementId}:`, rect.left);
    return rect.left;
}

 function getYPosition(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with id '${elementId}' not found in getYPosition.`);
        return 0;
    }
    const rect = element.getBoundingClientRect();
    console.log(`getYPosition for ${elementId}:`, rect.top);
    return rect.top;
}