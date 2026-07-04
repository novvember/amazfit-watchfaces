import { getWeekDay } from '../../../adapters/getWeekDay';
import { getTimeTexts } from '../../../adapters/getTimeTexts';
import { getDay } from '../../../adapters/getDay';
import { getMonth } from '../../../adapters/getMonth';
import { formatNumber } from '../../../utils/formatNumber';

import {
  DATA_TEXT_PROPS,
  DATE_TEXT_PROPS,
  EDIT_BACKGROUND_PROPS,
} from './index.r.layout';
import { TimeTextWidget } from './TimeTextWidget';

import { gettext } from 'i18n';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();
    this.buildTime();
    this.buildSteps();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_BG, EDIT_BACKGROUND_PROPS);
  },

  buildTime() {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const textWidget = new TimeTextWidget();
    const dateTextWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    let prevDay = -1;
    let prevTime = '';

    const update = () => {
      const { hourText, minuteText } = getTimeTexts(timeSensor);
      const timeText = `${hourText}:${minuteText}`;

      if (prevTime === timeText) {
        return;
      }

      prevTime = timeText;

      textWidget.set(timeText);

      const day = getDay(timeSensor);

      if (prevDay === day) {
        return;
      }

      prevDay = day;

      const monthKey = getMonth(timeSensor);
      const dayText = gettext(monthKey).replace('{day}', day.toString());

      const weekdayKey = getWeekDay(timeSensor);
      const weekDay = gettext(weekdayKey);

      const dateText = weekDay + ',' + '\n' + dayText;
      dateTextWidget.setProperty(hmUI.prop.TEXT, dateText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() === hmSetting.screen_type.AOD ||
          hmSetting.getScreenType() === hmSetting.screen_type.SETTINGS
        ) {
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
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATA_TEXT_PROPS);
    let prevValue = 0;

    const update = () => {
      const { current = 0 } = stepSensor;

      if (prevValue === current) {
        return;
      }

      prevValue = current;

      const text = formatNumber(current, ' ') + ' ' + gettext('steps');
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor?.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor?.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },
});
