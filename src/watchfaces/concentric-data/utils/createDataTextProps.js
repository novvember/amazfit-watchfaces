import { COLORS, DATA_RADIUS, FONTS } from '../watchface/index.const';
import { createArcTextProps } from './createArcTextProps';

/**
 * Creates props for arc text for data widgets
 * @param {number} angleStart
 * @param {number} angleEnd
 * @param {boolean} [isExternal]
 * @param {string} [text]
 * @returns
 */
export function createDataTextProps(
  angleStart,
  angleEnd,
  isExternal = false,
  text = '',
) {
  return {
    ...createArcTextProps({
      textSize: px(30),
      angleStart,
      angleEnd,
      radius: DATA_RADIUS,
      isExternal,
      fontOffsets: [0.95, 0.45],
    }),
    text,
    color: COLORS.primary,
    char_space: 1,
    font: FONTS.data,
    align_h: hmUI.align.LEFT,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}
