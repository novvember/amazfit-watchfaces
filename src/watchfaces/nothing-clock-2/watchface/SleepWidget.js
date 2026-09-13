import { clamp } from '../../../utils/clamp';
import { getSleepTime } from '../../../adapters/getSleepTime';
import {
  SLEEP_GROUP_PROPS,
  SLEEP_LEVEL_PROPS,
  SLEEP_VALUE_PROPS,
} from './SleepWidget.layout';

export class SleepWidget {
  /**
   * @param {{ sleepSensor: HmSensorInstance }} params
   */
  constructor({ sleepSensor }) {
    this._sleepSensor = sleepSensor;

    const group = hmUI.createWidget(hmUI.widget.GROUP, SLEEP_GROUP_PROPS);

    this._valueWidget = group.createWidget(hmUI.widget.TEXT, SLEEP_VALUE_PROPS);
    this._levelWidget = group.createWidget(
      hmUI.widget.IMG_LEVEL,
      SLEEP_LEVEL_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    this._updateValue();
    this._updatePositions();
  }

  _updateValue() {
    const { text = '', hours = 0 } = getSleepTime(this._sleepSensor);

    const level = clamp(0, hours, 8) + 1;

    this._valueTextLength = text.length;

    this._valueWidget.setProperty(hmUI.prop.TEXT, text);
    this._levelWidget.setProperty(hmUI.prop.LEVEL, level);
  }

  _updatePositions() {
    const charWidth = SLEEP_VALUE_PROPS.text_size * 0.6;
    const sleepValueLength = this._valueTextLength ?? 0;
    const sleepValueEndX =
      SLEEP_VALUE_PROPS.x + Math.round(sleepValueLength * charWidth);

    const levelX = sleepValueEndX + px(8);

    this._levelWidget.setProperty(hmUI.prop.X, levelX);
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
