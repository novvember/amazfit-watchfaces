export const WIND_IMAGE_LEVEL_PROPS = {
  x: 0,
  y: 0,
  image_array: new Array(8).fill(null).map((_, i) => `wind/wind_${i}.png`),
  image_length: 8,
  w: 0,
  h: 0,
  type: hmUI.data_type.WIND_DIRECTION,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
