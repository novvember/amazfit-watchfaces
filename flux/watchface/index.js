import { COLOR_THEMES, DIGIT_X, DIGIT_Y } from '../utils/constants';
import {
  BACKGROUND_RECT_PROPS,
  TIME_DIGIT_AOD_IMAGE_PROPS,
  TIME_DIGIT_IMAGE_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    const colorTheme = COLOR_THEMES[0];

    this.buildTime(colorTheme);
  },

  onDestroy() {
    console.log('watchface destroying');
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

  getDigitSrc(color, value) {
    return `${color}/${value}.png`;
  },

  buildTime(colorTheme) {
    const is12HourFormat = hmSetting.getTimeFormat() === 0;
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    let updateTimer = undefined;
    let prevTopValue = '';

    const _backgroundTopWidget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...BACKGROUND_RECT_PROPS,
      color: colorTheme.BACKGROUND_TOP,
    });

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

      digitTopWidgets.forEach((array, yIndex) =>
        array.forEach((widget, xIndex) => {
          const value = digitValues[yIndex][xIndex];
          const src = this.getDigitSrc(colorTheme.DIGITS_TOP, value);

          widget.setProperty(hmUI.prop.MORE, {
            ...TIME_DIGIT_IMAGE_PROPS,
            x: DIGIT_X[xIndex],
            y: DIGIT_Y[yIndex],
            src,
          });
        }),
      );

      digitTopAodWidgets.forEach((array, yIndex) =>
        array.forEach((widget, xIndex) => {
          const value = digitValues[yIndex][xIndex];
          const src = this.getDigitSrc('aod', value);

          widget.setProperty(hmUI.prop.MORE, {
            ...TIME_DIGIT_AOD_IMAGE_PROPS,
            x: DIGIT_X[xIndex],
            y: DIGIT_Y[yIndex],
            src,
          });
        }),
      );
    };

    const updateBottom = () => {
      const digitValues = this.getTimeDigitValues(timeSensor, is12HourFormat);
      const levelY = this.getLevelY(timeSensor);

      backgroundBottomWidget.setProperty(hmUI.prop.MORE, {
        ...BACKGROUND_RECT_PROPS,
        color: colorTheme.BACKGROUND_BOTTOM,
        y: levelY,
      });

      digitBottomWidgets.forEach((array, yIndex) =>
        array.forEach((widget, xIndex) => {
          const value = digitValues[yIndex][xIndex];
          const src = this.getDigitSrc(colorTheme.DIGITS_BOTTOM, value);

          widget.setProperty(hmUI.prop.MORE, {
            ...TIME_DIGIT_IMAGE_PROPS,
            x: DIGIT_X[xIndex],
            y: levelY,
            src,
            pos_y: DIGIT_Y[yIndex] - levelY,
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
