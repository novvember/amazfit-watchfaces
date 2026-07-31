export const UVI_IMAGE_LEVEL_PROPS = {
  x: 0,
  y: 0,
  image_array: new Array(5).fill(null).map((_, i) => `uvi/uvi_${i}.png`),
  image_length: 5,
  w: 0,
  h: 0,
  type: hmUI.data_type.UVI,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
