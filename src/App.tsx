import { useState } from 'react';
import './App.css';

import {Intersection} from './Intersection';
import {getCoordIndexInArray, isLegitMove} from './helpers';
import { Color, MARGIN, GAP, LINE_COUNT, LINE_LENGTH, LINE_WIDTH, SIZE } from './consts';

export type ColorType = Color.EMPTY | Color.BLACK | Color.WHITE;

type AtariGoState = {
  board: Color[],
  currentColor: Color
}

export type Coord = [
  number,
  number
];

function App() {     
  const [gameState, setGameState]: [AtariGoState, Function]= useState({
    board: Array(LINE_COUNT * LINE_COUNT).fill(Color.EMPTY),
    currentColor: Color.BLACK
    });

  const  {board, currentColor} = gameState;

  function handleClick(coord: Coord) {
    if (isLegitMove(coord, currentColor, board)) {
      const coordIndex = getCoordIndexInArray(coord, LINE_COUNT);
    
      setGameState({
        board: board.map((coord, i)=> (i === coordIndex) ? currentColor: coord),
        currentColor: currentColor === Color.BLACK ? Color.WHITE : Color.BLACK
      });
    } else {
      return null;
    }
  }

  function renderIntersection(i: number, color: ColorType) {
    return <Intersection onClick={(coord: Coord) => handleClick(coord)} 
    key={i} 
    coord={getCoord(i)} 
    color={color} />;
  }

  
    const horizontalLines = new Array(LINE_COUNT).fill(null).map(
      (a, i) => <line 
      className="line"
      key={i} 
      x1={MARGIN} 
      x2={MARGIN + LINE_LENGTH } 
      y1={getLinePositionByIndex(i)} 
      y2={getLinePositionByIndex(i)} 
      strokeWidth={LINE_WIDTH} 
      stroke="black"
      />);
  
    const verticalLines = new Array(LINE_COUNT).fill(null).map(
      (a, i) => <line 
      className="line"
      key={i} 
      x1={getLinePositionByIndex(i)} 
      x2={getLinePositionByIndex(i)} 
      y1={MARGIN} 
      y2={MARGIN + LINE_LENGTH } 
      strokeWidth={LINE_WIDTH} 
      stroke="black"
      />);
  
    const renderedBoard = board.map((color , i) => renderIntersection(i, color));
  
    return (
      <div className="atarigo">
        <svg 
          version="1.1"
          className="atarigo-board"
          width={SIZE}
          height={SIZE}
          xmlns="http://www.w3.org/2000/svg"
        >
        {horizontalLines}
        {verticalLines}
        {renderedBoard}
        </svg>
        <div className='atarigo-info'>Następny ruch: czarny</div>
      </div>    
    );
  
  
}

/**
 * Returns line position in pixels on x or y axis.
 */

function getLinePositionByIndex(i: number): number{
  return MARGIN  + i * GAP;
} 

function getCoord(i: number): Coord {
  const x = i % LINE_COUNT;
  const y = (i - x) / LINE_COUNT;
  return [x, y];
}

export default App;