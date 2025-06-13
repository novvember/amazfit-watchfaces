import {
  POINTER_PROPS,
  TEXT_PROPS,
  TOP_COVER_IMAGE_PROPS,
} from './index.r.layout';

import { gettext } from 'i18n';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildTime();
    this.buildTopCover();
    this.buildDate();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, POINTER_PROPS);
  },

  buildTopCover() {
    hmUI.createWidget(hmUI.widget.IMG, TOP_COVER_IMAGE_PROPS);
  },

  buildDate() {
    const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const text = `${gettext(WEEKDAYS[week - 1])} ${day}`;
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
});
