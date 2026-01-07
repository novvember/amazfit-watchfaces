import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import { isInsideCircleAngle } from '../utils/isInsideCircleAngle';
import {
  WHEEL_CAPTION_ACCENT_TEXT_PROPS,
  WHEEL_CAPTION_RADIUS,
  WHEEL_CAPTION_TEXT_PROPS,
  WHEEL_IMAGE_PROPS,
  WHEEL_VALUE_LEFT_TEXT_PROPS,
  WHEEL_VALUE_RIGHT_TEXT_PROPS,
} from './WheelWidget.layout';

const CAPTION_TEXTS = {
  '1-12': ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  '5-60': [
    '60',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
  ],
};

const MAX_VALUES = {
  '1-12': 12,
  '5-60': 60,
};

const HIDDEN_CIRCLE_ANGLE = 30;

export class WheelWidget {
  constructor({
    xCenter = px(240),
    yCenter = px(240),
    type = '1-12',
    direction = 'clockwise',
    valuePosition = 'right',
  }) {
    this._xCenter = xCenter;
    this._yCenter = yCenter;
    this._type = type;
    this._direction = direction === 'clockwise' ? 1 : -1;
    this._valuePosition = valuePosition;
    this._maxValue = MAX_VALUES[this._type];
    this._valueAngle = this._valuePosition === 'right' ? 90 : -90;

    this._prevValue = null;
    this._prevValueText = null;

    this._imageWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WHEEL_IMAGE_PROPS,
      x: this._xCenter + WHEEL_IMAGE_PROPS.x,
      y: this._yCenter + WHEEL_IMAGE_PROPS.y,
    });

    this._captionTextWidgets = CAPTION_TEXTS[this._type].map((text, i) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...(i === 0
          ? WHEEL_CAPTION_ACCENT_TEXT_PROPS
          : WHEEL_CAPTION_TEXT_PROPS),
        text: text,
      }),
    );

    const valueTextProps =
      this._valuePosition === 'right'
        ? WHEEL_VALUE_RIGHT_TEXT_PROPS
        : WHEEL_VALUE_LEFT_TEXT_PROPS;

    this._valueWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...valueTextProps,
      x: this._xCenter + valueTextProps.x,
      y: this._yCenter + valueTextProps.y,
    });
  }

  _rotateWheel(angle) {
    this._imageWidget.setProperty(hmUI.prop.ANGLE, angle);
  }

  _updateCaptionTexts(angle) {
    this._captionTextWidgets.forEach((textWidget, i) => {
      const widgetAngle = (angle - (this._direction * (i * 360)) / 12) % 360;

      const isHidden = isInsideCircleAngle(
        widgetAngle,
        this._valueAngle,
        HIDDEN_CIRCLE_ANGLE,
      );

      const { x, y } = getCoordsFromAngle({
        degrees: widgetAngle,
        radius: WHEEL_CAPTION_RADIUS,
        widgetWidth: WHEEL_CAPTION_TEXT_PROPS.w,
        widgetHeight: WHEEL_CAPTION_TEXT_PROPS.h,
        centerX: this._xCenter,
        centerY: this._yCenter,
      });

      textWidget.setProperty(hmUI.prop.X, x);
      textWidget.setProperty(hmUI.prop.Y, y);
      textWidget.setProperty(hmUI.prop.VISIBLE, isHidden ? false : true);
    });
  }

  _updateValue(text) {
    this._valueWidget.setProperty(hmUI.prop.TEXT, text);
  }

  setValue(value, valueText) {
    if (this._prevValue !== value) {
      this._prevValue = value;

      const angle = (360 * value) / this._maxValue;
      const wheelAngle = (this._valueAngle + this._direction * angle) % 360;

      this._rotateWheel(wheelAngle);
      this._updateCaptionTexts(wheelAngle);
    }

    if (this._prevValueText !== valueText) {
      this._prevValueText = valueText;

      this._updateValue(valueText);
    }
  }
}
