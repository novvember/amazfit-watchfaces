import { gettext } from 'i18n';
import { WEATHER_DESCRIPTIONS } from './WeatherWidget.const';
import {
  UNIT_GAP,
  UNIT_RECT_OFFSET,
  CONDITION_GAP,
  CONDITION_PADDING,
  WEATHER_CONDITION_TEXT_PROPS,
  WEATHER_CONDITION_RECT_PROPS,
  WEATHER_CONDITION_RECT_TAIL_PROPS,
  WEATHER_UNIT_TEXT_PROPS,
  WEATHER_UNIT_RECT_PROPS,
  WEATHER_GROUP_PROPS,
  WEATHER_CONDITION_GROUP_PROPS,
  WEATHER_LEVEL_BACKGROUND_IMAGE_PROPS,
  WEATHER_LEVEL_PROPS,
  WEATHER_VALUE_TEXT_PROPS,
} from './WeatherWidget.layout';
import { getIsFahrenheitTempUnit } from '../../../adapters/getIsFahrenheitTempUnit';
import { calculateTextWidth } from '../utils/calculateTextWidth';

/**
 * @typedef {object} WeatherWidgetParams
 * @property {HmSensorInstance} weatherSensor
 */

export class WeatherWidget {
  /**
   * @param {WeatherWidgetParams} params
   */
  constructor({ weatherSensor }) {
    this._weatherSensor = weatherSensor;

    const valueGroup = hmUI.createWidget(
      hmUI.widget.GROUP,
      WEATHER_GROUP_PROPS,
    );

    valueGroup.createWidget(hmUI.widget.IMG, WEATHER_LEVEL_BACKGROUND_IMAGE_PROPS);
    valueGroup.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_LEVEL_PROPS);

    this._valueTextWidget = valueGroup.createWidget(
      hmUI.widget.TEXT,
      WEATHER_VALUE_TEXT_PROPS,
    );
    this._unitTextWidget = valueGroup.createWidget(
      hmUI.widget.TEXT,
      WEATHER_UNIT_TEXT_PROPS,
    );
    this._unitRectWidget = valueGroup.createWidget(
      hmUI.widget.STROKE_RECT,
      WEATHER_UNIT_RECT_PROPS,
    );

    this._conditionGroup = hmUI.createWidget(
      hmUI.widget.GROUP,
      WEATHER_CONDITION_GROUP_PROPS,
    );

    this._conditionGroup.createWidget(
      hmUI.widget.IMG,
      WEATHER_CONDITION_RECT_TAIL_PROPS,
    );
    this._conditionRectWidget = this._conditionGroup.createWidget(
      hmUI.widget.FILL_RECT,
      WEATHER_CONDITION_RECT_PROPS,
    );
    this._conditionTextWidget = this._conditionGroup.createWidget(
      hmUI.widget.TEXT,
      WEATHER_CONDITION_TEXT_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    const temperature = this._weatherSensor.current ?? '-';
    const valueText = `${temperature}°`;
    const iconIndex = Number(this._weatherSensor.curAirIconIndex);
    const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;
    const conditionText = hasIcon ? gettext(WEATHER_DESCRIPTIONS[iconIndex]) : '?';
    const unitText = getIsFahrenheitTempUnit() ? 'F' : 'C';

    this._valueTextWidget.setProperty(hmUI.prop.TEXT, valueText);
    this._conditionTextWidget.setProperty(hmUI.prop.TEXT, conditionText);
    this._unitTextWidget.setProperty(hmUI.prop.TEXT, unitText);
    this._updateLayout(valueText, conditionText);
  }

  /**
   * @param {string} valueText
   * @param {string} conditionText
   */
  _updateLayout(valueText, conditionText) {
    const valueTextWidth = calculateTextWidth(
      valueText,
      WEATHER_VALUE_TEXT_PROPS.text_size,
    );
    const valueEndX = WEATHER_VALUE_TEXT_PROPS.x + valueTextWidth;
    const unitX = valueEndX + UNIT_GAP;
    const conditionX = valueEndX + CONDITION_GAP;
    const conditionTextWidth = calculateTextWidth(
      conditionText,
      WEATHER_CONDITION_TEXT_PROPS.text_size,
    );
    const conditionRectWidth = conditionTextWidth + 2 * CONDITION_PADDING;

    this._unitTextWidget.setProperty(hmUI.prop.X, unitX);
    this._unitRectWidget.setProperty(hmUI.prop.X, unitX - UNIT_RECT_OFFSET);
    this._conditionGroup.setProperty(hmUI.prop.X, conditionX);
    this._conditionRectWidget.setProperty(hmUI.prop.W, conditionRectWidth);
  }

  _bindHandlers() {
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  }
}
