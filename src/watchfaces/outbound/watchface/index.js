import { gettext } from 'i18n';

import {
  CENTER_TEXT_PROPS,
  LEFT_TEXT_PROPS,
  RIGHT_TEXT_PROPS,
  SECOND_FAKE_AOD_PROPS,
  TIME_AOD_IMG_PROPS,
  TIME_IMG_PROPS,
} from './index.layout';
import { formatNumber } from '../utils/formatNumber';

const WEEK_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();

    this.buildDate();
    this.buildSteps();
    this.buildHeart();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_IMG_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AOD_IMG_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_IMG, SECOND_FAKE_AOD_PROPS);
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, LEFT_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { week, day } = timeSensor;

      const weekText = gettext(WEEK_KEYS[week - 1]).toUpperCase();
      const text = `${weekText} ${day}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
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
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, CENTER_TEXT_PROPS);

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current = 0 } = stepSensor;
      const formattedValue = formatNumber(current, '.');
      const text = `${formattedValue}.`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
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

  buildHeart() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, RIGHT_TEXT_PROPS);

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const { last } = heartSensor;

      if (last) {
        const text = `:${last}`;
        textWidget.setProperty(hmUI.prop.TEXT, text);
      } else {
        textWidget.setProperty(hmUI.prop.TEXT, '');
      }
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
});
