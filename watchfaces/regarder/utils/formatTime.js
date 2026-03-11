export function formatTime(hour, minute, is12HourFormat) {
  const hourStringLength = is12HourFormat ? 1 : 2;

  const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
  const hourText = hourValue.toString().padStart(hourStringLength, '0');
  const minuteText = minute.toString().padStart(2, '0');

  const postfix = hour >= 12 ? 'pm' : 'am';

  return {
    time: `${hourText}:${minuteText}`,
    postfix: is12HourFormat ? postfix : '',
  };
}
