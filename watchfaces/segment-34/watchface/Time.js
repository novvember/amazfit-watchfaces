import { MONTH_KEYS, WEEK_KEYS } from './Time.const';
import {
  DATE_AOD_TEXT_PROPS,
  DATE_TEXT_PROPS,
  SECOND_DECORATIVE_TEXT_PROPS,
  SECOND_TEXT_PROPS,
  TIME_AOD_GRADIENT_PROPS,
  TIME_AOD_PROPS,
  TIME_GRADIENT_PROPS,
  TIME_PROPS,
} from './Time.layout';

import { gettext } from 'i18n';

export class Time {
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;

    this._buildTimeBig();
    this._buildSeconds();
    this._buildDate();
  }

  _buildTimeBig() {
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AOD_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, TIME_GRADIENT_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, TIME_AOD_GRADIENT_PROPS);
  }

  _buildSeconds() {
    hmUI.createWidget(hmUI.widget.TEXT, SECOND_DECORATIVE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, SECOND_TEXT_PROPS);
  }

  _buildDate() {
    this._dateTextWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    this._dateTextAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      DATE_AOD_TEXT_PROPS,
    );
  }

  update() {
    const { week, day, month, year } = this._timeSensor;

    const weekText = gettext(WEEK_KEYS[week - 1]).toUpperCase();
    const monthText = gettext(MONTH_KEYS[month - 1]).toUpperCase();

    const text = `${weekText}, ${day} ${monthText} ${year}`;

    this._dateTextWidget.setProperty(hmUI.prop.TEXT, text);
    this._dateTextAodWidget.setProperty(hmUI.prop.TEXT, text);
  }
}
