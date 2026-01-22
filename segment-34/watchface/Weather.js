import { WEATHER_DESCRIPTIONS } from './Weather.const';
import {
  WEATHER_HUMIDUTY_TEXT_PROPS,
  WEATHER_TEMP_TEXT_PROPS,
  WEATHER_TEXT_PROPS,
  WEATHER_WIND_IMAGE_PROPS,
  WEATHER_WIND_TEXT_PROPS,
} from './Weather.layout';

import { gettext } from 'i18n';

export class Weather {
  constructor({ weatherSensor }) {
    this._weatherSensor = weatherSensor;

    this._buildTopWidgets();
    this._buildWeatherConditions();
  }

  _buildTopWidgets() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_TEMP_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_WIND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_WIND_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_HUMIDUTY_TEXT_PROPS);
  }

  _buildWeatherConditions() {
    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, WEATHER_TEXT_PROPS);
  }

  update() {
    const iconIndex = this._weatherSensor.curAirIconIndex;
    const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;
    const text = hasIcon ? gettext(WEATHER_DESCRIPTIONS[iconIndex]) : '';
    this._textWidget.setProperty(hmUI.prop.TEXT, text);
  }
}
