export const COLOR_EDIT_GROUP_PROPS = {
  // Initial placement; adjust together with the final preview assets.
  x: px(36),
  y: px(211),
  w: px(160),
  h: px(60),
  select_image: 'edit/color_select.png',
  un_select_image: 'edit/color_unselect.png',
  tips_BG: 'edit/tip.png',
  tips_width: px(120),
  tips_margin: px(6),
  tips_x: px(20),
  tips_y: px(-40),
};

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'edit/edit_background.png',
  show_level: hmUI.show_level.ONLY_EDIT,
};

export const BACKGROUND_OVERLAY_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(242),
  color: 0x000000,
  alpha: 90,
  show_level: hmUI.show_level.ONLY_EDIT,
};
