import { CHAR_POSITIONS } from '../utils/constants';
import { getDigitsArray } from '../utils/getDigitsArray';

export class YearWidget {
  constructor(rowIndex, color) {
    const props = {
      x: CHAR_POSITIONS.columnsX[1],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      text: 0,
      font_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    const widget = hmUI.createWidget(hmUI.widget.TEXT_IMG, props);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { year } = timeSensor;
      widget.setProperty(hmUI.prop.TEXT, year.toString());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE || hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          update();
        }
      },
    });
  }
}
