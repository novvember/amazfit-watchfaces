import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class BiochargeDataWidget {
  constructor({ x, y }) {
    const dataType = hmUI.data_type.BIO_CHARGE;
    const hasData = Boolean(dataType);

    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hasData ? dataType : undefined,
      primaryDataUnits: false,
    });

    this._widget.setSecondaryText(gettext('biocharge'));

    if (!hasData) {
      this._widget.setPrimaryText('—');
    }
  }
}
