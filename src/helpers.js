import {COLOR} from './consts.js';

function getOppColor(color) {
  if (color === COLOR.BLACK) {
      return COLOR.WHITE;
  }
  else if (color === COLOR.WHITE) {
      return COLOR.BLACK;
  }
  return -1;
}

function isMokuInArray(el, arr) {
  for (var i = 0; i < arr.length; i++) {
      if ((el.x === arr[i].x) && (el.y === arr[i].y)) {
          return true;
      }
  }
  return false;
}

//returns array of groups which contains stones passed as argument
function getGroupsForStones(stones) {  
  var _alreadyInGroup = [];
  var groups = [];
  for (var i = 0; i < stones.length; i++) {
      if (!isMokuInArray(stones[i], _alreadyInGroup)) {
          var group = this.getGroup(stones[i]);
          //create reference from stone to his group
          for (var j=0; j<group.stones.length; j++) {
              group.stones[j].group = group;    
          }
          _alreadyInGroup = _alreadyInGroup.concat(group.stones);
          groups.push(group);
      }
  }
  return groups;
}

function getCapturedGroups([x, y], color, intersections) {
  var oppColor = getOppColor(color),
  moku = intersections[getIntersectionIndex([x,y])];
  let groups = getGroupsForStones(intersections);

  if (groups[oppColor].length === 0) {
      return [];
  }
  else {
      var capturedGroups = [];
      //kazde empty pole musi miec liste grup sasiadujacych
      for (var i=0; i<moku.neighbors.length; i++){
          if (moku.neighbors[i].notEmpty() && moku.neighbors[i].val === oppColor 
              && moku.neighbors[i].group.liberties === 1) {
              capturedGroups.push(moku.neighbors[i].group);
          }
      }
  return capturedGroups;
  }
}

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
  const boardSize = Math.sqrt(intersections.length);
  const getIntersectionIndexForBoard = (coord) => getIntersectionIndex(coord, boardSize);
    val = getValue([x, y - 1], intersections);
  if (val !== -1) {
      neig.push(intersections[getIntersectionIndexForBoard([x, y-1])]);
  }
  val = getValue([x + 1, y], intersections);
  if (val !== -1) {
      neig.push(intersections[getIntersectionIndexForBoard([x+1, y])]);
  }
  val = getValue([x, y + 1], intersections);
  if (val !== -1) {
      neig.push(intersections[getIntersectionIndexForBoard([x, y+1])]);
  }
  val = getValue([x - 1, y], intersections);
  if (val !== -1) {
      neig.push(intersections[getIntersectionIndexForBoard([x-1, y])]);
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
  if ((emptyNextTo(moveCoord, intersections).length !== 0) || getCapturedGroups(moveCoord, color).length !== 0) {
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