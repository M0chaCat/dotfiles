func replaceNewLinesWithSpaces(text) {
    set result = ""~
    set length = text.length~
    
    for (set i = 0~ i < length~ i++) {
        set char = text.charAt(i)~
        
        if (char == "~") {
            result = result + ";"~
        } else if (char == "\"") {
            result = result + "\\\""~
        } else if (char == "\n") {
            result = result + " "~ // Replace new lines with a space
        } else {
            result = result + char~
        }
    }
    
    return result~
}

// Read from SolsticeOS.ms file
set fs = require("fs")~
set inputText = fs.readFileSync("./SolsticeOS.ms", "utf8")~
set outputText = replaceNewLinesWithSpaces(inputText)~
console.log(outputText)~