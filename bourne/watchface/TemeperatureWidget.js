import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class TemperatureWidget {
  constructor(rowIndex, color, unit = '°C') {
    const props = {
      x: CHAR_POSITIONS.columnsX[0],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      type: hmUI.data_type.WEATHER_CURRENT,
      font_array: getDigitsArray(color),
      align_h: hmUI.align.RIGHT,
      unit_en: getCharSrc(unit, color),
      negative_image: getCharSrc('-', color),
      invalid_image: getCharSrc('-', color),
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    hmUI.createWidget(hmUI.widget.TEXT_IMG, props);
  }
}
