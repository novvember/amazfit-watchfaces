import { getCurrentTimePosition } from '../../../adapters/getCurrentTimePosition';
import { SUN_CHARS_COUNT, SUN_TEXT_PROPS } from './SunWidget.layout';

/**
 * @typedef {Object} SunWidgetParams
 * @property {HmSensorInstance} timeSensor
 * @property {HmSensorInstance} weatherSensor
 */

const BEFORE = ['/', '\\'];
const SUN = ['.-.', "'-'"];
const AFTER = ['\\', '/'];

export class SunWidget {
  /**
   * @param {SunWidgetParams} Params
   */
  constructor({ timeSensor, weatherSensor }) {
    this._timeSensor = timeSensor;
    this._weatherSensor = weatherSensor;
    this._prevValue = -1;

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, SUN_TEXT_PROPS);

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { isDay, ratio } = getCurrentTimePosition(
      this._timeSensor,
      this._weatherSensor,
    );

    const sunPosition = this._calculateSunPosition(isDay, ratio);

    if (this._prevValue === sunPosition) {
      return;
    }

    this._prevValue = sunPosition;

    const art = this._generateArt(sunPosition);
    this._textWidget.setProperty(hmUI.prop.TEXT, art);
  }

  /**
   *
   * @param {Boolean} isDay
   * @param {Number} ratio
   * @returns {Number}
   */
  _calculateSunPosition(isDay, ratio) {
    if (!isDay && ratio < 0.5) {
      return Infinity;
    }

    if (!isDay) {
      return -Infinity;
    }

    return Math.round(ratio * (SUN_CHARS_COUNT - 1));
  }

  /**
   * @param {Number} sunPosition
   * @returns {String}
   */
  _generateArt(sunPosition) {
    const sunStart = sunPosition - (SUN[0].length - 1) / 2;
    const sunEnd = sunPosition + (SUN[0].length - 1) / 2;

    const lines = new Array(2).fill(null).map((_, rowIndex) => {
      const line = [];

      for (let i = 0; i < SUN_CHARS_COUNT; i++) {
        if (i < sunStart) {
          line.push(BEFORE[rowIndex]);
        } else if (i > sunEnd) {
          line.push(AFTER[rowIndex]);
        } else {
          const position = i - sunPosition + 1;

          if (position >= 0) {
            line.push(SUN[rowIndex][position]);
          }
        }
      }

      return line.join('');
    });

    return lines.join('\n');
  }

  _bindHandlers() {
    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this._update();
        }
      },
    });
  }
}
