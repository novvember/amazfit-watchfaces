/**
 * Reads user settings for 12/24 hour time display
 * @returns {boolean}
 */
export function getIs12HourFormat() {
  return hmSetting.getTimeFormat() === 0;
}
