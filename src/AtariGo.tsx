import React from 'react';
import './AtariGo.css';

import {Intersection} from './Intersection';
import {getIntersectionIndex, isSuicide} from './helpers';
import { Color, MARGIN, GAP, LINE_COUNT, LINE_LENGTH, LINE_WIDTH, SIZE } from './consts';

export type StoneColor = Color.EMPTY | Color.BLACK | Color.WHITE;

export type Intersections = Array<StoneColor>;

type AtariGoState = {
  board: Intersections,
  isBlackTurn: boolean
}

export type Coord = [
  number,
  number
];

class AtariGo extends React.Component {   
  readonly state: AtariGoState;

  constructor(props) {
    super(props);
    this.state = {
      board: Array(LINE_COUNT * LINE_COUNT).fill(Color.EMPTY),
      isBlackTurn: true
      };
  }
  
/**
 * Returns line position in pixels on x or y axis.
 */

  getLinePositionByIndex(i: number): number{
    return MARGIN  + i * GAP;
  } 

  getCoord(i: number): Coord {
    const x = i % LINE_COUNT;
    const y = (i - x) / LINE_COUNT;
    return [x, y];
  }

  #getCurrentColor(): StoneColor {
    return this.state.isBlackTurn ? Color.BLACK : Color.WHITE;
  }

  putStone(this: AtariGo, coord: Coord) {
    if (!isSuicide(coord, this.#getCurrentColor(), this.state.board)) {
      const intersectionIndex = getIntersectionIndex(coord, LINE_COUNT);
    
      this.setState({
        board: this.state.board.map((coord, i)=> (i === intersectionIndex) ? {color: this.state.isBlackTurn ? Color.BLACK : Color.WHITE}: coord),
        isBlackTurn: !this.state.isBlackTurn
      });
    } else {
      return null;
    }
  }

  #renderIntersection(i: number, color: StoneColor) {
    return <Intersection onClick={(coord) => this.putStone(coord)} key={i} coord={this.getCoord(i)} color={color} />;
  }

  render() {
    const horizontalLines = new Array(LINE_COUNT).fill(null).map(
      (a, i) => <line 
      className="line"
      key={i} 
      x1={MARGIN} 
      x2={MARGIN + LINE_LENGTH } 
      y1={this.getLinePositionByIndex(i)} 
      y2={this.getLinePositionByIndex(i)} 
      strokeWidth={LINE_WIDTH} 
      stroke="black"
      />);
  
    const verticalLines = new Array(LINE_COUNT).fill(null).map(
      (a, i) => <line 
      className="line"
      key={i} 
      x1={this.getLinePositionByIndex(i)} 
      x2={this.getLinePositionByIndex(i)} 
      y1={MARGIN} 
      y2={MARGIN + LINE_LENGTH } 
      strokeWidth={LINE_WIDTH} 
      stroke="black"
      />);
  
    const board = this.state.board.map((color , i) => this.#renderIntersection(i, color));
  
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
        {board}
        </svg>
        <div className='atarigo-info'>Następny ruch: czarny</div>
      </div>    
    );
  }
  
}

export {AtariGo};