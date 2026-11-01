import { clamp } from '../../../utils/clamp';
import { getSleepTime } from '../../../adapters/getSleepTime';
import {
  SLEEP_BACKGROUND_PROPS,
  SLEEP_GROUP_PROPS,
  SLEEP_HAND_IMAGE_PROPS,
  SLEEP_VALUE_PROPS,
} from './SleepWidget.layout';

const HAND_GAP = px(-6);

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
    this._handCount = 0;

    const group = hmUI.createWidget(hmUI.widget.GROUP, SLEEP_GROUP_PROPS);

    this._handWidgets = new Array(2).fill(null).map((_, i) =>
      group.createWidget(hmUI.widget.IMG, {
        ...SLEEP_HAND_IMAGE_PROPS,
        x: i * SLEEP_HAND_IMAGE_PROPS.w + i * HAND_GAP,
      }),
    );

    this._backgroundWidget = group.createWidget(
      hmUI.widget.IMG,
      SLEEP_BACKGROUND_PROPS,
    );
    this._valueWidget = group.createWidget(hmUI.widget.TEXT, SLEEP_VALUE_PROPS);

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    this._updateValue();
    this._updatePositions();
  }

  _updateValue() {
    const { text = '0:00', hours = 0 } = getSleepTime(this._sleepSensor);

    let hourLeft = hours;

    const handValues = this._handWidgets.map(() => {
      const value = clamp(0, hourLeft, 5);
      hourLeft -= value;
      return value;
    });

    this._handCount = handValues.filter((value) => value > 0).length;

    this._handWidgets.forEach((widget, i) => {
      // hands/0.png is intentionally absent: zero hides the hand.
      widget.setProperty(hmUI.prop.SRC, `hands/${handValues[i]}.png`);
    });

    this._valueWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _updatePositions() {
    const handsWidth =
      this._handCount * SLEEP_HAND_IMAGE_PROPS.w +
      HAND_GAP * clamp(0, this._handCount - 1, this._handWidgets.length);

    this._backgroundWidget.setProperty(hmUI.prop.X, handsWidth + px(8));
    this._valueWidget.setProperty(hmUI.prop.X, handsWidth + px(15));
  }

  _bindHandlers() {
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  }
}
