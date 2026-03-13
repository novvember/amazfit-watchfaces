import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class HeartDataWidget {
  constructor({ x, y }) {
    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hmUI.data_type.HEART,
    });

    this._widget.setSecondaryText(gettext('heart'));
  }
}
