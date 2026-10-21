import { COLOR_THEMES, DIGIT_LAYOUTS } from '../utils/constants';
import {
  BACKGROUND_RECT_PROPS,
  MASK_IMAGE_PROPS,
  TIME_DIGIT_AOD_IMAGE_PROPS,
  TIME_DIGIT_IMAGE_PROPS,
} from './index.r.layout';
import { Settings } from './Settings';
import { getTimeTexts } from '../../../adapters/getTimeTexts';

/**
 * @typedef {(typeof COLOR_THEMES)[keyof typeof COLOR_THEMES]} ColorTheme
 * @typedef {[string[], string[]]} TimeDigitValues
 * @typedef {object} DigitColors
 * @property {[number, string]} top
 * @property {[number, string]} bottom
 */

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildSettings();

    const colorTheme = this.getColorTheme();
    this.buildTime(colorTheme);
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildSettings() {
    const settings = new Settings();
    this.settings = settings.settings;
  },

  /** @returns {ColorTheme} */
  getColorTheme() {
    const colorThemeType = this.settings.colors;
    const selectedTheme = Object.entries(COLOR_THEMES).find(
      ([key]) => key === String(colorThemeType),
    );
    return selectedTheme?.[1] || COLOR_THEMES[1];
  },

  /**
   * @param {HmSensorInstance} timeSensor
   * @returns {TimeDigitValues}
   */
  getTimeDigitValues(timeSensor) {
    const { hourText, minuteText } = getTimeTexts(timeSensor);
    return [hourText.padStart(2, '0').split(''), minuteText.split('')];
  },

  /** @param {HmSensorInstance} timeSensor */
  getLevelY(timeSensor) {
    const { second = 0 } = timeSensor;
    return Math.round(px(480) - (second / 60) * px(480));
  },

  /**
   * @param {string} color
   * @param {(typeof DIGIT_LAYOUTS)[number][number][number]['digitType']} type
   * @param {string} value
   */
  getDigitSrc(color, type, value) {
    return `${type}/${color}/${value}.png`;
  },

  /**
   * @param {ColorTheme} colorTheme
   * @param {string} minute
   * @returns {DigitColors}
   */
  getColors(colorTheme, minute) {
    const topIndex = Number(minute) % 2;
    const bottomIndex = (Number(minute) + 1) % 2;

    return {
      top: colorTheme[topIndex],
      bottom: colorTheme[bottomIndex],
    };
  },

  /** @param {TimeDigitValues} digitValues */
  getDigitLayout(digitValues) {
    const value = Number(digitValues.flat().join(''));
    const hash = Math.imul(value, 0x9e3779b1) >>> 0;
    const i = Math.floor((hash / 0x100000000) * DIGIT_LAYOUTS.length);

    return DIGIT_LAYOUTS[i];
  },

  /** @param {ColorTheme} colorTheme */
  buildTime(colorTheme) {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    /** @type {number | undefined} */
    let updateTimer = undefined;
    let prevTopValue = '';

    const backgroundTopWidget = hmUI.createWidget(
      hmUI.widget.FILL_RECT,
      BACKGROUND_RECT_PROPS,
    );

    const digitTopWidgets = new Array(2)
      .fill(null)
      .map(() =>
        new Array(2)
          .fill(null)
          .map(() =>
            hmUI.createWidget(hmUI.widget.IMG, TIME_DIGIT_IMAGE_PROPS),
          ),
      );

    const digitTopAodWidgets = new Array(2)
      .fill(null)
      .map(() =>
        new Array(2)
          .fill(null)
          .map(() =>
            hmUI.createWidget(hmUI.widget.IMG, TIME_DIGIT_AOD_IMAGE_PROPS),
          ),
      );

    const backgroundBottomWidget = hmUI.createWidget(
      hmUI.widget.FILL_RECT,
      BACKGROUND_RECT_PROPS,
    );

    const digitBottomWidgets = new Array(2)
      .fill(null)
      .map(() =>
        new Array(2)
          .fill(null)
          .map(() =>
            hmUI.createWidget(hmUI.widget.IMG, TIME_DIGIT_IMAGE_PROPS),
          ),
      );

    const _maskImage = hmUI.createWidget(hmUI.widget.IMG, MASK_IMAGE_PROPS);

    /** @param {TimeDigitValues} digitValues */
    const updateTop = (digitValues) => {
      const topValue = digitValues.toString();

      if (topValue === prevTopValue) {
        return;
      }

      prevTopValue = topValue;

      const digitLayout = this.getDigitLayout(digitValues);

      const [backgroundColor, digitColor] = this.getColors(
        colorTheme,
        digitValues[1][1],
      ).top;

      backgroundTopWidget.setProperty(hmUI.prop.MORE, {
        ...BACKGROUND_RECT_PROPS,
        color: backgroundColor,
      });

      digitTopWidgets.forEach((array, yIndex) =>
        array.forEach((widget, xIndex) => {
          const value = digitValues[yIndex][xIndex];
          const { x, y, digitType } = digitLayout[yIndex][xIndex];
          const src = this.getDigitSrc(digitColor, digitType, value);

          widget.setProperty(hmUI.prop.MORE, {
            ...TIME_DIGIT_IMAGE_PROPS,
            x,
            y,
            src,
          });
        }),
      );
    };

    /** @param {TimeDigitValues} digitValues */
    const updateTopAod = (digitValues) => {
      const digitLayout = this.getDigitLayout(digitValues);

      digitTopAodWidgets.forEach((array, yIndex) =>
        array.forEach((widget, xIndex) => {
          const value = digitValues[yIndex][xIndex];
          const { x, y, digitType } = digitLayout[yIndex][xIndex];
          const src = this.getDigitSrc('aod', digitType, value);

          widget.setProperty(hmUI.prop.MORE, {
            ...TIME_DIGIT_AOD_IMAGE_PROPS,
            x,
            y,
            src,
          });
        }),
      );
    };

    /** @param {TimeDigitValues} digitValues */
    const updateBottom = (digitValues) => {
      const levelY = this.getLevelY(timeSensor);
      const digitLayout = this.getDigitLayout(digitValues);

      const [backgroundColor, digitColor] = this.getColors(
        colorTheme,
        digitValues[1][1],
      ).bottom;

      backgroundBottomWidget.setProperty(hmUI.prop.MORE, {
        ...BACKGROUND_RECT_PROPS,
        color: backgroundColor,
        y: levelY,
      });

      digitBottomWidgets.forEach((array, yIndex) =>
        array.forEach((widget, xIndex) => {
          const value = digitValues[yIndex][xIndex];
          const { x, y, digitType } = digitLayout[yIndex][xIndex];
          const src = this.getDigitSrc(digitColor, digitType, value);

          widget.setProperty(hmUI.prop.MORE, {
            ...TIME_DIGIT_IMAGE_PROPS,
            x,
            y: levelY,
            src,
            pos_y: y - levelY,
            h: px(480),
          });
        }),
      );
    };

    const updateNormal = () => {
      const digitValues = this.getTimeDigitValues(timeSensor);

      updateTop(digitValues);
      updateBottom(digitValues);
    };

    const updateAod = () => {
      const digitValues = this.getTimeDigitValues(timeSensor);

      updateTopAod(digitValues);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timer.stopTimer(updateTimer);
          updateTimer = timer.createTimer(1000, 1000, updateNormal);
          updateNormal();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, updateAod);
          updateAod();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(
          timeSensor.event.MINUTEEND,
          updateNormal,
        );
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, updateAod);
        timer.stopTimer(updateTimer);
      },
    });
  },
});
