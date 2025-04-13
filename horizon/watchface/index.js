import { HEART_TEXT, MONTHS, STEPS_TEXT, WEEKDAYS } from '../utils/constants';
import { formatNumber } from '../utils/formatNumber';
import { decline } from '../utils/decline';
import {
  BACKGROUND_IMAGE_PROPS,
  HOUR_TEXT_PROPS,
  INNER_IMAGE_PROPS,
  INNER_TEXT_PROPS,
  MINUTE_TEXT_PROPS,
  OUTER_IMAGE_PROPS,
  OUTER_TEXT_PROPS,
  SLEEP_ARC_PROPS,
  SUN_ARC_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.handleTimeChange();

    this.buildBackground();

    this.buildSun();
    this.buildSleepTime();
    this.buildTimeDisks();
    this.buildDate();

    this.buildBattery();
    this.buildSteps();

    this.buildWeather();
    this.buildHeartRate();

    this.buildTimeDigits();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  calculateTimeAngle(hour, minute) {
    return ((360 * (hour * 60 + minute)) / (24 * 60)) % 360;
  },

  calculateRelativeTimeAngle(hour, minute, timeAngle) {
    const midnightAngle = 180 + timeAngle;
    return (midnightAngle - this.calculateTimeAngle(hour, minute)) % 360;
  },

  separateTimeAngles(angleStart, angleEnd) {
    if (angleEnd > angleStart) {
      return [angleStart + 360, angleEnd];
    }

    return [angleStart, angleEnd];
  },

  calculateRelativeTimeAngles(hour0, minute0, hour1, minute1, timeAngle) {
    const angleStart = this.calculateRelativeTimeAngle(
      hour0,
      minute0,
      timeAngle,
    );
    const angleEnd = this.calculateRelativeTimeAngle(hour1, minute1, timeAngle);

    return this.separateTimeAngles(angleStart, angleEnd);
  },

  handleTimeChange() {
    this.timeHandlers = [];

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { hour, minute } = timeSensor;
      const timeAngle = this.calculateTimeAngle(hour, minute);
      this.timeHandlers.forEach((handler) => handler(timeAngle, timeSensor));
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

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildSun() {
    const sunArcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      SUN_ARC_PROPS,
    );

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = (timeAngle, _timeSensor) => {
      const weatherData = weatherSensor.getForecastWeather();
      const { sunrise, sunset } = weatherData?.tideData?.data?.[0] || {};

      const [angleStart, angleEnd] = this.calculateRelativeTimeAngles(
        sunset?.hour || 21,
        sunset?.minute || 0,
        sunrise?.hour || 9,
        sunrise?.minute || 0,
        timeAngle,
      );

      sunArcWidget.setProperty(hmUI.prop.MORE, {
        ...SUN_ARC_PROPS,
        start_angle: angleStart,
        end_angle: angleEnd,
      });
    };

    this.timeHandlers.push(update);
  },

  buildSleepTime() {
    const sleepArcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      SLEEP_ARC_PROPS,
    );

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = (timeAngle, _timeSensor) => {
      sleepSensor.updateInfo();
      const totalTime = sleepSensor.getTotalTime();
      const { startTime, endTime } = sleepSensor.getBasicInfo() || {};

      if ((!startTime && !endTime) || !totalTime) {
        sleepArcWidget.setProperty(hmUI.prop.MORE, SLEEP_ARC_PROPS);
        return;
      }

      const [angleStart, angleEnd] = this.calculateRelativeTimeAngles(
        Math.floor(startTime / 60),
        startTime % 60,
        Math.floor(endTime / 60),
        endTime % 60,
        timeAngle,
      );

      sleepArcWidget.setProperty(hmUI.prop.MORE, {
        ...SLEEP_ARC_PROPS,
        start_angle: angleStart,
        end_angle: angleEnd,
      });
    };

    this.timeHandlers.push(update);
  },

  buildTimeDisks() {
    const innerWidget = hmUI.createWidget(hmUI.widget.IMG, INNER_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, OUTER_IMAGE_PROPS);

    const update = (timeAngle, _timeSensor) => {
      innerWidget.setProperty(hmUI.prop.MORE, {
        ...INNER_IMAGE_PROPS,
        angle: timeAngle,
      });
    };

    this.timeHandlers.push(update);
  },

  buildDate() {
    const dateTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      INNER_TEXT_PROPS,
    );
    const monthTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      INNER_TEXT_PROPS,
    );

    const update = (timeAngle, timeSensor) => {
      const { day, week, month } = timeSensor;
      const dateText = `${WEEKDAYS[week - 1]} ${day}`;
      const monthText = MONTHS[month - 1];

      dateTextWidget.setProperty(hmUI.prop.MORE, {
        ...INNER_TEXT_PROPS,
        text: dateText,
        start_angle: timeAngle - 45 + 180,
        end_angle: timeAngle + 45 + 180,
      });

      monthTextWidget.setProperty(hmUI.prop.MORE, {
        ...INNER_TEXT_PROPS,
        text: monthText,
        start_angle: timeAngle - 45,
        end_angle: timeAngle + 45,
      });
    };

    this.timeHandlers.push(update);
  },

  buildBattery() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...OUTER_TEXT_PROPS,
      start_angle: -70,
      end_angle: -45,
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
      ...OUTER_TEXT_PROPS,
      start_angle: 90,
      end_angle: 135,
    });

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const { last } = heartSensor;
      const text = HEART_TEXT.replace('%s', last);
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
      ...OUTER_TEXT_PROPS,
      start_angle: 45,
      end_angle: 90,
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

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...OUTER_TEXT_PROPS,
      start_angle: -135,
      end_angle: -70,
    });

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current } = stepSensor;
      const text = `${formatNumber(current, ',')} ${decline(
        current,
        STEPS_TEXT,
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

  buildTimeDigits() {
    const hourText = hmUI.createWidget(hmUI.widget.TEXT, HOUR_TEXT_PROPS);
    const minuteText = hmUI.createWidget(hmUI.widget.TEXT, MINUTE_TEXT_PROPS);

    const update = (_timeAngle, timeSensor) => {
      const { hour, minute } = timeSensor;

      hourText.setProperty(hmUI.prop.TEXT, hour.toString());
      minuteText.setProperty(
        hmUI.prop.TEXT,
        minute.toString().padStart(2, '0'),
      );
    };

    this.timeHandlers.push(update);
  },
});
