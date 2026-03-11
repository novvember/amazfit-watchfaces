import ui from '@zos/ui';
import { px } from '@zos/utils';
import { COLORS, FONT } from '../utils/constants';

const centerX = px(480 / 2);
const centerY = px(480 / 2);

export const INFO_VALUE_TEXT_PROPS = {
  x: px(150),
  y: px(400),
  w: px(180),
  h: px(40),
  color: COLORS.primary,
  text_size: px(40),
  align_h: ui.align.CENTER_H,
  align_v: ui.align.CENTER_V,
  font: FONT,
  text: '---',
  char_space: 0,
  show_level: ui.show_level.ONLY_NORMAL,
};

export const INFO_POSTFIX_TEXT_PROPS = {
  ...INFO_VALUE_TEXT_PROPS,
  y: px(434),
};
