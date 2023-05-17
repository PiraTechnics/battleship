import { Gameboard } from '../Gameboard';

let testBoard;

beforeEach(() => {
    testBoard = Gameboard();
})

test('We fill the board coordinates when a ship is placed', () => {
    testBoard.placeShip([0,0], [0,1]);
    expect(testBoard.grid[0][0]).toBeTruthy();
});

 test('Ship is created when we place a new one', () => {
    testBoard.placeShip([0,0], [0,1]);
    expect(testBoard.ships.length).toBe(1);
});

test('Ships cant be placed out of bounds', () => {
    expect(() => {
        testBoard.placeShip([5,1], [5,-1]);
    }).toThrow('Yer off the map there, matey!');
});

test('Ships cant be placed overlapping one another', () => {
    testBoard.placeShip([0, 5], [0, 9]);
    expect(() => {
        testBoard.placeShip([0, 5], [3, 5]);
    }).toThrow("You fool! You'd sink both your own ships?");
});

/*test('' (), => {

}); */

//To test:
// 1. places a ship (marker) at the correct coords
// 

//Gameboard: 10x10 grid
// each square should be either empty, or hold a 'part' of a ship
// should be able to access the ship in question from any of its grid squares

//Gameboard should be able to place() a new ship, given start and end coords (x1, y1, x2, y2)
//Should create a ship with the appropriate length
// should only allow ships of 1 width (so either x OR y coords must be same start to end)