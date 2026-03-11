/**
 * @returns {'monday' | 'sunday'} First day of a week setting based on user region
 */
export function getFirstWeekDaySetting() {
  const { region } = hmSetting.getUserData() || {};

  const isSunday = [
    'jp', // Japan
    'ca', // Canada
    'br', // Brazil
    'mx', // Mexico
    'cn', // China
  ].includes(region);

  if (isSunday) {
    return 'sunday';
  }

  return 'monday';
}
