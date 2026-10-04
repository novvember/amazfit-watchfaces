import * as ui from '@zos/ui';
import { px } from '@zos/utils';
import { FONT, FONT_SIZE } from './index.r.layout';

export const STEPS_TEXT_PROPS = {
  x: 0,
  y: px(78),
  w: px(480),
  h: px(82),
  color: 0xffffff,
  text_size: FONT_SIZE,
  align_h: ui.align.CENTER_H,
  align_v: ui.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: ui.show_level.ONLY_NORMAL,
};
