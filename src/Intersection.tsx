import type { Coord, ColorType } from './App';
import {Color, MARGIN, GAP} from './consts';
import { coordToArray } from './helpers';

function Intersection({color, coord, onClick}: {
  color: ColorType,
  coord: Coord,
  onClick: Function
}) {
  const [x,y] = coordToArray(coord);
  let result;
  if (color !== Color.EMPTY) {
    result = <circle 
      data-testid={coord}
      cx={MARGIN + x * GAP} 
      cy={MARGIN + y * GAP} 
      r={GAP/2} 
      fill={color === Color.BLACK ? 'black' : 'white' } 
    />;
  } else {
    result = <circle data-testid={coord} onClick={() => onClick(coord)} cx={MARGIN + coord[0] * GAP} cy={MARGIN + coord[1] * GAP} r={GAP/2} fill="transparent"/>;
  }
  return result; 
}

export {Intersection};