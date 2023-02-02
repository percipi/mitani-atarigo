import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';
import { Color } from './consts';

test('First stone should be black', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('1,1'));
  expect(screen.getByTestId('1,1').getAttribute('fill')).toBe('black');
});

test('Second stone should be white', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('1,0'));
  fireEvent.click(screen.getByTestId('0,1'));
  expect(screen.getByTestId('0,1').getAttribute('fill')).toBe('white');
});

test.only('It is possible to put stone with no liberties when creates living group', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('1,0'));
  fireEvent.click(screen.getByTestId('0,1'));
  fireEvent.click(screen.getByTestId('0,0'));
  expect(screen.getByTestId('0,0').getAttribute('fill')).toBe('black');
});

test.only('Captured stone should be red color', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('1,0'));
  fireEvent.click(screen.getByTestId('0,0'));
  fireEvent.click(screen.getByTestId('0,1'));
  expect(screen.getByTestId('0,0').getAttribute('fill')).toBe('red');
});
