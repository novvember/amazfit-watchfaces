import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class BatteryDataWidget {
  constructor({ x, y }) {
    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hmUI.data_type.BATTERY,
      primaryDataUnits: true,
    });

    this._widget.setSecondaryText(gettext('battery'));
  }
}
