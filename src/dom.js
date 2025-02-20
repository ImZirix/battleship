import { Game } from "./game.js";

const dom = (() => {
  const game = new Game();

  const playerBoard = document.querySelector("#player-board");
  const computerBoard = document.querySelector("#computer-board");
  const gameStatus = document.querySelector("#game-status");
  const restartBtn = document.querySelector("#restart-btn");

  function renderBoards() {
    playerBoard.innerHTML = "";
    computerBoard.innerHTML = "";

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (game.player.gameboard.board[y][x] !== null) {
          cell.classList.add("ship");
        }
        if (game.player.gameboard.board[y][x] === "hit") {
          cell.classList.add("hit");
        }
        if (
          game.player.gameboard.missedShots.some(
            ([mx, my]) => mx === x && my === y,
          )
        ) {
          cell.classList.add("miss");
        }

        playerBoard.appendChild(cell);
      }
    }

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = x;
        cell.dataset.y = y;

        if (
          game.computer.gameboard.missedShots.some(
            ([mx, my]) => mx === x && my === y,
          )
        ) {
          cell.classList.add("miss");
        }

        if (game.computer.gameboard.board[y][x] === "hit") {
          cell.classList.add("hit");
        }

        cell.addEventListener("click", handlePlayerAttack);
        computerBoard.appendChild(cell);
      }
    }
  }

  function handlePlayerAttack(event) {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    if (game.checkGameOver()) return;

    if (
      event.target.classList.contains("hit") ||
      event.target.classList.contains("miss")
    ) {
      return;
    }

    const result = game.playTurn(x, y);

    renderBoards();

    if (game.checkGameOver()) {
      setTimeout(() => alert("Game Over!"), 100);
    }
  }

  function restartGame() {
    location.reload();
  }
  restartBtn.addEventListener("click", restartGame);

  function startGame() {
    renderBoards();
  }

  return { startGame, renderBoards };
})();

export default dom;
