// import { render, screen } from '@testing-library/react';
// import App from './App';

import { describe, expect, it, test } from "vitest";
import { Coord } from "./App";
import { Color } from "./consts"
import { getNeighborCoordsForMultipleCoords, getNeighbourCoordsGroupedByColor, getMoveResult, getCapturedGroups } from "./helpers"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

/**
 * B+
 * +B
 */
const {BLACK, WHITE, EMPTY} = Color;

const coord00: Coord[] = [[0, 0]];

const board1 = [
  BLACK, EMPTY,
  EMPTY, BLACK
]

/**
 * B+
 * +W
 */
const board2: Color[] = [
  BLACK, EMPTY,
  EMPTY, WHITE
]

/**
 * BW
 * ++
 */
const board3: Color[] = [
  BLACK, WHITE,
  EMPTY, EMPTY
]

/**
 * BW
 * B+
 */
const board4: Color[] = [
  BLACK, WHITE,
  BLACK, EMPTY
]

/**
 * BW+
 * BWW
 * +BB
 */
const board5: Color[] = [
  BLACK, WHITE, EMPTY,
  BLACK, WHITE, WHITE,
  EMPTY, BLACK, BLACK
]

describe('getNeighbourCoordsGroupedByColor function', () => {
  test('returns empty result', () => {
    const coordsOfNeighbours = getNeighbourCoordsGroupedByColor([0,0],[Color.EMPTY]);
    //expect(coordsOfNeighbours[Color.EMPTY].length).toBe(0);
    expect(coordsOfNeighbours[Color.BLACK].length).toBe(0);
    expect(coordsOfNeighbours[Color.WHITE].length).toBe(0);
  })
  
  test('returns correct neighbours', () => {
    const coordsOfNeighbours = getNeighbourCoordsGroupedByColor([1,0], board1);
    expect(coordsOfNeighbours[Color.EMPTY].length).toBe(0);
    expect(coordsOfNeighbours[Color.BLACK].length).toBe(2);
    expect(coordsOfNeighbours[Color.WHITE].length).toBe(0);
  })
})



describe('getMoveResult function', () => {
  it('should return false when creates living group', () => {
    expect(getMoveResult([1,0], Color.BLACK, board2)).toBeTruthy();
  })  
})


describe('getNeighborCoordsForMultipleCoords function', () => {
  it('should return correct neighbour coords for correct input', () => {         
    getNeighborCoordsForMultipleCoords(coord00, board1)
  })

describe.skip('getCapturedGroups function', () => {
  it('should return empty array when there is no opposing groups to capture', () => {
    expect(getCapturedGroups({board: board1, currentColor: Color.BLACK, coord: [1,0]})).toHaveLength(0);
  })

  it('should return the captured stone when there is only one opposing stone to capture', () => {
    expect(getCapturedGroups({board: board3, currentColor: Color.BLACK, coord: [1,1]})).toEqual([[1,0]]);
  })

  it('should return the captured stones when there is only one group to capture', () => {
    expect(getCapturedGroups({board: board4, currentColor: Color.WHITE, coord: [1,1]})).toEqual([[0,0], [0,1]]);
  })

  it('should return the captured stones when there is many groups to capture', () => {
    expect(getCapturedGroups({board: board5, currentColor: Color.WHITE, coord: [0,2]})).toEqual([[0,0], [0,1], [1,2], [2,2]]);
  })
})

// write more getCapturedGroups tests
  
})