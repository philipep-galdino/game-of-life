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
        
        // generates cells according to the board state

        // it generates cells once the board state is
        // updated

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

    getElementOffset() {

        // calculate and gets the board element's position

        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    handleClick = (event) => {

        // will get the position with the clients click and convert it
        // to a position relative to the board, calculating the cols and rows
        // for the cell clicked on

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.createCells()});
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