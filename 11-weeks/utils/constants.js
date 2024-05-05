// import { px } from "@zos/utils";
import { px } from "../utils/px";

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  centerX: width / 2,
  centerY: height / 2,
};

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
export const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

export const GRID = {
  size: {
    columns: 7,
    rows: 11,
  },
  cell: {
    width: 28,
    height: 28,
  },
}

export const CALENDAR = {
  currentWeekIndex: 2,
  date: {
    width: 26,
    height: 26,
  },
  weekDay: {
    width: 26,
    height: 26,
    images: new Array(7).fill(null).map((_, i) => `${isRusLang ? 'week_rus' : 'week'}/${i}.png`),
  },
  year: {
    width: 26,
    height: 26,
  },
  month: {
    width: 31,
    height: 26,
    images: new Array(12).fill(null).map((_, i) => `${isRusLang ? 'month_rus' : 'month'}/${i}.png`),
  }
}

export const DIGITS = {
  width: 10,
  height: 16,
  images: new Array(10).fill(null).map((_, i) => `digits/${i}.png`),
}

export const SECONDS_PROGRESS_BAR = {
  width: 196,
  height: 26,
}

export const ARC = {
  colorBackground: 0x3B3A3B,
  colorActive: 0xD9D9D9,
  radius: 200,
  width: 12,
};

export const CONNECTION_STATUS = {
  width: 24,
  height: 24,
};

