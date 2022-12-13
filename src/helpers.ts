import type {Intersections, Coord} from './AtariGo';
import {Color} from './consts';

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

// function isMokuInArray(el: IntersectionData, arr: Intersections) {
//   for (var i = 0; i < arr.length; i++) {
//       if ((el.x === arr[i].x) && (el.y === arr[i].y)) {
//           return true;
//       }
//   }
//   return false;
// }

// function Group(stones, liberties) {
//   this.stones = stones;
//   this.liberties = liberties;
// }

// function ownStonesNextTo(x,y,color) {
//   var moku,n, r=[];
//   moku = this.board[y][x];
//   n = moku.neighbors;
//   for (var i = 0; i< n.length; i++){
//       if (color === n[i].val){
//           r.push(n[i]);
//       }
//   }
//   return r;
// }

// function getNoGroupLiberties(group) {
//   let lib, res = [];
//   for (var i = 0; i < group.stones.length; i++) {
//       lib = getEmptyNeighbourIntersectionDatas(group.stones[i]);
//       for (var j = 0; j < lib.length; j++) {
//           if (!isMokuInArray(lib[j], res)) {
//               //TODO bardzo nieladnie ale chce sprawdzic czy dziala
//               //zamiast tego stworzyc obiekt boardAnalyzer
//               if (!isMokuInArray(lib[j], group.stones)) {
//                   res.push(lib[j]);
//               }

//           }
//       }
//   }
//   return res.length;
// }

// function getGroup(moku) {
//   ////console.log("getGroup...");
//   var _alreadyChecked = [],
//       addNeighbours = function (moku, alreadyChecked) {
//           ////console.log("addNeighbours... for stone:", moku);
//           alreadyChecked.push(moku);
//           var res = [moku];
//           var n = ownStonesNextTo(moku.x,moku.y, moku.val);
//           ////console.log("addNeighbours... ownStonesNextTo:", n);
//           for (var i = 0; i < n.length; i++) {
//               if (!isMokuInArray(n[i], alreadyChecked)) {
//                   res = res.concat(addNeighbours(n[i], alreadyChecked));
//               }
//           }
//           ////console.log("addNeighbours... result:", res);
          
//           return res;
//       };
//   var group = addNeighbours(moku, _alreadyChecked);
//   return new Group(group, getNoGroupLiberties({stones:group}));
// }

//returns array of groups which contains stones passed as argument
// function getGroupsForStones(stones: Intersections): Intersections[]{  
//   var _alreadyInGroup = [];
//   var groups: Intersections[] = [];
//   for (var i = 0; i < stones.length; i++) {
//       if (!isMokuInArray(stones[i], _alreadyInGroup)) {
//           var group = getGroup(stones[i]);
//           //create reference from stone to his group
//           for (var j=0; j<group.stones.length; j++) {
//               group.stones[j].group = group;    
//           }
//           _alreadyInGroup = _alreadyInGroup.concat(group.stones);
//           groups.push(group);
//       }
//   }
//   return groups;
// }

// function getCapturedGroups(coord: Coord, color: Color, board: Intersections): Intersections[] {
//   let oppColor = getOppColor(color);
//     //moku = board[getIntersectionIndex([x,y])];
//   let groups = getGroupsForStones(board);

//   if (groups[oppColor].length === 0) {
//       return [];
//   }
//   else {
//       let capturedGroups: Intersections[] = [];      
//       let neighbours: Intersections = getNeighbours(coord, board);

//       for (var i=0; i<neighbours.length; i++){
//           if (neighbours[i].color === oppColor && getGroup(neighbours[i]).length === 1) {
//               capturedGroups.push(getGroup(neighbours[i]));
//           }
//       }
//   return capturedGroups;
//   }
// }

function getIntersectionIndex([x, y]: Coord, boardSize: number): number {
  return y * boardSize + x;
}

function getIntersectionColorByCoord([x,y]: Coord, board: Intersections): Color | -1 {
  const boardSize: number = Math.sqrt(board.length);

  if ((x >= 0) && (y >= 0) && (x < boardSize) && (y < boardSize)) {
      return board[getIntersectionIndex([x,y], boardSize)].color;
  }
  return -1;
}

function getNeighbours(moveCoord: Coord, board: Intersections): Intersections {
  const neig: Intersections = [],
  x = moveCoord[0],
  y = moveCoord[1],
  boardSize = Math.sqrt(board.length),
  getIntersectionIndexForBoard = (coord: Coord): number => getIntersectionIndex(coord, boardSize);

  let val = getIntersectionColorByCoord([x, y - 1], board);

  if (val !== -1) {
      neig.push(board[getIntersectionIndexForBoard([x, y-1])]);
  }
  val = getIntersectionColorByCoord([x + 1, y], board);
  if (val !== -1) {
      neig.push(board[getIntersectionIndexForBoard([x+1, y])]);
  }
  val = getIntersectionColorByCoord([x, y + 1], board);
  if (val !== -1) {
      neig.push(board[getIntersectionIndexForBoard([x, y+1])]);
  }
  val = getIntersectionColorByCoord([x - 1, y], board);
  if (val !== -1) {
      neig.push(board[getIntersectionIndexForBoard([x-1, y])]);
  }
  return neig;
}


function getEmptyNeighbourIntersectionDatas(moveCoord: Coord, board: Intersections): Intersections {
  var neighbours = getNeighbours(moveCoord, board),
      res: Intersections = [];
  ////console.log("Neighbours length: ", neighbours.length);
  for (var i = 0; i < neighbours.length; i++) {
      ////console.log("Neighbours color: ", neighbours[i].val);
      ////console.log("Stones color: ", moku.val);
      if (neighbours[i].color === Color.EMPTY) {
          res.push(neighbours[i]);
      }
  }
  return res;
}

function isSuicide(moveCoord: Coord, color: Color, board: Intersections) {
  if ((getEmptyNeighbourIntersectionDatas(moveCoord, board).length !== 0) 
  //|| getCapturedGroups(moveCoord, color, board).length !== 0
  ) {
      return false;
  }
  else {
      var ownStones = this.ownStonesNextTo(moveCoord, color);
      for (var i = 0; i<ownStones.length; i++){//uzyc getAdj groups!!
          if (ownStones[i].group.liberties > 1) return false; //TODO nie sprawdza czy grupy nie maja wspolnego oddechu
      }
  }
  return true;
}

export {getIntersectionIndex, isSuicide};