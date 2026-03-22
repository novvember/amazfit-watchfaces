import { getWeekDay } from '../../../adapters/getWeekDay';
import { getDay } from '../../../adapters/getDay';
import { gettext } from 'i18n';
import {
  OVERLAY_CIRCLE_AOD_PROPS,
  DATE_TEXT_PROPS,
  IMAGE_TIME_PROPS,
  STEPS_PROGRESS_IMAGE_PROPS,
  STEPS_VALUE_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();
    this.buildDate();
    this.buildSteps();

    hmUI.createWidget(hmUI.widget.CIRCLE, OVERLAY_CIRCLE_AOD_PROPS);
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG_TIME, IMAGE_TIME_PROPS);
  },

  buildDate() {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    const update = () => {
      const weekDayKey = getWeekDay(timeSensor);
      const day = getDay(timeSensor);
      const weekDay = gettext(weekDayKey).toUpperCase();

      textWidget.setProperty(hmUI.prop.TEXT, `${weekDay} ${day}`);
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
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      STEPS_PROGRESS_IMAGE_PROPS,
    );

    const valueWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      STEPS_VALUE_TEXT_PROPS,
    );

    const update = () => {
      const { current = 0, target = 10000 } = stepSensor;
      const level = Math.floor(Math.min((10 * current) / target, 10));
      const valueText = current.toString().padStart(5, '·');

      progressWidget.setProperty(
        hmUI.prop.SRC,
        `progress/progress_${level}.png`,
      );
      valueWidget.setProperty(hmUI.prop.TEXT, valueText);
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
