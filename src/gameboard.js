import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.missedShots = [];
    this.ships = [];
  }
  placeShip(ship, x, y, isHorizontal = true) {
    this.ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        this.board[y][x + i] = ship;
      } else {
        this.board[y + i][x] = ship;
      }
    }
  }
  receiveAttack(x, y) {
    if (
      this.board[y][x] === "hit" ||
      this.missedShots.some(([mx, my]) => mx === x && my === y)
    ) {
      return "Already attacked!";
    }

    if (this.board[y][x] === null) {
      this.missedShots.push([x, y]);
      return "Miss!";
    } else {
      this.board[y][x].hit();
      this.board[y][x] = "hit";
      return "Hit!";
    }
  }
  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
