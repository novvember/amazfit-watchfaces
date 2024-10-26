import { makeCalendarData } from '../utils/makeCalendarData';
import { makeDigitMatrix } from '../utils/makeDigitMatrix';
import { withWeakCache } from '../utils/withWeakCache';
import { makeEmptyGrid } from '../utils/makeEmptyGrid';
import { getSleepTimeHours, getSleepTimeString } from '../utils/getSleepTime';

import {
  CALENDAR,
  DIGITS,
  GRID,
  SCREEN,
  SECONDS_PROGRESS_BAR,
  STEPS,
} from '../utils/constants';

import {
  DOT_IMAGE_PROPS,
  YEAR_IMAGE_PROPS,
  MONTH_IMAGE_PROPS,
  WEEKDAY_IMAGE_PROPS,
  SECONDS_IMAGE_TIME_PROPS,
  SECONDS_PROGRESS_BAR_PROPS,
  STEPS_TEXT_IMAGE_PROPS,
  BATTERY_TEXT_IMAGE_PROPS,
  SLEEP_TEXT_PROPS,
  CONNECT_IMAGE_PROPS,
  DISCONNECT_IMAGE_PROPS,
  ALARM_OFF_IMAGE_PROPS,
  ALARM_ON_IMAGE_PROPS,
  CELL_IMAGE_PROPS,
  AOD_HOURS_PROPS,
  AOD_MINUTES_PROPS,
  SLEEP_PROGRESS_PROPS,
  BATTERY_PROGRESS_PROPS,
  STEPS_PROGRESS_PROPS,
  PULSE_TEXT_IMAGE_PROPS,
  PULSE_PROGRESS_PROPS,
  PULSE_MIN_TEXT_PROPS,
  PULSE_MAX_TEXT_PROPS,
  SLEEP_ICON_IMAGE_PROPS,
} from './index.r.layout';

