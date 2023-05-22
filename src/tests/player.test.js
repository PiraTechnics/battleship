import { Player } from '../Player';

let testPlayer, testOpponent;

const testPlayerShips = [
    {
        type: 'carrier',
        headCoord: [0, 1],
        tailCoord: [0, 5]
    },
    {
        type: 'battleship',
        headCoord: [3, 0],
        tailCoord: [3, 3]
    },
    {
        type: 'destroyer',
        headCoord: [5, 1],
        tailCoord: [7, 1]
    },
    {
        type: 'submarine',
        headCoord: [7, 5],
        tailCoord: [7, 7]
    },
    {
        type: 'patrol boat',
        headCoord: [9, 2],
        tailCoord: [9, 3]
    }
];

const testOpponentShips = [
    {
        type: 'carrier',
        headCoord: [5, 1],
        tailCoord: [9, 1]
    },
    {
        type: 'battleship',
        headCoord: [6, 5],
        tailCoord: [6, 8]
    },
    {
        type: 'destroyer',
        headCoord: [2, 1],
        tailCoord: [4, 1]
    },
    {
        type: 'submarine',
        headCoord: [1, 3],
        tailCoord: [1, 5]
    },
    {
        type: 'patrol boat',
        headCoord: [0, 0],
        tailCoord: [0, 1]
    }
]

beforeEach(() => {
    testPlayer = Player();
    testOpponent = Player();
    testPlayer.setOpponent(testOpponent);
    testOpponent.setOpponent(testPlayer);
});

test('Player should have a game board', () => {
    expect(testPlayer.board).tobeTruthy;
});

test('Players should be able to fill their board with ships', () => {
    testPlayer.placeShips(testPlayerShips);
    testOpponent.placeShips(testOpponentShips);
    expect(testPlayer.board.ships.length).toBe(5);
    expect(testOpponent.board.ships.length).toBe(5);
});

test('Players cannot take a turn if their opponent is not set', () => {
    const thirdPlayer = Player();
    expect(() => {
        thirdPlayer.takeTurn(3, 5)
    }).toThrow('No opponent set yet!');
});

test("Player turns should result in a single attack on opponent's board", () => {
    testPlayer.takeTurn(3, 5);
    expect(testOpponent.board.grid[3][5]).toBe('miss!'); //no ships on the board yet
});

test('Players should keep track of their turns', () => {
    testPlayer.takeTurn(1, 2);
    testPlayer.takeTurn(3, 4);
    const turnOne = testPlayer.getTurn(0);
    const turnTwo = testPlayer.getTurn(1)
    expect(turnOne['coordinates']).toStrictEqual([1, 2]);
    expect(turnTwo['turnNumber']).toBe(2);
    expect(turnOne['result']).toBe('miss!');
});

test('Player should attack randomly if no coordinates given', () => {
    expect(testPlayer.takeTurn()).tobeTruthy;
    //NOTE: We are only testing that this calls without error
    //To test 'randomness' (and also unique attacks), we likely
    //need to do some mocking later
});