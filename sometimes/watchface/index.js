import {
  HOUR_COORD,
  MINUTE_COORD,
  MINUTE_SMALL_DOT_GAP,
} from '../utils/constants';
import { formatNumber } from '../utils/formatNumber';
import { getTimeString } from '../utils/getTimeString';
import { HourDotWidget } from '../utils/hourDotWidget';
import { MinuteDotWidget } from '../utils/minuteDotWidget';
import {
  DATE_TEXT_PROPS,
  HEART_TEXT_PROPS,
  HOUR_DOT_PROPS,
  MINUTE_BIG_DOT_PROPS,
  MINUTE_SMALL_DOT_PROPS,
  STEPS_TEXT_PROPS,
  TIME_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface init');
  },

  build() {
    console.log('watchface build');

    this.buildTime();
    this.buildData();
  },

  onDestroy() {
    console.log('watchface destroy');
  },

  buildTime() {
    const hourDotWidgets = new Array(12).fill(null).map(
      (_, i) =>
        new HourDotWidget({
          ...HOUR_DOT_PROPS,
          center_x: HOUR_COORD[i][0],
          center_y: HOUR_COORD[i][1],
        }),
    );

    const minuteDotWidgets = new Array(12).fill(null).map(
      (_, i) =>
        new MinuteDotWidget(
          {
            ...MINUTE_BIG_DOT_PROPS,
            center_x: MINUTE_COORD[i][0],
            center_y: MINUTE_COORD[i][1],
          },
          MINUTE_SMALL_DOT_PROPS,
          MINUTE_SMALL_DOT_GAP,
        ),
    );

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);

    const is12HourFormat = hmSetting.getTimeFormat() === 0;
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    let updateTimer = undefined;

    const updateHour = () => {
      const { hour } = timeSensor;
      const hourValue = hour % 12 || 12;

      hourDotWidgets.forEach((dotWidget, i) =>
        dotWidget.setState(i + 1 <= hourValue),
      );
    };

    const updateMinute = () => {
      const { minute } = timeSensor;
      const value = Math.floor(minute / 5);
      const rest = minute % 5;

      minuteDotWidgets.forEach((dotWidget, i) => {
        let state = 0;

        if (i < value) state = 5;
        else if (i === value) state = rest;

        dotWidget.setValue(state);
      });
    };

    const updateText = () => {
      const { hour, minute } = timeSensor;
      const text = getTimeString(hour, minute, is12HourFormat);
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    const update = () => {
      updateHour();
      updateMinute();
      updateText();
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildData() {
    const dateText = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    const heartText = hmUI.createWidget(hmUI.widget.TEXT, HEART_TEXT_PROPS);
    const stepsText = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    let updateTimer = undefined;

    const getDateText = () => {
      const { day, month } = timeSensor;
      return `${day}.${month}`;
    };

    const getHeartText = () => {
      const { last } = heartSensor;
      return `:${last}`;
    };

    const getStepsText = () => {
      const { current } = stepSensor;
      return `${formatNumber(current, '.')}.`;
    };

    const update = () => {
      dateText.setProperty(hmUI.prop.TEXT, getDateText(timeSensor));
      heartText.setProperty(hmUI.prop.TEXT, getHeartText(heartSensor));
      stepsText.setProperty(hmUI.prop.TEXT, getStepsText(stepSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },
});
