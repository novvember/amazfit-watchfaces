import { WEATHER_DESCRIPTIONS } from './WeatherWidget.const';
import {
  WEATHER_CONDITION_PROPS,
  WEATHER_DEGREE_PROPS,
  WEATHER_DEGREE_RECT_PROPS,
  WEATHER_GROUP_PROPS,
  WEATHER_LEVEL_PROPS,
  WEATHER_VALUE_PROPS,
} from './WeatherWidget.layout';
import { getIsFahrenheitTempUnit } from '../../../adapters/getIsFahrenheitTempUnit';

import { gettext } from 'i18n';

export class WeatherWidget {
  /**
   * @param {{ weatherSensor: HmSensorInstance }} params
   */
  constructor({ weatherSensor }) {
    this._weatherSensor = weatherSensor;

    const group = hmUI.createWidget(hmUI.widget.GROUP, WEATHER_GROUP_PROPS);

    group.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_LEVEL_PROPS);

    this._valueWidget = group.createWidget(
      hmUI.widget.TEXT,
      WEATHER_VALUE_PROPS,
    );
    this._degreeWidget = group.createWidget(
      hmUI.widget.TEXT,
      WEATHER_DEGREE_PROPS,
    );
    this._degreeRectWidget = group.createWidget(
      hmUI.widget.STROKE_RECT,
      WEATHER_DEGREE_RECT_PROPS,
    );

    this._conditionWidget = group.createWidget(
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
    this._valueLength = text.length;
  }

  _updateConditionText() {
    const iconIndex = Number(this._weatherSensor.curAirIconIndex);
    const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;
    const text = hasIcon ? gettext(WEATHER_DESCRIPTIONS[iconIndex]) : '';
    this._conditionWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _updateDegreeText() {
    const isFahrenheitTempUnit = getIsFahrenheitTempUnit();
    const text = isFahrenheitTempUnit ? 'F' : 'C';
    this._degreeWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _updatePositions() {
    const charWidth = WEATHER_VALUE_PROPS.text_size * 0.6;
    const valueLength = this._valueLength ?? 1;
    const valueEndX =
      WEATHER_VALUE_PROPS.x + Math.round(valueLength * charWidth);

    const degreeX = valueEndX + px(4);
    const descriptionX = valueEndX + px(58);

    this._degreeWidget.setProperty(hmUI.prop.X, degreeX);
    this._degreeRectWidget.setProperty(hmUI.prop.X, degreeX - px(7));
    this._conditionWidget.setProperty(hmUI.prop.X, descriptionX);
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
