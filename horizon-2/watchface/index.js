import { decline } from '../utils/decline';
import { formatNumber } from '../utils/formatNumber';
import {
  INNER_TEXT_PROPS,
  SCALE_IMAGE_PROPS,
  SLEEP_ARC_PROPS,
  SUN_ARC_PROPS,
  SUN_BACKGROUND_IMAGE_PROPS,
  TIME_POINTER_IMAGE_PROPS,
  TIME_TEXT_PROPS,
} from './index.r.layout';
import { gettext } from 'i18n';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildSunTime();
    this.buildSleepTime();

    this.buildTime();

    this.buildDate();
    this.buildSteps();
    this.buildBattery();
    this.buildWeather();
    this.buildHeartRate();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  /**
   * Transforms hour-minute format to angle on 24 hour circle
   * @param {Number} hour
   * @param {Number} minute
   * @returns {Number} time angle
   */
  calculateTimeAngle(hour, minute) {
    return ((360 * (hour * 60 + minute)) / (24 * 60) - 180) % 360;
  },

  /**
   * Normalizes 2 different time angles, so they can be used in arc widget as start/end angles
   * @param {Number} angleStart
   * @param {Number} angleEnd
   * @returns {[Number, Number]}
   */
  separateTimeAngles(angleStart, angleEnd) {
    if (angleStart > angleEnd) {
      return [angleStart, angleEnd + 360];
    }

    return [angleStart, angleEnd];
  },

  /**
   * Calculates start and end time angles for time period based on HH:MM format
   * @param {Number} hour-start
   * @param {Number} minute-start
   * @param {Number} hour-end
   * @param {Number} minute-end
   * @returns {[Number, Number]} [time angle of start, time angle of end]
   */
  calculateTimeAngles(hour0, minute0, hour1, minute1) {
    const angleStart = this.calculateTimeAngle(hour0, minute0);
    const angleEnd = this.calculateTimeAngle(hour1, minute1);

    return this.separateTimeAngles(angleStart, angleEnd);
  },

  buildSunTime() {
    hmUI.createWidget(hmUI.widget.IMG, SUN_BACKGROUND_IMAGE_PROPS);

    const sunArcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      SUN_ARC_PROPS,
    );

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const weatherData = weatherSensor.getForecastWeather();
      const { sunrise, sunset } = weatherData?.tideData?.data?.[0] || {};

      const [angleStart, angleEnd] = this.calculateTimeAngles(
        sunset?.hour || 21,
        sunset?.minute || 0,
        sunrise?.hour || 9,
        sunrise?.minute || 0,
      );

      sunArcWidget.setProperty(hmUI.prop.MORE, {
        ...SUN_ARC_PROPS,
        start_angle: angleStart,
        end_angle: angleEnd,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSleepTime() {
    const sleepArcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      SLEEP_ARC_PROPS,
    );

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const totalTime = sleepSensor.getTotalTime();
      const { startTime, endTime } = sleepSensor.getBasicInfo() || {};

      if ((!startTime && !endTime) || !totalTime) {
        sleepArcWidget.setProperty(hmUI.prop.MORE, SLEEP_ARC_PROPS);
        return;
      }

      const [angleStart, angleEnd] = this.calculateTimeAngles(
        Math.floor(startTime / 60),
        startTime % 60,
        Math.floor(endTime / 60),
        endTime % 60,
      );

      sleepArcWidget.setProperty(hmUI.prop.MORE, {
        ...SLEEP_ARC_PROPS,
        start_angle: angleStart,
        end_angle: angleEnd,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG, SCALE_IMAGE_PROPS);

    const pointerWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      TIME_POINTER_IMAGE_PROPS,
    );

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { hour, minute } = timeSensor;
      const angle = this.calculateTimeAngle(hour, minute);
      const minuteText = minute.toString().padStart(2, '0');

      pointerWidget.setProperty(hmUI.prop.ANGLE, angle);

      textWidget.setProperty(hmUI.prop.MORE, {
        ...TIME_TEXT_PROPS,
        start_angle: angle - 15,
        end_angle: angle + 15,
        text: minuteText,
      });
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

  buildDate() {
    const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, INNER_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const dateText = `${gettext(WEEKDAYS[week - 1])} ${day}`.toUpperCase();

      textWidget.setProperty(hmUI.prop.MORE, {
        ...INNER_TEXT_PROPS,
        text: dateText,
        start_angle: -90,
        end_angle: 0,
      });
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

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...INNER_TEXT_PROPS,
      start_angle: 0,
      end_angle: 90,
    });

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const stepTexts = gettext('steps').split('/');

    const update = () => {
      const { current } = stepSensor;
      const text = `${formatNumber(current, ' ')} ${decline(
        current,
        stepTexts,
      )}`.toUpperCase();

      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildBattery() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...INNER_TEXT_PROPS,
      start_angle: -135,
      end_angle: -90,
    });

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;
      const text = `${current}%`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
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
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...INNER_TEXT_PROPS,
      start_angle: 135,
      end_angle: 225,
    });

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const { last } = heartSensor;
      const text = gettext('heart_rate').replace('%s', last);
      textWidget.setProperty(hmUI.prop.TEXT, text);
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

  buildWeather() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...INNER_TEXT_PROPS,
      start_angle: 90,
      end_angle: 135,
    });

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const temp = weatherSensor.current;
      const text = `${temp}°`;

      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },
});
