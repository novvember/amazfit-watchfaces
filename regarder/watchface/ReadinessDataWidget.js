import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class ReadinessDataWidget {
  constructor({ x, y }) {
    const dataType = hmUI.data_type.READINESS;
    const hasData = Boolean(dataType);

    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hasData ? dataType : undefined,
      primaryDataUnits: false,
    });

    this._widget.setSecondaryText(gettext('readiness'));

    if (!hasData) {
      this._widget.setPrimaryText('—');
    }
  }
}
