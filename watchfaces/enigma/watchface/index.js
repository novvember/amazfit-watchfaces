import { AodTime } from './AodTime';
import { BACKGROUND_RECT_PROPS, FADE_IMAGE_PROPS } from './index.r.layout';
import { Wheels } from './Wheels';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.createSensors();

    this.buildWheels();
    this.buildAod();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  createSensors() {
    this.timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    this.batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    this.is12HourFormat = hmSetting.getTimeFormat() === 0;
  },

  getTimeString(timeSensor, is12HourFormat = false) {
    const { hour, minute } = timeSensor;
    const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
    const hourText = hourValue.toString().padStart(2, '0');
    const minuteText = minute.toString().padStart(2, '0');
    return hourText + minuteText;
  },

  getDateString(timeSensor) {
    const { day, month } = timeSensor;
    const dayText = day.toString().padStart(2, '0');
    const monthText = month.toString().padStart(2, '0');
    return dayText + monthText;
  },

  getBatteryString(batterySensor) {
    const { current = 0 } = batterySensor;
    return (current + '%').padStart(4, '0');
  },

  buildWheels() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, BACKGROUND_RECT_PROPS);

    const wheels = new Wheels();

    hmUI.createWidget(hmUI.widget.IMG, FADE_IMAGE_PROPS);

    const update = (isOnResume = false) => {
      const timeString = this.getTimeString(
        this.timeSensor,
        this.is12HourFormat,
      );
      const dateString = this.getDateString(this.timeSensor);
      const batteryString = this.getBatteryString(this.batterySensor);

      wheels.set([dateString, timeString, batteryString], {
        needFullAnimation: isOnResume,
        needPreMove: isOnResume,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.timeSensor.addEventListener?.(
            this.timeSensor.event.MINUTEEND,
            update,
          );
          update(true);
        }
      },
      pause_call: () => {
        this.timeSensor.removeEventListener?.(
          this.timeSensor.event.MINUTEEND,
          update,
        );
      },
    });
  },

  buildAod() {
    new AodTime(this.timeSensor, this.is12HourFormat, this.getTimeString);
  },
});
