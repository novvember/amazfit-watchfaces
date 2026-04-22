import { getCoordsFromAngle } from '../../../utils/getCoordsFromAngle';
import { WEEKDAYS, DATA } from '../utils/constants';
import { createCircleTextWidget } from '../utils/createCircleTextWidget';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';
import { getSleepTimeString } from '../utils/getSleepTime';
import { getTimeString } from '../utils/getTimeString';
import {
  BATTERY_BACKGROUND_ARC_PROPS,
  BATTERY_CIRCLE_TEXT_PROPS,
  BATTERY_CURRENT_ARC_PROPS,
  DATE_DAY_TEXT_PROPS,
  DATE_WEEK_TEXT_PROPS,
  DISCONNECT_ICON_PROPS,
  HEART_BACKGROUND_ARC_PROPS,
  HEART_CIRCLE_TEXT_PROPS,
  HEART_CURRENT_ARC_PROPS,
  HEART_DOT_PROPS,
  SLEEP_CIRCLE_TEXT_PROPS,
  STEPS_BACKGROUND_ARC_PROPS,
  STEPS_CIRCLE_TEXT_PROPS,
  STEPS_CURRENT_ARC_PROPS,
} from './index.r.layout';
import { TimeWidget } from './TimeWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    this.buildTime();
    this.buildDate();
    this.buildBattery();
    this.buildHeartRate();
    this.buildSteps();
    this.buildSleepTime();
    this.buildDisconnectStatus();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    new TimeWidget({
      timeSensor: this._timeSensor,
    });
  },

  buildDate() {
    const dateText = hmUI.createWidget(hmUI.widget.TEXT, DATE_DAY_TEXT_PROPS);
    const weekText = hmUI.createWidget(hmUI.widget.TEXT, DATE_WEEK_TEXT_PROPS);

    const timeSensor = this._timeSensor;

    const update = () => {
      const { day = 0, week = 1 } = timeSensor;
      dateText.setProperty(hmUI.prop.TEXT, day.toString());
      weekText.setProperty(hmUI.prop.TEXT, WEEKDAYS[week - 1]);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildBattery() {
    const { updateText } = createCircleTextWidget(BATTERY_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_BACKGROUND_ARC_PROPS);
    const arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      BATTERY_CURRENT_ARC_PROPS,
    );

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current = 0 } = batterySensor;
      updateText(`${current}%`);
      arc.setProperty(hmUI.prop.LEVEL, current);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
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

  buildHeartRate() {
    const { updateText } = createCircleTextWidget(HEART_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, HEART_BACKGROUND_ARC_PROPS);
    const currentArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      HEART_CURRENT_ARC_PROPS,
    );
    const dotImage = hmUI.createWidget(hmUI.widget.IMG, HEART_DOT_PROPS);

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const getAnglePosition = (heartRate) => {
      const MIN_VALUE = 40;
      const MAX_VALUE = 140;

      let level = (heartRate - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);
      level = Math.min(level, 1);
      level = Math.max(level, 0);

      const { start_angle, end_angle } = HEART_BACKGROUND_ARC_PROPS;
      const angle = level * (end_angle - start_angle) + start_angle;

      return angle;
    };

    const update = () => {
      const { last = 0, today = [] } = heartSensor;

      const dotAngle = getAnglePosition(last);
      const { x, y } = getCoordsFromAngle({
        degrees: dotAngle,
        radius: DATA.radius,
        widgetHeight: HEART_DOT_PROPS.h,
        widgetWidth: HEART_DOT_PROPS.w,
        rotationCenterX: px(240),
        rotationCenterY: px(240),
      });

      const minValue = Math.min(...today);
      const maxValue = Math.max(...today);
      const minAngle = getAnglePosition(minValue);
      const maxAngle = getAnglePosition(maxValue);

      updateText(`${last}❤`);
      currentArc.setProperty(hmUI.prop.MORE, {
        ...HEART_CURRENT_ARC_PROPS,
        start_angle: minAngle,
        end_angle: maxAngle,
      });
      dotImage.setProperty(hmUI.prop.MORE, {
        ...HEART_DOT_PROPS,
        x,
        y,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  },

  buildSteps() {
    const { updateText } = createCircleTextWidget(STEPS_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, STEPS_BACKGROUND_ARC_PROPS);
    const arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      STEPS_CURRENT_ARC_PROPS,
    );

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current = 0, target = 10000 } = stepSensor;
      const level = Math.min(Math.round((100 * current) / target), 100);

      updateText(`${current}▲`);
      arc.setProperty(hmUI.prop.LEVEL, level);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
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

  buildSleepTime() {
    const { updateText } = createCircleTextWidget(SLEEP_CIRCLE_TEXT_PROPS);

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
    const timeSensor = this._timeSensor;
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const showSleepTime = (sleepTimeString) => {
      updateText(`${sleepTimeString}✱`);
    };

    const showSunriseSunset = () => {
      const sunObj = getClosestSunriseSunsetTime(timeSensor, weatherSensor);

      if (!sunObj) {
        updateText('');
      }

      const { type, hour, minute } = sunObj;
      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const sunTime = getTimeString(hour, minute, is12HourFormat);
      const icon = type === 'sunrise' ? '☀' : '☼';
      updateText(`${sunTime}${icon}`);
    };

    const update = () => {
      sleepSensor.updateInfo?.();
      const sleepTimeString = getSleepTimeString(sleepSensor);

      if (sleepTimeString) {
        showSleepTime(sleepTimeString);
      } else {
        showSunriseSunset();
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_ICON_PROPS);
  },
});
