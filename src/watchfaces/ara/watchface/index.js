import { WEEKDAYS } from '../utils/constants';
import { POINTER_PROPS, TEXT_PROPS } from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildText();
    this.buildTime();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, POINTER_PROPS);
  },

  buildText() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const text = `${WEEKDAYS[week - 1]} ${day}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },
});
