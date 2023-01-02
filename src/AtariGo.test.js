import { fireEvent, render, screen } from '@testing-library/react';
import {AtariGo} from './AtariGo';
import { Color } from './consts';

test('renders learn react link', () => {
  render(<AtariGo />);
  fireEvent.click(screen.getByTestId('test-1,1'));
  expect(screen.getByTestId('test-1,1').getAttribute('fill')).toBe(Color.BLACK);
});
