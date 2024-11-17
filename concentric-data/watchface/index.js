import {
  MINUTE,
  SCREEN,
  SECOND,
  MIN_ANGLE_TO_UPDATE_WHEEL,
  WEEKDAYS,
  DATA,
} from '../utils/constants';
import { createCircleTextWidget } from '../utils/createCircleTextWidget';
import {
  getAngleFromMinutes,
  getAngleFromSeconds,
} from '../utils/getAngleFromTime';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';
import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import { getSleepTimeString } from '../utils/getSleepTime';
import { getTimeString } from '../utils/getTimeString';
import {
  BATTERY_BACKGROUND_ARC_PROPS,
  BATTERY_CIRCLE_TEXT_PROPS,
  BATTERY_CURRENT_ARC_PROPS,
  CURRENT_HOUR_TEXT_PROPS,
  CURRENT_MINUTE_TEXT_PROPS,
  DATE_DAY_CIRCLE_TEXT_PROPS,
  DATE_WEEK_CIRCLE_TEXT_PROPS,
  FRAME_IMAGE_PROPS,
  HEART_BACKGROUND_ARC_PROPS,
  HEART_CIRCLE_TEXT_PROPS,
  HEART_CURRENT_ARC_PROPS,
  HEART_DOT_PROPS,
  MINUTE_IMAGE_PROPS,
  MINUTE_TEXT_PROPS,
  SECOND_IMAGE_PROPS,
  SECOND_TEXT_PROPS,
  SLEEP_CIRCLE_TEXT_PROPS,
  STEPS_BACKGROUND_ARC_PROPS,
  STEPS_CIRCLE_TEXT_PROPS,
  STEPS_CURRENT_ARC_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildTime();
    this.buildDateDay();
    this.buildDateWeek();
    this.buildBattery();
    this.buildHeartRate();
    this.buildSteps();
    this.buildSleepTime();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    const secondImage = hmUI.createWidget(hmUI.widget.IMG, SECOND_IMAGE_PROPS);
    const secondTexts = new Array(12)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.TEXT, null));

    const minuteImage = hmUI.createWidget(hmUI.widget.IMG, MINUTE_IMAGE_PROPS);
    const minuteTexts = new Array(12)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.TEXT, null));

    hmUI.createWidget(hmUI.widget.IMG, FRAME_IMAGE_PROPS);
    const currentHourText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_HOUR_TEXT_PROPS,
    );
    const currentMinuteText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_MINUTE_TEXT_PROPS,
    );

    let updateTimer = undefined;
    let prevMinuteAngle = Infinity;
    let prevSecondValue = Infinity;

    const updateWheel = (
      angle,
      imageWidget,
      textWidgets,
      textWidgetProps,
      textWidgetRadius,
    ) => {
      imageWidget.setProperty(hmUI.prop.ANGLE, angle);

      textWidgets.forEach((textWidget, i) => {
        const text = [
          '00',
          '05',
          '10',
          '15',
          '20',
          '25',
          '30',
          '35',
          '40',
          '45',
          '50',
          '55',
        ][i];
        const textAngle = (angle - (i * 360) / 12) % 360;
        const { x, y } = getCoordsFromAngle(textAngle);
        const centerX = textWidgetRadius * x + SCREEN.centerX;
        const centerY = textWidgetRadius * y + SCREEN.centerY;
        const textX = centerX - textWidgetProps.w / 2;
        const textY = centerY - textWidgetProps.h / 2;

        textWidget.setProperty(hmUI.prop.MORE, {
          ...textWidgetProps,
          text,
          x: textX,
          y: textY,
        });
      });
    };

    const updateSecond = (timeSensor) => {
      const { second } = timeSensor;

      const secondValue = second === prevSecondValue ? second + 0.5 : second;
      prevSecondValue = second;

      const angle = (90 + getAngleFromSeconds(secondValue)) % 360;
      updateWheel(
        angle,
        secondImage,
        secondTexts,
        SECOND_TEXT_PROPS,
        SECOND.text.radius,
      );
    };

    const updateMinute = (timeSensor) => {
      const { minute, second } = timeSensor;
      const angle = (90 + getAngleFromMinutes(minute, second)) % 360;
      const shouldUpdate =
        Math.abs(angle - prevMinuteAngle) >= MIN_ANGLE_TO_UPDATE_WHEEL &&
        Math.abs(360 - angle + prevMinuteAngle) >= MIN_ANGLE_TO_UPDATE_WHEEL;

      if (!shouldUpdate) {
        return;
      }

      prevMinuteAngle = angle;
      updateWheel(
        angle,
        minuteImage,
        minuteTexts,
        MINUTE_TEXT_PROPS,
        MINUTE.text.radius,
      );
    };

    const updateCurrentTime = (timeSensor) => {
      const { hour, minute } = timeSensor;

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
      const hourText = hourValue.toString();

      const minuteText = minute.toString().padStart(2, '0');

      currentHourText.setProperty(hmUI.prop.TEXT, hourText);
      currentMinuteText.setProperty(hmUI.prop.TEXT, minuteText);
    };

    const update = () => {
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

      updateSecond(timeSensor);
      updateMinute(timeSensor);
      updateCurrentTime(timeSensor);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(500, 500, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDateDay() {
    const { updateText } = createCircleTextWidget(DATE_DAY_CIRCLE_TEXT_PROPS);

    const update = () => {
      const { day } = hmSensor.createSensor(hmSensor.id.TIME);
      const text = day.toString().padStart(2, ' ');
      updateText(text);
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

  buildDateWeek() {
    const { updateText } = createCircleTextWidget(DATE_WEEK_CIRCLE_TEXT_PROPS);

    const update = () => {
      const { week } = hmSensor.createSensor(hmSensor.id.TIME);
      const text = WEEKDAYS[week - 1];
      updateText(text);
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
    const { updateText } = createCircleTextWidget(BATTERY_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_BACKGROUND_ARC_PROPS);
    const arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      BATTERY_CURRENT_ARC_PROPS,
    );

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);

      updateText(`${current}%`);
      arc.setProperty(hmUI.prop.LEVEL, current);
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

  buildHeartRate() {
    const { updateText } = createCircleTextWidget(HEART_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, HEART_BACKGROUND_ARC_PROPS);
    const currentArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      HEART_CURRENT_ARC_PROPS,
    );
    const dotImage = hmUI.createWidget(hmUI.widget.IMG, HEART_DOT_PROPS);

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

    const getDotCoords = (angle) => {
      const { x, y } = getCoordsFromAngle(angle);
      const centerX = DATA.radius * x + SCREEN.centerX;
      const centerY = DATA.radius * y + SCREEN.centerY;
      const imageX = centerX - HEART_DOT_PROPS.w / 2;
      const imageY = centerY - HEART_DOT_PROPS.h / 2;
      return [imageX, imageY];
    };

    const update = () => {
      const { last, today = [] } = hmSensor.createSensor(hmSensor.id.HEART);

      const dotAngle = getAnglePosition(last);
      const [x, y] = getDotCoords(dotAngle);

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
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
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

    const update = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const level = Math.min(Math.round((100 * current) / target), 100);

      updateText(`${current}▲`);
      arc.setProperty(hmUI.prop.LEVEL, level);
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

  buildSleepTime() {
    const { updateText } = createCircleTextWidget(SLEEP_CIRCLE_TEXT_PROPS);

    const showSleepTime = (sleepTimeString) => {
      updateText(`${sleepTimeString}✱`);
    };

    const showSunriseSunset = () => {
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
      const sunObj = getClosestSunriseSunsetTime(timeSensor, weatherSensor);

      if (!sunObj) {
        update('');
      }

      const { type, hour, minute } = sunObj;
      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const sunTime = getTimeString(hour, minute, is12HourFormat);
      const icon = type === 'sunrise' ? '☀' : '☼';
      updateText(`${sunTime}${icon}`);
    };

    const update = () => {
      const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
      const sleepTimeString = getSleepTimeString(sleepSensor);

      if (sleepTimeString) {
        showSleepTime(sleepTimeString);
      } else {
        showSunriseSunset();
      }
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
