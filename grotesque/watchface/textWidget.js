import {
  BOTTOM_CENTER_WIDGET_COORDS,
  BOTTOM_LEFT_WIDGET_COORDS,
  BOTTOM_RIGHT_WIDGET_COORDS,
  COLORS,
  TOP_LEFT_WIDGET_COORDS,
  TOP_RIGHT_WIDGET_COORDS,
  WIDGET_GROUP_PROPS,
  WIDGET_TEXT_BOTTOM_PROPS,
  WIDGET_TEXT_TOP_PROPS,
} from './textWidget.r.layout';

export class TextWidget {
  constructor(direction) {
    this._alignH = this._getAlignHorizontal(direction);

    this._groupProps = {
      ...WIDGET_GROUP_PROPS,
      ...this._getGroupCoords(direction),
    };

    this._buildWidgets();
  }

  _getAlignHorizontal(direction) {
    if (['top-left', 'bottom-left', 'bottom-right'].includes(direction)) {
      return hmUI.align.RIGHT;
    }

    if (['top-center', 'bottom-center'].includes(direction)) {
      return hmUI.align.CENTER_H;
    }

    return hmUI.align.LEFT;
  }

  _getGroupCoords(direction) {
    if (direction === 'top-left') {
      return TOP_LEFT_WIDGET_COORDS;
    }

    if (direction === 'top-right') {
      return TOP_RIGHT_WIDGET_COORDS;
    }

    if (direction === 'bottom-left') {
      return BOTTOM_LEFT_WIDGET_COORDS;
    }

    if (direction === 'bottom-center') {
      return BOTTOM_CENTER_WIDGET_COORDS;
    }

    return BOTTOM_RIGHT_WIDGET_COORDS;
  }

  _buildWidgets() {
    const group = hmUI.createWidget(hmUI.widget.GROUP, this._groupProps);

    this._topTextWidget = group.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_TOP_PROPS,
      align_h: this._alignH,
    });

    this._bottomTextWidget = group.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_BOTTOM_PROPS,
      align_h: this._alignH,
    });
  }

  update(textTop = '', textBottom = '', isHighlighted = false) {
    this._topTextWidget.setProperty(hmUI.prop.TEXT, textTop.toString());
    this._bottomTextWidget.setProperty(hmUI.prop.TEXT, textBottom.toString());

    if (isHighlighted) {
      this._topTextWidget.setProperty(hmUI.prop.COLOR, COLORS.highlight);
      this._bottomTextWidget.setProperty(hmUI.prop.COLOR, COLORS.highlight);
    } else {
      this._topTextWidget.setProperty(hmUI.prop.COLOR, COLORS.regular);
      this._bottomTextWidget.setProperty(hmUI.prop.COLOR, COLORS.regular);
    }
  }
}
