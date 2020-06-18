import React from 'react';
import './Game.css';

const cellSize = 20;
const width = 800;
const height = 600;

class Game extends React.Component {
    render() {
        return (
            <div>
                <div className='Board' style={{ width: width, height: height }}></div>
            </div>
        )
    }
}

export default Game;