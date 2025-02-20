import { Gameboard } from "../gameboard";
import { Ship } from "../ship";
/* eslint-disable */
describe("Gameboard class", () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
  });

  test("Place a ship correctly", () => {
    gameboard.placeShip(ship, 2, 2, true);
    expect(gameboard.board[2][2]).toBe(ship);
    expect(gameboard.board[2][3]).toBe(ship);
    expect(gameboard.board[2][4]).toBe(ship);
  });
  test("Registers a hit on the ship", () => {
    gameboard.placeShip(ship, 1, 1, true);
    gameboard.receiveAttack(1, 1);
    expect(ship.hits).toBe(1);
  });
  test("Registers a missed attack", () => {
    gameboard.receiveAttack(5, 5);
    expect(gameboard.missedShots).toContainEqual([5, 5]);
  });
  test("Detects when all ships are sunk", () => {
    gameboard.placeShip(ship, 0, 0, true);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
  test("Returns false if at lease one ship is still floating", () => {
    const ship2 = new Ship(4);
    gameboard.placeShip(ship, 0, 0, true);
    gameboard.placeShip(ship2, 5, 5, true);

    ship.hit();
    ship.hit();
    ship.hit();
    expect(gameboard.areAllShipsSunk()).toBe(false);
  });
});
