import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class DistanceWidget {
  constructor(rowIndex, color) {
    const imageWidgets = new Array(5).fill(null).map((_, i) => {
      const props = {
        x: CHAR_POSITIONS.columnsX[i],
        y: CHAR_POSITIONS.rowsY[rowIndex],
        src: getCharSrc(' ', color),
        show_level: hmUI.show_level.ONLY_NORMAL,
      };

      return hmUI.createWidget(hmUI.widget.IMG, props);
    });

    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);

    const update = () => {
      const { current = 0 } = distanceSensor;

      const text =
        current < 10000 ? current + 'm' : (current / 1000).toFixed(0) + 'km';

      text
        .padStart(5, ' ')
        .split('')
        .forEach((char, i) => {
          imageWidgets[i].setProperty(hmUI.prop.SRC, getCharSrc(char, color));
        });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
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
