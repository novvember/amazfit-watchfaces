import { getDay } from '../adapters/getDay';
import { getWeekDay } from '../adapters/getWeekDay';
import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import { getMiddleAngle } from '../utils/getMiddleAngle';
import { getTimeAngles } from '../utils/getTimeAngles';
import {
  DATE_TEXT_PROPS,
  DOT_IMAGE_PROPS,
  GROUP_PROPS,
  WEEKDAY_TEXT_PROPS,
} from './DateWidget.layout';
import { gettext } from 'i18n';

const DATE_RADIUS = px(282 / 2);

const ROTATION_CENTER_X = px(240);
const ROTATION_CENTER_Y = px(240);

export class DateWidget {
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;

    this._group = hmUI.createWidget(hmUI.widget.GROUP, GROUP_PROPS);

    this._group.createWidget(hmUI.widget.IMG, DOT_IMAGE_PROPS);

    this._weekdayWidget = this._group.createWidget(
      hmUI.widget.TEXT,
      WEEKDAY_TEXT_PROPS,
    );

    this._dateWidget = this._group.createWidget(
      hmUI.widget.TEXT,
      DATE_TEXT_PROPS,
    );

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    this._updateTexts();
    this._updatePosition();
  }

  _updateTexts() {
    const day = getDay(this._timeSensor);
    const weekdayKey = getWeekDay(this._timeSensor);

    this._weekdayWidget.setProperty(
      hmUI.prop.TEXT,
      gettext(weekdayKey).toUpperCase(),
    );
    this._dateWidget.setProperty(hmUI.prop.TEXT, day.toString());
  }

  _updatePosition() {
    const { hour = 0, minute = 0 } = this._timeSensor;

    const angles = getTimeAngles(hour, minute);
    const angle = getMiddleAngle(angles.hours, angles.minutes);

    const { x, y } = getCoordsFromAngle(angle);

    const centerX = DATE_RADIUS * x + ROTATION_CENTER_X;
    const centerY = DATE_RADIUS * y + ROTATION_CENTER_Y;

    const widgetX = centerX - GROUP_PROPS.w / 2;
    const widgetY = centerY - GROUP_PROPS.h / 2;

    this._group.setProperty(hmUI.prop.X, widgetX);
    this._group.setProperty(hmUI.prop.Y, widgetY);
  }

  _bindHandlers() {
    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          this._timeSensor.addEventListener?.(
            this._timeSensor.event.MINUTEEND,
            this._update,
          );
          this._update();
        }
      },
      pause_call: () => {
        this._timeSensor.removeEventListener?.(
          this._timeSensor.event.MINUTEEND,
          this._update,
        );
      },
    });
  }
}
