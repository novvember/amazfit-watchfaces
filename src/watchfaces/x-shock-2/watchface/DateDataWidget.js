import { getDateFormat } from '../../../adapters/getDateFormat';
import {
  DATE_SEPARATOR_PROPS,
  DATE_DAY_PROPS,
  DATE_MONTH_PROPS,
  DATE_WEEKDAY_PROPS,
} from './DateDataWidget.layout';

export class DateDataWidget {
  constructor() {
    const isDayFirst = getDateFormat() === 'day-month-year';

    hmUI.createWidget(hmUI.widget.IMG, DATE_SEPARATOR_PROPS);

    const dayProps = {
      ...DATE_DAY_PROPS,
      day_startX: isDayFirst
        ? DATE_DAY_PROPS.day_startX
        : DATE_MONTH_PROPS.month_startX,
    };
    hmUI.createWidget(hmUI.widget.IMG_DATE, dayProps);

    const monthProps = {
      ...DATE_MONTH_PROPS,
      month_startX: isDayFirst
        ? DATE_MONTH_PROPS.month_startX
        : DATE_DAY_PROPS.day_startX,
    };
    hmUI.createWidget(hmUI.widget.IMG_DATE, monthProps);

    hmUI.createWidget(hmUI.widget.IMG_WEEK, DATE_WEEKDAY_PROPS);
  }
}
