import { fireEvent, render, screen } from '@testing-library/react';
import {AtariGo} from './AtariGo';
import { Color } from './consts';

test('renders learn react link', () => {
  const atariGo = render(<AtariGo />);
  fireEvent.click(screen.getByTestId('1,1'));
  expect(screen.getByTestId('1,1').getAttribute('fill')).toBe('black');
});
