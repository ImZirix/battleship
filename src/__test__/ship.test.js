import { Ship } from "../ship";
/* eslint-disable */
describe("Ship class", () => {
  const ship = new Ship(5);
  test("Ship is created with correct length", () => {
    expect(ship.length).toBe(5);
  });
  test("ship registers a hit", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });
  test("Ship does not sink before enough hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test("Ship sinks when hit enough times", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
