import { createWidget, widget, prop } from '@zos/ui';
import {
  INFO_POSTFIX_TEXT_PROPS,
  INFO_VALUE_TEXT_PROPS,
} from './bottomInfo.r.layout';

export class BottomInfo {
  constructor() {
    this._build();
  }

  _build() {
    this._valueTextWidget = createWidget(widget.TEXT, INFO_VALUE_TEXT_PROPS);
    this._postfixTextWidget = createWidget(
      widget.TEXT,
      INFO_POSTFIX_TEXT_PROPS,
    );
  }

  update(value, postfix) {
    this._valueTextWidget.setProperty(prop.TEXT, value.toString() || '--');
    this._postfixTextWidget.setProperty(prop.TEXT, postfix || '');
  }
}
