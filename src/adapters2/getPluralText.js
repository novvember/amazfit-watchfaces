import { getText } from '@zos/i18n';

/** @typedef {'one' | 'few' | 'many' | 'other'} PluralCategory */

// Integer cardinal rules from CLDR (no fractional or compact-number notation):
// https://unicode.org/cldr/charts/49/supplemental/language_plural_rules.html
// Each catalog must contain plural.rule and every category used by its rule.
// Examples below use steps as the message key; other messages use the same suffixes.
// Number lists illustrate categories, not exhaustive ranges. Translate the whole phrase
// for those quantities; categories may have identical translations.
// {count} is only an example placeholder; substitution belongs to the caller.

/**
 * @param {string} rule
 * @param {number} count
 * @returns {PluralCategory}
 */
function selectCategory(rule, count) {
  switch (rule) {
    // Russian: plural.rule="ru"; required: one, few, many.
    // one: 1, 21, 31, 101 (ends in 1, but not 11).
    // few: 2-4, 22-24, 102-104 (ends in 2-4, but not 12-14).
    // many: 0, 5-20, 25-30, 100, 111-114 (all remaining integers).
    // steps.one="{count} шаг": 1 → "1 шаг", 21 → "21 шаг".
    // steps.few="{count} шага": 2 → "2 шага", 24 → "24 шага".
    // steps.many="{count} шагов": 0 → "0 шагов", 11 → "11 шагов".
    case 'ru': {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;
      if (lastDigit === 1 && lastTwoDigits !== 11) return 'one';
      if (
        lastDigit >= 2 && lastDigit <= 4 &&
        (lastTwoDigits < 12 || lastTwoDigits > 14)
      ) return 'few';
      return 'many';
    }

    // English: plural.rule="en"; required: one, other.
    // one: exactly 1. other: 0, 2, 11, 21, 100, 1000000 (everything else).
    // steps.one="{count} step": 1 → "1 step".
    // steps.other="{count} steps": 0 → "0 steps", 21 → "21 steps".
    // German: plural.rule="de"; required: one, other.
    // one: exactly 1. other: 0, 2, 11, 21, 100, 1000000 (everything else).
    // steps.one="{count} Schritt": 1 → "1 Schritt".
    // steps.other="{count} Schritte": 0 → "0 Schritte", 21 → "21 Schritte".
    case 'en':
    case 'de':
      return count === 1 ? 'one' : 'other';

    // Spanish: plural.rule="es"; required: one, many, other.
    // one: exactly 1. many: 1000000, 2000000, 3000000 (positive multiples of 1000000).
    // other: 0, 2, 11, 21, 100, 1000001 (all remaining integers).
    // steps.one="{count} paso": 1 → "1 paso".
    // steps.many="{count} pasos": 1000000 → "1000000 pasos".
    // steps.other="{count} pasos": 0 → "0 pasos", 2 → "2 pasos".
    // Italian: plural.rule="it"; required: one, many, other.
    // one: exactly 1. many: 1000000, 2000000, 3000000 (positive multiples of 1000000).
    // other: 0, 2, 11, 21, 100, 1000001 (all remaining integers).
    // steps.one="{count} passo": 1 → "1 passo".
    // steps.many="{count} passi": 1000000 → "1000000 passi".
    // steps.other="{count} passi": 0 → "0 passi", 2 → "2 passi".
    // European Portuguese: plural.rule="pt-PT"; required: one, many, other.
    // one: exactly 1. many: 1000000, 2000000, 3000000 (positive multiples of 1000000).
    // other: 0, 2, 11, 21, 100, 1000001 (all remaining integers).
    // steps.one="{count} passo": 1 → "1 passo".
    // steps.many="{count} passos": 1000000 → "1000000 passos".
    // steps.other="{count} passos": 0 → "0 passos", 2 → "2 passos".
    case 'es':
    case 'it':
    case 'pt-PT':
      if (count === 1) return 'one';
      return count > 0 && count % 1000000 === 0 ? 'many' : 'other';

    // French: plural.rule="fr"; required: one, many, other.
    // one: exactly 0 or 1. many: 1000000, 2000000, 3000000 (positive multiples of 1000000).
    // other: 2, 11, 21, 100, 1000001 (all remaining integers).
    // steps.one="{count} pas": 0 → "0 pas", 1 → "1 pas".
    // steps.many="{count} pas": 1000000 → "1000000 pas".
    // steps.other="{count} pas": 2 → "2 pas", 21 → "21 pas".
    // Brazilian Portuguese: plural.rule="pt-BR" (or "pt"); required: one, many, other.
    // one: exactly 0 or 1. many: 1000000, 2000000, 3000000 (positive multiples of 1000000).
    // other: 2, 11, 21, 100, 1000001 (all remaining integers).
    // steps.one="{count} passo": 0 → "0 passo", 1 → "1 passo".
    // steps.many="{count} passos": 1000000 → "1000000 passos".
    // steps.other="{count} passos": 2 → "2 passos", 21 → "21 passos".
    // Unlike pt-PT, these rules select one for both 0 and 1.
    case 'fr':
    case 'pt':
    case 'pt-BR':
      if (count <= 1) return 'one';
      return count % 1000000 === 0 ? 'many' : 'other';

    // Japanese: plural.rule="ja"; required: other only.
    // other: every integer, e.g. 0, 1, 2, 11, 21, 100, 1000000.
    // steps.other="{count}歩": 0 → "0歩", 1 → "1歩", 21 → "21歩".
    case 'ja':
      return 'other';
    default:
      throw new Error(`Unsupported plural.rule: ${rule}`);
  }
}

/**
 * Returns the translated variant for a nonnegative integer quantity.
 * Reads plural.rule from the same catalog as the phrase; does not inspect system language.
 * Returns text unchanged; callers handle any placeholders and formatting.
 * @param {string} key Message prefix, e.g. 'steps'.
 * @param {number} count Nonnegative safe integer (unformatted).
 * @returns {string}
 */
export function getPluralText(key, count) {
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError('Plural count must be a nonnegative safe integer');
  }
  const category = selectCategory(getText('plural.rule'), count);
  return getText(`${key}.${category}`);
}
