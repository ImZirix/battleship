import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
  attack(enemyBoard, x, y) {
    return enemyBoard.receiveAttack(x, y);
  }
}

export class ComputerPlayer extends Player {
  constructor() {
    super("Computer");
    this.attackHistory = new Set();
  }
  getRandomCords() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.attackHistory.has(`${x},${y}`));
    this.attackHistory.add(`${x},${y}`);
    return [x, y];
  }
  makeMove(enemyBoard) {
    const [x, y] = this.getRandomCords();
    return this.attack(enemyBoard, x, y);
  }
}
