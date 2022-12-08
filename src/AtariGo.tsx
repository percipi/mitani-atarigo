import React from 'react';
import './AtariGo.css';
// import PropTypes from 'prop-types';
import {getIntersectionIndex, isSuicide} from './helpers';
import { COLOR } from './consts';

const SIZE = 300;
const LINE_COUNT = 5;
const GAP = SIZE / LINE_COUNT;
const MARGIN = GAP / 2;
const LINE_LENGTH = SIZE - GAP;
const LINE_WIDTH = 2;


class Intersection extends React.Component {
  props: any;
 
  constructor(props) {
    super(props);
  }

  render() {
    let result;
    if (this.props.intersectionData.color !== COLOR.EMPTY) {
      result = <circle
        // cx={MARGIN + this.props.coord[0] * GAP} 
        // cy={MARGIN + this.props.coord[1] * GAP} 
        // r={GAP/2} 
        // fill={this.props.intersectionData.color === COLOR.BLACK ? 'black' : 'white' } 
      />;
    } else {
      result = <circle onClick={() => this.props.onClick(this.props.coord)} cx={MARGIN + this.props.coord[0] * GAP} cy={MARGIN + this.props.coord[1] * GAP} r={GAP/2} fill="transparent"/>;
    }
    return result; 
  }
  
}

type IntersectionType = {
  color: number;
}

type AtariGoState = {
  intersections: Array<IntersectionType>,
  isBlackTurn: boolean
}

class AtariGo extends React.Component {   
  state: AtariGoState;

  constructor(props) {
    const empty: IntersectionType = {
      color: COLOR.EMPTY
    };

    super(props);
    this.state = {
      intersections: Array(LINE_COUNT * LINE_COUNT).fill(empty),
      isBlackTurn: true
      };
  }
  
  getLinePositionByIndex(i: number) {
    return MARGIN  + i * GAP;
  } 

  getCoord(i: number) {
    const x = i % LINE_COUNT;
    const y = (i - x) / LINE_COUNT;
    return [x, y];
  }

  #getCurrentColor() {
    return this.state.isBlackTurn ? COLOR.BLACK : COLOR.WHITE;
  }

  handleClick(coord) {
    if (!isSuicide(coord, this.#getCurrentColor(), this.state.intersections)) {
      const intersectionIndex = getIntersectionIndex(coord, LINE_COUNT);
    
      this.setState({
        intersections: this.state.intersections.map((intersection, i)=> (i === intersectionIndex) ? {color: this.state.isBlackTurn ? COLOR.BLACK : COLOR.WHITE}: intersection),
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
  
    const intersections = this.state.intersections.map((intersectionData: object, i) => this.#renderIntersection(i, intersectionData));
  
    return (
      <div className="atarigo">
        <svg version="1.1"
          className="atarigo-board"
          width={SIZE}
          height={SIZE}
          xmlns="http://www.w3.org/2000/svg">
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