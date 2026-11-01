import { clamp } from '../../../utils/clamp';
import { getSleepTime } from '../../../adapters/getSleepTime';
import {
  HAND_GAP,
  BACKGROUND_GAP,
  VALUE_GAP,
  SLEEP_BACKGROUND_IMAGE_PROPS,
  SLEEP_GROUP_PROPS,
  SLEEP_HAND_IMAGE_PROPS,
  SLEEP_VALUE_TEXT_PROPS,
} from './SleepWidget.layout';

const HAND_COUNT = 2;

/**
 * @typedef {object} SleepWidgetParams
 * @property {HmSensorInstance} sleepSensor
 */

export class SleepWidget {
  /**
   * @param {SleepWidgetParams} params
   */
  constructor({ sleepSensor }) {
    this._sleepSensor = sleepSensor;

    const group = hmUI.createWidget(hmUI.widget.GROUP, SLEEP_GROUP_PROPS);

    this._handImageWidgets = new Array(HAND_COUNT).fill(null).map((_, i) =>
      group.createWidget(hmUI.widget.IMG, {
        ...SLEEP_HAND_IMAGE_PROPS,
        x: i * SLEEP_HAND_IMAGE_PROPS.w + i * HAND_GAP,
      }),
    );

    this._backgroundImageWidget = group.createWidget(
      hmUI.widget.IMG,
      SLEEP_BACKGROUND_IMAGE_PROPS,
    );
    this._valueTextWidget = group.createWidget(
      hmUI.widget.TEXT,
      SLEEP_VALUE_TEXT_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    const { text = '0:00', hours = 0 } = getSleepTime(this._sleepSensor);

    let hoursLeft = hours;

    const handValues = this._handImageWidgets.map(() => {
      const value = clamp(0, hoursLeft, 5);
      hoursLeft -= value;
      return value;
    });

    const handCount = handValues.filter((value) => value > 0).length;

    this._handImageWidgets.forEach((widget, i) => {
      // hands/0.png is intentionally absent: zero hides the hand.
      widget.setProperty(hmUI.prop.SRC, `hands/${handValues[i]}.png`);
    });

    this._valueTextWidget.setProperty(hmUI.prop.TEXT, text);
    this._updateLayout(handCount);
  }

  /** @param {number} handCount */
  _updateLayout(handCount) {
    const handsWidth =
      handCount * SLEEP_HAND_IMAGE_PROPS.w +
      HAND_GAP * clamp(0, handCount - 1, this._handImageWidgets.length);

    this._backgroundImageWidget.setProperty(
      hmUI.prop.X,
      handsWidth + BACKGROUND_GAP,
    );
    this._valueTextWidget.setProperty(hmUI.prop.X, handsWidth + VALUE_GAP);
  }

  _bindHandlers() {
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  }
}
