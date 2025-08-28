let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "❌";   // Always starts with ❌
let gameActive = true;
let aiMode = true; // start with AI mode
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
      if (aiMode && currentPlayer === "❌") {
        // Human move
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
    statusDisplay.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "🤝 It's a Draw!";
    gameActive = false;
  } else {
    // Switch turn properly
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    statusDisplay.textContent = aiMode 
      ? (currentPlayer === "❌" ? "Your Turn (❌)" : "Computer's Turn (⭕)")
      : `Player ${currentPlayer}'s Turn`;
  }
}

// ---- AI Hard Mode ----
function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "⭕";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  currentPlayer = "⭕";
  playerMove(move);
}

function minimax(newBoard, depth, isMaximizing) {
  if (checkWinner(newBoard, "⭕")) return 10 - depth;
  if (checkWinner(newBoard, "❌")) return depth - 10;
  if (newBoard.every(cell => cell !== "")) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "⭕";
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "❌";
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner(b, player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => b[index] === player)
  );
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "❌";
  gameActive = true;
  statusDisplay.textContent = aiMode 
    ? "AI Mode: Player ❌ vs Computer ⭕ (Hard)"
    : "2 Player Mode: Player ❌ starts";
  cells.forEach(cell => cell.textContent = "");
}

function toggleMode() {
  aiMode = !aiMode;
  restartGame();
}
