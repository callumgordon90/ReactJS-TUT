import React from 'react';
import { useState } from 'react';

//CHILD SQUARE COMPONENT (displays value , recieves props from board, contains event handler)

//(When clicking on a Square, the child Square component now asks the parent Board component
// to update the state of the board).

function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

//PARENT BOARD COMPONENT (manages state)
export default function Board() {
  //lifting state up
  const [squares, setSquares] = useState(Array(9).fill(null));
  console.log(squares);

  function handleClick(i){
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return(
        <>
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

