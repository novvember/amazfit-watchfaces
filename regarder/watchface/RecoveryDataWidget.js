import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class RecoveryDataWidget {
  constructor({ x, y }) {
    const dataType = hmUI.data_type.RECOVERY_TIME;
    const hasData = Boolean(dataType);

    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hasData ? dataType : undefined,
      primaryDataUnits: false,
    });

    this._widget.setSecondaryText(gettext('hours'));

    if (!hasData) {
      this._widget.setPrimaryText('—');
    }
  }
}
