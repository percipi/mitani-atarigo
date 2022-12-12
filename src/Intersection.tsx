
import React from 'react';
import {COLOR, MARGIN, GAP} from './consts';

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

export {Intersection}