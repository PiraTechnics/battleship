import "./styles.css";
import { Player } from "./Player";

//React dependencies for UI
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';

const playerShips = [
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

const computerShips = [
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
];

//Game Setup
let player = Player();
let computer = Player();
player.placeShips(playerShips);
computer.placeShips(computerShips);

const playerGrid = player.board.grid; //this is a 10x10 nested array (contains null values)

//Setup React root and render
document.body.innerHTML = '<div id="app"></div>';
const root = createRoot(document.getElementById('app'));

//render player gamegrid
root.render(<GameGrid playerGrid={playerGrid} player={player}/>);

//Display Game Boards
//Game Loop

function GameGrid(props) {
    
   const cells = props.playerGrid.map((row, x) => 
        row.map((col, y) => 
            ButtonCell(x, y)
                //{props.playerGrid[x][y]['x'] + ', ' + props.playerGrid[x][y]['y']}
                // This ^ gets our coordinates
        )
    );
    
    return (
        <div className="container">
            {cells}
        </div>
    );
}

function ButtonCell(x, y) {

    const [cellText, setCellText] = useState('');

    function launchAttack() {
        //alert('You attacked: ' + x + ', ' + y + '!');
        const attackResult = player.board.receiveAttack([x, y]);
        if(!attackResult) {
            //do something to indicate miss on cell
            setCellText('X');
        }
        else {
            //do something to indicate a hit on cell
            setCellText('O');
        }
    }
    
    return (
        <div className="square" key={x + ', ' + y} onClick={launchAttack}>{cellText}</div>
    )
}
