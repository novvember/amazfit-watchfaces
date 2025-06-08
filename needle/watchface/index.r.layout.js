import ui from '@zos/ui';
import { px } from '@zos/utils';
import {
  BOTTOM_INFO_OPTIONAL_TYPES,
  OUTER_SCALE_OPTIONAL_TYPES,
} from '../utils/constants';

const centerX = px(480 / 2);
const centerY = px(480 / 2);

export const EDIT_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'edit/background.png',
  show_level: ui.show_level.ONLY_EDIT,
};

export const OUTER_SCALE_EDIT_GROUP_PROPS = {
  edit_id: 1,
  x: 0,
  y: px(240),
  w: px(180),
  h: px(234),
  select_image: 'edit/outer_select.png',
  un_select_image: 'edit/outer_unselect.png',
  optional_types: OUTER_SCALE_OPTIONAL_TYPES,
  default_type: OUTER_SCALE_OPTIONAL_TYPES[0].type,
  count: OUTER_SCALE_OPTIONAL_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_x: px(70),
  tips_y: px(40),
  tips_width: px(120),
  tips_margin: px(6),
};

export const BOTTOM_INFO_EDIT_GROUP_PROPS = {
  edit_id: 2,
  x: px(180),
  y: px(400),
  w: px(120),
  h: px(74),
  select_image: 'edit/bottom_select.png',
  un_select_image: 'edit/bottom_unselect.png',
  optional_types: BOTTOM_INFO_OPTIONAL_TYPES,
  default_type: BOTTOM_INFO_OPTIONAL_TYPES[7].type,
  count: BOTTOM_INFO_OPTIONAL_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_x: 0,
  tips_y: px(-35),
  tips_width: px(120),
  tips_margin: px(6),
};
