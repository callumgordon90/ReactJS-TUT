import React from 'react';
import { useState } from 'react';

//CHILD SQUARE COMPONENT (displays value , recieves props from board, contains event handler)

//(When clicking on a Square, the child Square component now asks the parent Board component
// to update the state of the board).

function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

//PARENT BOARD COMPONENT (manages state)
function Board({ xIsNext, squares, onPlay}) {
  
  //const [xIsNext, setXIsNext] = useState(true);
  //const [squares, setSquares] = useState(Array(9).fill(null));
  
  //console.log(squares);

    function handleClick(i){
      const nextSquares = squares.slice();

      if(squares[i] || calculateWinner(squares)){
        return;
      }

      if(xIsNext){
      nextSquares[i] = "X";
      } else{
        nextSquares[i] = "O";
      }

      onPlay(nextSquares);

      //setSquares(nextSquares);
      //setXIsNext(!xIsNext);
    }

    //STATUS SECTION OF THE BOARD - to display message for the winner:
    const winner = calculateWinner(squares);
    console.log(winner);
    let status;

    if(winner){
      status = "Winner: " + winner;
    } else{
      status = "Next Player: " + (xIsNext ? "X" : "0");
    }


    //end of status section

    return(
          <>
            <div className="status">{status}</div>
            <div className="board-row">
            <Square value={ squares[0] } onSquareClick={()=>handleClick(0)}/>
            <Square value={ squares[1] } onSquareClick={()=>handleClick(1)}/>
            <Square value={ squares[2] } onSquareClick={()=>handleClick(2)}/>
            </div>
            <div className="board-row">
            <Square value={ squares[3] } onSquareClick={()=>handleClick(3)}/>
            <Square value={ squares[4] } onSquareClick={()=>handleClick(4)}/>
            <Square value={ squares[5] } onSquareClick={()=>handleClick(5)}/>
            </div>
            <div className="board-row">
            <Square value={ squares[6] } onSquareClick={()=>handleClick(6)}/>
            <Square value={ squares[7] } onSquareClick={()=>handleClick(7)}/>
            <Square value={ squares[8] } onSquareClick={()=>handleClick(8)}/>
            </div>
          </>
          );
}

//function to calculate a winner:
function calculateWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for( let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
          return squares[a];
        }
    }
    return null;
}

//creating game component to manage game history: 
export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext= currentMove % 2 === 0;
  const currentSquares = history[currentMove];

    function handlePlay(nextSquares){
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove){
      setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) =>{
      let description;
      if(move > 0){
        description = 'Go to move #' + move;
      }else{
        description = 'Go to game start';
      }
      return(
        <li key={move}>
          <button onClick={()=> jumpTo(move)}>{description}</button>
        </li>
      );
    });





  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div> 
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
