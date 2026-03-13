import { formatTime } from '../utils/formatTime';
import { getIs12HourFormat } from './getIs12HourFormat';

export function getWorldTime(worldClockSensor) {
  worldClockSensor?.init();
  const _count = worldClockSensor?.getWorldClockCount();
  const { hour, minute, city } = worldClockSensor?.getWorldClockInfo(0) || {};

  if (hour === undefined || minute === undefined || !city) {
    return;
  }

  const is12HourFormat = getIs12HourFormat();
  const time = formatTime(hour, minute, is12HourFormat);

  return {
    city,
    time,
  };
}
