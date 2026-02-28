import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class AlarmDataWidget {
  constructor({ x, y }) {
    const dataType = hmUI.data_type.RECOVERY_TIME;
    const hasData = Boolean(dataType);

    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hmUI.data_type.ALARM_CLOCK,
      primaryDataUnits: false,
      primaryPadding: true, // time format 00:00
    });

    this._widget.setSecondaryText(gettext('alarm'));

    if (!hasData) {
      this._widget.setPrimaryText('—');
    }
  }
}
