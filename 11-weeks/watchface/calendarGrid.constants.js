import { GRID_CELL_SIZE, isRusLang } from './index.constants';

export const GRID = {
  size: {
    columns: 7,
    rows: 11,
  },
  cell: {
    width: GRID_CELL_SIZE,
    height: GRID_CELL_SIZE,
  },
};

export const CALENDAR = {
  currentWeekIndex: 3,
  date: {
    width: GRID.cell.width,
    height: GRID.cell.height,
  },
  weekDay: {
    width: GRID.cell.width,
    height: GRID.cell.height,
    images: new Array(7)
      .fill(null)
      .map((_, i) => `${isRusLang ? 'week_rus' : 'week'}/${i}.png`),
    dotY: px(40),
  },
  year: {
    width: GRID.cell.width,
    height: GRID.cell.height,
    gap: px(2),
  },
  month: {
    width: px(42),
    height: GRID.cell.height,
    images: new Array(12)
      .fill(null)
      .map((_, i) => `${isRusLang ? 'month_rus' : 'month'}/${i}.png`),
    gap: px(2),
  },
};

export const TIME_DIGITS_AOD = {
  images: new Array(10).fill(null).map((_, i) => `aod/${i}.png`),
  width: px(112),
  height: px(168),
};
