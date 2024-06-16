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

    let prevTime = '';
    let updateTimer = undefined;

    const update = () => {
      const { hour, minute } = hmSensor.createSensor(hmSensor.id.TIME);
      const time = `${hour}${minute}`;

      if (prevTime === time) {
        return;
      }

      console.log('time rerendered');
      prevTime = time;

      textWidget.setProperty(hmUI.prop.TEXT, getTimeString(hour, minute));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
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
});
