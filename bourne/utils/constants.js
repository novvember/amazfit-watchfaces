const { width, height } = hmSetting.getDeviceInfo();

// Screen params
export const SCREEN = {
  centerX: width / 2,
  centerY: height / 2,
  width,
  height,
};

// Character dimensions
export const CHAR_PARAMS = {
  w: px(62),
  h: px(75),
};

// Character grid positions
export const CHAR_POSITIONS = {
  rowsY: [
    Math.ceil(SCREEN.centerY - 2.5 * CHAR_PARAMS.h),
    Math.ceil(SCREEN.centerY - 1.5 * CHAR_PARAMS.h),
    Math.ceil(SCREEN.centerY - 0.5 * CHAR_PARAMS.h),
    Math.ceil(SCREEN.centerY + 0.5 * CHAR_PARAMS.h),
    Math.ceil(SCREEN.centerY + 1.5 * CHAR_PARAMS.h),
  ],

  columnsX: [
    Math.ceil(SCREEN.centerX - 2.5 * CHAR_PARAMS.w),
    Math.ceil(SCREEN.centerX - 1.5 * CHAR_PARAMS.w),
    Math.ceil(SCREEN.centerX - 0.5 * CHAR_PARAMS.w),
    Math.ceil(SCREEN.centerX + 0.5 * CHAR_PARAMS.w),
    Math.ceil(SCREEN.centerX + 1.5 * CHAR_PARAMS.w),
  ],
};
