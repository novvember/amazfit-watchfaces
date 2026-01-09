import { gettext } from 'i18n';

import { DATE_TEXT_PROPS, OVERLAY_CIRCLE_AOD_PROPS } from './index.layout';
import { WheelWidget } from './WheelWidget';
import { WHEEL_SIZE } from './WheelWidget.layout';

const WEEK_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();

    hmUI.createWidget(hmUI.widget.CIRCLE, OVERLAY_CIRCLE_AOD_PROPS);
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    const WHEEL_GAP = px(12);

    const hourWheel = new WheelWidget({
      xCenter: px(240) - (WHEEL_SIZE / 2 + WHEEL_GAP / 2),
      yCenter: px(240),
      type: '1-12',
      direction: 'clockwise',
      valuePosition: 'right',
    });

    const minuteWheel = new WheelWidget({
      xCenter: px(240) + (WHEEL_SIZE / 2 + WHEEL_GAP / 2),
      yCenter: px(240),
      type: '5-60',
      direction: 'counterclockwise',
      valuePosition: 'left',
    });

    const dateWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const { hour = 0, minute = 0, week = 0, day = 0 } = timeSensor;

      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;

      hourWheel.setValue(hourValue, hourValue.toString());
      minuteWheel.setValue(minute, minute.toString().padStart(2, '0'));

      const weekText = gettext(WEEK_KEYS[week - 1]);
      const dateText = `${weekText} ${day}`;
      dateWidget.setProperty(hmUI.prop.TEXT, dateText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
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
});
