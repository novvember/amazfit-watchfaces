import { getSleepTimeString } from '../utils/getSleepTime';
import { CommonTextWidget } from './CommonTextWidget';

export class SleepWidget {
  constructor(rowIndex, color) {
    const textWidget = new CommonTextWidget(rowIndex, color);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTime = getSleepTimeString(sleepSensor);

      if (sleepTime) {
        textWidget.update(sleepTime);
      } else {
        textWidget.update('--:--');
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  }
}
