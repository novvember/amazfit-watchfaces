import { capitalizeFirst } from '../../capitalizeFirst';
import { getHour12Format, getNextHour12Format } from '../formatTime';
import { NUMBERS } from './numbers';

/**
 * Una en punto
 * Doce en punto
 */
function getTime01(hour, minute) {
  if (minute !== 0) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  return `${NUMBERS[hour12Format]}\nen punto`;
}

/**
 * Cinco y diez
 * Dos y veintiuno
 */
function getTime02(hour, minute) {
  if (minute < 1 || minute > 29) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  return `${NUMBERS[hour12Format]} y ${NUMBERS[minute]}`;
}

/**
 * Dos y media
 */
function getTime03(hour, minute) {
  if (minute !== 30) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  return `${NUMBERS[hour12Format]} y media`;
}

/**
 * Tres y cuarto
 * Once menos cuarto
 * Once menos veinticinco
 * Once menos veinte
 * Once menos diez
 * Once menos cinco
 */
function getTime05(hour, minute) {
  if (minute === 15) {
    const hour12Format = getHour12Format(hour);
    return `${NUMBERS[hour12Format]} y cuarto`;
  }

  if (minute === 45) {
    const hourNext = getNextHour12Format(hour);
    return `${NUMBERS[hourNext]} menos cuarto`;
  }

  if (minute === 35) {
    const hourNext = getNextHour12Format(hour);
    return `${NUMBERS[hourNext]} menos veinticinco`;
  }

  if (minute === 40) {
    const hourNext = getNextHour12Format(hour);
    return `${NUMBERS[hourNext]} menos veinte`;
  }

  if (minute === 50) {
    const hourNext = getNextHour12Format(hour);
    return `${NUMBERS[hourNext]} menos diez`;
  }

  if (minute === 55) {
    const hourNext = getNextHour12Format(hour);
    return `${NUMBERS[hourNext]} menos cinco`;
  }
}

/**
 * Una y siete
 * Doce cincuenta y dos
 */
function getTime06(hour, minute) {
  if (!minute) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  const minuteString = minute < 30 ? `y ${NUMBERS[minute]}` : NUMBERS[minute];
  return `${NUMBERS[hour12Format]} ${minuteString}`;
}

/**
 * Mediodía
 * Medianoche
 */
function getTime07(hour, minute) {
  if ((hour === 12) & (minute === 0)) {
    return 'mediodía';
  }

  if ((hour === 0) & (minute === 0)) {
    return 'medianoche';
  }
}

export function getTimeString(hour, minute) {
  const variants = [
    getTime01(hour, minute),
    getTime02(hour, minute),
    getTime03(hour, minute),
    getTime05(hour, minute),
    getTime06(hour, minute),
    getTime07(hour, minute),
  ].filter(Boolean);

  const randomIndex = Math.floor(Math.random() * variants.length);

  return capitalizeFirst(variants[randomIndex]);
}
