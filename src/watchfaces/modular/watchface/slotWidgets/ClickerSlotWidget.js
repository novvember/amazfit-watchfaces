import { COLORS } from '../index.const';
import {
  WIDGET_BACKGROUND_CIRCLE_PROPS,
  WIDGET_BUTTON_PROPS,
  WIDGET_ICON_IMAGE_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';

/**
 * @typedef {Object} ClickerSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

const STORAGE_KEY = 'modular-clicker-counter';

export class ClickerSlotWidget {
  /**
   * @param {ClickerSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    this._onButtonClick = this._onButtonClick.bind(this);

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    this._iconY = y - 0.15 * h;

    this._counter = this._getClickerCounter();

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    this._iconWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: this._iconY,
      src: 'clicker/coin.png',
    });

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
      color: COLORS.primary,
      text: this._counter.toString(),
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      ...WIDGET_BUTTON_PROPS,
      x,
      y,
      w,
      h,
      click_func: this._onButtonClick,
    });
  }

  _animateCoin() {
    const yStart = this._iconY;
    const yEnd = this._iconY - px(30);

    const _animId = this._iconWidget.setProperty(hmUI.prop.ANIM, {
      anim_fps: 25,
      anim_auto_destroy: 1,
      anim_auto_start: 1,
      anim_steps: [
        {
          anim_prop: hmUI.prop.Y,
          anim_rate: 'easeout',
          anim_duration: 300,
          anim_from: yStart,
          anim_to: yEnd,
          anim_offset: 0,
        },
        {
          anim_prop: hmUI.prop.Y,
          anim_rate: 'easein',
          anim_duration: 100,
          anim_from: yEnd,
          anim_to: yStart,
          anim_offset: 300,
        },
      ],
    });
  }

  _onButtonClick() {
    this._counter++;
    this._animateCoin();
    this._textWidget.setProperty(hmUI.prop.TEXT, this._counter.toString());
    this._saveClickerCounter(this._counter);
  }

  /**
   * @param {number} counter
   * @returns {void}
   */
  _saveClickerCounter(counter = 0) {
    return hmFS.SysProSetInt(STORAGE_KEY, counter);
  }

  /**
   * @returns {number}
   */
  _getClickerCounter() {
    return hmFS.SysProGetInt(STORAGE_KEY) || 0;
  }
}
