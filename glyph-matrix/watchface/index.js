import { clamp } from '../utils/clamp';
import { getCurrentTimePosition } from '../utils/getCurrentTimePosition';
import {
  AOD_TIME_COLON_PROPS,
  AOD_TIME_HOUR_IMAGE_PROPS,
  AOD_TIME_MINUTE_IMAGE_PROPS,
  BACKGROUND_IMAGE_PROPS,
  BATTERY_TEXT_IMAGE_PROPS,
  BLUETOOTH_IMAGE_PROPS,
  DATE_DAY_PROPS,
  DATE_WEEK_PROPS,
  HEART_TEXT_IMAGE_PROPS,
  PROGRESS_BAR_IMAGES,
  PROGRESS_IMAGE_LEVEL_PROPS,
  SUN_POSITION_IMAGES,
  SUN_POSITION_LEVEL_PROPS,
  TIME_COLON_PROPS,
  TIME_HOUR_IMAGE_PROPS,
  TIME_MINUTE_IMAGE_PROPS,
  WEATHER_TEXT_IMAGE_PROPS,
} from './index.r.layout';
import { WidgetSettings } from './widgetSettings';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();

    this.buildWidgets();

    this.buildTime();
    this.buildTimeAod();
    
    this.buildBluetoothStatus();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildWidgets() {
    const { typeTop, typeBottom } = new WidgetSettings();

    if (typeBottom === 'steps') {
      this.buildSteps();
    } else if (typeBottom === 'date') {
      this.buildDate();
    } else if (typeBottom === 'weather') {
      this.buildWeather();
    } else if (typeBottom === 'battery') {
      this.buildBattery();
    } else if (typeBottom === 'heart') {
      this.buildHeart();
    }

    if (typeTop === 'sun') {
      this.buildSunPosition();
    }
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_COLON_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_HOUR_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_MINUTE_IMAGE_PROPS);
  },

  buildTimeAod() {
    hmUI.createWidget(hmUI.widget.IMG, AOD_TIME_COLON_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_TIME_HOUR_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_TIME_MINUTE_IMAGE_PROPS);
  },

  buildBluetoothStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, BLUETOOTH_IMAGE_PROPS);
  },

  buildSunPosition() {
    const levelWidget = hmUI.createWidget(
      hmUI.widget.IMG_LEVEL,
      SUN_POSITION_LEVEL_PROPS,
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const { isDay, ratio } = getCurrentTimePosition(
        timeSensor,
        weatherSensor,
      );

      if (!isDay) {
        levelWidget.setProperty(hmUI.prop.LEVEL, 1);
        return;
      }

      const level = clamp(
        2,
        Math.round(ratio * (SUN_POSITION_IMAGES.length - 2) + 2),
        SUN_POSITION_IMAGES.length,
      );

      levelWidget.setProperty(hmUI.prop.LEVEL, level);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildDate() {
    hmUI.createWidget(hmUI.widget.IMG_WEEK, DATE_WEEK_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_DAY_PROPS);
  },

  buildWeather() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, WEATHER_TEXT_IMAGE_PROPS);
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, BATTERY_TEXT_IMAGE_PROPS);
  },

  buildHeart() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, HEART_TEXT_IMAGE_PROPS);
  },

  buildSteps() {
    const levelWidget = hmUI.createWidget(
      hmUI.widget.IMG_LEVEL,
      PROGRESS_IMAGE_LEVEL_PROPS,
    );

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current = 0, target = 10000 } = stepSensor;
      const ratio = current / target;
      const level = clamp(
        1,
        Math.floor((PROGRESS_BAR_IMAGES.length - 1) * ratio + 1),
        12,
      );

      levelWidget.setProperty(hmUI.prop.LEVEL, level);
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
});
