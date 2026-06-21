export const PROGRESS_COUNT = 13;

const PROGRESS_IMAGES = new Array(PROGRESS_COUNT + 1)
  .fill(null)
  .map((_, i) => `progress/${i}.png`);

export const PROGRESS_GROUP_PROPS = {
  x: 0,
  y: 0,
  w: px(280),
  h: px(98),
};

export const PROGRESS_LEVEL_PROPS = {
  x: 0,
  y: 0,
  w: px(280),
  h: px(98),
  image_array: PROGRESS_IMAGES,
  image_length: PROGRESS_IMAGES.length,
  show_level: hmUI.show_level.ONLY_NORMAL,
  level: 1,
};
