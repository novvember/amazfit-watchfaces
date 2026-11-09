/**
 * Reads the system date format setting.
 * @returns {'year-month-day' | 'day-month-year' | 'month-day-year'}
 */
export function getDateFormat() {
  switch (hmSetting.getDateFormat()) {
    case 1:
      return 'day-month-year';
    case 2:
      return 'month-day-year';
    default:
      return 'year-month-day';
  }
}
