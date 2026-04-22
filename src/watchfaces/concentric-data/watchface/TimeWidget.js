import { getMinuteAngle } from '../../../utils/getTimeAngles';
import { CurrentTimeWidget } from './CurrentTimeWidget';
import { MIN_ANGLE_TO_UPDATE_WHEEL, MINUTE_TEXTS_RADIUS } from './index.const';
import { TimeWheelWidget } from './TimeWheelWidget';
import {
  MINUTE_IMAGE_PROPS,
  MINUTE_TEXT_PROPS,
  SECOND_IMAGE_PROPS,
} from './TimeWidget.layout';

/**
 * @typedef {Object} TimeWidgetParams
 * @property {HmSensorInstance} timeSensor
 */

const TIME_TEXTS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];

export class TimeWidget {
  /**
   * @param {TimeWidgetParams} Params
   */
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;

    this._prevMinuteAngle = Infinity;
    this._prevCurrentHour = Infinity;
    this._prevCurrentMinute = Infinity;

    hmUI.createWidget(hmUI.widget.IMG, SECOND_IMAGE_PROPS);

    this._timeWheelWidget = new TimeWheelWidget({
      imageProps: MINUTE_IMAGE_PROPS,
      textProps: MINUTE_TEXT_PROPS,
      textsRadius: MINUTE_TEXTS_RADIUS,
      getTextImageSrc: (index) =>
        MINUTE_TEXT_PROPS.src.replace('%s', TIME_TEXTS[index]),
    });

    this._currentTimeWidget = new CurrentTimeWidget();

    this._bindHandlers();
  }

  /**
   * @param {HmSensorInstance} timeSensor
   */
  _updateMinuteWheel(timeSensor) {
    const { minute = 0, second = 0 } = timeSensor;
    const angle = (90 + getMinuteAngle(minute, second)) % 360;
    const shouldUpdate =
      Math.abs(angle - this._prevMinuteAngle) >= MIN_ANGLE_TO_UPDATE_WHEEL &&
      Math.abs(360 - angle + this._prevMinuteAngle) >=
        MIN_ANGLE_TO_UPDATE_WHEEL;

    if (!shouldUpdate) {
      return;
    }

    this._prevMinuteAngle = angle;

    this._timeWheelWidget.update(angle);
  }

  /**
   * @param {HmSensorInstance} timeSensor
   */
  _updateCurrentTime(timeSensor) {
    const { hour = 0, minute = 0 } = timeSensor;

    const shouldUpdate =
      hour !== this._prevCurrentHour || minute !== this._prevCurrentMinute;

    if (!shouldUpdate) {
      return;
    }

    this._prevCurrentHour = hour;
    this._prevCurrentMinute = minute;

    this._currentTimeWidget.update(timeSensor);
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;

    const update = () => {
      this._updateMinuteWheel(timeSensor);
      this._updateCurrentTime(timeSensor);
    };

    const updateAod = () => {
      this._updateCurrentTime(timeSensor);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, updateAod);
          updateAod();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, updateAod);
      },
    });
  }
}
