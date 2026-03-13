import {
  ALARM_IMAGE_PROPS,
  ALARM_STATUS_PROPS,
  BATTERY_ICON_PROPS,
  BATTERY_PROGRESS_PROPS,
  CONNECT_IMAGE_PROPS,
  CONNECT_STATUS_PROPS,
} from './StatusIcons.layout';

export class StatusIcons {
  constructor({ batterySensor }) {
    this._batterySensor = batterySensor;

    this._buildConnection();
    this._buildAlarm();
    this._buildBattery();
  }

  _buildConnection() {
    hmUI.createWidget(hmUI.widget.IMG, CONNECT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, CONNECT_STATUS_PROPS);
  }

  _buildAlarm() {
    hmUI.createWidget(hmUI.widget.IMG, ALARM_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, ALARM_STATUS_PROPS);
  }

  _buildBattery() {
    this._batteryProgressWidget = hmUI.createWidget(
      hmUI.widget.FILL_RECT,
      BATTERY_PROGRESS_PROPS,
    );

    hmUI.createWidget(hmUI.widget.IMG, BATTERY_ICON_PROPS);
  }

  update() {
    const { current = 0 } = this._batterySensor;
    const width = (current / 100) * BATTERY_PROGRESS_PROPS.w;
    this._batteryProgressWidget.setProperty(hmUI.prop.W, width);
  }
}
