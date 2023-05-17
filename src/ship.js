export function Ship(length, hits=0, sunk=false) {
    return {
        length: length,
        hits: hits,
        sunk: sunk,
        hit() {
            this.hits++;
            if(this.hits >= this.length) {
                this.sunk = true;
            }
        },
        isSunk() {
            return this.sunk;
        }
    }

    //should also have a name dict --> assigns 'Carrier', 'Battleship', 'Destroyer', 'Submarine', or 'Patrol Boat' based on size
}