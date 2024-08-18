import { makeCalendarData } from '../utils/makeCalendarData';
import { makeDigitMatrix } from '../utils/makeDigitMatrix';
import { withWeakCache } from '../utils/withWeakCache';
import { makeEmptyGrid } from '../utils/makeEmptyGrid';
import { getSleepTimeString } from '../utils/getSleepTime';

import { CALENDAR, DIGITS, GRID, SCREEN, COLORS } from '../utils/constants';

import {
  DOT_IMAGE_PROPS,
  YEAR_IMAGE_PROPS,
  MONTH_IMAGE_PROPS,
  WEEKDAY_IMAGE_PROPS,
  SECONDS_IMAGE_TIME_PROPS,
  SECONDS_PROGRESS_BAR_PROPS,
  STEPS_TEXT_IMAGE_PROPS,
  STEPS_ARC_BACKGROUND_PROPS,
  STEPS_ARC_ACTIVE_PROPS,
  BATTERY_TEXT_IMAGE_PROPS,
  BATTERY_ARC_BACKGROUND_PROPS,
  BATTERY_ARC_ACTIVE_PROPS,
  SLEEP_ARC_BACKGROUND_PROPS,
  SLEEP_ARC_ACTIVE_PROPS,
  SLEEP_TEXT_PROPS,
  CONNECT_IMAGE_PROPS,
  DISCONNECT_IMAGE_PROPS,
  ALARM_OFF_IMAGE_PROPS,
  ALARM_ON_IMAGE_PROPS,
  CELL_IMAGE_PROPS,
} from './index.r.layout';

