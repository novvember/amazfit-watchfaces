import * as ui from '@zos/ui';
import { Battery, Step, Time } from '@zos/sensor';
import { getPackageInfo, getScene, SCENE_WATCHFACE } from '@zos/app';
import {
  BACKGROUND_GRADIENT_IMAGE_PROPS,
  BATTERY_STATUS_PROPS,
  DISCONNECT_STATUS_PROPS,
  EDIT_BACKGROUND_PROPS,
  INFO_TEXT_PROPS,
} from './index.r.layout';
import { TimeWidget } from './TimeWidget';
import { DateWidget } from './DateWidget';
import { StepsWidget } from './StepsWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._buildBackground();
    this._buildTime();
    this._buildDate();
    this._buildSteps();
    this._buildDisconnectStatus();
    this._buildBatteryStatus();
    this._buildInfo();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  _buildBackground() {
    ui.createWidget(ui.widget.WATCHFACE_EDIT_BG, EDIT_BACKGROUND_PROPS);
    ui.createWidget(ui.widget.IMG, BACKGROUND_GRADIENT_IMAGE_PROPS);
  },

  _buildInfo() {
    const { name, version, vender } = getPackageInfo();
    const text = [
      name,
      version ? `v. ${version}` : undefined,
      vender ? `github: @${vender}` : undefined,
    ]
      .filter(Boolean)
      .join(' / ');

    ui.createWidget(ui.widget.TEXT, { ...INFO_TEXT_PROPS, text });
  },

  _buildTime() {
    this._time = this._time || new Time();
    this._timeWidget = new TimeWidget({ time: this._time });
  },

  _buildDate() {
    this._time = this._time || new Time();
    this._dateWidget = new DateWidget({ time: this._time });
  },

  _buildSteps() {
    this._step = this._step || new Step();
    new StepsWidget({ step: this._step });
  },

  _buildDisconnectStatus() {
    ui.createWidget(ui.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },

  _buildBatteryStatus() {
    const MIN_VALUE = 20;
    const battery = new Battery();
    const imageWidget = ui.createWidget(ui.widget.IMG, BATTERY_STATUS_PROPS);

    const update = () => {
      imageWidget.setProperty(
        ui.prop.VISIBLE,
        battery.getCurrent() < MIN_VALUE,
      );
    };

    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          battery.onChange(update);
          update();
        }
      },
      pause_call: () => {
        battery.offChange(update);
      },
    });
  },
});
