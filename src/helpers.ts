import type {Coord, ColorType} from './App';
import {Color, SIZE} from './consts';

// function getOppColor(color: Color): Color | -1{
//   // TODO throw error if not stone
//     if (color === Color.BLACK) {
//       return Color.WHITE;
//   }
//   else if (color === Color.WHITE) {
//       return Color.BLACK;
//   }
//   return -1;
// }

function isCoordInArray(el: Coord, arr: Coord[]) { // omega
  for (var i = 0; i < arr.length; i++) {
      if ((el[0] === arr[i][0]) && (el[1] === arr[i][1])) {
          return true;
      }
  }
  return false;
}

function getOwnNeighourCoords(coord, color, board): Coord[] {
  let r: ColorType[] = [];

 // let moku = board[getCoordIndexInArray(coord, SIZE)];
  let neighbours = getNeighbourCoordsGroupedByColor(coord, board);
//   neighbours.forEach((neighbour) => {
//     if (neighbour.color === color) {
//         r.push(neighbour);
//     }
// }
//     );
//   for (var i = 0; i< neighbours.length; i++){
//       if (color === neighbours[i].color){
//           r.push(neighbours[i]);
//       }
//   }
  return neighbours[color];
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

const getBoardSize = (board) => Math.sqrt(board.length);

const getColorByCoord = (coord, board) => board[getCoordIndexInArray(coord, getBoardSize(board))];

function getGroup(coord: Coord, board: ColorType[]): Coord[] {
  ////console.log("getGroup...");
  var _alreadyChecked = [],
      addNeighbours = function (coord, alreadyChecked) {
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

// function getCapturedGroups(coord: Coord, color: Color, board: Color[]): Color[][] {
//   let oppColor = getOppColor(color);
//     //moku = board[getCoordIndexInArray([x,y])];
//   let groups = getGroupsForStones(board);

//   if (groups[oppColor].length === 0) {
//       return [];
//   }
//   else {
//       let capturedGroups: Color[][] = [];      
//       let neighbours: Color[] = getNeighbours(coord, board);

//       for (var i=0; i<neighbours.length; i++){
//           if (neighbours[i].color === oppColor && getGroup(neighbours[i]).length === 1) {
//               capturedGroups.push(getGroup(neighbours[i]));
//           }
//       }
//   return capturedGroups;
//   }
// }

function getCoordIndexInArray([x, y]: Coord, boardSize: number): number {
  return y * boardSize + x;
}

function getIntersectionColorByCoord([x,y]: Coord, board: Color[]): Color | -1 {
  const boardSize: number = Math.sqrt(board.length);

  if ((x >= 0) && (y >= 0) && (x < boardSize) && (y < boardSize)) {
      return board[getCoordIndexInArray([x,y], boardSize)];
  }
  return -1;
}

// return neighbours by color
// write unit tests
function getNeighbourCoordsGroupedByColor(moveCoord: Coord, board: Color[]): Coord[][] {
  const result: Coord[][]= [[],[],[]],
  x = moveCoord[0],
  y = moveCoord[1];
  // boardSize = Math.sqrt(board.length);
  //getIntersectionIndexForBoard = (coord: Coord): number => getCoordIndexInArray(coord, boardSize);
  const coordsOfNeighbours: Coord[] = [[x, y-1], [x+1, y], [x, y+1], [x-1, y]];

  coordsOfNeighbours.forEach((coord: Coord) => {
    let color = getIntersectionColorByCoord(coord, board);
    if (color !== -1) {
      result[color].push(coord);
    }
  });

  return result;
}


const hasEmptyNeighbour = (moveCoord, board) => getCoordsOfEmptyNeighbours(moveCoord, board).length !== 0;

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

const getNeighborCoordsForMultipleCoords = (group: Coord[], board): Coord[][] => {
  const neighbourCoordsForMultipleCoords: Coord[][] = [];
  group.forEach((coord) => {
    const coordNeighours: Coord[][] = getNeighbourCoordsGroupedByColor(coord, board);    
    neighbourCoordsForMultipleCoords[Color.EMPTY] = coordNeighours[Color.EMPTY];
    neighbourCoordsForMultipleCoords[Color.BLACK] = coordNeighours[Color.BLACK];
    neighbourCoordsForMultipleCoords[Color.WHITE] = coordNeighours[Color.WHITE];
  });
  return neighbourCoordsForMultipleCoords;
};

function isLegitMove(moveCoord: Coord, color: Color, board: Color[]) {
  if (hasEmptyNeighbour(moveCoord, board) 
  //|| getCapturedGroups(moveCoord, color, board).length !== 0
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

export {getCoordIndexInArray, getNeighborCoordsForMultipleCoords, isLegitMove, getNeighbourCoordsGroupedByColor};