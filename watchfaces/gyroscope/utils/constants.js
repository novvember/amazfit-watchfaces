import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

export const FONT = hasCustomFontSupport
  ? 'fonts/Inter_24pt-SemiBold.ttf'
  : undefined;
