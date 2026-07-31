import { COLORS } from '../index.const';
import {
  WIDGET_BACKGROUND_CIRCLE_PROPS,
  WIDGET_ICON_IMAGE_PROPS,
  WIDGET_TEXT_L_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';
import { isNight } from '../../utils/isNight';
import { updateWeatherIcons, WEATHER_ICONS } from '../../utils/weatherIcons';

/**
 * @typedef {Object} WeatherSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {HmSensorInstance} timeSensor
 * @property {HmSensorInstance} weatherSensor
 */

const ICON_SIZE = px(40);

export class WeatherSlotWidget {
  /**
   * @param {WeatherSlotWidgetParams} params
   */
  constructor({ x, y, w, h, timeSensor, weatherSensor }) {
    this._timeSensor = timeSensor;
    this._weatherSensor = weatherSensor;

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    this._textPropsWhenIcon = {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.27 * h,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    };

    this._textPropsWithoutIcon = {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    };

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    this._iconWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x: centerX - ICON_SIZE / 2,
      y: centerY - ICON_SIZE / 2 - 0.13 * h,
      w: ICON_SIZE,
      h: ICON_SIZE,
    });

    this._textWidget = hmUI.createWidget(
      hmUI.widget.TEXT_FONT,
      // @ts-ignore
      this._textPropsWhenIcon,
    );

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const iconIndex = this._weatherSensor.curAirIconIndex;
    updateWeatherIcons(isNight(this._timeSensor));

    const hasIcon = !Number.isNaN(iconIndex) && iconIndex !== 25;

    this._iconWidget.setProperty(
      hmUI.prop.SRC,
      hasIcon ? WEATHER_ICONS[iconIndex || 0] : '',
    );

    this._textWidget.setProperty(
      hmUI.prop.MORE,
      hasIcon ? this._textPropsWhenIcon : this._textPropsWithoutIcon,
    );
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
