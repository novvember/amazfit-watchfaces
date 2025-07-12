/**
 * Builds calendar data to display: 2d array of dates, array of months, array of years
 * @param {Number} day
 * @param {Number} month
 * @param {Number} year
 * @param {Number} width
 * @param {Number} height
 * @param {Number} currentDayRowIndex
 * @param {'monday' | 'sunday'} firstWeekDaySetting
 * @returns
 */
export function makeCalendarData(
  day,
  month,
  year,
  width,
  height,
  currentDayRowIndex,
  firstWeekDay = 'monday',
) {
  console.log('calendar data updated');

  const currentDate = new Date(year, month - 1, day);
  const currentDayColumnIndex = (
    firstWeekDay === 'monday' ? [6, 0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5, 6]
  )[currentDate.getDay()];

  const daysAfterFirstCell = width * currentDayRowIndex + currentDayColumnIndex;
  const date = new Date(currentDate);
  date.setDate(date.getDate() - daysAfterFirstCell - 1);

  const monthsList = new Array(height).fill(null);
  const yearsList = new Array(height).fill(null);

  const dateMatrix = new Array(height).fill(null).map((_, row) =>
    new Array(width).fill(null).map((_, column) => {
      date.setDate(date.getDate() + 1);

      if (row === 0 || date.getDate() === 1) {
        monthsList[row] = date.getMonth();
      }

      if (row === 0 || (date.getDate() === 1 && date.getMonth() === 0)) {
        yearsList[row] = date.getFullYear();
      }

      return {
        text: date.getDate(),
        isCurrentDay:
          row === currentDayRowIndex && column === currentDayColumnIndex,
      };
    }),
  );

  return {
    dateMatrix,
    monthsList,
    yearsList,
  };
}
