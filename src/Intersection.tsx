import React from 'react';
import type { Coord, StoneColor } from './AtariGo';
import {Color, MARGIN, GAP} from './consts';

class Intersection extends React.Component {
  props!: {
    color: StoneColor,
    coord: Coord,
    onClick: Function
  };
 
  constructor(props) {
    super(props);
  }

  render() {
    let result;
    if (this.props.color !== Color.EMPTY) {
      result = <circle 
        data-testid={'test-'+this.props.coord}
        cx={MARGIN + this.props.coord[0] * GAP} 
        cy={MARGIN + this.props.coord[1] * GAP} 
        r={GAP/2} 
        fill={this.props.color === Color.BLACK ? 'black' : 'white' } 
      />;
    } else {
      result = <circle data-testid={'test-'+this.props.coord} onClick={() => this.props.onClick(this.props.coord)} cx={MARGIN + this.props.coord[0] * GAP} cy={MARGIN + this.props.coord[1] * GAP} r={GAP/2} fill="transparent"/>;
    }
    return result; 
  }
  
}

export {Intersection};