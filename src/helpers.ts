import type {Coord, ColorType, GameStateWithLastMove} from './App';
import {Color, SIZE} from './consts';

function toggleColor(currentColor: Color): Color {
  return currentColor === Color.BLACK ? Color.WHITE : Color.BLACK;
}

function isCoordInArray(el: Coord, arr: Coord[]) { // omega
  for (var i = 0; i < arr.length; i++) {
      if ((el[0] === arr[i][0]) && (el[1] === arr[i][1])) {
          return true;
      }
  }
  return false;
}

function getOwnNeighourCoords(coord: Coord, color: Color, board: Color[]): Coord[] {
  return getNeighbourCoordsGroupedByColor(coord, board)[color];
}

// function getNoGroupLiberties(group) {
//   let lib, res = [];
//   for (var i = 0; i < group.stones.length; i++) {
//       lib = getEmptyNeighbourIntersectionDatas(group.stones[i]);
//       for (var j = 0; j < lib.length; j++) {
//           if (!isCoordInArray(lib[j], res)) {
//               //TODO bardzo nieladnie ale chce sprawdzic czy dziala
//               //zamiast tego stworzyc obiekt boardAnalyzer
//               if (!isCoordInArray(lib[j], group.stones)) {
//                   res.push(lib[j]);
//               }

//           }
//       }
//   }
//   return res.length;
// }

const getBoardSize = (board: Color[]) => Math.sqrt(board.length);

const getColorByCoord = (coord: Coord, board: Color[]) => 
  board[getCoordIndexInArray(coord, getBoardSize(board))];

function getGroup(coord: Coord, board: ColorType[]): Coord[] {
  
  if (getColorByCoord(coord, board) === Color.EMPTY) {
    throw Error('There is no stone on provided coords');
  }

  ////console.log("getGroup...");
  let _alreadyChecked: Coord[] = [];
  
  function addNeighbours(coord: Coord, alreadyChecked: Coord[]) {
          ////console.log("addNeighbours... for stone:", moku);
          alreadyChecked.push(coord);
          var res = [coord];
          var n = getOwnNeighourCoords(coord, getColorByCoord(coord, board), board);
          ////console.log("addNeighbours... getOwnNeighourCoords:", n);
          for (var i = 0; i < n.length; i++) {
              if (!isCoordInArray(n[i], alreadyChecked)) {
                  res = res.concat(addNeighbours(n[i], alreadyChecked));
              }
          }
          ////console.log("addNeighbours... result:", res);
          
          return res;
      };

  var group = addNeighbours(coord, _alreadyChecked);
  return group;
}

//returns array of groups which contains stones passed as argument
function getGroupsForStones(coords: Coord[], board: Color[]): Coord[][]{  
  var _alreadyInGroups: Coord[] = [];
  var groups: Coord[][] = [];
  for (var i = 0; i < coords.length; i++) {
      if (!isCoordInArray(coords[i], _alreadyInGroups)) {
          var group = getGroup(coords[i], board);
          //create reference from stone to his group
          _alreadyInGroups = _alreadyInGroups.concat(...group);
          groups.push(group);
      }
  }
  return groups;
}

function getCapturedStones({coord, currentColor, board} : GameStateWithLastMove): Array<Coord> {
  let oppColor = toggleColor(currentColor);
  //   //moku = board[getCoordIndexInArray([x,y])];
  //  let groups = getGroupsForStones(board);

  // if (groups[oppColor].length === 0) {
  //     return [];
  // }
  // else {
  //     let capturedGroups: Color[][] = [];      
  //     let neighbours: Color[] = getNeighbours(coord, board);

  //     for (var i=0; i<neighbours.length; i++){
  //         if (neighbours[i].color === oppColor && getGroup(neighbours[i]).length === 1) {
  //             capturedGroups.push(getGroup(neighbours[i]));
  //         }
  //     }
  // return capturedGroups;
  // }

  return [];
}

function getCoordIndexInArray(coord: Coord, boardSize: number): number {
  const [x,y] = coordToArray(coord);
  return y * boardSize + x;
}

