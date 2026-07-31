import { COLORS, FONTS } from '../watchface/index.const';
import { createArcTextProps } from './createArcTextProps';

/**
 * @typedef {Object} CreateSideArcTextParams
 * @property {number} angleStart
 * @property {number} angleEnd
 * @property {boolean} [isExternal]
 * @property {string} [text]
 * @property {number} [align]
 */

const DATA_RADIUS = px(452 / 2);

/**
 * Creates props for arc text for data widgets
 * @param {CreateSideArcTextParams} params
 * @returns
 */
export function createSideArcTextProps({
  angleStart,
  angleEnd,
  isExternal = false,
  text = '',
  align = hmUI.align.LEFT,
}) {
  return {
    ...createArcTextProps({
      textSize: px(24),
      angleStart,
      angleEnd,
      radius: DATA_RADIUS,
      isExternal,
      fontOffsets: [0.9, 0.4],
    }),
    text,
    color: COLORS.secondary,
    char_space: 1,
    font: FONTS.widget,
    align_h: align,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}
