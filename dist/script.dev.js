"use strict";

var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameActive = true;
var aiMode = true; // start with AI 

var statusDisplay = document.getElementById("status");
var cells = document.querySelectorAll(".cell");
cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    var index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
      if (aiMode && currentPlayer === "X") {
        // Human 
        playerMove(index);
        if (gameActive) setTimeout(aiMove, 500);
      } else if (!aiMode) {
        // 2-player mode 
        playerMove(index);
      }
    }
  });
});

function playerMove(index) {
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner(board, currentPlayer)) {
    statusDisplay.textContent = "\uD83C\uDF89 Player ".concat(currentPlayer, " Wins!");
    gameActive = false;
  } else if (board.every(function (cell) {
    return cell !== "";
  })) {
    statusDisplay.textContent = "🤝 It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = "Player ".concat(currentPlayer, "'s Turn");
  }
} // ---- AI  ----


function aiMove() {
  var bestScore = -Infinity;
  var move;

  for (var i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      var score = minimax(board, 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  currentPlayer = "O";
  playerMove(move);
  currentPlayer = "X"; // return control to human
}

function minimax(newBoard, depth, isMaximizing) {
  if (checkWinner(newBoard, "O")) return 10 - depth;
  if (checkWinner(newBoard, "X")) return depth - 10;
  if (newBoard.every(function (cell) {
    return cell !== "";
  })) return 0;

  if (isMaximizing) {
    var bestScore = -Infinity;

    for (var i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "O";
        var score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    var _bestScore = Infinity;

    for (var _i = 0; _i < newBoard.length; _i++) {
      if (newBoard[_i] === "") {
        newBoard[_i] = "X";

        var _score = minimax(newBoard, depth + 1, true);

        newBoard[_i] = "";
        _bestScore = Math.min(_score, _bestScore);
      }
    }

    return _bestScore;
  }
}

function checkWinner(b, player) {
  var winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  return winPatterns.some(function (pattern) {
    return pattern.every(function (index) {
      return b[index] === player;
    });
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = aiMode ? "AI Mode: Player X vs Computer (O)" : "2 Player Mode: Player X starts";
  cells.forEach(function (cell) {
    return cell.textContent = "";
  });
}

function toggleMode() {
  aiMode = !aiMode;
  restartGame();
  statusDisplay.textContent = aiMode ? "AI Mode: Hard (Unbeatable)" : "2 Player Mode: Player X starts";
}
//# sourceMappingURL=script.dev.js.map
