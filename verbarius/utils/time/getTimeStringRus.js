import { capitalizeFirst } from '../capitalizeFirst';
import { decline } from '../decline';
import {
  CARDINAL_NUMBERS_FEMININE,
  CARDINAL_NUMBERS_FEMININE_GENITIVUS,
  CARDINAL_NUMBERS_MASCULINE,
  ORDINAL_NUMBERS_MASCULINE_GENITIVUS,
} from '../numbers/numbers_rus';

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

    const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[(hour % 12) + 1];

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

    const nextHour = (hour % 12) + 1;
    const hourString =
      nextHour === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[nextHour];

    return [minString, hourString].join('\n');
  }
}

/**
 * Четверть одиннадцатого
 * Без четверти час
 */
function getTime06(hour, minute) {
  const nextHour = (hour % 12) + 1;

  if (minute === 15) {
    const minString = 'четверть';
    const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[nextHour];
    return [minString, hourString].join('\n');
  }

  if (minute === 45) {
    const minString = 'без четверти';
    const hourString =
      nextHour === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[nextHour];
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

  const nextHour = (hour % 12) + 1;
  const minString = 'половина';
  const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[nextHour];
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

  const nextHour = (hour % 12) + 1;
  const minString = 'пол';
  const hourString = ORDINAL_NUMBERS_MASCULINE_GENITIVUS[nextHour];
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

  let hourNum = hour % 12;
  if (hourNum === 0) {
    hourNum = 12;
  }

  const hourString =
    CARDINAL_NUMBERS_MASCULINE[hour] +
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

  let hourNum = hour % 12;

  if (hourNum === 0) {
    hourNum = 12;
  }

  if (hourNum === 1) {
    return 'час';
  }

  return CARDINAL_NUMBERS_MASCULINE[hourNum];
}

/**
 * Девять ровно
 * Час ровно
 * Одиннадцать ровно
 */
function getTime11(hour, minute) {
  if (minute !== 0) {
    return;
  }

  let hourNum = hour % 12;

  if (hourNum === 0) {
    hourNum = 12;
  }

  if (hourNum === 1) {
    return 'час ровно';
  }

  return CARDINAL_NUMBERS_MASCULINE[hourNum] + '\n' + 'ровно';
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
    let hourNum = hour % 12;

    if (hourNum === 0) {
      hourNum = 12;
    }

    const hourString =
      hourNum === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[hourNum];

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

  let hourNum = hour % 12;

  if (hourNum === 0) {
    hourNum = 12;
  }

  let hourString = hourNum === 1 ? 'час' : CARDINAL_NUMBERS_MASCULINE[hourNum];

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
    getTime02(hour, minute),
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
