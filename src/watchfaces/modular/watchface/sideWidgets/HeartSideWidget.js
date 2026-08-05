import { formatNumber } from '../../../../utils/formatNumber';
import { SideArcWidget } from './SideArcWidget';
import { gettext } from 'i18n';

/**
 * @typedef {Object} HeartSideWidgetParams
 * @property {HmSensorInstance} heartSensor
 * @property {'left' | 'right'} side
 */

const MIN_VALUE = 40;
const MAX_VALUE = 140;

export class HeartSideWidget {
  /**
   * @param {HeartSideWidgetParams} params
   */
  constructor({ heartSensor, side }) {
    this._heartSensor = heartSensor;

    this._sideArcWidget = new SideArcWidget({
      side,
      title: gettext('bpm'),
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { last = 0, today = [] } = this._heartSensor;
    const min = today.length ? Math.min(...today) : 0;
    const max = today.length ? Math.max(...today) : 0;

    this._sideArcWidget?.set({
      valueText: formatNumber(last, ' '),
      value: (last - MIN_VALUE) / (MAX_VALUE - MIN_VALUE),
      selection: [
        (min - MIN_VALUE) / (MAX_VALUE - MIN_VALUE),
        (max - MIN_VALUE) / (MAX_VALUE - MIN_VALUE),
      ],
    });
  }

  _bindHandlers() {
    const heartSensor = this._heartSensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  }
}
