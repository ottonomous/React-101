import React, { useState, componentDidUpdate } from 'react'
import ReactDOM from 'react-dom'
import { isCompositeComponent } from 'react-dom/test-utils'
import './index.css'


function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      { props.value }
    </button>
  )
}


function Board () {
   
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const  calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}

  const handleClick = (i) => {
    if(calculateWinner(squares) || squares[i]) return
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? 'X' : 'O'

    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i) =>  {
    return <Square 
      value={squares[i]}
      onClick={() => {handleClick(i)}} 
    />
  }
    const winner = calculateWinner(squares)
    const status = winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'} `

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  }

const Game = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
