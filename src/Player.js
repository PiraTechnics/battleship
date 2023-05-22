import { Gameboard } from "./Gameboard";

export function Player() {

    const turns = [];
    const board = Gameboard();
    let opponentBoard;

    function setOpponent(opponent) {
        opponentBoard = opponent.board;
    }

    function placeShips(shipArr) {
        shipArr.forEach(shipInfo => {
            board.placeShip(shipInfo['headCoord'], shipInfo['tailCoord'], shipInfo['type']);
        });
    }

    function takeTurn(atkX, atkY) {
        if (!opponentBoard) {
            throw ('No opponent set yet!');
        }
        if (!atkX && !atkY) {

            let used = [];
            turns.forEach(turn => {
                used.push(turn['coordinates']);
            });

            [atkX, atkY] = chooseRandomUnique(used);
        }
        const result = opponentBoard.receiveAttack([atkX, atkY]);
        //track turn for recall
        turns.push(
            {
                'turnNumber': (turns.length + 1),
                'coordinates': [atkX, atkY],
                'result': (!result ? 'miss!' : 'hit!')
            }
        )
    }

    function getTurn(turnNum) {
        return turns[turnNum];
    }

    //***Helper Function for Random Attack***/
    function chooseRandomUnique(usedCoordinates) {
        //choose random spot on board -- not one that we've already attacked tho
        let coordX = Math.floor(Math.random() * 10);
        let coordY = Math.floor(Math.random() * 10);

        //check for already-attacked coordinates
        if (usedCoordinates.includes([coordX, coordY])) {
            //choose a new set and try again
            chooseRandomUnique(used);
        }

        return [coordX, coordY];

    }

    return { board, setOpponent, placeShips, takeTurn, getTurn }

}