import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class CaloriesDataWidget {
  constructor({ x, y }) {
    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hmUI.data_type.CAL,
    });

    this._widget.setSecondaryText(gettext('calories'));
  }
}
