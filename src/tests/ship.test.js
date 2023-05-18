import { Ship } from '../Ship';

let testShip;

beforeEach(() => {
    testShip = Ship('Battleship');
});

test('Ship should set its length correctly for the type', () => {
    expect(testShip.length).toBe(4);
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