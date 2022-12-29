// import { render, screen } from '@testing-library/react';
// import App from './App';

import { Color } from "./consts"
import { getNeighbourCoordsGroupedByColor } from "./helpers"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('getNeighbourCoordsGroupedByColor returns empty result', () => {
  const coordsOfNeighbours = getNeighbourCoordsGroupedByColor([0,0],[{color: Color.EMPTY}]);
  expect(coordsOfNeighbours[Color.EMPTY].length).toBe(0);
})