import { getTimeString } from '../utils/time/getTimeStringRus';
import { TIME_TEXT_PROPS } from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildTime();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      console.log('time rerendered');

      const { hour, minute } = timeSensor;
      const timeString = getTimeString(hour, minute);
      textWidget.setProperty(hmUI.prop.TEXT, timeString);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (buildTime)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (buildTime)');

        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },
});
