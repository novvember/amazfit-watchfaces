import {
  BOTTOM_WIDGET_COORDS,
  COLORS,
  hasCustomFontSupport,
  STEPS_TEXT,
  WEEKDAYS,
} from '../utils/constants';
import { decline } from '../utils/decline';
import { formatNumber } from '../utils/formatNumber';
import { formatTime } from '../utils/formatTime';
import { isNight } from '../utils/isNight';
import { WEATHER_ICONS, updateWeatherIcons } from '../utils/weatherIcons';
import {
  BACKGROUND_CIRCLE_AOD_PROPS,
  BACKGROUND_CIRCLE_PROPS,
  BOTTOM_WIDGET_TEXT_PROPS,
  DISCONNECT_STATUS_PROPS,
  TIME_AOD_CENTER_PROPS,
  TIME_AOD_POINTER_PROPS,
  TIME_CENTER_PROPS,
  TIME_POINTER_PROPS,
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

    this.buildTimePointers();
    this.buildTimeText();

    this.buildDisconnectStatus();

    this.buildDate();
    this.buildSteps();
    this.buildWeather();
    this.buildBattery();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },

  buildTimePointers() {
    hmUI.createWidget(hmUI.widget.CIRCLE, BACKGROUND_CIRCLE_PROPS);

    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_AOD_POINTER_PROPS);

    hmUI.createWidget(hmUI.widget.CIRCLE, TIME_CENTER_PROPS);
    hmUI.createWidget(hmUI.widget.STROKE_RECT, TIME_AOD_CENTER_PROPS);

    hmUI.createWidget(hmUI.widget.STROKE_RECT, BACKGROUND_CIRCLE_AOD_PROPS);
  },

  buildTimeText() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    const textAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_TEXT_AOD_PROPS,
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    let prevTime = '';
    let updateTimer = undefined;

    const update = () => {
      const { hour, minute } = timeSensor;
      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const timeString = formatTime(
        hour,
        minute,
        is12HourFormat,
        true,
        true,
      ).toUpperCase();

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
        console.log('ui resume (buildTime)');

        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          if (hasCustomFontSupport) {
            timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          } else {
            updateTimer = timer.createTimer(2000, 2000, update);
          }

          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (buildTime)');

        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDate() {
    const { x, y } = BOTTOM_WIDGET_COORDS[0];

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...BOTTOM_WIDGET_TEXT_PROPS,
      x,
      y,
      color: COLORS.primary,
    });
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const weekDay = WEEKDAYS[week - 1];
      const text = `${weekDay} ${day}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (buildTime)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (buildTime)');

        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildSteps() {
    const { x, y } = BOTTOM_WIDGET_COORDS[1];

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...BOTTOM_WIDGET_TEXT_PROPS,
      x,
      y,
    });
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current } = stepSensor;
      const text = `${formatNumber(current, ' ')} ${decline(
        current,
        STEPS_TEXT,
      )}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildBattery() {
    const { x, y } = BOTTOM_WIDGET_COORDS[3];

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...BOTTOM_WIDGET_TEXT_PROPS,
      x,
      y,
    });
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;
      const text = `${current}%`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildWeather() {
    const { x, y } = BOTTOM_WIDGET_COORDS[2];

    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WEATHER_ICON_PROPS,
      x,
      y: y - px(4),
    });
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, WEATHER_TEMP_PROPS);

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const iconIndex = weatherSensor.curAirIconIndex;
      const temp = weatherSensor.current;
      updateWeatherIcons(isNight(timeSensor));

      const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;

      iconWidget.setProperty(
        hmUI.prop.SRC,
        hasIcon ? WEATHER_ICONS[iconIndex] : '',
      );

      textWidget.setProperty(hmUI.prop.TEXT, `${temp}°`);
      textWidget.setProperty(hmUI.prop.X, hasIcon ? x + px(44) : x);
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
