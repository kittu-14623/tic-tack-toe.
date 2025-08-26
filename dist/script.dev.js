"use strict";

var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameActive = true;
var statusDisplay = document.getElementById("status");
var cells = document.querySelectorAll(".cell");
cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    var index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWinner()) {
        statusDisplay.textContent = "Player ".concat(currentPlayer, " Wins!");
        gameActive = false;
      } else if (board.every(function (cell) {
        return cell !== "";
      })) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = "Player ".concat(currentPlayer, "'s Turn");
      }
    }
  });
});

function checkWinner() {
  var winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  return winPatterns.some(function (pattern) {
    return pattern.every(function (index) {
      return board[index] === currentPlayer;
    });
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = "Player X's Turn";
  cells.forEach(function (cell) {
    return cell.textContent = "";
  });
}
//# sourceMappingURL=script.dev.js.map
