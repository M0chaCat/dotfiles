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
        // Ensure there is one space between the command and the arguments
        if (parts.length < 3 || parts[1] === "" || parts[2] === "") {
            return "Usage: play <row> <col>";
        }

        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);

        // Game setup
        setText("DisplayText", "Pssst!.... Want to play tic-tac-toe?\nUse play(r,c) First argument is Row, Second argument is Column");
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
                // Check for victory only after a valid move
                if (victory(currentPlayer)) {
                    setText("DisplayText", "GGWP! You win!");
                    return 2; // Victory
                } else {
                    return 1; // Valid move
                }
            } else {
                if (currentMove < maxMoves) {
                    setText("DisplayText", "INVALID MOVE!");
                    return 0; // Invalid move
                } else {
                    setText("DisplayText", "Game over!");
                }
            }
        }

        function computerTurn() {
            if (currentMove === 9) {
                setText("DisplayText", "Game Tie!");
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

        function victory(player) {
            // Check rows, columns, and diagonals for a win
            const winConditions = [
                // Rows
                ["0_0", "0_1", "0_2"],
                ["1_0", "1_1", "1_2"],
                ["2_0", "2_1", "2_2"],
                // Columns
                ["0_0", "1_0", "2_0"],
                ["0_1", "1_1", "2_1"],
                ["0_2", "1_2", "2_2"],
                // Diagonals
                ["0_0", "1_1", "2_2"],
                ["0_2", "1_1", "2_0"],
            ];

            return winConditions.some(condition => 
                condition.every(pos => boardobject[pos] === player)
            );
        }

        // Start the game with the player's move
        const playerMoveResult = validateMove(row, col, player);
        if (playerMoveResult === 1) {
            computerTurn();
        }
}