import { createSideArcTextProps } from '../../utils/createSideArcTextProps';

export const SIDE_ARC_VALUE_RIGHT_TEXT_PROPS = createSideArcTextProps({
  angleStart: 0,
  angleEnd: 45,
  align: hmUI.align.RIGHT,
});

export const SIDE_ARC_VALUE_LEFT_TEXT_PROPS = createSideArcTextProps({
  angleStart: -45,
  angleEnd: 0,
  align: hmUI.align.LEFT,
});

export const SIDE_ARC_TITLE_RIGHT_TEXT_PROPS = createSideArcTextProps({
  angleStart: 135,
  angleEnd: 180,
  isExternal: true,
  align: hmUI.align.RIGHT,
});

export const SIDE_ARC_TITLE_LEFT_TEXT_PROPS = createSideArcTextProps({
  angleStart: 180,
  angleEnd: 225,
  isExternal: true,
  align: hmUI.align.LEFT,
});

export const SIDE_ARC_MARK_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  pos_x: px(240) - px(14) / 2,
  pos_y: 0,
  center_x: px(240),
  center_y: px(240),
  angle: 0,
  src: 'side_arc/mark.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