const makeDigitMatrixCached = withWeakCache(makeDigitMatrix);
const makeCalendarDataCached = withWeakCache(makeCalendarData);

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.initGrid();
    this.buildWeekDays();
    this.buildSeconds();

    this.buildSteps();
    this.buildPulse();
    this.buildBattery();
    this.buildSleepTime();

    this.buildDisconnectionStatus();
    this.buildAlarmStatus();

    this.buildAod();
  },

  onDestroy() {
    console.log('watchface destroying');

    timer.stopTimer(this.renderDatesTimer);
    timer.stopTimer(this.renderSecondsTimer);
    timer.stopTimer(this.buildWeekDaysTimer);
  },

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
    );
  },

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
  },

  /**
   * Prepares initial data
   */
  initGrid() {
    console.log('empty grid building');

    this.grid = makeEmptyGrid(
      SCREEN.centerX,
      SCREEN.centerY,
      GRID.size.columns,
      GRID.size.rows,
      GRID.cell.width,
      GRID.cell.height,
    );

    this.yearWidgets = new Array(GRID.size.rows).fill(null);
    this.monthWidgets = new Array(GRID.size.rows).fill(null);

    let prevTime = null;
    let prevDay = null;

    const update = () => {
      const { hour, minute, day } = hmSensor.createSensor(hmSensor.id.TIME);
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
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.renderDatesTimer = timer.createTimer(500, 500, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timer.stopTimer(this.renderDatesTimer);
      },
    });
  },

  /**
   * Fully rerenders calendar grid with dates
   */
  renderDates() {
    console.log('dates grid rendering');

    const { hour, minute, day, month, year } = hmSensor.createSensor(
      hmSensor.id.TIME,
    );

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
        const newStatus = `${isPartOfBigDigit ? 'active' : 'normal'}${isCurrentDay ? '_today' : ''
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
  },

  /**
   * Fully rerenders left column (year values)
   */
  renderYears() {
    console.log('years rerendered');

    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
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
  },

  /**
   * Fully rerenders right column (month values)
   */
  renderMonths() {
    console.log('months rerendered');

    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
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

    const dotWidget = hmUI.createWidget(hmUI.widget.IMG, null);
    let prevWeek = null;

    const update = () => {
      const { week } = hmSensor.createSensor(hmSensor.id.TIME);

      if (prevWeek === week) {
        return;
      }

      console.log('weekday rerendered');
      prevWeek = week;

      dotWidget.setProperty(hmUI.prop.MORE, {
        ...DOT_IMAGE_PROPS,
        x:
          SCREEN.centerX -
          (GRID.cell.width * GRID.size.columns) / 2 +
          GRID.cell.width * (week - 1),
        y: CALENDAR.weekDay.dotY,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.buildWeekDaysTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timer.stopTimer(this.buildWeekDaysTimer);
      },
    });
  },

  buildSeconds() {
    const { y } = this.grid[GRID.size.rows - 1][0];
    const progressBarY = y + CALENDAR.date.height + SECONDS_PROGRESS_BAR.gapTop;
    const progressBarX = SCREEN.centerX - SECONDS_PROGRESS_BAR.width / 2;

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      ...SECONDS_IMAGE_TIME_PROPS,
      second_startX: SCREEN.centerX - DIGITS.width,
      second_startY:
        y +
        CALENDAR.date.height * 1.5 -
        DIGITS.height / 2 +
        SECONDS_PROGRESS_BAR.gapTop,
    });

    const progressBar = hmUI.createWidget(hmUI.widget.IMG, null);

    let prevSecondRound = null;

    const update = () => {
      const { second } = hmSensor.createSensor(hmSensor.id.TIME);
      const secondRound = Math.round(second / 10) * 10;
      const level = secondRound / 10;

      if (prevSecondRound === secondRound) {
        return;
      }

      console.log('seconds progress bar rerendered');
      prevSecondRound = secondRound;

      progressBar.setProperty(hmUI.prop.MORE, {
        ...SECONDS_PROGRESS_BAR_PROPS,
        x: progressBarX,
        y: progressBarY,
        src: `seconds_progress_bar/${level}.png`,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.renderSecondsTimer = timer.createTimer(500, 500, update);
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
    const progressWidget = hmUI.createWidget(hmUI.widget.IMG, STEPS_PROGRESS_PROPS);

    const update = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const ratio = (current || 0) / (target || 10000);
      const level = Math.min(Math.floor(STEPS.progressImage.count * ratio), STEPS.progressImage.count);
      const imageSrc = `steps/${level}.png`;
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildPulse() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, PULSE_TEXT_IMAGE_PROPS);
    const progressWidget = hmUI.createWidget(hmUI.widget.IMG, PULSE_PROGRESS_PROPS);
    const minTextWidget = hmUI.createWidget(hmUI.widget.TEXT, PULSE_MIN_TEXT_PROPS);
    const maxTextWidget = hmUI.createWidget(hmUI.widget.TEXT, PULSE_MAX_TEXT_PROPS);

    const update = () => {
      const { last, today } = hmSensor.createSensor(hmSensor.id.HEART);
      let min = today.length ? Math.min(...today) : 0;
      let max = today.length ? Math.max(...today) : 0;

      if (min === max) {
        min = 0;
        max = 0;
      }

      const level = min && max && last ?
        Math.min(Math.round(1 + 9 * (last - min) / ((max - min) || 1)), 10) :
        0;

      const imageSrc = `pulse/${level}.png`;

      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
      minTextWidget.setProperty(hmUI.prop.TEXT, min > 0 ? min.toString() : '');
      maxTextWidget.setProperty(hmUI.prop.TEXT, max > 0 ? max.toString() : '');
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, BATTERY_TEXT_IMAGE_PROPS);
    const progressWidget = hmUI.createWidget(hmUI.widget.IMG, BATTERY_PROGRESS_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);
      const level = Math.round((current || 0) / 10);
      const imageSrc = `battery/${level}.png`;
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSleepTime() {
    const progressWidget = hmUI.createWidget(hmUI.widget.IMG, SLEEP_PROGRESS_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, SLEEP_ICON_IMAGE_PROPS);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      console.log('sleep time updated');
      const sleepTime = getSleepTimeString(sleepSensor);

      if (sleepTime) {
        const hours = Math.min(getSleepTimeHours(sleepSensor), 8);
        const imageSrc = `sleep/${hours}.png`;

        textWidget.setProperty(hmUI.prop.TEXT, sleepTime);
        iconWidget.setProperty(hmUI.prop.ALPHA, 255);
        progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
      } else {
        textWidget.setProperty(hmUI.prop.TEXT, '');
        iconWidget.setProperty(hmUI.prop.ALPHA, 0);
        progressWidget.setProperty(hmUI.prop.MORE, SLEEP_PROGRESS_PROPS);
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
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

  buildAod() {
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_HOURS_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_MINUTES_PROPS);
  },
});
