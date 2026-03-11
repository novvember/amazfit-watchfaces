import {
  HOUR_BG_PROPS,
  HOUR_GROUP_PROPS,
  HOUR_TEXT_PROPS,
  MINUTE_TEXT,
  TIME_TEXT_PROPS,
} from './timeSlide.r.layout';

export class TimeSlide {
  _CURRENT_MINUTE_INDEX = 1;

  constructor(timeSensor, is12HourFormat) {
    this._timeSensor = timeSensor;
    this._is12HourFormat = is12HourFormat;

    this._fullPathLength = MINUTE_TEXT.height + MINUTE_TEXT.lineSpace;
    this._prevHour = undefined;

    this._buildWidgets();
  }

  _buildWidgets() {
    this._hourTextWidgets = [];

    this._hourGroupWidgets = new Array(2).fill(null).map(() => {
      const group = hmUI.createWidget(hmUI.widget.GROUP, HOUR_GROUP_PROPS);

      group.createWidget(hmUI.widget.FILL_RECT, HOUR_BG_PROPS);

      this._hourTextWidgets.push(
        group.createWidget(hmUI.widget.TEXT, HOUR_TEXT_PROPS),
      );

      return group;
    });

    this._minuteWidgets = new Array(4)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS));
  }

  _getY(second, index) {
    return (
      MINUTE_TEXT.y -
      (second / 60) * this._fullPathLength +
      (index - this._CURRENT_MINUTE_INDEX) * this._fullPathLength
    );
  }

  _formatHour(hour) {
    const value = this._is12HourFormat ? hour % 12 || 12 : hour;
    return value.toString().padStart(2, '0');
  }

  _formatMinute(minute) {
    return minute.toString().padStart(2, '0');
  }

  _updateHours() {
    const { hour, minute, second } = this._timeSensor;
    
    if (this._prevHour !== hour) {
      this._prevHour = hour;

      const nextHour = (hour + 1) % 24;

      this._hourTextWidgets[0].setProperty(
        hmUI.prop.TEXT,
        this._formatHour(hour),
      );
      
      this._hourTextWidgets[1].setProperty(
        hmUI.prop.TEXT,
        this._formatHour(nextHour),
      );
    }

    if (minute >= 58) {
      const y = this._getY(second, 60 - minute + 1);

      this._hourGroupWidgets[1].setProperty(hmUI.prop.Y, y);
      this._hourGroupWidgets[1].setProperty(hmUI.prop.VISIBLE, true);
    } else {
      this._hourGroupWidgets[1].setProperty(hmUI.prop.VISIBLE, false);
    }
  }

  _updateMinutes() {
    const { minute, second } = this._timeSensor;

    this._minuteWidgets.forEach((widget, index) => {
      const value = (minute + index - this._CURRENT_MINUTE_INDEX + 60) % 60;
      const y = this._getY(second, index);

      widget.setProperty(hmUI.prop.MORE, {
        ...TIME_TEXT_PROPS,
        y,
        text: this._formatMinute(value),
      });
    });
  }

  update() {
    this._updateHours();
    this._updateMinutes();
  }
}
