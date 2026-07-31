import { checkLang } from '../../../../adapters/checkLang';
import { Barometer } from '../../utils/Barometer';
import { getAnglePosition } from '../../utils/getAnglePosition';
import { COLORS } from '../index.const';
import {
  WIDGET_DOT_IMAGE_PROPS,
  WIDGET_ICON_IMAGE_PROPS,
  WIDGET_TEXT_S_PROPS,
  WIDGET_TEXT_XS_PROPS,
} from '../index.r.layout';
import { gettext } from 'i18n';

/**
 * @typedef {Object} AirPressureSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

const DOT_SIZE = px(14);
const DOT_OVERSIZE = px(2);

export class AirPressureSlotWidget {
  /**
   * @param {AirPressureSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    this._hasMm = checkLang(['ru-RU', 'uk-UA']);

    const dotAreaSize = w + 2 * DOT_OVERSIZE;

    this._dotImageProps = {
      ...WIDGET_DOT_IMAGE_PROPS,
      x: x - DOT_OVERSIZE,
      y: y - DOT_OVERSIZE,
      w: dotAreaSize,
      h: dotAreaSize,
      pos_x: dotAreaSize / 2 - DOT_SIZE / 2,
      pos_y: 0,
      center_x: dotAreaSize / 2,
      center_y: dotAreaSize / 2,
      alpha: 0,
    };

    hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y,
      w,
      h,
      src: 'barometer/background.png',
    });

    this._arrowImageWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: y - 0.22 * h,
      w,
      h,
      src: 'barometer/arrow_none.png',
    });

    this._dotImageWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      this._dotImageProps,
    );

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y,
      w,
      h,
      color: COLORS.primary,
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_XS_PROPS,
      x,
      y: y + 0.2 * h,
      w,
      h,
      text: this._hasMm ? gettext('mm') : gettext('hpa'),
    });

    this._barometer = new Barometer();

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  /**
   * @param {number} diff
   */
  _getArrowSrc(diff) {
    let fileName = 'none';

    if (diff > 0) {
      fileName = 'up';
    } else if (diff < 0) {
      fileName = 'down';
    }

    return `barometer/arrow_${fileName}.png`;
  }

  /**
   * @param {number} hPaValue
   */
  _getDotAngle(hPaValue) {
    return getAnglePosition({
      value: hPaValue,
      minValue: 960,
      maxValue: 1060,
      minAngle: -135,
      maxAngle: 135,
    });
  }

  _update() {
    const [error, data] = this._barometer.getData();

    if (error) {
      this._textWidget.setProperty(hmUI.prop.TEXT, '---');
      this._dotImageWidget.setProperty(hmUI.prop.ALPHA, 0);
      return;
    }

    const { hPa, mmHg, diff } = data;
    const text = this._hasMm ? mmHg.toString() : hPa.toString();

    this._textWidget.setProperty(hmUI.prop.TEXT, text);

    this._dotImageWidget.setProperty(hmUI.prop.MORE, {
      ...this._dotImageProps,
      alpha: 255,
      angle: this._getDotAngle(hPa),
    });

    this._arrowImageWidget.setProperty(hmUI.prop.SRC, this._getArrowSrc(diff));
  }

  _bindHandlers() {
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  }
}
