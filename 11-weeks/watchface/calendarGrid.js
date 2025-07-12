import { getFirstWeekDaySetting } from '../utils/getFirstWeekDaySetting';
import { withWeakCache } from '../utils/withWeakCache';

import { makeCalendarData } from './calendarGrid.utils/makeCalendarData';
import { makeDigitMatrix } from './calendarGrid.utils/makeDigitMatrix';
import { makeEmptyGrid } from './calendarGrid.utils/makeEmptyGrid';

import { CALENDAR, GRID } from './calendarGrid.constants';

import {
  DOT_IMAGE_PROPS,
  YEAR_IMAGE_PROPS,
  MONTH_IMAGE_PROPS,
  WEEKDAY_IMAGE_PROPS,
  CELL_IMAGE_PROPS,
  AOD_HOURS_PROPS,
  AOD_MINUTES_PROPS,
  AOD_BACKGROUND_PROPS,
  AOD_DATE_IMAGE_PROPS,
} from './calendarGrid.r.layout';

const makeDigitMatrixCached = withWeakCache(makeDigitMatrix);
const makeCalendarDataCached = withWeakCache(makeCalendarData);

export class CalendarGrid {
  constructor() {
    this.firstWeekDaySetting = getFirstWeekDaySetting();
    this.timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    this.buildEmptyGrid();
    this.initGrid();
    this.buildWeekDays();
    this.buildAod();
  }

  /**
   * Provides optimized calendar data
   */
  getCalendarData(day, month, year) {
    return makeCalendarDataCached(
      day,
      month,
      year,
      GRID.size.columns,
      GRID.size.rows,
      CALENDAR.currentWeekIndex,
      this.firstWeekDaySetting,
    );
  }

  /**
   * Provides optimized big digits data
   */
  getDigitMatrix(hour, minute) {
    return makeDigitMatrixCached(
      hour,
      minute,
      GRID.size.columns,
      GRID.size.rows,
    );
  }

  /**
   * Prepares initial data
   */
  buildEmptyGrid() {
    console.log('empty grid building');

    this.grid = makeEmptyGrid(
      px(240),
      px(240),
      GRID.size.columns,
      GRID.size.rows,
      GRID.cell.width,
      GRID.cell.height,
    );

    this.yearWidgets = new Array(GRID.size.rows).fill(null);
    this.monthWidgets = new Array(GRID.size.rows).fill(null);
  }

