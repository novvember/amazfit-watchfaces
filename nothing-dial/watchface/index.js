import { DATE, STEPS } from '../utils/constants';
import { decline } from '../utils/decline';
import { formatTemperature } from '../utils/formatTemperature';
import { getTimeString } from '../utils/getTimeString';
import { isNight } from '../utils/isNight';
import { WEATHER_ICONS, updateWeatherIcons } from '../utils/weatherIcons';
import {
  BACKGROUND_CIRCLE_AOD_PROPS,
  BACKGROUND_CIRCLE_PROPS,
  BATTERY_TEXT_PROPS,
  DATE_TEXT_PROPS,
  DISCONNECT_STATUS_PROPS,
  HOUR_POINTER_AOD_PROPS,
  HOUR_POINTER_PROPS,
  MINUTE_CENTER_AOD_PROPS,
  MINUTE_CENTER_PROPS,
  MINUTE_POINTER_AOD_PROPS,
  MINUTE_POINTER_PROPS,
  SECOND_POINTER_PROPS,
  STEPS_TEXT_PROPS,
  TIME_TEXT_AOD_PROPS,
  TIME_TEXT_PROPS,
  WEATHER_ICON_PROPS,
  WEATHER_TEMP_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.setBackground();
    this.buildMinutes();
    this.buildSeconds();
    this.buildHours();
    this.buildTime();
    this.buildDate();
    this.buildSteps();
    this.buildWeather();
    this.buildBattery();
    this.buildDisconnectStatus();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  setBackground() {
    hmUI.createWidget(hmUI.widget.CIRCLE, BACKGROUND_CIRCLE_PROPS);
    hmUI.createWidget(hmUI.widget.STROKE_RECT, BACKGROUND_CIRCLE_AOD_PROPS);
  },

  buildMinutes() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_AOD_PROPS);

    hmUI.createWidget(hmUI.widget.CIRCLE, MINUTE_CENTER_PROPS);
    hmUI.createWidget(hmUI.widget.CIRCLE, MINUTE_CENTER_AOD_PROPS);
  },

  buildHours() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, HOUR_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, HOUR_POINTER_AOD_PROPS);
  },

  buildSeconds() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, SECOND_POINTER_PROPS);
  },

  buildTime() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    const textAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_TEXT_AOD_PROPS,
    );

    let prevTime = '';
    let updateTimer = undefined;

    const update = () => {
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const timeString = getTimeString(timeSensor);

      if (prevTime === timeString) {
        return;
      }

      console.log('time rerendered');
      prevTime = timeString;

      textWidget.setProperty(hmUI.prop.TEXT, timeString);
      textAodWidget.setProperty(hmUI.prop.TEXT, timeString);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          updateTimer = timer.createTimer(2000, 2000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    let updateTimer = undefined;

    const update = () => {
      const { day, week } = hmSensor.createSensor(hmSensor.id.TIME);
      const weekDay = DATE.weekDays[week - 1];
      textWidget.setProperty(hmUI.prop.TEXT, `${weekDay} ${day}`);
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

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);
    let updateTimer = undefined;

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.STEP);

      textWidget.setProperty(
        hmUI.prop.TEXT,
        `${current} ${decline(current, STEPS.stepsString)}`,
      );
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

  buildBattery() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, BATTERY_TEXT_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);
      textWidget.setProperty(hmUI.prop.TEXT, `${current}%`);
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

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },

  buildWeather() {
    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, null);
    const tempWidget = hmUI.createWidget(hmUI.widget.TEXT, WEATHER_TEMP_PROPS);

    const update = () => {
      const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const iconIndex = weatherSensor.curAirIconIndex;
      const temp = weatherSensor.current;

      updateWeatherIcons(isNight(timeSensor));

      const icon =
        iconIndex && iconIndex !== 'undefined'
          ? WEATHER_ICONS[iconIndex]
          : WEATHER_ICONS[25];

      iconWidget.setProperty(hmUI.prop.MORE, {
        ...WEATHER_ICON_PROPS,
        src: icon,
      });

      tempWidget.setProperty(hmUI.prop.TEXT, formatTemperature(temp));
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
