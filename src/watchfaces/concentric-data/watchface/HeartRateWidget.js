import { getCoordsFromAngle } from '../../../utils/getCoordsFromAngle';
import { clamp } from '../../../utils/clamp';
import {
  HEART_BACKGROUND_ARC_PROPS,
  HEART_CURRENT_ARC_PROPS,
  HEART_DOT_PROPS,
  HEART_TEXT_PROPS,
} from './HeartRateWidget.layout';
import { DATA_RADIUS } from './index.const';
import { ArcIconWidget } from './ArcIconWidget';

/**
 * @typedef {Object} HeartRateWidgetParams
 * @property {HmSensorInstance} heartSensor
 */

const MIN_VALUE = 40;
const MAX_VALUE = 140;

export class HeartRateWidget {
  /**
   * @param {HeartRateWidgetParams} Params
   */
  constructor({ heartSensor }) {
    this._heartSensor = heartSensor;

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, HEART_BACKGROUND_ARC_PROPS);
    this._currentArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      HEART_CURRENT_ARC_PROPS,
    );
    this._dotImage = hmUI.createWidget(hmUI.widget.IMG, HEART_DOT_PROPS);

    new ArcIconWidget({
      name: 'heart',
      angle: 210,
      isExternal: true,
    });

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, HEART_TEXT_PROPS);

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  /**
   * @param {number} heartRate
   */
  _getAnglePosition(heartRate) {
    const level = (heartRate - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);
    const levelClamped = clamp(0, level, 1);

    const { start_angle, end_angle } = HEART_BACKGROUND_ARC_PROPS;
    const angle = levelClamped * (end_angle - start_angle) + start_angle;

    return angle;
  }

  _update() {
    const { last = 0, today = [] } = this._heartSensor;

    const dotAngle = this._getAnglePosition(last);
    const { x, y } = getCoordsFromAngle({
      degrees: dotAngle,
      radius: DATA_RADIUS,
      widgetHeight: HEART_DOT_PROPS.h,
      widgetWidth: HEART_DOT_PROPS.w,
      rotationCenterX: px(240),
      rotationCenterY: px(240),
    });

    const minValue = Math.min(...today);
    const maxValue = Math.max(...today);
    const minAngle = this._getAnglePosition(minValue);
    const maxAngle = this._getAnglePosition(maxValue);

    this._currentArc.setProperty(hmUI.prop.MORE, {
      ...HEART_CURRENT_ARC_PROPS,
      start_angle: minAngle,
      end_angle: maxAngle,
    });
    this._dotImage.setProperty(hmUI.prop.MORE, {
      ...HEART_DOT_PROPS,
      x,
      y,
    });
    this._textWidget.setProperty(hmUI.prop.TEXT, last.toString());
  }

  _bindHandlers() {
    const heartSensor = this._heartSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, this._update);
          this._update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, this._update);
      },
    });
  }
}
