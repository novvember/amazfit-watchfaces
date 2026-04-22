import {
  CURRENT_HOUR_AOD_TEXT_PROPS,
  CURRENT_HOUR_TEXT_PROPS,
  CURRENT_MINUTE_AOD_TEXT_PROPS,
  CURRENT_MINUTE_TEXT_PROPS,
  CURRENT_SECOND_TEXT_PROPS,
  FRAME_AOD_IMAGE_PROPS,
  FRAME_IMAGE_PROPS,
} from './CurrentTimeWidget.layout';

export class CurrentTimeWidget {
  constructor() {
    this._buildNormal();
    this._buildAod();
  }

  _buildNormal() {
    hmUI.createWidget(hmUI.widget.IMG, FRAME_IMAGE_PROPS);

    this._currentHourText = hmUI.createWidget(
      hmUI.widget.TEXT_FONT,
      CURRENT_HOUR_TEXT_PROPS,
    );
    this._currentMinuteText = hmUI.createWidget(
      hmUI.widget.TEXT_FONT,
      CURRENT_MINUTE_TEXT_PROPS,
    );

    hmUI.createWidget(hmUI.widget.TEXT_FONT, CURRENT_SECOND_TEXT_PROPS);
  }

  _buildAod() {
    hmUI.createWidget(hmUI.widget.IMG, FRAME_AOD_IMAGE_PROPS);

    this._currentHourAodText = hmUI.createWidget(
      hmUI.widget.TEXT_FONT,
      CURRENT_HOUR_AOD_TEXT_PROPS,
    );
    this._currentMinuteAodText = hmUI.createWidget(
      hmUI.widget.TEXT_FONT,
      CURRENT_MINUTE_AOD_TEXT_PROPS,
    );
  }
}
