// import { render, screen } from '@testing-library/react';
// import App from './App';

import { Coord } from "./AtariGo";
import { Color } from "./consts"
import { getNeighborCoordsForMultipleCoords, getNeighbourCoordsGroupedByColor, isLegitMove } from "./helpers"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

/**
 * 10
 * 01
 */

const {EMPTY, BLACK, WHITE} = Color;

const coord00: Coord[] = [[0, 0]];

const board1 = [
  BLACK, EMPTY,
  EMPTY, BLACK
]

/**
 * 10
 * 02
 */

const board2: Color[] = [
  BLACK, EMPTY,
  EMPTY, WHITE
]

test('getNeighbourCoordsGroupedByColor returns empty result', () => {
  const coordsOfNeighbours = getNeighbourCoordsGroupedByColor([0,0],[Color.EMPTY]);
  //expect(coordsOfNeighbours[Color.EMPTY].length).toBe(0);
  expect(coordsOfNeighbours[Color.BLACK].length).toBe(0);
  expect(coordsOfNeighbours[Color.WHITE].length).toBe(0);
})

test('getNeighbourCoordsGroupedByColor returns correct neighbours', () => {
  const coordsOfNeighbours = getNeighbourCoordsGroupedByColor([1,0], board1);
  expect(coordsOfNeighbours[Color.EMPTY].length).toBe(0);
  expect(coordsOfNeighbours[Color.BLACK].length).toBe(2);
  expect(coordsOfNeighbours[Color.WHITE].length).toBe(0);
})

describe('isLegitMove function', () => {
  it('should return false when creates living group', () => {
    expect(isLegitMove([1,0], Color.BLACK, board2)).toBeTruthy();
  })  
})


describe('getNeighborCoordsForMultipleCoords function', () => {
  it('should return correct neighbour coords for correct input', () => {         
    getNeighborCoordsForMultipleCoords(coord00, board1)
  })

  
})