import { ShipFactory } from '../ship';

let testShip;

beforeEach(() => {
    testShip = ShipFactory(5, 0, false);
});

test('Ship should register a hit', () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
});

test('Ship should know if it is sunk', () => {
    for(let i = 0; i < testShip.length; i++) {
        testShip.hit();
    }
    expect(testShip.isSunk()).toBe(true);
});

test('Ship should stay afloat if it can take more hits', () => {
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
});