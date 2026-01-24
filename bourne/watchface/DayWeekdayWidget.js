import { CommonTextWidget } from './CommonTextWidget';
import { gettext } from 'i18n';

const WEEK_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export class DayWeekdayWidget {
  constructor(rowIndex, color) {
    const textWidget = new CommonTextWidget(rowIndex, color);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const dayText = day.toString().padStart(2, ' ');
      const weekdayText = gettext(WEEK_KEYS[week - 1]);
      const text = `${dayText}/${weekdayText}`.slice(0, 5);
      textWidget.update(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE || hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
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
