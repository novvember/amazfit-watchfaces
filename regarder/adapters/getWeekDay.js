const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export function getWeekDay(timeSensor) {
  const { week = 1 } = timeSensor;
  return WEEKDAYS[week - 1];
}
