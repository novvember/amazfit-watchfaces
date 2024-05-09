const DIGIT_0 = [
  [0, 1, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 0],
];

const DIGIT_1 = [
  [0, 1, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 1],
];

const DIGIT_2 = [
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const DIGIT_3 = [
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
];

const DIGIT_4 = [
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
];

const DIGIT_5 = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 0],
];

const DIGIT_6 = [
  [0, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const DIGIT_7 = [
  [1, 1, 1],
  [0, 0, 1],
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
];

const DIGIT_8 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const DIGIT_9 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 0],
];

const DIGIT_MATRIXES = [
  DIGIT_0,
  DIGIT_1,
  DIGIT_2,
  DIGIT_3,
  DIGIT_4,
  DIGIT_5,
  DIGIT_6,
  DIGIT_7,
  DIGIT_8,
  DIGIT_9,
];

function fillMatrixWithDigit(matrix, y0, x0, digit) {
  const digitMatrix = DIGIT_MATRIXES[digit];

  const y1 = y0 + digitMatrix.length;
  const x1 = x0 + digitMatrix[0].length;

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      if (matrix[y]?.[x] !== undefined)
        matrix[y][x] = digitMatrix[y - y0][x - x0];
    }
  }
}

export function makeDigitMatrix(hours, mins, width, height) {
  const DIGIT_WIDTH = 3;
  const DIGIT_HEIGHT = 5;
  const COLUMN_GAP = 1;
  const ROW_GAP = 1;

  const hoursDigits = hours.toString().padStart(2, '0').split('').map(Number);
  const minsDigits = mins.toString().padStart(2, '0').split('').map(Number);

  const matrix = new Array(height)
    .fill(null)
    .map(() => new Array(width).fill(0));

  fillMatrixWithDigit(matrix, 0, 0, hoursDigits[0]);
  fillMatrixWithDigit(matrix, 0, DIGIT_WIDTH + COLUMN_GAP, hoursDigits[1]);

  fillMatrixWithDigit(matrix, DIGIT_HEIGHT + ROW_GAP, 0, minsDigits[0]);
  fillMatrixWithDigit(
    matrix,
    DIGIT_HEIGHT + ROW_GAP,
    DIGIT_WIDTH + COLUMN_GAP,
    minsDigits[1],
  );

  return matrix;
}
