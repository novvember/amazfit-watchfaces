import { capitalizeFirst } from '../../capitalizeFirst';
import { NUMBERS } from './numbers';
import { getHour12Format, getNextHour12Format } from '../formatTime';
import { decline } from '../../decline';

/**
 * One o'clock
 * Twelve o'clock
 */
function getTime01(hour, minute) {
  if (minute !== 0) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  return `${NUMBERS[hour12Format]}\no'clock`;
}

/**
 * Ten past five
 * Twenty one minute past two
 */
function getTime02(hour, minute) {
  if (minute < 1 || minute > 29) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  const hasPostfix = minute % 5 !== 0;
  const postfix = decline(minute, ['minute', 'minutes', 'minutes']);
  const minuteString = `${NUMBERS[minute]}${hasPostfix ? ' ' + postfix : ''}`;
  console.log('minuteString', minuteString);
  console.log('hasPostfix', hasPostfix);
  console.log('postfix', postfix);
  return `${minuteString}\npast ${NUMBERS[hour12Format]}`;
}

/**
 * Half past two
 */
function getTime03(hour, minute) {
  if (minute !== 30) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  return `half past ${NUMBERS[hour12Format]}`;
}

/**
 * Ten to five
 * Seventeen minutes to twelve
 */
function getTime04(hour, minute) {
  if (minute < 30) {
    return;
  }

  const minuteLeft = 60 - minute;
  const hourNext = getNextHour12Format(hour);
  const hasPostfix = minuteLeft % 5 !== 0;
  const postfix = decline(minuteLeft, ['minute', 'minutes', 'minutes']);
  const minuteString = `${NUMBERS[minuteLeft]}${
    hasPostfix ? ' ' + postfix : ''
  }`;

  return `${minuteString}\nto ${NUMBERS[hourNext]}`;
}

/**
 * Quarter past three
 * Quarter to elleven
 */
function getTime05(hour, minute) {
  if (minute === 15) {
    const hour12Format = getHour12Format(hour);
    return `quarter past ${NUMBERS[hour12Format]}`;
  }

  if (minute === 45) {
    const hourNext = getNextHour12Format(hour);
    return `quarter to ${NUMBERS[hourNext]}`;
  }
}

/**
 * One oh-seven
 * Twelve fifty-two
 */
function getTime06(hour, minute) {
  if (!minute) {
    return;
  }

  const hour12Format = getHour12Format(hour);
  const minuteString = minute < 10 ? `oh-${NUMBERS[minute]}` : NUMBERS[minute];
  return `${NUMBERS[hour12Format]} ${minuteString}`;
}

/**
 * Noon
 * Midnight
 */
function getTime07(hour, minute) {
  if ((hour === 12) & (minute === 0)) {
    return 'noon';
  }

  if ((hour === 0) & (minute === 0)) {
    return 'midnight';
  }
}

export function getTimeString(hour, minute) {
  const variants = [
    getTime01(hour, minute),
    getTime02(hour, minute),
    getTime03(hour, minute),
    getTime04(hour, minute),
    getTime05(hour, minute),
    getTime06(hour, minute),
    getTime07(hour, minute),
  ].filter(Boolean);

  const randomIndex = Math.floor(Math.random() * variants.length);

  return capitalizeFirst(variants[randomIndex]);
}
