import { formatNumber } from '../../../utils/formatNumber';
import { STEPS_TEXT_PROPS, STEPS_ICON_PROPS } from './StepsWidget.layout';

export class StepsWidget {
  /**
   * @param {{ stepSensor: HmSensorInstance }} params
   */
  constructor({ stepSensor }) {
    this._stepSensor = stepSensor;

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);
    this._iconWidget = hmUI.createWidget(hmUI.widget.IMG, STEPS_ICON_PROPS);

    this._charWidth = STEPS_TEXT_PROPS.text_size * 0.6;

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { current = 0 } = this._stepSensor;
    const text = formatNumber(current, ' ');
    const iconX =
      STEPS_ICON_PROPS.x + Math.round(text.length * this._charWidth);

    this._textWidget.setProperty(hmUI.prop.TEXT, text);
    this._iconWidget.setProperty(hmUI.prop.X, iconX);
  }

  _bindHandlers() {
    const update = this._update;
    const stepSensor = this._stepSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  }
}
