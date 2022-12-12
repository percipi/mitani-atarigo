import React from 'react';
import './AtariGo.css';

import {Intersection} from './Intersection';
import {getIntersectionIndex, isSuicide} from './helpers';
import { Color, MARGIN, GAP, LINE_COUNT, LINE_LENGTH, LINE_WIDTH, SIZE } from './consts';

export type IntersectionData = {
  color: number;
}

export type Intersections = Array<IntersectionData>;

type AtariGoState = {
  intersections: Intersections,
  isBlackTurn: boolean
}

export type Coord = [
  number,
  number
];

type StoneColor = 0 | 1 | 2;

class AtariGo extends React.Component {   
  readonly state: AtariGoState;

  constructor(props) {
    const empty: IntersectionData = {
      color: Color.EMPTY
    };

    super(props);
    this.state = {
      intersections: Array(LINE_COUNT * LINE_COUNT).fill(empty),
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

  handleClick(this: AtariGo, coord: Coord) {
    if (!isSuicide(coord, this.#getCurrentColor(), this.state.intersections)) {
      const intersectionIndex = getIntersectionIndex(coord, LINE_COUNT);
    
      this.setState({
        intersections: this.state.intersections.map((intersection, i)=> (i === intersectionIndex) ? {color: this.state.isBlackTurn ? Color.BLACK : Color.WHITE}: intersection),
        isBlackTurn: !this.state.isBlackTurn
      });
    } else {
      return null;
    }
  }

  #renderIntersection(i: number, intersectionData) {
    return <Intersection onClick={(intersectionData) => this.handleClick(intersectionData)} key={i} coord={this.getCoord(i)} intersectionData={intersectionData} />;
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
  
    const intersections = this.state.intersections.map((coord , i) => this.#renderIntersection(i, coord));
  
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
        {intersections}
        </svg>
        <div className='atarigo-info'>Następny ruch: czarny</div>
      </div>    
    );
  }
  
}

export {AtariGo};