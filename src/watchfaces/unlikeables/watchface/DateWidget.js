import * as ui from '@zos/ui';
import { getScene, SCENE_AOD, SCENE_SETTINGS, SCENE_WATCHFACE } from '@zos/app';
import { getText } from '@zos/i18n';
import { getMonth } from '../../../adapters2/getMonth';
import { getWeekDay } from '../../../adapters2/getWeekDay';
import { DATE_TEXT_PROPS } from './DateWidget.layout';

/**
 * @typedef {object} DateWidgetParams
 * @property {import('@zos/sensor').Time} time
 */

export class DateWidget {
  /** @param {DateWidgetParams} params */
  constructor({ time }) {
    this._time = time;
    this._prevDay = -1;
    this._textWidget = ui.createWidget(ui.widget.TEXT, DATE_TEXT_PROPS);

    this._bindHandlers();
  }

  _update() {
    const day = this._time.getDate();

    if (this._prevDay === day) {
      return;
    }

    this._prevDay = day;

    const monthKey = getMonth(this._time);
    const dayText = getText(monthKey).replace('{day}', String(day));

    const weekdayKey = getWeekDay(this._time);
    const weekDay = getText(weekdayKey);

    const dateText = `${weekDay},\n${dayText}`;

    this._textWidget.setProperty(ui.prop.TEXT, dateText);
  }

  _bindHandlers() {
    const updateIfVisible = () => {
      const scene = getScene();
      if (
        scene === SCENE_WATCHFACE ||
        scene === SCENE_AOD ||
        scene === SCENE_SETTINGS
      ) {
        this._update();
      }
    };

    this._time.onPerMinute(updateIfVisible);

    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: updateIfVisible,
    });
  }
}