function getIntersectionColorByCoord(coord: Coord, board: Color[]): Color | -1 {
  const [x,y] = coordToArray(coord);
  const boardSize: number = Math.sqrt(board.length);

  if ((x >= 0) && (y >= 0) && (x < boardSize) && (y < boardSize)) {
      return board[getCoordIndexInArray(arrayToCoord([x,y]), boardSize)];
  }
  return -1;
}

// return neighbours by color
// write unit tests
function getNeighbourCoordsGroupedByColor(moveCoord: Coord, board: Color[]): Coord[][] {
  const result: Coord[][] = [[],[],[]];
  const [x,y] = coordToArray(moveCoord);
  // boardSize = Math.sqrt(board.length);
  //getIntersectionIndexForBoard = (coord: Coord): number => getCoordIndexInArray(coord, boardSize);
  
  const arrayOfNeighbours: Array<[number, number]> = [[x, y-1], [x+1, y], [x, y+1], [x-1, y]];
  const coordsOfNeighbours: Coord[] = arrayOfNeighbours.map(arrayToCoord);


  coordsOfNeighbours.forEach((coord: Coord) => {
    let color = getIntersectionColorByCoord(coord, board);
    if (color !== -1) {
      result[color].push(coord);
    }
  });

  return result;
}


const hasEmptyNeighbour = (moveCoord: Coord, board: Color[]) => 
  getCoordsOfEmptyNeighbours(moveCoord, board).length !== 0;

function getCoordsOfEmptyNeighbours(moveCoord: Coord, board: Color[]): Coord[] {
  var neighbours = getNeighbourCoordsGroupedByColor(moveCoord, board),
      res: Color[] = [];
  ////console.log("Neighbours length: ", neighbours.length);
//   for (var i = 0; i < neighbours.length; i++) {
//       ////console.log("Neighbours color: ", neighbours[i].val);
//       ////console.log("Stones color: ", moku.val);
//       if (neighbours[i].color === Color.EMPTY) {
//           res.push(neighbours[i]);
//       }
//   }
//   return res;
return neighbours[Color.EMPTY];
}

const getNeighborCoordsForMultipleCoords = (group: Coord[], board: Color[]): Coord[][] => {
  const neighbourCoordsForMultipleCoords: Coord[][] = [];
  group.forEach((coord) => {
    const coordNeighours: Coord[][] = getNeighbourCoordsGroupedByColor(coord, board);    
    neighbourCoordsForMultipleCoords[Color.EMPTY] = coordNeighours[Color.EMPTY];
    neighbourCoordsForMultipleCoords[Color.BLACK] = coordNeighours[Color.BLACK];
    neighbourCoordsForMultipleCoords[Color.WHITE] = coordNeighours[Color.WHITE];
  });
  return neighbourCoordsForMultipleCoords;
};

function getMoveResult(moveCoord: Coord, color: Color, board: Color[]) {
  if (hasEmptyNeighbour(moveCoord, board) 
  //|| getCapturedStones(moveCoord, color, board).length !== 0
  ) {
      return true;
  }
  else {
      let ownNeighbours = getOwnNeighourCoords(moveCoord, color, board);
      const groups = getGroupsForStones(ownNeighbours, board);
      let result = true;
      groups.forEach((group) => {
        if (getNeighborCoordsForMultipleCoords(group, board)[Color.EMPTY].length < 1) {
          result = true;
        }
      });
      return result;
  }
}

function arrayToCoord([x,y]: [number, number]): Coord {
  return `${x},${y}`;
}

function coordToArray(coord: Coord): [number, number]{
  return coord.split(',').map(Number) as [number, number];
}
export {
  arrayToCoord,
  coordToArray,  
  getCapturedStones,
  getCoordIndexInArray, 
  getGroup,
  getNeighborCoordsForMultipleCoords, 
  getOwnNeighourCoords,
  getMoveResult, 
  getNeighbourCoordsGroupedByColor,
  toggleColor
};