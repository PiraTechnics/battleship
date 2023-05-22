import { Ship } from './Ship';

export function Gameboard() {

    let ships = [];
    let grid = new Array(10);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(grid.length);
        for(let j = 0; j < grid[i].length; j++) {
            grid[i][j] = {
                x: i,
                y: j,
                space: null
            }
        }
    };

    function placeShip(headCoord, tailCoord, type) {

        //Sanity check for grid coordinates
        checkGridBound(headCoord);
        checkGridBound(tailCoord);

        //Get difference between head and tail coordinates -- ONE of these must be 1
        const xLength = Math.abs(headCoord[0] - tailCoord[0]);
        const yLength = Math.abs(headCoord[1] - tailCoord[1]);
        if(Math.min(xLength, yLength) > 1) {
            //ship too wide, throw error
            throw('Ships cannot be wider than 1 unit!');
        }

        //Create new ship object
        //const shipLength = Math.max(xLength, yLength);
        const newShip = Ship(type);

        //Check for collision with our other ships
        for (let i = headCoord[0]; i < tailCoord[0] + 1; i++) {
            for (let j = headCoord[1]; j < tailCoord[1] + 1; j++) {
                //test for already filled coordinates
                if (grid[i][j].space) {
                    throw ("You fool! You'd sink both your own ships?");
                }
                //each space contains a reference to the ship
                grid[i][j].space = newShip;
            }
        }

        //Add to our maritime list and return it
        this.ships.push(newShip);
        return newShip;
    }

    function receiveAttack(attackCoordinates) {
        //Sanity check coordinates
        checkGridBound(attackCoordinates);

        const val = grid[attackCoordinates[0]][attackCoordinates[1]].space;

        if(!val) {
            //Nothing (undefined) here -- a miss
            grid[attackCoordinates[0]][attackCoordinates[1]].space = 'miss!';
            return false;
        }
        else {
            if(val.name) {
                //the spot has a 'name' variable -- so its a ship, and that's a hit!
                const hitShip = val;
                hitShip.hit(); //record the hit on the ship object, then on grid
                grid[attackCoordinates[0]][attackCoordinates[1]].space = 'hit!';

                //check if all of our ships have been sunk
                //if so, return a game-ending message instead
                if(allShipsSunk()) {
                    return "All Ships Sunk!";
                }

                //return our ship if game is still on
                return hitShip;
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

    function allShipsSunk() {
        let sunkCount = 0;
        ships.forEach(ship => {
            if(ship.isSunk()) {
                sunkCount ++;
            }
        });

        return sunkCount == ships.length ? true : false;
    }

    return { ships, grid, placeShip, receiveAttack }

}