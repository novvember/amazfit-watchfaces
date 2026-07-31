import { clamp } from '../../../../utils/clamp';
import { COLORS } from '../index.const';
import {
  WIDGET_BACKGROUND_CIRCLE_PROPS,
  WIDGET_BAR_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';
import { gettext } from 'i18n';

/**
 * @typedef {Object} PaiSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {HmSensorInstance} paiSensor
 */

const BAR_WIDTH = px(8);
const BAR_HEIGHT = px(30);
const BAR_GAP = px(2);

export class PaiSlotWidget {
  /**
   * @param {PaiSlotWidgetParams} params
   */
  constructor({ x, y, w, h, paiSensor }) {
    this._paiSensor = paiSensor;

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    this._barXCoords = new Array(7)
      .fill(null)
      .map(
        (_, i) =>
          centerX - 3.5 * BAR_WIDTH - 3 * BAR_GAP + i * (BAR_WIDTH + BAR_GAP),
      );

    this._barWidgetProps = {
      ...WIDGET_BAR_PROPS,
      x: 0,
      y: centerY - BAR_HEIGHT / 2,
      w: BAR_WIDTH,
      h: BAR_HEIGHT,
      radius: BAR_WIDTH / 2,
      color: COLORS.accent,
    };

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.32 * h,
      w,
      h,
      text: gettext('pai'),
      color: COLORS.accent,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y - 0.3 * h,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.PAI_WEEKLY,
    });

    this._barXCoords.map((x) =>
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        ...this._barWidgetProps,
        x,
        color: COLORS.accentSecondary,
      }),
    );

    this._barWidgets = this._barXCoords.map((x) =>
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        ...this._barWidgetProps,
        x,
      }),
    );

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    this._barWidgets.forEach((barWidget, i) => {
      const value = this._paiSensor[`prepai${i}`];
      const level = (value || 0) / 100;
      const height = clamp(0, level * BAR_HEIGHT, BAR_HEIGHT);
      const y = this._barWidgetProps.y + BAR_HEIGHT - height;

      barWidget.setProperty(hmUI.prop.MORE, {
        ...this._barWidgetProps,
        x: this._barXCoords[i],
        h: height,
        y,
      });
    });
  }

  _bindHandlers() {
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');
        update();
      },
    });
  }
}
