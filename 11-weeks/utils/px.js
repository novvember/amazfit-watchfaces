const { width } = hmSetting.getDeviceInfo();

const DESIGN_WIDTH = 416;

// Custom implementation of px function from "@zos/utils"
export function px(x) {
  return Math.ceil(x / DESIGN_WIDTH * width);
}