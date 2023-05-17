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
    for(let i= 0; i < grid.length; i++) {
        grid[i] = new Array(grid.length);
    };

     function placeShip(headCoord, tailCoord) {

        //Sanity check for grid coordinates
        if(headCoord.some((v) => v < 0 || v >= 10) || 
        (tailCoord.some((v) => v < 0 || v >= 10))) {
            throw('Yer off the map there, matey!');
        }

        //Get difference between head and tail coordinates -- ONE of these must be 1
        const xLength = Math.abs(headCoord[0] - tailCoord[0]);
        const yLength = Math.abs(headCoord[1] - tailCoord[1]);

        for(let i = headCoord[0]; i < headCoord[1]+1; i++) {
            for(let j = tailCoord[0]; j < tailCoord[1]+1; j++) {
                //test for already filled coordinates
                if(grid[i][j] == 'ship') {
                    throw("You fool! You'd sink both your own ships?");
                }
                grid[i][j] = 'ship';
            }
        }

        const shipLength = Math.max(xLength, yLength)
        this.ships.push(Ship(shipLength));
     }

    return { ships, grid, placeShip }
    
/*     return {
        ships: [],
        grid: () => {
            let xArr = new Array(10);
            xArr.forEach(x => {
                x.push(new Array(10));
            }); //returns a 10x10 empty array
            return xArr;
        },
        placeShip(headCoord, tailCoord) {
            //grid[headCoord] = 'ship';
            //grid[tailCoord] = 'ship';
            console.log(this.grid);
            this.ships.push(Ship(5));
        },
    } */
 }