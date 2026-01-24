import { CommonTextWidget } from './CommonTextWidget';

export class DistanceWidget {
  constructor(rowIndex, color) {
    const textWidget = new CommonTextWidget(rowIndex, color);
    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);

    const update = () => {
      const { current = 0 } = distanceSensor;
      const text =
        current < 10000 ? current + 'm' : Math.floor(current / 1000) + 'km';
      textWidget.update(text.padStart(5, ' '));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE || hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          distanceSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        distanceSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  }
}
