import React from 'react';
import './Game.css';

const cellSize = 20;
const width = 800;
const height = 600;

class Game extends React.Component {
    constructor() {
        super();

        this.rows = height / cellSize;
        this.cols = width / cellSize;
        this.board = this.makeEmptyBoard();

    }

    state = {
        cells: [],
    }

    render() {
        return (
            <div>
                <div className='Board' style={{ width: width, height: height, backgroundSize: `${cellSize}px ${cellSize}px` }}></div>
            </div>
        )
    }
}

export default Game;