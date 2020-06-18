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
        this.board = this.createEmptyBoard();

    }

    state = {
        cells: [],
    }

    createEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];

            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;

            }
        }

        return board;
    }

    createCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if(this.board[y][x]) {
                    cells.push({x, y});
                }
            }
        }

        return cells;
    }

    render() {
        return (
            <div>
                <div className='Board' 
                style={{ 
                    width: width, 
                    height: height, 
                    backgroundSize: `${cellSize}px ${cellSize}px` 
                    
                }}
                onClick={this.handleClick}
                ref={(n) => { this.boardRef = n; }}>
                </div>
            </div>
        )
    }
}

export default Game;