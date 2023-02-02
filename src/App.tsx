import { useState } from 'react';
import './App.css';

import {Intersection} from './Intersection';
import {getCoordIndexInArray, isLegitMove} from './helpers';
import { Color, MARGIN, GAP, LINE_COUNT, LINE_LENGTH, LINE_WIDTH, SIZE } from './consts';

export type ColorType = Color.BLACK | Color.WHITE | Color.EMPTY;

// Tuple
export type Coord = [
  number,
  number
];

interface GameState {
  board: Array<Color>,
  currentColor: Color 
}

interface GameStateWithLastMove extends GameState {
  coord: Coord
}

function App(): JSX.Element{     
  const [gameState, setGameState]: [GameState, Function]= useState({
    board: Array(LINE_COUNT * LINE_COUNT).fill(Color.EMPTY),
    currentColor: Color.BLACK
    });

  const  {board, currentColor} = gameState;
  /
  function handleClick(coord: Coord) {
    if (isLegitMove(coord, currentColor, board)) {
      setGameState({
        board: getBoardAfterMove({board, coord, currentColor}), // in this function we have to remove stones and change game state to finished
        currentColor: toggleColor(currentColor)
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

function getBoardAfterMove({board, coord, currentColor} : GameStateWithLastMove) {
  const coordIndex = getCoordIndexInArray(coord, LINE_COUNT);
  return board.map((coord, i)=> (i === coordIndex) ? currentColor: coord)
}

function toggleColor(currentColor: Color): Color {
  return currentColor === Color.BLACK ? Color.WHITE : Color.BLACK;
}

export default App;