var origBoard;
const huPlayer = 'X';
const aiPlayer = 'O';
const winCombos = [
    [0, 1, 2], // first row
    [3, 4, 5], // second row
    [6, 7, 8], // third row
    [0, 3, 6], // first col
    [1, 4, 7], // second col
    [2, 5, 8], // third col
    [0, 4, 8], // diagnol \
    [2, 4, 6]  // diagnol /
]
const cells = document.querySelectorAll('.cell');

// Run the game
newGame();

/******************************************************************************/

function newGame() {
    // Initialize/Reset the board for a new game
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer);
        // Check if the human didn't just win before the ai plays
        if (!checkWin(origBoard, huPlayer)) {
            turn(bestSpot(), aiPlayer);
        }
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver(gameWon);
    }
}

// Check if the passed player won, return the win array
function checkWin(board, player) {
    // Grab all of the plays this player made
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);

    let gameWon = null;
    for (let [index, winCombo] of winCombos.entries()) {
        // Check if this winCombo was met
        if (winCombo.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }

    if (!gameWon && emptySquares().length == 0) {
        gameWon = {index: null, player: "Tie"};
    }

    return gameWon;
}

function gameOver(gameWon) {
    if (gameWon.player == "Tie") {
        // Color the entire board on a tie
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie game!");
    } else {
        // Color the player's line that won
        for (let index of winCombos[gameWon.index]) {
            document.getElementById(index).style.backgroundColor =
                gameWon.player == huPlayer ? "blue" : "red";
        }
        declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!");
    }
    // Disable all of the cell actions
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}

function minimax(newBoard, player) {
    let availSpots = emptySquares(newBoard);

    let humanWon = checkWin(newBoard, huPlayer);
    let aiWon = checkWin(newBoard, aiPlayer);

    if (humanWon && humanWon.player == huPlayer) {
        return {score: -10};
    } else if (aiWon && aiWon.player == aiPlayer) {
        return {score: 10};
    } else if (availSpots.length === 0) {
        return {score: 0};
    }
    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}
