import { getTimeTexts } from '../../../adapters/getTimeTexts';
import {
  CURRENT_HOUR_AOD_TEXT_PROPS,
  CURRENT_HOUR_TEXT_PROPS,
  CURRENT_MINUTE_AOD_TEXT_PROPS,
  CURRENT_MINUTE_TEXT_PROPS,
  FRAME_IMAGE_PROPS,
} from './CurrentTimeWidget.layout';

export class CurrentTimeWidget {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG, FRAME_IMAGE_PROPS);

    this._currentHourText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_HOUR_TEXT_PROPS,
    );
    this._currentMinuteText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_MINUTE_TEXT_PROPS,
    );

    this._currentHourAodText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_HOUR_AOD_TEXT_PROPS,
    );
    this._currentMinuteAodText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_MINUTE_AOD_TEXT_PROPS,
    );
  }

  /**
   * @param {HmSensorInstance} timeSensor
   */
  update(timeSensor) {
    const { hourText, minuteText } = getTimeTexts(timeSensor);

    this._currentHourText?.setProperty(hmUI.prop.TEXT, hourText);
    this._currentMinuteText?.setProperty(hmUI.prop.TEXT, minuteText);

    this._currentHourAodText?.setProperty(hmUI.prop.TEXT, hourText);
    this._currentMinuteAodText?.setProperty(hmUI.prop.TEXT, minuteText);
  }
}
