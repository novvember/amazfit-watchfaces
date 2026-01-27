import { COLOR_THEMES, DIGIT_LAYOUTS } from '../utils/constants';
import {
  BACKGROUND_RECT_PROPS,
  TIME_DIGIT_AOD_IMAGE_PROPS,
  TIME_DIGIT_IMAGE_PROPS,
} from './index.r.layout';
import { Settings } from './Settings';

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
    this.settings = new Settings();
  },

  getColorTheme() {
    const colorThemeType = this.settings.colors;
    return COLOR_THEMES[colorThemeType] || COLOR_THEMES[1];
  },

  getTimeDigitValues(timeSensor, is12HourFormat) {
    const { hour = 0, minute = 0 } = timeSensor;
    const hourValue = is12HourFormat ? hour % 12 || 12 : hour;

    const hourText = hourValue.toString().padStart(2, '0');
    const minuteText = minute.toString().padStart(2, '0');

    return [hourText.split(''), minuteText.split('')];
  },

  getLevelY(timeSensor) {
    const { second = 0 } = timeSensor;
    return Math.round(px(480) - (second / 60) * px(480));
  },

  getDigitSrc(color, type, value) {
    return `${color}/${type}/${value}.png`;
  },

  getColors(colorTheme, minute) {
    const topIndex = Number(minute) % 2;
    const bottomIndex = (Number(minute) + 1) % 2;

    return {
      top: colorTheme[topIndex],
      bottom: colorTheme[bottomIndex],
    };
  },

  getDigitLayout(digitValues) {
    const value = Number(digitValues.flat().join(''));
    const max = DIGIT_LAYOUTS.length - 1;
    const i = ((value * 2654435761) >>> 0) % max;

    return DIGIT_LAYOUTS[i];
  },

  buildTime(colorTheme) {
    const is12HourFormat = hmSetting.getTimeFormat() === 0;
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

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

    const updateTop = () => {
      const digitValues = this.getTimeDigitValues(timeSensor, is12HourFormat);
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

    const updateBottom = () => {
      const digitValues = this.getTimeDigitValues(timeSensor, is12HourFormat);
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

    const update = () => {
      updateTop();
      updateBottom();
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);

          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, updateTop);
          updateTop();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, updateTop);
        timer.stopTimer(updateTimer);
      },
    });
  },
});
