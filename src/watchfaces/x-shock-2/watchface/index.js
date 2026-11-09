import { TimeWidget } from './TimeWidget';
import { DateDataWidget } from './DateDataWidget';
import {
  BACKGROUND_PROPS,
  MENU_PROPS,
  ALARM_STATUS_PROPS,
  BATTERY_STATUS_PROPS,
  CONNECTION_STATUS_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._buildBackground();
    this._buildTime();
    this._buildDate();
    this._buildAlarmStatus();
    this._buildBatteryStatus();
    this._buildConnectionStatus();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  _buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, MENU_PROPS);
  },

  _buildTime() {
    new TimeWidget();
  },

  _buildDate() {
    new DateDataWidget();
  },

  _buildAlarmStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, ALARM_STATUS_PROPS);
  },

  _buildBatteryStatus() {
    const THRESHOLD = 20;

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const imageWidget = hmUI.createWidget(hmUI.widget.IMG, BATTERY_STATUS_PROPS);

    const update = () => {
      const { current = 0 } = batterySensor;
      const isLowBattery = current <= THRESHOLD;

      imageWidget.setProperty(hmUI.prop.VISIBLE, isLowBattery);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          update();
        }
      },
    });
  },

  _buildConnectionStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, CONNECTION_STATUS_PROPS);
  },
});
