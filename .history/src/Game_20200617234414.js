import React from 'react';
import './Game.css';

const cellSize = 20;
const width = 800;
const height = 600;

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        return(
            <div className='Cell' 
            style={{
                left: `${cellSize * x + 1}px`,
                top: `${cellSize * y + 1}px`,
                width: `${cellSize -1}px`,
                height: `${cellSize -1}px`,
            }}/>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();

        this.rows = height / cellSize;
        this.cols = width / cellSize;
        this.board = this.createEmptyBoard();

    }

    state = {
        cells: [],
        interval: 100,
        isRunning: false,
    }

    startGame = () => {
        this.setState({ isRunning: true })
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false })
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runIteration() {
        
        // runs the logic for the cell's reproduction according to
        // the conway's game of life rules 

        let newBoard = this.createEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    } 
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        
        this.board = newBoard;
        this.setState({ cells: this.createCells() });
        this.timeoutHandler = window.setTimeout(() => { 
            this.runIteration(); 
        }, this.state.interval);

    }

    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[1];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    handleIntervalChange = (event) => {
        this.setState({ interval:event.target.value });
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

    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.createCells() });
    }

    render() {
        const { cells } = this.state;
        return (
            
            <div>
                <div className='Board' style={{ width: width, height: height, backgroundSize: `${cellSize}px ${cellSize}px` }} onClick={this.handleClick} ref={(n) => { this.boardRef = n; }}>
                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
                ))}
                </div>

                <div className='controls'>
                    Update every <input value={this.state.interval} onChange={this.handleIntervalChange} />msec {this.state.isRunning ?
                         <button className='button' onClick={this.stopGame}>Stop</button> :
                          <button className='button' onClick={this.startGame}>Start</button>
                        }
                        <button className="button" onClick={this.handleRandom}>Random</button>
                </div>
            </div>

            
        )
    }
}

export default Game;