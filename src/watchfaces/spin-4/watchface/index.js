import { getDataWidgetProps } from '../utils/getDataWidgetProps.js';
import { BatteryWidget } from './BatteryWidget.js';
import { HeartWidget } from './HeartWidget.js';
import {
  BACKGROUND_AOD_IMAGE_PROPS,
  BACKGROUND_EDIT_IMAGE_PROPS,
  OVERLAY_CIRCLE_AOD_PROPS,
} from './index.r.layout.js';
import { Settings } from './Settings.js';
import { StepWidget } from './StepWidget.js';
import { TimeWidget } from './TimeWidget.js';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._settings = new Settings();
    this._timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    this.buildBackground();
    this.buildTime();
    this.buildDate();
    this.buildDataWidgets();

    hmUI.createWidget(hmUI.widget.CIRCLE, OVERLAY_CIRCLE_AOD_PROPS);
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_BG,
      BACKGROUND_EDIT_IMAGE_PROPS,
    );
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
  },

  buildTime() {
    new TimeWidget({
      timeSensor: this._timeSensor,
    });
  },

  buildDate() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...getDataWidgetProps('top'),
      x: px(264),
      y: px(217),
      type: hmUI.data_type.DAY,
      padding: false,
    });
  },

  buildDataWidgets() {
    Object.entries(this._settings).forEach(([position, type]) =>
      this.buildDataWidget(position, type),
    );
  },

  /**
   *
   * @param {'top' | 'bottom'} position
   * @param {string} type
   */
  buildDataWidget(position, type) {
    switch (type) {
      case 'steps':
        this._stepSensor =
          this._stepSensor || hmSensor.createSensor(hmSensor.id.STEP);

        new StepWidget({
          position,
          stepSensor: this._stepSensor,
        });
        break;

      case 'battery':
        new BatteryWidget({ position });
        break;

      case 'heart':
        this._heartSensor =
          this._heartSensor || hmSensor.createSensor(hmSensor.id.HEART);

        new HeartWidget({
          position,
          heartSensor: this._heartSensor,
        });
        break;

      case 'empty':
        break;

      default:
        console.log('Unknown data type:', type);
        break;
    }
  },
});