  initGrid() {
    const timeSensor = this.timeSensor;

    let prevTime = null;
    let prevDay = null;

    const update = () => {
      const { hour, minute, day } = timeSensor;
      const time = [hour, minute].join(':');

      if (time !== prevTime) {
        prevTime = time;
        this.renderDates();
      }

      if (day !== prevDay) {
        prevDay = day;
        this.renderYears();
        this.renderMonths();
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
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
   * Fully rerenders calendar grid with dates
   */
  renderDates() {
    console.log('dates grid rendering');

    const { hour, minute, day, month, year } = this.timeSensor;

    const is12HourFormat = hmSetting.getTimeFormat() === 0;
    const hourValue = is12HourFormat ? hour % 12 || 12 : hour;

    const digitMatrix = this.getDigitMatrix(hourValue, minute);
    const { dateMatrix } = this.getCalendarData(day, month, year);

    let countWidgets = 0;

    for (let row = 0; row < GRID.size.rows; row++) {
      for (let column = 0; column < GRID.size.columns; column++) {
        const cell = this.grid[row][column];
        const { imageWidget, status, dateText, x, y } = cell;

        const isPartOfBigDigit = digitMatrix[row][column];
        const isCurrentDay = dateMatrix[row][column].isCurrentDay;

        const newDateText = dateMatrix[row][column].text;
        const newStatus = `${isPartOfBigDigit ? 'active' : 'normal'}${
          isCurrentDay ? '_today' : ''
        }`;

        if (dateText !== newDateText || status !== newStatus) {
          cell.dateText = newDateText;
          cell.status = newStatus;

          imageWidget.setProperty(hmUI.prop.MORE, {
            ...CELL_IMAGE_PROPS,
            x,
            y,
            src: `cell_${newStatus}/${newDateText}.png`,
          });

          countWidgets++;
        }
      }
    }

    console.log(`${countWidgets} widgets updated`);
  }

  /**
   * Fully rerenders left column (year values)
   */
  renderYears() {
    console.log('years rerendered');

    const { day, month, year } = this.timeSensor;
    const { yearsList } = this.getCalendarData(day, month, year);

    for (let row = 0; row < yearsList.length; row++) {
      const year = yearsList[row];
      const widget = this.yearWidgets[row];
      const { x, y } = this.grid[row][0];

      const hasYear = year !== null;
      const hasDot = row === CALENDAR.currentWeekIndex && !hasYear;
      const hasValue = hasDot || hasYear;
      const hasWidget = widget !== null;

      let imageProps = null;

      if (hasValue) {
        const imageX = x - CALENDAR.year.width - CALENDAR.year.gap;

        if (hasDot) {
          imageProps = {
            ...DOT_IMAGE_PROPS,
            x: imageX,
            y,
          };
        } else {
          imageProps = {
            ...YEAR_IMAGE_PROPS,
            x: imageX,
            y,
            src: `year/${year}.png`,
          };
        }
      }

      if (!hasWidget && hasValue) {
        this.yearWidgets[row] = hmUI.createWidget(hmUI.widget.IMG, imageProps);
      } else if (hasWidget && !hasValue) {
        hmUI.deleteWidget(widget);
        this.yearWidgets[row] = null;
      } else if (hasWidget && hasValue) {
        widget.setProperty(hmUI.prop.MORE, imageProps);
      }
    }
  }

  /**
   * Fully rerenders right column (month values)
   */
  renderMonths() {
    console.log('months rerendered');

    const { day, month, year } = this.timeSensor;
    const { monthsList } = this.getCalendarData(day, month, year);

    for (let row = 0; row < monthsList.length; row++) {
      const month = monthsList[row];
      const widget = this.monthWidgets[row];
      const { x, y } = this.grid[row][GRID.size.columns - 1];

      const hasWidget = widget !== null;
      const hasMonth = month !== null;
      const hasDot = row === CALENDAR.currentWeekIndex && !hasMonth;
      const hasValue = hasDot || hasMonth;

      let imageProps = null;

      if (hasValue) {
        const imageX = x + CALENDAR.date.width + CALENDAR.month.gap;

        if (hasDot) {
          imageProps = {
            ...DOT_IMAGE_PROPS,
            x: imageX,
            y,
          };
        } else {
          imageProps = {
            ...MONTH_IMAGE_PROPS,
            x: imageX,
            y,
            src: CALENDAR.month.images[month],
          };
        }
      }

      if (!hasWidget && hasValue) {
        this.monthWidgets[row] = hmUI.createWidget(hmUI.widget.IMG, imageProps);
      } else if (hasWidget && !hasValue) {
        hmUI.deleteWidget(widget);
        this.monthWidgets[row] = null;
      } else if (hasWidget && hasValue) {
        widget.setProperty(hmUI.prop.MORE, imageProps);
      }
    }
  }

  buildWeekDays() {
    const daysOrder =
      this.firstWeekDaySetting === 'monday'
        ? [0, 1, 2, 3, 4, 5, 6]
        : [6, 0, 1, 2, 3, 4, 5];

    for (let i = 0; i < 7; i++) {
      const { x, y } = this.grid[0][i];

      hmUI.createWidget(hmUI.widget.IMG, {
        ...WEEKDAY_IMAGE_PROPS,
        x,
        y: y - CALENDAR.weekDay.height,
        src: CALENDAR.weekDay.images[daysOrder[i]],
      });
    }

    const dotWidget = hmUI.createWidget(hmUI.widget.IMG, {});
    const timeSensor = this.timeSensor;
    let prevWeek = null;

    const update = () => {
      const { week } = timeSensor;
      const dotColumn = this.firstWeekDaySetting === 'sunday' ? week : week - 1;

      if (prevWeek === week) {
        return;
      }

      console.log('weekday rerendered');
      prevWeek = week;

      dotWidget.setProperty(hmUI.prop.MORE, {
        ...DOT_IMAGE_PROPS,
        x:
          px(240) -
          (GRID.cell.width * GRID.size.columns) / 2 +
          GRID.cell.width * dotColumn,
        y: CALENDAR.weekDay.dotY,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  }

  buildAod() {
    hmUI.createWidget(hmUI.widget.IMG, AOD_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_HOURS_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_MINUTES_PROPS);

    const dateImage = hmUI.createWidget(hmUI.widget.IMG, AOD_DATE_IMAGE_PROPS);

    const timeSensor = this.timeSensor;

    const update = () => {
      const { week, day } = timeSensor;
      const row = 3;
      const column = this.firstWeekDaySetting === 'sunday' ? week : week - 1;
      const { x, y } = this.grid[row][column];

      dateImage.setProperty(hmUI.prop.MORE, {
        ...AOD_DATE_IMAGE_PROPS,
        x,
        y,
        src: `cell_aod/${day}.png`,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          update();
        }
      },
    });
  }
}
