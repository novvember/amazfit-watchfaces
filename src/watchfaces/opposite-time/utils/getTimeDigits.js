export function getTimeDigits(timeSensor) {
  const { hour, minute, second } = timeSensor;

  const is12HourFormat = hmSetting.getTimeFormat() === 0;
  const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
  const [h0, h1] = hourValue.toString().padStart(2, '0');
  const [m0, m1] = minute.toString().padStart(2, '0');
  const [s0, s1] = second.toString().padStart(2, '0');

  return [h0, h1, m0, m1, s0, s1];
}
