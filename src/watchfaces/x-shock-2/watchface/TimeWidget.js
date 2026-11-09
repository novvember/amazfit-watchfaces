import { getIs12HourFormat } from '../../../adapters/getIs12HourFormat';
import {
  TIME_COLON_PROPS,
  TIME_HOUR_PROPS,
  TIME_MINUTE_PROPS,
  TIME_SECOND_PROPS,
  TIME_SECOND_AOD_LEFT_PROPS,
  TIME_SECOND_AOD_RIGHT_PROPS,
  TIME_AM_PM_PROPS,
  TIME_24_HOUR_PROPS,
} from './TimeWidget.layout';

export class TimeWidget {
  constructor() {
    const is12HourFormat = getIs12HourFormat();

    hmUI.createWidget(hmUI.widget.IMG, TIME_COLON_PROPS);

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      ...TIME_HOUR_PROPS,
      hour_zero: is12HourFormat ? 0 : 1,
    });

    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_MINUTE_PROPS);

    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_SECOND_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, TIME_SECOND_AOD_LEFT_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, TIME_SECOND_AOD_RIGHT_PROPS);

    if (is12HourFormat) {
      hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AM_PM_PROPS);
    } else {
      hmUI.createWidget(hmUI.widget.IMG, TIME_24_HOUR_PROPS);
    }
  }
}
