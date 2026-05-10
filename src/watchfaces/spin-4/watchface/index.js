import { formatNumber } from '../../../utils/formatNumber.js';
import {
  BACKGROUND_AOD_IMAGE_PROPS,
  BACKGROUND_EDIT_IMAGE_PROPS,
  DATA_TEXT_PROPS,
  OVERLAY_CIRCLE_AOD_PROPS,
} from './index.r.layout.js';
import { TimeWidget } from './TimeWidget.js';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    this._stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    this.buildBackground();

    this.buildTime();
    this.buildDate();
    this.buildSteps();
    this.buildBattery();

    hmUI.createWidget(hmUI.widget.CIRCLE, OVERLAY_CIRCLE_AOD_PROPS);
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_BG, BACKGROUND_EDIT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
  },

  buildTime() {
    new TimeWidget({
      timeSensor: this._timeSensor,
    });
  },

  buildDate() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...DATA_TEXT_PROPS,
      type: hmUI.data_type.DAY,
      padding: false,
      x: px(264),
      y: px(217),
    });
  },

  buildSteps() {
    const stepSensor = this._stepSensor;

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...DATA_TEXT_PROPS,
      text: '',
      x: px(155),
      y: px(120),
    });

    const update = () => {
      const { current = 0 } = stepSensor;
      const text = formatNumber(current, ' ') + '.';
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor?.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor?.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...DATA_TEXT_PROPS,
      type: hmUI.data_type.BATTERY,
      padding: false,
      unit_type: 1,
      x: px(155),
      y: px(316),
    });
  },
});
