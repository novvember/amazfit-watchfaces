import { getTimeTexts } from '../../../adapters/getTimeTexts';
import {
  CENTER_X,
  CENTER_Y,
  DIGIT_GAP,
  DIGIT_HEIGHT,
  DEFAULT_DIGIT_WIDTH,
  IMAGE_WIDTHS,
  AOD_DIGIT_IMAGE_PROPS,
  DIGIT_IMAGE_PROPS,
} from './TimeTextWidget.layout';

const DIGIT_COUNT = 4;

/**
 * @typedef {object} DigitPosition
 * @property {number} start
 * @property {number} end
 */

/**
 * @typedef {object} TimeTextWidgetParams
 * @property {HmSensorInstance} timeSensor
 */

export class TimeTextWidget {
  /** @param {TimeTextWidgetParams} params */
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;
    this._previousTimeText = '';

    this._digitWidgets = new Array(DIGIT_COUNT)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.IMG, DIGIT_IMAGE_PROPS));

    this._aodDigitWidgets = new Array(DIGIT_COUNT)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.IMG, AOD_DIGIT_IMAGE_PROPS));

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { hourText, minuteText } = getTimeTexts(this._timeSensor);
    const timeText = `${hourText}${minuteText}`;

    if (this._previousTimeText === timeText) {
      return;
    }

    this._previousTimeText = timeText;
    this._render(timeText);
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        const screenType = hmSetting.getScreenType();
        if (
          screenType === hmSetting.screen_type.WATCHFACE ||
          screenType === hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  }

  /**
   * @param {string} imageId
   * @returns {number}
   */
  _getImageWidth(imageId) {
    return px(IMAGE_WIDTHS[imageId] ?? DEFAULT_DIGIT_WIDTH);
  }

  /**
   * @param {string[]} digits
   */
  _calculateXCoords(digits) {
    /** @type {DigitPosition[]} */
    const relativePositions = [];

    for (let i = 0; i < digits.length; i++) {
      const start = i === 0 ? 0 : relativePositions[i - 1].end + DIGIT_GAP;

      relativePositions.push({
        start,
        end: start + this._getImageWidth(digits[i]),
      });
    }

    const startX = Math.floor(
      CENTER_X - relativePositions[relativePositions.length - 1].end / 2,
    );

    return relativePositions.map(
      (relativePosition) => startX + relativePosition.start,
    );
  }

  /**
   * @param {string} text
   */
  _render(text) {
    // Expect a numeric time string; pad to three digits and truncate to four.
    const digits = text.padStart(3, '0').slice(0, DIGIT_COUNT).split('');

    const y = CENTER_Y - DIGIT_HEIGHT / 2;
    const xCoords = this._calculateXCoords(digits);

    for (let i = 0; i < DIGIT_COUNT; i++) {
      const x = xCoords[i] ?? 0;
      // empty.png is intentionally absent: leave the fourth position blank.
      const digit = digits[i] ?? 'empty';

      this._digitWidgets[i].setProperty(hmUI.prop.MORE, {
        x,
        y,
        src: `digits/${digit}.png`,
      });

      this._aodDigitWidgets[i].setProperty(hmUI.prop.MORE, {
        x,
        y,
        src: `digits_aod/${digit}.png`,
      });
    }
  }
}
