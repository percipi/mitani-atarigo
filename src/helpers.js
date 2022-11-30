import {COLOR} from './consts.js';

function getIntersectionIndex([x, y], boardSize) {
  return y * boardSize + x;
}

function getValue([x,y], intersections) {
  const boardSize = Math.sqrt(intersections.length);

  if ((x >= 0) && (y >= 0) && (x < boardSize) && (y < boardSize)) {
      return intersections[getIntersectionIndex([x,y], boardSize)].color;
  }
  return -1;
}

function getNeighbours(moveCoord, intersections) {
  var neig = [],x,y, val;
  x = moveCoord[0];
  y = moveCoord[1];
    val = getValue([x, y - 1], intersections);
  if (val !== -1) {
      neig.push(intersections[y-1][x]);
  }
  val = getValue([x + 1, y], intersections);
  if (val !== -1) {
      neig.push(intersections[y][x+1]);
  }
  val = getValue([x, y + 1], intersections);
  if (val !== -1) {
      neig.push(intersections[y+1][x]);
  }
  val = getValue([x - 1, y], intersections);
  if (val !== -1) {
      neig.push(intersections[y][x-1]);
  }
  return neig;
}

function emptyNextTo(moveCoord, intersections) {
  var neighbours = getNeighbours(moveCoord, intersections),
      res = [];
  ////console.log("Neighbours length: ", neighbours.length);
  for (var i = 0; i < neighbours.length; i++) {
      ////console.log("Neighbours color: ", neighbours[i].val);
      ////console.log("Stones color: ", moku.val);
      if (neighbours[i].val === COLOR.EMPTY) {
          res.push(neighbours[i]);
      }
  }
  return res;
}

function isSuicide(moveCoord, color, intersections) {
  if ((emptyNextTo(moveCoord, intersections).length !== 0) || this.getCapturedGroups(moveCoord, color).length !== 0) {
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