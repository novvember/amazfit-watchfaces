import { getTimeText } from '../utils/time';
import { getIs12HourFormat } from './getIs12HourFormat';

/**
 * Gets world clock time (first or n-th index) form official World Clock app
 *
 * @param {HmSensorInstance} worldClockSensor
 * @param {number} [index]
 */
export function getWorldClockTime(worldClockSensor, index = 0) {
  worldClockSensor?.init?.();

  const _count = worldClockSensor?.getWorldClockCount?.();
  const { hour, minute, city } =
    worldClockSensor?.getWorldClockInfo?.(index) || {};

  if (hour === undefined || minute === undefined || !city) {
    return;
  }

  const is12HourFormat = getIs12HourFormat();
  const timeText = getTimeText(hour, minute, is12HourFormat);

  return {
    city,
    timeText,
  };
}
