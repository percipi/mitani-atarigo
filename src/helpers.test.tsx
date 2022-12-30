// import { render, screen } from '@testing-library/react';
// import App from './App';

import { Color } from "./consts"
import { getNeighbourCoordsGroupedByColor, isSuicide } from "./helpers"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

/**
 * 10
 * 01
 */

const board1 = [
  {color: Color.BLACK},
  {color: Color.EMPTY},
  {color: Color.EMPTY},
  {color: Color.BLACK}
]

/**
 * 10
 * 02
 */

const board2 = [
  {color: Color.BLACK},
  {color: Color.EMPTY},
  {color: Color.EMPTY},
  {color: Color.WHITE}
]

test('getNeighbourCoordsGroupedByColor returns empty result', () => {
  const coordsOfNeighbours = getNeighbourCoordsGroupedByColor([0,0],[{color: Color.EMPTY}]);
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

test('isSuicide should return false when creates living group', () => {
  expect(isSuicide([1,0], Color.BLACK, board2)).toBeFalsy();
})