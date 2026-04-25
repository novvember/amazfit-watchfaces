import { getMinuteAngle } from '../../../utils/getTimeAngles';
import { CurrentTimeWidget } from './CurrentTimeWidget';
import { MINUTE_TEXTS_RADIUS } from './index.const';
import { TimeWheelWidget } from './TimeWheelWidget';
import {
  MINUTE_AOD_IMAGE_PROPS,
  MINUTE_AOD_TEXT_PROPS,
  MINUTE_IMAGE_PROPS,
  MINUTE_TEXT_PROPS,
  SECOND_AOD_IMAGE_PROPS,
  SECOND_IMAGE_PROPS,
} from './TimeWidget.layout';

/**
 * @typedef {Object} TimeWidgetParams
 * @property {HmSensorInstance} timeSensor
 */

export class TimeWidget {
  /**
   * @param {TimeWidgetParams} Params
   */
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;

    this._prevMinute = Infinity;

    hmUI.createWidget(hmUI.widget.TIME_POINTER, SECOND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, SECOND_AOD_IMAGE_PROPS);

    this._timeWheelWidget = new TimeWheelWidget({
      imageProps: MINUTE_IMAGE_PROPS,
      textProps: MINUTE_TEXT_PROPS,
      textsRadius: MINUTE_TEXTS_RADIUS,
      getTextImageSrc: (text) => MINUTE_TEXT_PROPS.src.replace('%s', text),
    });

    this._timeAodWheelWidget = new TimeWheelWidget({
      imageProps: MINUTE_AOD_IMAGE_PROPS,
      textProps: MINUTE_AOD_TEXT_PROPS,
      textsRadius: MINUTE_TEXTS_RADIUS,
      getTextImageSrc: (text) => MINUTE_AOD_TEXT_PROPS.src.replace('%s', text),
    });

    this._currentTimeWidget = new CurrentTimeWidget();

    this._bindHandlers();
  }

  /**
   * @param {HmSensorInstance} timeSensor
   */
  _updateMinuteWheel(timeSensor) {
    const { minute = 0 } = timeSensor;

    if (this._prevMinute === minute) {
      return;
    }

    this._prevMinute = minute;

    const angle = (90 + getMinuteAngle(minute)) % 360;
    this._timeWheelWidget.update(angle);
    this._timeAodWheelWidget.update(angle);
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;

    const update = () => {
      this._updateMinuteWheel(timeSensor);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  }
}
