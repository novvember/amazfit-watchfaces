import { getCoordsFromAngle } from '../../../utils/getCoordsFromAngle';
import { roundToClosestCell } from '../utils/roundToClosestCell';
import {
  SUN_FOREGROUND_IMAGE_PROPS,
  SUN_IMAGE_PROPS,
} from './SunWidget.layout';

/**
 * @typedef {Object} SunWidgetParams
 * @property {HmSensorInstance} timeSensor
 * @property {HmSensorInstance} weatherSensor
 */

const RADIUS = 180;
const MIN_ANGLE = -75;
const MAX_ANGLE = 75;

export class SunWidget {
  /**
   * @param {SunWidgetParams} Params
   */
  constructor({ timeSensor, weatherSensor }) {
    this._timeSensor = timeSensor;
    this._weatherSensor = weatherSensor;

    this._imageWidget = hmUI.createWidget(hmUI.widget.IMG, SUN_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, SUN_FOREGROUND_IMAGE_PROPS);
  }

  /**
   * @param {Boolean} isDay
   * @param {Number} ratio
   */
  update(isDay, ratio) {
    if (!isDay) {
      this._imageWidget.setProperty(hmUI.prop.VISIBLE, false);
      return;
    }

    const angle = ratio * (MAX_ANGLE - MIN_ANGLE) + MIN_ANGLE;

    const { x, y } = getCoordsFromAngle({
      degrees: angle,
      radius: RADIUS,
      widgetHeight: 70,
      widgetWidth: 70,
      rotationCenterX: 240,
      rotationCenterY: 240,
    });

    const [xRounded] = roundToClosestCell(x);
    const [yRounded] = roundToClosestCell(y);

    this._imageWidget.setProperty(hmUI.prop.X, px(xRounded));
    this._imageWidget.setProperty(hmUI.prop.Y, px(yRounded));
    this._imageWidget.setProperty(hmUI.prop.VISIBLE, true);
  }
}
