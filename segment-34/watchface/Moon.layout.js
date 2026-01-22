export const MOON_IMAGE_PROPS = {
  x: px(224),
  y: px(31),
  image_array: new Array(31).fill(null).map((_, i) => `moon/${i + 1}.png`),
  image_length: 31,
  type: hmUI.data_type.MOON,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
