import { getCoordsFromAngle } from '../../../utils/getCoordsFromAngle';

/**
 * @typedef {Object} TimeWheelWidgetParams
 * @property {HmWidgetProps} imageProps
 * @property {HmWidgetProps} textProps
 * @property {number} textsRadius
 * @property {(text: string) => string} getTextImageSrc
 */

const TIME_TEXTS = [
  '00',
  '05',
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
];

export class TimeWheelWidget {
  /**
   * @param {TimeWheelWidgetParams} Params
   */
  constructor({ imageProps, textProps, textsRadius, getTextImageSrc }) {
    this._baseTextWidgetProps = textProps;
    this._textsRadius = textsRadius;

    this._imageWidget = hmUI.createWidget(hmUI.widget.IMG, imageProps);

    this._textWidgets = new Array(12).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...textProps,
        src: getTextImageSrc(TIME_TEXTS[i]),
      }),
    );
  }

  /**
   * @param {number} angle
   */
  update(angle) {
    this._imageWidget.setProperty(hmUI.prop.ANGLE, angle);

    this._textWidgets.forEach((textWidget, i) => {
      const textAngle = (angle - (i * 360) / 12) % 360;

      const { x, y } = getCoordsFromAngle({
        degrees: textAngle,
        radius: this._textsRadius,
        widgetHeight: this._baseTextWidgetProps.h || 0,
        widgetWidth: this._baseTextWidgetProps.w || 0,
        rotationCenterX: px(240),
        rotationCenterY: px(240),
      });

      textWidget.setProperty(hmUI.prop.X, x);
      textWidget.setProperty(hmUI.prop.Y, y);
    });
  }
}
