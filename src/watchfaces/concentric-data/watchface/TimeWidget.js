import { getMinuteAngle } from '../../../utils/getTimeAngles';
import { CurrentTimeWidget } from './CurrentTimeWidget';
import { MINUTE_TEXTS_RADIUS } from './index.const';
import { TimeWheelWidget } from './TimeWheelWidget';
import {
  MINUTE_AOD_IMAGE_PROPS,
  MINUTE_IMAGE_PROPS,
  MINUTE_TEXT_PROPS,
  SECOND_AOD_IMAGE_PROPS,
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

    this._prevMinute = Infinity;

    hmUI.createWidget(hmUI.widget.TIME_POINTER, SECOND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, SECOND_AOD_IMAGE_PROPS);

    this._timeWheelWidget = new TimeWheelWidget({
      imageProps: MINUTE_IMAGE_PROPS,
      textProps: MINUTE_TEXT_PROPS,
      textsRadius: MINUTE_TEXTS_RADIUS,
      getTextImageSrc: (index) =>
        MINUTE_TEXT_PROPS.src.replace('%s', TIME_TEXTS[index]),
    });

    hmUI.createWidget(hmUI.widget.IMG, MINUTE_AOD_IMAGE_PROPS);

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
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;

    const update = () => {
      this._updateMinuteWheel(timeSensor);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
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
