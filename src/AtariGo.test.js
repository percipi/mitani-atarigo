import { fireEvent, render, screen } from '@testing-library/react';
import {AtariGo} from './AtariGo';
import { Color } from './consts';

test('First stone should be black', () => {
  render(<AtariGo />);
  fireEvent.click(screen.getByTestId('1,1'));
  expect(screen.getByTestId('1,1').getAttribute('fill')).toBe('black');
});

test('Second stone should be white', () => {
  render(<AtariGo />);
  fireEvent.click(screen.getByTestId('1,0'));
  fireEvent.click(screen.getByTestId('0,1'));
  expect(screen.getByTestId('0,1').getAttribute('fill')).toBe('white');
});

test('It is possible to put stone with no liberties when creates living group', () => {
  render(<AtariGo />);
  fireEvent.click(screen.getByTestId('1,0'));
  fireEvent.click(screen.getByTestId('0,1'));
  fireEvent.click(screen.getByTestId('0,0'));
  expect(screen.getByTestId('0,0').getAttribute('fill')).toBe('black');
});
