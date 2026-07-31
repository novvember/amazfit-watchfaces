import { formatNumber } from '../../../../utils/formatNumber';
import { SideArcWidget } from './SideArcWidget';
import { gettext } from 'i18n';

/**
 * @typedef {Object} StepSideWidgetParams
 * @property {HmSensorInstance} stepSensor
 */

export class StepSideWidget {
  /**
   * @param {StepSideWidgetParams} params
   */
  constructor({ stepSensor }) {
    this._stepSensor = stepSensor;

    this._buildLayout();
    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _buildLayout() {
    this._sideArcWidget = new SideArcWidget({
      side: 'left',
      title: gettext('steps'),
    });
  }

  _update() {
    const { current = 0, target = 10000 } = this._stepSensor;
    const value = current / target;

    this._sideArcWidget?.set({
      valueText: formatNumber(current, ' '),
      value,
      selection: [0, value],
    });
  }

  _bindHandlers() {
    const stepSensor = this._stepSensor;
    const update = this._update;

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
