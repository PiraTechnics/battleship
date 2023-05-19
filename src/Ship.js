export function Ship(type) {
    
    const shipLengths = {
        "carrier": 5,
        "battleship": 4,
        "destroyer": 3,
        "submarine": 3,
        "patrol boat": 2
    }

    const length = (type ? shipLengths[type.toLowerCase()] : undefined);
    let hits = 0;

    function hit() {
        this.hits++;
    }

    function isSunk() {
        if(this.hits >= this.length) {
            return true;
        }
        return false
    }
    
    return { length, hits, hit, isSunk }
}