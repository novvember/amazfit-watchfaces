/**
 * @typedef {Object} ScaleWidgetParams
 * @property {number} angleStart
 * @property {number} angleEnd
 * @property {number} count
 */

import { SCALE_ARC_PROPS, SCALE_TICK_IMAGE_PROPS } from './ScaleWidget.layout';

const ARC_PADDING_ANGLE = 1;

export class ScaleWidget {
  /**
   * @param {ScaleWidgetParams} params
   */
  constructor({ angleStart, angleEnd, count }) {
    this._prevSelectionStart = -1;
    this._prevSelectionEnd = -1;

    this._angleStart = angleStart;
    this._angleEnd = angleEnd;

    const valueGap = 1 / (count - 1);
    const angleGap = (angleEnd - angleStart) / (count - 1);

    this._values = new Array(count).fill(null).map((_, i) => i * valueGap);

    this._states = new Array(count).fill(null).map(() => false);

    this._arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      SCALE_ARC_PROPS,
    );

    this._imageWidgets = new Array(count).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...SCALE_TICK_IMAGE_PROPS,
        src: this._buildSrc(i, false),
        angle: angleStart + i * angleGap,
      }),
    );
  }

  /**
   * @param {number} index
   * @param {boolean} isActive
   */
  _buildSrc(index, isActive) {
    const isMajor = index % 2 === 0;
    return `scale/tick_${isMajor ? 'major' : 'minor'}${isActive ? '_accent' : ''}.png`;
  }

  /**
   * @param {[number, number]} params
   */
  setSelection([start, end]) {
    if (this._prevSelectionStart === start && this._prevSelectionEnd === end) {
      return;
    }

    this._prevSelectionStart = start;
    this._prevSelectionEnd = end;

    this._setTicks([start, end]);
    this._setArc([start, end]);
  }

  /**
   * @param {[number, number]} params
   */
  _setTicks([start, end]) {
    this._imageWidgets.forEach((imageWidget, i) => {
      const value = this._values[i];
      const isActive = value >= start && value <= end;

      if (this._states[i] === isActive) {
        return;
      }

      this._states[i] = isActive;

      imageWidget.setProperty(hmUI.prop.SRC, this._buildSrc(i, isActive));
    });
  }

  /**
   * @param {[number, number]} params
   */
  _setArc([start, end]) {
    const gap = ARC_PADDING_ANGLE;

    const angleLength = Math.abs(this._angleEnd - this._angleStart);

    let angleStart = this._angleStart + start * angleLength - gap;
    let angleEnd = this._angleStart + end * angleLength + gap;

    if (this._angleStart > this._angleEnd) {
      angleStart = this._angleEnd + (angleLength - start * angleLength) + gap;
      angleEnd = this._angleEnd + (angleLength - end * angleLength) - gap;
    }

    this._arcWidget.setProperty(hmUI.prop.MORE, {
      ...SCALE_ARC_PROPS,
      start_angle: angleStart,
      end_angle: angleEnd,
    });
  }
}
