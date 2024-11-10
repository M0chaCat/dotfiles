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
set inputText = readFile("./SolsticeOS.ms")~
set outputText = replaceNewLinesWithSpaces(inputText)~
console.log(outputText)~