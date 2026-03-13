import {
  PRIMARY_TEXT_PROPS,
  SECONDARY_TEXT_PROPS,
  WIDGET_HEIGHT,
  WIDGET_WIDTH,
} from './DataWidget.layout';

export class DataWidget {
  constructor({
    x,
    y,
    primaryDataType,
    primaryDataUnits = false,
    primaryPadding,
  }) {
    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      x,
      y,
      w: WIDGET_WIDTH,
      h: WIDGET_HEIGHT,
    });

    this._secondaryText = this._group.createWidget(
      hmUI.widget.TEXT,
      SECONDARY_TEXT_PROPS,
    );

    if (primaryDataType) {
      this._primaryText = this._group.createWidget(hmUI.widget.TEXT_FONT, {
        ...PRIMARY_TEXT_PROPS,
        type: primaryDataType,
        unit_type: primaryDataUnits ? 1 : 0,
        padding: primaryPadding,
      });
    } else {
      this._primaryText = this._group.createWidget(hmUI.widget.TEXT, {
        ...PRIMARY_TEXT_PROPS,
        text: '',
      });
    }
  }

  setSecondaryText(text) {
    this._secondaryText.setProperty(
      hmUI.prop.TEXT,
      text.toString().toUpperCase(),
    );
  }

  setPrimaryText(text) {
    this._primaryText.setProperty(hmUI.prop.TEXT, text.toString());
  }
}
