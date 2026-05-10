import { COLOR_PRIMARY, FONT_SECONDARY } from '../watchface/index.const';

const DATA_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(170),
  h: px(46),
  color: COLOR_PRIMARY,
  text_size: px(40),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_SECONDARY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

const TOP_COORDS = {
  x: px(155),
  y: px(120),
};

const BOTTOM_COORDS = {
  x: px(155),
  y: px(316),
};

/**
 * Prepares base props for secondary data text widget
 * @param {'top' | 'bottom'} position
 */
export function getDataWidgetProps(position) {
  const coords = position === 'top' ? TOP_COORDS : BOTTOM_COORDS;

  return {
    ...DATA_TEXT_PROPS,
    ...coords,
  };
}
