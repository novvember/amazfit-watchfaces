import { Colon } from './Colon';
import { Digit } from './Digit';
import { OVERLAY_CIRCLE_AOD_PROPS } from './index.layout';

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
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const digitWidgets = [
      new Digit({ x: px(150), y: px(40) }),
      new Digit({ x: px(250), y: px(40) }),
      new Digit({ x: px(150), y: px(180) }),
      new Digit({ x: px(250), y: px(180) }),
      new Digit({ x: px(150), y: px(320) }),
      new Digit({ x: px(250), y: px(320) }),
    ];

    new Colon({ x: px(110), y: px(180) });
    new Colon({ x: px(110), y: px(320) });

    let updateTimer = undefined;

    const update = (hasAnimation, hasRandomAnimationStart) => {
      const { hour, minute, second } = timeSensor;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
      const hourValues = hourValue.toString().padStart(2, '0');
      const minuteValues = minute.toString().padStart(2, '0');
      const secondValues = hasAnimation
        ? second.toString().padStart(2, '0')
        : '00';

      const values = hourValues + minuteValues + secondValues;

      digitWidgets.forEach((digitWidget, i) => {
        digitWidget.set(
          Number(values[i]),
          hasAnimation,
          hasRandomAnimationStart,
        );
      });
    };

    const updateOnResume = () => update(true, true);
    const updateOnChange = () => update(true, false);
    const updateAod = () => update(false);

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, updateOnChange);
          updateOnResume();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, updateAod);
          updateAod();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, updateAod);
        timer.stopTimer(updateTimer);
      },
    });
  },
});
