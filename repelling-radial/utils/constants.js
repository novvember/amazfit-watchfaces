const lang = DeviceRuntimeCore.HmUtils.getLanguage();

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLOR_TYPES = [
  {
    type: 100201,
    title_en: 'White',
    preview: 'edit/color_preview_white.png',
    data: {
      background_src: 'background/background_white.png',
      grid_src: 'grid/grid_white.png',
    },
  },
  {
    type: 100202,
    title_en: 'Lime',
    preview: 'edit/color_preview_lime.png',
    data: {
      background_src: 'background/background_lime.png',
      grid_src: 'grid/grid_lime.png',
    },
  },
  {
    type: 100203,
    title_en: 'Cyan',
    preview: 'edit/color_preview_cyan.png',
    data: {
      background_src: 'background/background_cyan.png',
      grid_src: 'grid/grid_cyan.png',
    },
  },
  {
    type: 100204,
    title_en: 'Crimson',
    preview: 'edit/color_preview_crimson.png',
    data: {
      background_src: 'background/background_crimson.png',
      grid_src: 'grid/grid_crimson.png',
    },
  },
  {
    type: 100205,
    title_en: 'Orange',
    preview: 'edit/color_preview_orange.png',
    data: {
      background_src: 'background/background_orange.png',
      grid_src: 'grid/grid_orange.png',
    },
  },
  {
    type: 100206,
    title_en: 'Grape',
    preview: 'edit/color_preview_grape.png',
    data: {
      background_src: 'background/background_grape.png',
      grid_src: 'grid/grid_grape.png',
    },
  },
  {
    type: 100207,
    title_en: 'Green',
    preview: 'edit/color_preview_green.png',
    data: {
      background_src: 'background/background_green.png',
      grid_src: 'grid/grid_green.png',
    },
  },
  {
    type: 100208,
    title_en: 'Azure',
    preview: 'edit/color_preview_azure.png',
    data: {
      background_src: 'background/background_azure.png',
      grid_src: 'grid/grid_azure.png',
    },
  },
];
