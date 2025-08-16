import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class WorldTimeWidget {
  constructor(rowIndex, color) {
    const hourProps = {
      x: CHAR_POSITIONS.columnsX[0],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      text: 0,
      font_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const colonProps = {
      x: CHAR_POSITIONS.columnsX[2],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      src: getCharSrc(':', color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const minuteProps = {
      x: CHAR_POSITIONS.columnsX[3],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      text: 0,
      font_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.IMG, colonProps);

    const hourWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, hourProps);
    const minuteWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, minuteProps);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const worldClockSensor = hmSensor.createSensor(hmSensor.id.WORLD_CLOCK);

    const update = () => {
      worldClockSensor?.init();
      const count = worldClockSensor?.getWorldClockCount();
      const { hour, minute } = worldClockSensor?.getWorldClockInfo(0) || {};

      if (hour === undefined || minute === undefined) {
        hourWidget.setProperty(hmUI.prop.TEXT, '00');
        minuteWidget.setProperty(hmUI.prop.TEXT, '00');
        return;
      }

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourText = (is12HourFormat ? hour % 12 || 12 : hour)
        .toString()
        .padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');

      hourWidget.setProperty(hmUI.prop.TEXT, hourText);
      minuteWidget.setProperty(hmUI.prop.TEXT, minuteText);
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
