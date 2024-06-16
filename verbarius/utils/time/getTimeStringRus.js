import { capitalizeFirst } from '../capitalizeFirst';
import { decline } from '../decline';
import {
  CARDINAL_NUMBERS_FEMININE,
  CARDINAL_NUMBERS_FEMININE_GENITIVUS,
  CARDINAL_NUMBERS_MASCULINE,
  ORDINAL_NUMBERS_MASCULINE_GENITIVUS,
} from '../numbers/numbers_rus';
import { getHour12Format, getNextHour12Format } from './formatTime';

/**
 * Час двадцать пять
 * Три ноль одна
 * Двадцать один пятнадцать
 */
function getTime01(hour, minute) {
  const hoursString = hour === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[hour];

  const minString =
    minute < 10
      ? CARDINAL_NUMBERS_FEMININE[0] + ' ' + CARDINAL_NUMBERS_FEMININE[minute]
      : CARDINAL_NUMBERS_FEMININE[minute];

  return [hoursString, minString].join('\n');
}

/**
 * Час двадцать пять
 * Три ноль одна
 */
function getTime01b(hour, minute) {
  if (hour < 13) {
    return;
  }

  const hour12Format = getHour12Format(hour);

  const hoursString =
    hour12Format === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[hour12Format];

  const minString =
    minute < 10
      ? CARDINAL_NUMBERS_FEMININE[0] + ' ' + CARDINAL_NUMBERS_FEMININE[minute]
      : CARDINAL_NUMBERS_FEMININE[minute];

  return [hoursString, minString].join('\n');
}

/**
 * Один час две минуты
 * Двадцать три часа пятьдесят семь минут
 * Шестнадцать часов ноль минут
 */
function getTime02(hour, minute) {
  const hourString =
    CARDINAL_NUMBERS_MASCULINE[hour] +
    ' ' +
    decline(hour, ['час', 'часа', 'часов']);

  const minString =
    CARDINAL_NUMBERS_FEMININE[minute] +
    ' ' +
    decline(minute, ['минута', 'минуты', 'минут']);

  return [hourString, minString].join('\n');
}

/**
 * Одиннадцать часов пятьдесят семь минут
 * Четыре часа ноль минут
 */
function getTime02b(hour, minute) {
  if (hour < 13) {
    return;
  }

  const hour12Format = getHour12Format(hour);

  const hourString =
    CARDINAL_NUMBERS_MASCULINE[hour12Format] +
    ' ' +
    decline(hour12Format, ['час', 'часа', 'часов']);

  const minString =
    CARDINAL_NUMBERS_FEMININE[minute] +
    ' ' +
    decline(minute, ['минута', 'минуты', 'минут']);

  return [hourString, minString].join('\n');
}

/**
 * Полночь
 * Полдень
 */
function getTime03(hour, minute) {
  if (minute !== 0) {
    return;
  }

  if (hour === 0) {
    return 'Полночь';
  }

  if (hour === 12) {
    return 'Полдень';
  }
}

/**
 * Десять минут седьмого
 * Двадцать три минуты двенадцатого
 */
function getTime04(hour, minute) {
  if (minute > 0 && minute < 30) {
    const minString =
      CARDINAL_NUMBERS_FEMININE[minute] +
      ' ' +
      decline(minute, ['минута', 'минуты', 'минут']);

    const nextHour12Format = getNextHour12Format(hour);
    const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[nextHour12Format];

    return [minString, hourString].join('\n');
  }
}

/**
 * Без десяти девять
 * Без двух час
 */
function getTime05(hour, minute) {
  if (minute > 30) {
    const minLeft = 60 - minute;
    const minString = 'без ' + CARDINAL_NUMBERS_FEMININE_GENITIVUS[minLeft];

    const nextHour12Format = getNextHour12Format(hour);
    const hourString =
      nextHour12Format === 1
        ? 'час'
        : CARDINAL_NUMBERS_MASCULINE[nextHour12Format];

    return [minString, hourString].join('\n');
  }
}

/**
 * Четверть одиннадцатого
 * Без четверти час
 */
