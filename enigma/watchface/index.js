import { BACKGROUND_RECT_PROPS, FADE_IMAGE_PROPS } from './index.r.layout';
import { Wheels } from './Wheels';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildLines();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildLines() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, BACKGROUND_RECT_PROPS);

    const wheels = new Wheels();

    hmUI.createWidget(hmUI.widget.IMG, FADE_IMAGE_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { hour, minute, day, month } = timeSensor;

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
      const hourText = hourValue.toString().padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');

      const dayText = day.toString().padStart(2, '0');
      const monthText = month.toString().padStart(2, '0');

      const { current } = batterySensor;
      const batteryText = (current + '%').padStart(4, '0');

      wheels.set([dayText + monthText, hourText + minuteText, batteryText]);
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
