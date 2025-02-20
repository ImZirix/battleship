import { Player, ComputerPlayer } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import dom from "./dom.js";

export class Game {
  constructor() {
    this.player = new Player("Player");
    this.computer = new ComputerPlayer();
    this.currentTurn = this.player;

    this.placeShipRandomly(this.player.gameboard);
    this.placeShipRandomly(this.computer.gameboard);
  }
  placeShipRandomly(gameboard) {
    const shipSizes = [5, 4, 3, 3, 2];

    shipSizes.forEach((size) => {
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isHorizontal = Math.random() < 0.5;

        if (this.canPlaceShip(gameboard, size, x, y, isHorizontal)) {
          gameboard.placeShip(new Ship(size), x, y, isHorizontal);
          placed = true;
        }
      }
    });
  }
  canPlaceShip(gameboard, length, x, y, isHorizontal) {
    for (let i = 0; i < length; i++) {
      const newX = isHorizontal ? x + i : x;
      const newY = isHorizontal ? y : y + i;

      if (newX >= 10 || newY >= 10) return false;

      if (gameboard.board[newY][newX] !== null) return false;
    }
    return true;
  }
  switchTurn() {
    this.currentTurn =
      this.currentTurn === this.player ? this.computer : this.player;
  }

  checkGameOver() {
    if (this.player.gameboard.areAllShipsSunk()) return true;
    if (this.computer.gameboard.areAllShipsSunk()) return true;
    else return false;
  }
  playTurn(x, y) {
    if (this.currentTurn === this.player) {
      this.player.attack(this.computer.gameboard, x, y);
      dom.renderBoards();

      if (!this.checkGameOver()) {
        this.switchTurn();
        setTimeout(() => {
          this.computer.makeMove(this.player.gameboard);
          dom.renderBoards();
          this.switchTurn();
        }, 500);
      }
    }
  }
}
