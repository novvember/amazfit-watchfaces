import { getTimeTexts } from '../../../adapters/getTimeTexts';
import { getCoordsFromAngle } from '../../../utils/getCoordsFromAngle';
import { getMinuteAngle } from '../../../utils/getTimeAngles';
import {
  HOUR_TEXT_PROPS,
  MINUTE_BACKGROUND_CIRCLE_PROPS,
  TIME_BACKGROUND_PROPS,
  MINUTE_GROUP_PROPS,
  MINUTE_TEXT_PROPS,
} from './TimeWidget.layout';
import { MINUTE_GROUP_RADIUS } from './index.const';

/**
 * @typedef {Object} TimeWidgetParams
 * @property {HmSensorInstance} timeSensor
 */

export class TimeWidget {
  /**
   * @param {TimeWidgetParams} params
   */
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;

    this._buildLayout();
    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _buildLayout() {
    hmUI.createWidget(hmUI.widget.IMG, TIME_BACKGROUND_PROPS);

    this._hourText = hmUI.createWidget(hmUI.widget.TEXT, HOUR_TEXT_PROPS);

    this._minuteGroup = hmUI.createWidget(
      hmUI.widget.GROUP,
      MINUTE_GROUP_PROPS,
    );

    this._minuteGroup.createWidget(
      hmUI.widget.CIRCLE,
      MINUTE_BACKGROUND_CIRCLE_PROPS,
    );
    this._minuteText = this._minuteGroup.createWidget(
      hmUI.widget.TEXT,
      MINUTE_TEXT_PROPS,
    );
  }

  _update() {
    const { minute = 0 } = this._timeSensor;
    const { hourText, minuteText } = getTimeTexts(this._timeSensor);
    const minuteAngle = getMinuteAngle(minute);

    const { x, y } = getCoordsFromAngle({
      degrees: minuteAngle,
      radius: MINUTE_GROUP_RADIUS,
      widgetHeight: MINUTE_GROUP_PROPS.h,
      widgetWidth: MINUTE_GROUP_PROPS.w,
      rotationCenterX: px(240),
      rotationCenterY: px(240),
    });

    this._minuteGroup?.setProperty(hmUI.prop.X, x);
    this._minuteGroup?.setProperty(hmUI.prop.Y, y);
    this._hourText?.setProperty(hmUI.prop.TEXT, hourText);
    this._minuteText?.setProperty(hmUI.prop.TEXT, minuteText);
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(
            timeSensor.event.MINUTEEND,
            this._update,
          );
          this._update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(
          timeSensor.event.MINUTEEND,
          this._update,
        );
      },
    });
  }
}