function getTime06(hour, minute) {
  const nextHour12Format = getNextHour12Format(hour);

  if (minute === 15) {
    const minString = 'четверть';
    const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[nextHour12Format];
    return [minString, hourString].join('\n');
  }

  if (minute === 45) {
    const minString = 'без четверти';
    const hourString =
      nextHour12Format === 1
        ? 'час'
        : CARDINAL_NUMBERS_MASCULINE[nextHour12Format];
    return [minString, hourString].join('\n');
  }
}

/**
 * Половина седьмого
 * Половина первого
 */
function getTime07(hour, minute) {
  if (minute !== 30) {
    return;
  }

  const nextHour12Format = getNextHour12Format(hour);
  const minString = 'половина';
  const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[nextHour12Format];
  return [minString, hourString].join('\n');
}

/**
 * Полдесятого
 * Полтретьего
 */
function getTime08(hour, minute) {
  if (minute !== 30) {
    return;
  }

  const nextHour12Format = getNextHour12Format(hour);
  const minString = 'пол';
  const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[nextHour12Format];
  return minString + hourString;
}

/**
 * Двенадцать часов
 * Три часа
 * Один час
 */
function getTime09(hour, minute) {
  if (minute !== 0) {
    return;
  }

  const hour12Format = getHour12Format(hour);

  const hourString =
    CARDINAL_NUMBERS_MASCULINE[hour12Format] +
    ' ' +
    decline(hour, ['час', 'часа', 'часов']);

  return hourString;
}

/**
 * Девять
 * Час
 * Одиннадцать
 */
function getTime10(hour, minute) {
  if (minute !== 0) {
    return;
  }

  const hour12Format = getHour12Format(hour);

  if (hour12Format === 1) {
    return 'час';
  }

  return CARDINAL_NUMBERS_MASCULINE[hour12Format];
}

/**
 * Ровно девять
 * Ровно час
 * Ровно одиннадцать
 */
function getTime11(hour, minute) {
  if (minute !== 0) {
    return;
  }

  const hour12Format = getHour12Format(hour);

  if (hour12Format === 1) {
    return 'ровно час';
  }

  return 'ровно' + '\n' + CARDINAL_NUMBERS_MASCULINE[hour12Format];
}

/**
 * Три пополудни
 * Час пополуночи
 */
function getTime12(hour, minute) {
  if (minute !== 0) {
    return;
  }

  let postfix = '';

  if (hour > 0 && hour < 4) {
    postfix = 'пополуночи';
  }

  if (hour > 12 && hour < 18) {
    postfix = 'пополудни';
  }

  if (postfix) {
    const hour12Format = getHour12Format(hour);

    const hourString =
      hour12Format === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[hour12Format];

    return hourString + ' ' + postfix;
  }
}

/**
 * Три дня
 * Час ночи
 * Шесть вечера
 * Два часа дня
 */
function getTime13(hour, minute) {
  if (minute !== 0) {
    return;
  }

  const hour12Format = getHour12Format(hour);

  let hourString =
    hour12Format === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[hour12Format];

  if (hour === 14) {
    hourString = 'два часа';
  }

  let postfix = '';

  if (hour < 4) {
    postfix = 'ночи';
  } else if (hour < 12) {
    postfix = 'утра';
  } else if (hour < 17) {
    postfix = 'дня';
  } else {
    postfix = 'вечера';
  }

  return hourString + ' ' + postfix;
}

export function getTimeString(hour, minute) {
  const variants = [
    getTime01(hour, minute),
    getTime01b(hour, minute),
    getTime02(hour, minute),
    getTime02b(hour, minute),
    getTime03(hour, minute),
    getTime04(hour, minute),
    getTime05(hour, minute),
    getTime06(hour, minute),
    getTime07(hour, minute),
    getTime08(hour, minute),
    getTime09(hour, minute),
    getTime10(hour, minute),
    getTime11(hour, minute),
    getTime12(hour, minute),
    getTime13(hour, minute),
  ].filter(Boolean);

  const randomIndex = Math.floor(Math.random() * variants.length);

  return capitalizeFirst(variants[randomIndex]);
}
