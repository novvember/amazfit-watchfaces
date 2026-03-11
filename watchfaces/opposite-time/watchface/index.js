import { DIGITS, KM_TEXT, M_TEXT, WEEKDAYS } from '../utils/constants';
import { getTimeDigits } from '../utils/getTimeDigits';
import {
  ACTIVITY_TEXT_PROPS,
  BATTERY_TEXT_PROPS,
  CAL_TEXT_PROPS,
  DATE_TEXT_PROPS,
  DISTANCE_TEXT_PROPS,
  HEART_TEXT_PROPS,
  STEPS_TEXT_PROPS,
  TIME_HOUR_0_TEXT_PROPS,
  TIME_HOUR_1_TEXT_PROPS,
  TIME_MINUTE_0_TEXT_PROPS,
  TIME_MINUTE_1_TEXT_PROPS,
  TIME_SECOND_0_TEXT_PROPS,
  TIME_SECOND_1_TEXT_PROPS,
  WEEKDAY_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildData();
    this.buildTime();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    const PROPS = [
      TIME_HOUR_0_TEXT_PROPS,
      TIME_HOUR_1_TEXT_PROPS,
      TIME_MINUTE_0_TEXT_PROPS,
      TIME_MINUTE_1_TEXT_PROPS,
      TIME_SECOND_0_TEXT_PROPS,
      TIME_SECOND_1_TEXT_PROPS,
    ];

    const digitWidgets = new Array(6)
      .fill(null)
      .map((_, i) => hmUI.createWidget(hmUI.widget.TEXT, PROPS[i]));

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    let updateTimer = undefined;

    const update = () => {
      const texts = getTimeDigits(timeSensor).map((digit) => DIGITS[digit]);

      digitWidgets.forEach((widget, i) => {
        if (widget.getProperty(hmUI.prop.TEXT) !== texts[i]) {
          widget.setProperty(hmUI.prop.TEXT, texts[i]);
        }
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timer.stopTimer(updateTimer);
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

  buildData() {
    const heartRateWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      HEART_TEXT_PROPS,
    );
    const dateWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    const weekdayWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEEKDAY_TEXT_PROPS,
    );
    const calorieWidget = hmUI.createWidget(hmUI.widget.TEXT, CAL_TEXT_PROPS);
    const fatburnWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      ACTIVITY_TEXT_PROPS,
    );
    const stepWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);
    const distanceWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      DISTANCE_TEXT_PROPS,
    );
    const batteryWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      BATTERY_TEXT_PROPS,
    );

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const calorieSensor = hmSensor.createSensor(hmSensor.id.CALORIE);
    const fatburnSensor = hmSensor.createSensor(hmSensor.id.FAT_BURRING);
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);
    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    let updateTimer = undefined;

    const getHeartRateText = (heartSensor) => {
      const { last } = heartSensor;
      return `:${last}`;
    };

    const getDateText = (timeSensor) => {
      const { day, month } = timeSensor;
      return `${day}.${month}`;
    };

    const getWeekdayText = (timeSensor) => {
      const { week } = timeSensor;
      return WEEKDAYS[week - 1];
    };

    const getCalorieText = (calorieSensor) => {
      const { current = 0 } = calorieSensor;

      if (current >= 1000) {
        return `${(current / 1000).toFixed(1)}K*`;
      }
      return `${current}*`;
    };

    const getFatburnText = (fatburnSensor) => {
      const { current } = fatburnSensor;
      return `${current}'`;
    };

    const getStepText = (stepSensor) => {
      let { current } = stepSensor;

      if (current >= 1000) {
        return `${(current / 1000).toFixed(1)}K.`;
      }

      return `${current}.`;
    };

    const getDistanceText = (distanceSensor) => {
      const { current } = distanceSensor;

      if (current >= 1000) {
        return `${(current / 1000).toFixed(1)}${KM_TEXT}`;
      }

      return `${current}${M_TEXT}`;
    };

    const getBatteryText = (batterySensor) => {
      const { current } = batterySensor;
      return `${current}%`;
    };

    const update = () => {
      heartRateWidget.setProperty(
        hmUI.prop.TEXT,
        getHeartRateText(heartSensor),
      );
      dateWidget.setProperty(hmUI.prop.TEXT, getDateText(timeSensor));
      weekdayWidget.setProperty(hmUI.prop.TEXT, getWeekdayText(timeSensor));
      calorieWidget.setProperty(hmUI.prop.TEXT, getCalorieText(calorieSensor));
      fatburnWidget.setProperty(hmUI.prop.TEXT, getFatburnText(fatburnSensor));
      stepWidget.setProperty(hmUI.prop.TEXT, getStepText(stepSensor));
      distanceWidget.setProperty(
        hmUI.prop.TEXT,
        getDistanceText(distanceSensor),
      );
      batteryWidget.setProperty(hmUI.prop.TEXT, getBatteryText(batterySensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timer.stopTimer(updateTimer);
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
});
