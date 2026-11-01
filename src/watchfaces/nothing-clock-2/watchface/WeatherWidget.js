import { WEATHER_DESCRIPTIONS } from './WeatherWidget.const';
import {
  WEATHER_CONDITION_PROPS,
  WEATHER_CONDITION_RECT_PROPS,
  WEATHER_CONDITION_RECT_TAIL_PROPS,
  WEATHER_DEGREE_PROPS,
  WEATHER_DEGREE_RECT_PROPS,
  WEATHER_GROUP_PROPS,
  WEATHER_LEVEL_BACKGROUND_PROPS,
  WEATHER_LEVEL_PROPS,
  WEATHER_VALUE_PROPS,
} from './WeatherWidget.layout';
import { getIsFahrenheitTempUnit } from '../../../adapters/getIsFahrenheitTempUnit';

import { gettext } from 'i18n';
import { calculateTextWidth } from '../utils/calculateTextWidth';

export class WeatherWidget {
  /**
   * @param {{ weatherSensor: HmSensorInstance }} params
   */
  constructor({ weatherSensor }) {
    this._weatherSensor = weatherSensor;

    const valueGroup = hmUI.createWidget(
      hmUI.widget.GROUP,
      WEATHER_GROUP_PROPS,
    );

    valueGroup.createWidget(hmUI.widget.IMG, WEATHER_LEVEL_BACKGROUND_PROPS);
    valueGroup.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_LEVEL_PROPS);

    this._valueWidget = valueGroup.createWidget(
      hmUI.widget.TEXT,
      WEATHER_VALUE_PROPS,
    );
    this._degreeWidget = valueGroup.createWidget(
      hmUI.widget.TEXT,
      WEATHER_DEGREE_PROPS,
    );
    this._degreeRectWidget = valueGroup.createWidget(
      hmUI.widget.STROKE_RECT,
      WEATHER_DEGREE_RECT_PROPS,
    );

    this._conditionGroup = hmUI.createWidget(
      hmUI.widget.GROUP,
      WEATHER_GROUP_PROPS,
    );

    this._conditionRectTailWidget = this._conditionGroup.createWidget(
      hmUI.widget.IMG,
      WEATHER_CONDITION_RECT_TAIL_PROPS,
    );
    this._conditionRectWidget = this._conditionGroup.createWidget(
      hmUI.widget.FILL_RECT,
      WEATHER_CONDITION_RECT_PROPS,
    );
    this._conditionTextWidget = this._conditionGroup.createWidget(
      hmUI.widget.TEXT,
      WEATHER_CONDITION_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    this._updateValue();
    this._updateConditionText();
    this._updateDegreeText();
    this._updatePositions();
  }

  _updateValue() {
    const temperatureValue = this._weatherSensor.current ?? '-';
    const text = `${temperatureValue}°`;
    this._valueWidget.setProperty(hmUI.prop.TEXT, text);
    this._valueText = text;
  }

  _updateConditionText() {
    const iconIndex = Number(this._weatherSensor.curAirIconIndex);
    const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;
    const text = hasIcon ? gettext(WEATHER_DESCRIPTIONS[iconIndex]) : '?';
    this._conditionText = text;
    this._conditionTextWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _updateDegreeText() {
    const isFahrenheitTempUnit = getIsFahrenheitTempUnit();
    const text = isFahrenheitTempUnit ? 'F' : 'C';
    this._degreeWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _updatePositions() {
    const valueTextWidth = calculateTextWidth(
      this._valueText || '',
      WEATHER_VALUE_PROPS.text_size,
    );
    const valueEndX = WEATHER_VALUE_PROPS.x + valueTextWidth;
    const degreeX = valueEndX + px(4);

    const CONDITION_GAP = px(104);

    const conditionX = valueEndX + CONDITION_GAP;
    const conditionTextWidth = calculateTextWidth(
      this._conditionText || '',
      WEATHER_CONDITION_PROPS.text_size,
    );
    const conditionRectWidth = conditionTextWidth + 2 * px(14);

    this._degreeWidget.setProperty(hmUI.prop.X, degreeX);
    this._degreeRectWidget.setProperty(hmUI.prop.X, degreeX - px(7));

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
