import './AtariGo.css';

const SIZE = 300;
const LINE_COUNT = 9;
const GAP = SIZE / LINE_COUNT;
const MARGIN = GAP / 2;
const LINE_LENGTH = SIZE - GAP;
const LINE_WIDTH = 2;


function AtariGo() {   
  const getLinePositionByIndex = (i) => MARGIN  + i * GAP;

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

  return (    
    <svg version="1.1"
      className="board"
      width={SIZE}
      height={SIZE}
      xmlns="http://www.w3.org/2000/svg">
      {horizontalLines}
      {verticalLines}
    </svg>
  );
}

export {AtariGo};