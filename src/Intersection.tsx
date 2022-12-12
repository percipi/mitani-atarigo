
import React from 'react';
import {Color, MARGIN, GAP} from './consts';

class Intersection extends React.Component {
  props: any;
 
  constructor(props) {
    super(props);
  }

  render() {
    let result;
    if (this.props.intersectionData.color !== Color.EMPTY) {
      result = <circle
        // cx={MARGIN + this.props.coord[0] * GAP} 
        // cy={MARGIN + this.props.coord[1] * GAP} 
        // r={GAP/2} 
        // fill={this.props.intersectionData.color === Color.BLACK ? 'black' : 'white' } 
      />;
    } else {
      result = <circle onClick={() => this.props.onClick(this.props.coord)} cx={MARGIN + this.props.coord[0] * GAP} cy={MARGIN + this.props.coord[1] * GAP} r={GAP/2} fill="transparent"/>;
    }
    return result; 
  }
  
}

export {Intersection}