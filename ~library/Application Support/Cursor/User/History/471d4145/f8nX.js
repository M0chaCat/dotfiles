/* 
User Commands! 

To add a new command, use the addCommand function like the examples included.

*/

function registerUserCommands(addCommand) {
    addCommand("greet", "Greet the user", function(parts) {
        return "Hello, " + (parts[1] || "Guest") + "!";
    });

    addCommand("goodbye", "Say goodbye to the user", function(parts) {
        return "Goodbye, " + (parts[1] || "Guest") + "!";
    });

    addCommand("info", "Display terminal information", function() {
        return `Dusk Emulated Terminal v${version}`;
    });

    addCommand("exit", "Close the terminal", function() {
        window.close(); // This will attempt to close the current emulated terminal
        return "Goodbye, " + (parts[1] || "Guest") + "!";
    });

    addCommand("play", "Start a Tic-Tac-Toe game", function(row, col) {
        // Game setup
        console.log("Pssst!.... Want to play tic-tac-toe?\nUse play(r,c) First argument is Row, Second argument is Column");
        const player = "🏃🏾"; // Player symbol
        const computer = "🔨"; // Computer symbol
        const noplayer = "➖";
        let maxMoves = 9;
        let currentMove = 0;

        let boardobject = {
            "0_0": noplayer,
            "0_1": noplayer,
            "0_2": noplayer,
            "1_0": noplayer,
            "1_1": noplayer,
            "1_2": noplayer,
            "2_0": noplayer,
            "2_1": noplayer,
            "2_2": noplayer,
        };

        function validateMove(x, y, z) {
            let currentPlayer = z;
            let check = boardobject[`${x}_${y}`];
            if (check == noplayer) {
                currentMove++;
                boardobject[`${x}_${y}`] = currentPlayer;
                if (victory(z)) {
                    console.log("%c GGWP", `font-size:40px`);
                    return 2; // Victory
                } else {
                    console.clear();
                    return 1; // Valid move
                }
            } else {
                if (currentMove < maxMoves) {
                    console.log("%c INVALID MOVE!", `font-size:40px;color:crimson`);
                    return 0; // Invalid move
                } else {
                    console.log("%c Game over!", `font-size:40px;color:crimson`);
                }
            }
        }

        function computerTurn() {
            if (currentMove === 9) {
                console.log("%c Game Tie!", `font-size:40px;color:crimson`);
                return 2; // Tie
            }
            let nextMove = [];
            for (let key in boardobject) {
                if (boardobject[key] == noplayer) {
                    let index = key.split("_");
                    let pos = [index[0], index[1]];
                    nextMove.push(pos);
                }
            }
            let computerMove = nextMove[Math.floor(Math.random() * nextMove.length)];
            let c = validateMove(computerMove[0], computerMove[1], computer);
            if (c === 0) {
                computerTurn();
            }
        }

        // Start the game with the player's move
        validateMove(row, col, player);
        computerTurn();
    });
}