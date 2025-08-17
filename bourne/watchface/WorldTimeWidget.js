import { CommonTextWidget } from './CommonTextWidget';

export class WorldTimeWidget {
  constructor(rowIndex, color) {
    const textWidget = new CommonTextWidget(rowIndex, color);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const worldClockSensor = hmSensor.createSensor(hmSensor.id.WORLD_CLOCK);

    const update = () => {
      worldClockSensor?.init();
      const count = worldClockSensor?.getWorldClockCount();
      const { hour, minute } = worldClockSensor?.getWorldClockInfo(0) || {};

      if (hour === undefined || minute === undefined) {
        textWidget.update('--:--');
        return;
      }

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourText = (is12HourFormat ? hour % 12 || 12 : hour)
        .toString()
        .padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');

      textWidget.update(`${hourText}:${minuteText}`);
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
  }
}
