import { Gameboard } from '../Gameboard';

let testBoard;

beforeEach(() => {
    testBoard = Gameboard();
    testBoard.placeShip([0,1], [0,3], 'Submarine');
})

test('We fill the board coordinates when a ship is placed', () => {
    expect(testBoard.grid[0][1]).toBeTruthy();
    expect(testBoard.grid[0][2]).toBeTruthy();
    expect(testBoard.grid[0][3]).toBeTruthy();
});

 test('Ship is created when we place a new one', () => {
    expect(testBoard.ships.length).toBe(1);
});

test('A reference to the correct ship is placed in each square it occupies', () => {
    expect(testBoard.grid[0][1].length).toBe(3);
    expect(testBoard.grid[0][2].length).toBe(3);
    expect(testBoard.grid[0][3].length).toBe(3);
});

test('Ships cant be placed out of bounds', () => {
    expect(() => {
        testBoard.placeShip([5,1], [5,-1]);
    }).toThrow('Yer off the map there, matey!');
});

test('Ships cant be placed overlapping one another', () => {
    expect(() => {
        testBoard.placeShip([0, 3], [3, 3], "Battleship");
    }).toThrow("You fool! You'd sink both your own ships?");
});

test('When a ship is hit, it is correctly recorded', () => {
    testBoard.placeShip([0, 4], [2, 4], "Destroyer");
    const shipToTest = testBoard.receiveAttack([1, 4]);
    expect(shipToTest.hits).toBe(1);
    expect(testBoard.grid[1][4]).toBe('hit!');
});

test('When an attack misses, it is correctly recorded', () => {
    testBoard.receiveAttack([3, 2]);
    expect(testBoard.grid[3][2]).toBe('miss!');
});

it('Should report when all ships are sunk', () => {
    testBoard.receiveAttack([0, 1]);
    testBoard.receiveAttack([0, 2]);
    expect(testBoard.receiveAttack([0, 3])).toBe('All Ships Sunk!');
});