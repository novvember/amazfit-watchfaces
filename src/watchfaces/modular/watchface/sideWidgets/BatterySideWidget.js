import { formatNumber } from '../../../../utils/formatNumber';
import { SideArcWidget } from './SideArcWidget';

/**
 * @typedef {Object} BatterySideWidgetParams
 * @property {HmSensorInstance} batterySensor
 * @property {'left' | 'right'} side
 */

export class BatterySideWidget {
  /**
   * @param {BatterySideWidgetParams} params
   */
  constructor({ batterySensor, side }) {
    this._batterySensor = batterySensor;

    this._sideArcWidget = new SideArcWidget({
      side,
      title: '%',
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { current = 0 } = this._batterySensor;
    const value = current / 100;

    this._sideArcWidget?.set({
      valueText: formatNumber(current, ' '),
      value,
      selection: [0, value],
    });
  }

  _bindHandlers() {
    const batterySensor = this._batterySensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  }
}
