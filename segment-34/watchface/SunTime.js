import { gettext } from 'i18n';
import { formatTime } from '../utils/formatTime';
import {
  SUNRISE_TEXT_PROPS,
  SUNRISE_TITLE_PROPS,
  SUNSET_TEXT_PROPS,
  SUNSET_TITLE_PROPS,
} from './SunTime.layout';

export class SunTime {
  constructor({ weatherSensor, is12HourFormat }) {
    this._weatherSensor = weatherSensor;
    this._is12HourFormat = is12HourFormat;

    this._createWidgets();
  }

  _createWidgets() {
    hmUI.createWidget(hmUI.widget.TEXT, {
      ...SUNRISE_TITLE_PROPS,
      text: gettext('sunrise'),
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...SUNSET_TITLE_PROPS,
      text: gettext('sunset'),
    });

    this._sunriseTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      SUNRISE_TEXT_PROPS,
    );

    this._sunsetTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      SUNSET_TEXT_PROPS,
    );
  }

  update() {
    const is12HourFormat = this._is12HourFormat;
    const forecastWeather = this._weatherSensor.getForecastWeather();
    const tideData = forecastWeather.tideData;

    if (!tideData.count) {
      this._sunriseTextWidget.setProperty(hmUI.prop.TEXT, '—');
      this._sunsetTextWidget.setProperty(hmUI.prop.TEXT, '—');
      return;
    }

    const { sunrise, sunset } = tideData.data[0] || {};

    const sunriseText = formatTime(
      sunrise.hour,
      sunrise.minute,
      is12HourFormat,
      true,
      false,
    );

    const sunsetText = formatTime(
      sunset.hour,
      sunset.minute,
      is12HourFormat,
      true,
      false,
    );

    this._sunriseTextWidget.setProperty(hmUI.prop.TEXT, sunriseText);
    this._sunsetTextWidget.setProperty(hmUI.prop.TEXT, sunsetText);
  }
}
