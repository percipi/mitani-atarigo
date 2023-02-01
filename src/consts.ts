enum Color {
  EMPTY,
  BLACK,
  WHITE
};

const SIZE = 300;
const LINE_COUNT = 5;
const GAP = SIZE / LINE_COUNT;
const MARGIN = GAP / 2;
const LINE_LENGTH = SIZE - GAP;
const LINE_WIDTH = 2;

export {Color, MARGIN, GAP, LINE_COUNT, LINE_LENGTH, LINE_WIDTH, SIZE};