const makeDigitMatrixCached = withWeakCache(makeDigitMatrix);
const makeCalendarDataCached = withWeakCache(makeCalendarData);

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildGrid();
    this.buildWeekDays();
    this.buildSeconds();

    this.buildSteps();
    this.buildBattery();
    this.buildSleepTime();

    this.buildDisconnectionStatus();
    this.buildAlarmStatus();
  },

  onDestroy() {
    console.log('watchface destroying');

    timer.stopTimer(this.renderGridTimer);
    timer.stopTimer(this.renderSecondsTimer);
  },

  getCalendarData(day, month, year) {
    return makeCalendarDataCached(
      day,
      month,
      year,
      GRID.size.columns,
      GRID.size.rows,
      CALENDAR.currentWeekIndex,
    );
  },

  getDigitMatrix(hour, minute) {
    return makeDigitMatrixCached(
      hour,
      minute,
      GRID.size.columns,
      GRID.size.rows,
    );
  },

  buildGrid() {
    console.log('empty grid building');

    this.grid = makeEmptyGrid(
      SCREEN.centerX,
      SCREEN.centerY,
      GRID.size.columns,
      GRID.size.rows,
      GRID.cell.width,
      GRID.cell.height,
    );

    this.years = new Array(GRID.size.rows).fill(null);
    this.months = new Array(GRID.size.rows).fill(null);

    let prevMinute = null;
    let prevDay = null;

    const update = () => {
      const { minute, day } = hmSensor.createSensor(hmSensor.id.TIME);

      if (minute !== prevMinute) {
        prevMinute = minute;
        this.renderGrid();
      }

      if (day !== prevDay) {
        prevDay = day;
        this.renderYears();
        this.renderMonths();
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.renderGridTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timer.stopTimer(this.renderGridTimer);
      },
    });
  },

  renderGrid() {
    console.log('date grid rendering');

    const { hour, minute, day, month, year } = hmSensor.createSensor(
      hmSensor.id.TIME,
    );

    const digitMatrix = this.getDigitMatrix(hour, minute);
    const { dateMatrix } = this.getCalendarData(day, month, year);
    const dotWidget = hmUI.createWidget(hmUI.widget.IMG, null);

    for (let row = 0; row < GRID.size.rows; row++) {
      for (let column = 0; column < GRID.size.columns; column++) {
        const cell = this.grid[row][column];

        const { imageWidget, status, dateText, x, y } = cell;

        const isPartOfBigDigit = digitMatrix[row][column];
        const isCurrentDay = dateMatrix[row][column].isCurrentDay;
        const newDateText = dateMatrix[row][column].text;

        let newStatus = isPartOfBigDigit ? 'active' : 'normal';
        if (isCurrentDay) newStatus += '_today';

        if (isCurrentDay && dateText !== newDateText)
          dotWidget.setProperty(hmUI.prop.MORE, {
            ...DOT_IMAGE_PROPS,
            x,
            y: CALENDAR.weekDay.dotY,
          });

        if (dateText !== newDateText || status !== newStatus) {
          cell.dateText = newDateText;
          cell.status = newStatus;

          imageWidget.setProperty(hmUI.prop.MORE, {
            ...CELL_IMAGE_PROPS,
            x,
            y,
            src: `cell_${newStatus}/${newDateText}.png`,
          });
        }
      }
    }
  },

  renderYears() {
    console.log('years rerendered');

    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
    const { yearsList } = this.getCalendarData(day, month, year);

    for (let row = 0; row < yearsList.length; row++) {
      const year = yearsList[row];
      const widget = this.years[row];
      const { x, y } = this.grid[row][0];

      const hasYear = year !== null;
      const hasDot = row === CALENDAR.currentWeekIndex && !hasYear;
      const hasValue = hasDot || hasYear;
      const hasWidget = widget !== null;

      let imageProps = null;

      if (hasValue) {
        const imageX = x - CALENDAR.year.width - CALENDAR.year.gap;

        imageProps = hasDot
          ? {
              ...DOT_IMAGE_PROPS,
              x: imageX,
              y,
            }
          : {
              ...YEAR_IMAGE_PROPS,
              x: imageX,
              y,
              src: `year/${year}.png`,
            };
      }

      if (!hasWidget && hasValue) {
        this.years[row] = hmUI.createWidget(hmUI.widget.IMG, imageProps);
      } else if (hasWidget && !hasValue) {
        hmUI.deleteWidget(widget);
        this.years[row] = null;
      } else if (hasWidget && hasValue) {
        widget.setProperty(hmUI.prop.MORE, imageProps);
      }
    }
  },

  renderMonths() {
    console.log('months rerendered');

    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
    const { monthsList } = this.getCalendarData(day, month, year);

    for (let row = 0; row < monthsList.length; row++) {
      const month = monthsList[row];
      const widget = this.months[row];
      const { x, y } = this.grid[row][GRID.size.columns - 1];

      const hasWidget = widget !== null;
      const hasMonth = month !== null;
      const hasDot = row === CALENDAR.currentWeekIndex && !hasMonth;
      const hasValue = hasDot || hasMonth;

      let imageProps = null;

      if (hasValue) {
        const imageX = x + CALENDAR.date.width + CALENDAR.month.gap;

        imageProps = hasDot
          ? {
              ...DOT_IMAGE_PROPS,
              x: imageX,
              y,
            }
          : {
              ...MONTH_IMAGE_PROPS,
              x: imageX,
              y,
              src: CALENDAR.month.images[month],
            };
      }

      if (!hasWidget && hasValue) {
        this.months[row] = hmUI.createWidget(hmUI.widget.IMG, imageProps);
      } else if (hasWidget && !hasValue) {
        hmUI.deleteWidget(widget);
        this.months[row] = null;
      } else if (hasWidget && hasValue) {
        widget.setProperty(hmUI.prop.MORE, imageProps);
      }
    }
  },

  buildWeekDays() {
    for (let i = 0; i < 7; i++) {
      const { x, y } = this.grid[0][i];

      hmUI.createWidget(hmUI.widget.IMG, {
        ...WEEKDAY_IMAGE_PROPS,
        x,
        y: y - CALENDAR.weekDay.height,
        src: CALENDAR.weekDay.images[i],
      });
    }
  },

  buildSeconds() {
    const { x, y } = this.grid[GRID.size.rows - 1][0];
    const progressBarY = y + CALENDAR.date.height;

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      ...SECONDS_IMAGE_TIME_PROPS,
      second_startX: SCREEN.centerX - DIGITS.width,
      second_startY: y + CALENDAR.date.height * 1.5 - DIGITS.height / 2,
    });

    const progressBar = hmUI.createWidget(hmUI.widget.IMG, null);

    let prevSecondRound = null;

    const update = () => {
      const { second } = hmSensor.createSensor(hmSensor.id.TIME);
      const secondRound = Math.round(second / 10) * 10;

      if (prevSecondRound === secondRound) {
        return;
      }

      console.log('seconds progress bar rerendered');
      prevSecondRound = secondRound;

      progressBar.setProperty(hmUI.prop.MORE, {
        ...SECONDS_PROGRESS_BAR_PROPS,
        x,
        y: progressBarY,
        src: `seconds_progress_bar/${secondRound}.png`,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.renderSecondsTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timer.stopTimer(this.renderSecondsTimer);
      },
    });
  },

  buildSteps() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, STEPS_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, STEPS_ARC_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, STEPS_ARC_ACTIVE_PROPS);
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, BATTERY_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_ARC_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_ARC_ACTIVE_PROPS);
  },

  buildSleepTime() {
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, SLEEP_ARC_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, SLEEP_ARC_ACTIVE_PROPS);

    const sleepTimeWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      SLEEP_TEXT_PROPS,
    );
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const sleepTime = getSleepTimeString(sleepSensor);

          if (sleepTime) {
            sleepTimeWidget.setProperty(hmUI.widget.MORE, {
              text: sleepTime,
            });
          } else {
            sleepTimeWidget.setProperty(hmUI.widget.MORE, {
              text: '',
            });
          }
        }
      },
    });
  },

  buildDisconnectionStatus() {
    hmUI.createWidget(hmUI.widget.IMG, CONNECT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_IMAGE_PROPS);
  },

  buildAlarmStatus() {
    hmUI.createWidget(hmUI.widget.IMG, ALARM_OFF_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, ALARM_ON_IMAGE_PROPS);
  },
});
