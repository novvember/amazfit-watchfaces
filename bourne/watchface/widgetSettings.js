import { CHAR_POSITIONS } from '../utils/constants';
import {
  COLORS_EDIT_GROUP_PROPS,
  COLORS_OPTIONAL_TYPES,
  ROW_EDIT_GROUP_PROPS,
  ROW_OPTIONAL_TYPES,
} from './widgetSettings.r.layout';

export class WidgetSettings {
  constructor() {
    const rows = this.buildRowsSettings();
    const colors = this.buildColorsSettings();

    return { rows, colors };
  }

  buildRowsSettings() {
    const ROWS = [0, 2, 3, 4];

    const rowsEditGroups = ROWS.map((row, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        ...ROW_EDIT_GROUP_PROPS,
        edit_id: row,
        y: CHAR_POSITIONS.rowsY[row],
        default_type: ROW_OPTIONAL_TYPES[index].type,
      }),
    );

    const types = rowsEditGroups.map((editGroup) => {
      const typeId = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
      return ROW_OPTIONAL_TYPES.find((item) => item.type === typeId)?.data
        ?.type;
    });

    return ROWS.reduce((res, row, index) => {
      res[row] = types[index];
      return res;
    }, {});
  }

  buildColorsSettings() {
    const colorsEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      COLORS_EDIT_GROUP_PROPS,
    );

    const typeId = colorsEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);

    return COLORS_OPTIONAL_TYPES.find((item) => item.type === typeId)?.data
      ?.type;
  }
}
