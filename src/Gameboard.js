//creates a 10x10 game board
// places a new ship with inputs: headPos, and tailPos -> verifies these and builds ship
// marks relevant coordinate on grid

//Board rules
//Can only have 1 of each type of ship (lengths must be unique)
//Ships cannot be placed with bounds outside of grid
//Ships cannot overlap

import { Ship } from './Ship';

export function Gameboard() {

    let ships = [];
    let grid = new Array(10);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(grid.length);
    };

    function placeShip(headCoord, tailCoord, type) {

        //Sanity check for grid coordinates
        checkGridBound(headCoord);
        checkGridBound(tailCoord);

        //Get difference between head and tail coordinates -- ONE of these must be 1
        const xLength = Math.abs(headCoord[0] - tailCoord[0]);
        const yLength = Math.abs(headCoord[1] - tailCoord[1]);

        //Create new ship object
        //const shipLength = Math.max(xLength, yLength);
        const newShip = Ship(type);

        //console.log(grid);
        //Check for collision with our other ships
        for (let i = headCoord[0]; i < tailCoord[0] + 1; i++) {
            for (let j = headCoord[1]; j < tailCoord[1] + 1; j++) {
                //test for already filled coordinates
                if (grid[i][j]) {
                    console.log(grid[i][j])
                    throw ("You fool! You'd sink both your own ships?");
                }
                //each space contains a reference to the ship
                grid[i][j] = newShip;
            }
        }

        //Add to our maritime list
        this.ships.push(newShip);
    }

    function receiveAttack(attackCoordinates) {
        //Sanity check coordinates
        checkGridBound(attackCoordinates);

        const val = grid[attackCoordinates[0]][attackCoordinates[1]];

        if(!val) {
            //Nothing (undefined) here -- a miss
            grid[attackCoordinates[0]][attackCoordinates[1]] = 'miss!';
        }
        else {
            if(val.type instanceof String) {
                //that's a hit!
                grid[attackCoordinates[0]][attackCoordinates[1]] = 'hit!';
            }
            else {
                throw("You already attacked that spot!");
            }
            
        }

    }

    //****Helper Functions****
    function checkGridBound(coordinates) {
        //Sanity check for grid coordinates
        if (coordinates.some((v) => v < 0 || v >= 10)) {
            throw ('Yer off the map there, matey!');
        }
        return true;
    }

    return { ships, grid, placeShip, receiveAttack }

}