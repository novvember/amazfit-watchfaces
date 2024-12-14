import { getHasCustomFontSupport } from '../utils/getHasCustomFontSupport';
import { getTimeString } from '../utils/time/getTimeStringRus';
import { AOD_TIME_TEXT_PROPS, TIME_TEXT_PROPS } from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface inited');
  },

  build() {
    console.log('watchface builded');

    this.buildTime();
  },

  onDestroy() {
    console.log('watchface destroyed');
  },

  buildTime() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    const textAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      AOD_TIME_TEXT_PROPS,
    );
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    let prevTimeStamp = '';
    let updateTimer;

    const update = () => {
      const { hour, minute } = timeSensor;
      const timeStamp = `${hour}-${minute}`;

      if (prevTimeStamp === timeStamp) {
        return;
      }

      console.log('time rerendered');

      prevTimeStamp = timeStamp;
      const timeString = getTimeString(hour, minute);
      textWidget.setProperty(hmUI.prop.TEXT, timeString);
      textAodWidget.setProperty(hmUI.prop.TEXT, timeString);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (buildTime)');

        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          if (getHasCustomFontSupport()) {
            timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          } else {
            updateTimer = timer.createTimer(2000, 2000, update);
          }

          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (buildTime)');

        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
        timer.stopTimer(updateTimer);
      },
    });
  },
});
