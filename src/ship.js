export function ShipFactory(length, hits=0, sunk=false) {
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
}