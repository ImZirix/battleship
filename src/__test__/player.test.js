import { Gameboard } from "../gameboard";
import { Player, ComputerPlayer } from "../player";
/* eslint-disable */

describe("Player class", () => {
  let player, enemyBoard;
  beforeEach(() => {
    player = new Player("Zirix");
    enemyBoard = new Gameboard();
  });
  test("Player has a name", () => {
    expect(player.name).toBe("Zirix");
  });
  test("Player can attack an enemy board", () => {
    player.attack(enemyBoard, 3, 4);
    expect(enemyBoard.missedShots).toContainEqual([3, 4]);
  });
});

describe("ComputerPlayer class", () => {
  let computer, enemyBoard;

  beforeEach(() => {
    computer = new ComputerPlayer();
    enemyBoard = new Gameboard();
  });
  test("Computer player has the name 'Computer'", () => {
    expect(computer.name).toBe("Computer");
  });
  test("Computer player makes a valid move", () => {
    computer.makeMove(enemyBoard);
    expect(enemyBoard.missedShots.length).toBe(1);
  });
  test("Computer does not attack the same position twice", () => {
    for (let i = 0; i < 100; i++) {
      computer.makeMove(enemyBoard);
    }
    expect(computer.attackHistory.size).toBe(enemyBoard.missedShots.length);
  });
});
