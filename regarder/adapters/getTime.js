import { formatTime } from '../utils/formatTime';
import { getIs12HourFormat } from './getIs12HourFormat';

export function getTime(timeSensor) {
  const is12HourFormat = getIs12HourFormat();
  const { hour = 0, minute = 0 } = timeSensor;

  return formatTime(hour, minute, is12HourFormat);
}
