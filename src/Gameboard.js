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
            console.log('made it!');
            throw('Yer off the map there, matey!');
        }

        //Get difference between head and tail coordinates -- ONE of these must be 1
        const x_length = Math.abs(headCoord[0] - tailCoord[0]);
        const y_length = Math.abs(headCoord[1] - tailCoord[1]);

        for(let i = 0; i < x_length; i++) {
            for(let j = 0; j < y_length; j++) {

            }
        }

         grid[headCoord[0]][headCoord[1]] = 'ship'; //actually place ship reference here
         grid[tailCoord[0]][tailCoord[1]] = 'ship';
         this.ships.push(Ship(5));
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