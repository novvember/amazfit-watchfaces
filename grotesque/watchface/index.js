import {
  BATTERY_POSTFIX,
  HEART_POSTFIX,
  MINUTE_TEXT,
  MONTHS,
  STEPS_POSTFIX,
  WEEKDAYS,
} from '../utils/constants';
import { formatNumber } from '../utils/formatNumber';
import {
  BATTERY_TEXT_PROPS,
  BOTTOM_RECT_PROPS,
  DATE_TEXT_PROPS,
  HEART_TEXT_PROPS,
  HOUR_BG_PROPS,
  HOUR_TEXT_PROPS,
  STEPS_TEXT_PROPS,
  TIME_TEXT_PROPS,
  TOP_RECT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildTime();

    this.buildRects();

    this.buildHeartRate();
    this.buildSteps();
    this.buildDate();
    this.buildBattery();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    const hourWidget = hmUI.createWidget(hmUI.widget.TEXT, HOUR_TEXT_PROPS);
    const nextHourBgWidget = hmUI.createWidget(
      hmUI.widget.FILL_RECT,
      HOUR_BG_PROPS,
    );
    const nextHourWidget = hmUI.createWidget(hmUI.widget.TEXT, HOUR_TEXT_PROPS);
    const minuteWidgets = new Array(4)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS));

    const currentMinuteIndex = 1;
    const fullPathLength = MINUTE_TEXT.height + MINUTE_TEXT.lineSpace;
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    let prevHour = undefined;
    let updateTimer = undefined;

    const getY = (second, index) => {
      return (
        MINUTE_TEXT.y -
        (second / 60) * fullPathLength +
        (index - currentMinuteIndex) * fullPathLength
      );
    };

    const formatHour = (hour) => {
      const value = is12HourFormat ? hour % 12 || 12 : hour;
      return value.toString().padStart(2, '0');
    };

    const update = () => {
      const { hour, minute, second } = hmSensor.createSensor(hmSensor.id.TIME);

      if (prevHour !== hour) {
        prevHour = hour;
        hourWidget.setProperty(hmUI.prop.TEXT, formatHour(hour));
      }

      if (minute >= 58) {
        const nextHour = (hour + 1) % 24;
        const text = formatHour(nextHour);
        const y = getY(second, 60 - minute + 1);

        nextHourWidget.setProperty(hmUI.prop.MORE, {
          ...HOUR_TEXT_PROPS,
          text,
          y,
        });

        nextHourBgWidget.setProperty(hmUI.prop.MORE, {
          ...HOUR_BG_PROPS,
          y,
        });
      } else {
        nextHourWidget.setProperty(hmUI.prop.TEXT, '');
        nextHourBgWidget.setProperty(hmUI.prop.MORE, HOUR_BG_PROPS);
      }

      minuteWidgets.forEach((widget, index) => {
        const value = (minute + index - currentMinuteIndex + 60) % 60;
        const text = value.toString().padStart(2, '0');
        const y = getY(second, index);

        widget.setProperty(hmUI.prop.MORE, {
          ...TIME_TEXT_PROPS,
          y,
          text,
        });
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildRects() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, TOP_RECT_PROPS);
    hmUI.createWidget(hmUI.widget.FILL_RECT, BOTTOM_RECT_PROPS);
  },

  buildHeartRate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, HEART_TEXT_PROPS);

    const update = () => {
      const { last } = hmSensor.createSensor(hmSensor.id.HEART);
      const text = `${HEART_POSTFIX}\n${last || 0}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.STEP);
      const text = `${STEPS_POSTFIX}\n${formatNumber(current || 0)}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    const update = () => {
      const { month, day, week } = hmSensor.createSensor(hmSensor.id.TIME);
      const dayText = day.toString().padStart(2, '0');
      const weekText = WEEKDAYS[week - 1];
      const monthText = MONTHS[month - 1];
      const text = `${dayText} ${weekText}\n${monthText}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildBattery() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, BATTERY_TEXT_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);
      const text = `${BATTERY_POSTFIX}\n${current}%`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },
});
