import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class PaiDataWidget {
  constructor({ x, y }) {
    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hmUI.data_type.PAI_WEEKLY,
    });

    this._widget.setSecondaryText(gettext('pai'));
  }
}
