import { makeCalendarData } from '../utils/makeCalendarData';
import { makeDigitMatrix } from '../utils/makeDigitMatrix';
import { withWeakCache } from '../utils/withWeakCache';
import { makeEmptyGrid } from '../utils/makeEmptyGrid';
import { getSleepTimeString } from '../utils/getSleepTime';

import {
  CALENDAR,
  DIGITS,
  GRID,
  SCREEN,
  SECONDS_PROGRESS_BAR,
  COLORS,
} from '../utils/constants';

import {
  getCellDateImageProps,
  getCellBackgroundImageProps,
  getYearImageProps,
  getMonthImageProps,
  getWeekDayImageProps,
  getSecondsImageTimeProps,
  getSecondProgressBarImageProps,
  getStepsTextImageProps,
  getStepsArcBackgroundProps,
  getStepsArcActiveProps,
  getBatteryTextImageProps,
  getBatteryArcBackgroundProps,
  getBatteryArcActiveProps,
  getConnectImageProps,
  getDisconnectImageProps,
  getAlarmOffImageProps,
  getAlarmOnImageProps,
  getSleepArcBackgroundProps,
  getSleepArcActiveProps,
  getSleepTimeProps,
} from './index.r.layout';

const makeDigitMatrixCached = withWeakCache(makeDigitMatrix);
const makeCalendarDataCached = withWeakCache(makeCalendarData);

WatchFace({
  onInit() {
    console.log('watchface on INIT invoke');
  },

  build() {
    console.log('watchface on BUILD invoke');

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
    console.log('watchface on DESTROY invoke');

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

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.renderGridTimer = timer.createTimer(
            500,
            500,
            this.handleRenderGridTimer.bind(this),
          );
          this.handleRenderGridTimer();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(this.renderGridTimer);
      },
    });
  },

  handleRenderGridTimer() {
    const { hour, minute, day } = hmSensor.createSensor(hmSensor.id.TIME);
    const newTime = [hour, minute].join('-');

    if (this.time !== newTime) {
      this.time = newTime;
      this.renderGrid();
    }

    if (this.day !== day) {
      this.day = day;
      this.renderYears();
      this.renderMonths();
    }
  },

  renderGrid() {
    console.log('grid rerendered');

    const { hour, minute, day, month, year } = hmSensor.createSensor(
      hmSensor.id.TIME,
    );

    const digitMatrix = this.getDigitMatrix(hour, minute);
    const { dateMatrix } = this.getCalendarData(day, month, year);

    for (let row = 0; row < GRID.size.rows; row++) {
      for (let column = 0; column < GRID.size.columns; column++) {
        const cell = this.grid[row][column];

        const {
          centerPosition,
          backgroundImageWidget,
          dateWidget,
          status,
          dateText,
        } = cell;

        const isPartOfBigDigit = digitMatrix[row][column];
        const isCurrentDay = dateMatrix[row][column].isCurrentDay;

        let newStatus = isPartOfBigDigit ? 'active' : 'normal';
        if (isCurrentDay) newStatus += '_today';

        const newDateText = dateMatrix[row][column].text;

        if (status !== newStatus) {
          cell.status = newStatus;

          backgroundImageWidget.setProperty(
            hmUI.prop.MORE,
            getCellBackgroundImageProps(centerPosition, newStatus),
          );
        }

        if (dateText !== newDateText || status !== newStatus) {
          cell.dateText = newDateText;

          dateWidget.setProperty(
            hmUI.prop.MORE,
            getCellDateImageProps(
              centerPosition,
              newDateText,
              isPartOfBigDigit,
            ),
          );
        }
      }
    }
  },

  renderYears() {
    console.log('years rerendered');

    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
    const { yearsList } = this.getCalendarData(day, month, year);

    for (let row = 0; row < yearsList.length; row++) {
      const value = yearsList[row];
      const widget = this.years[row];
      const cellToRight = this.grid[row][0];

      if (widget === null && value !== null) {
        this.years[row] = hmUI.createWidget(
          hmUI.widget.IMG,
          getYearImageProps(cellToRight, value),
        );
      } else if (widget !== null && value === null) {
        hmUI.deleteWidget(widget);
        this.years[row] = null;
      } else if (widget !== null && value !== null) {
        widget.setProperty(
          hmUI.prop.MORE,
          getYearImageProps(cellToRight, value),
        );
      }
    }
  },

  renderMonths() {
    console.log('months rerendered');

    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
    const { monthsList } = this.getCalendarData(day, month, year);

    for (let row = 0; row < monthsList.length; row++) {
      const value = monthsList[row];
      const widget = this.months[row];
      const cellToLeft = this.grid[row][GRID.size.columns - 1];

      if (widget === null && value !== null) {
        this.months[row] = hmUI.createWidget(
          hmUI.widget.IMG,
          getMonthImageProps(cellToLeft, value),
        );
      } else if (widget !== null && value === null) {
        hmUI.deleteWidget(widget);
        this.months[row] = null;
      } else if (widget !== null && value !== null) {
        widget.setProperty(
          hmUI.prop.MORE,
          getMonthImageProps(cellToLeft, value),
        );
      }
    }
  },

  buildWeekDays() {
    new Array(7).fill(null).map((_, index) => {
      const cellToBottom = this.grid[0][index];
      hmUI.createWidget(
        hmUI.widget.IMG,
        getWeekDayImageProps(cellToBottom, index),
      );
    });
  },

  buildSeconds() {
    const bottomRow = this.grid[GRID.size.rows - 1];
    const centralBottomCell = bottomRow[Math.floor(bottomRow.length / 2)];

    const secondX = centralBottomCell.centerPosition.x - DIGITS.width;
    const secondY =
      centralBottomCell.centerPosition.y + GRID.cell.height - DIGITS.height / 2;

    const progressBarX =
      centralBottomCell.centerPosition.x - SECONDS_PROGRESS_BAR.width / 2;
    const progressBarY =
      centralBottomCell.centerPosition.y +
      GRID.cell.height -
      SECONDS_PROGRESS_BAR.height / 2;

    hmUI.createWidget(
      hmUI.widget.IMG_TIME,
      getSecondsImageTimeProps(secondX, secondY),
    );

    const progressBar = hmUI.createWidget(hmUI.widget.IMG, null);

    const handleRenderSecondsTimer = () => {
      const { second } = hmSensor.createSensor(hmSensor.id.TIME);
      const newSecondRound = Math.round(second / 10) * 10;

      if (this.secondRound !== newSecondRound) {
        console.log('seconds progress bar rerendered');

        this.secondRound = newSecondRound;
        progressBar.setProperty(
          hmUI.prop.MORE,
          getSecondProgressBarImageProps(
            progressBarX,
            progressBarY,
            newSecondRound,
          ),
        );
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.renderSecondsTimer = timer.createTimer(
            500,
            500,
            handleRenderSecondsTimer,
          );
          handleRenderSecondsTimer();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(this.renderSecondsTimer);
      },
    });
  },

  buildSteps() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, getStepsTextImageProps());
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getStepsArcBackgroundProps());
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getStepsArcActiveProps());
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, getBatteryTextImageProps());
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getBatteryArcBackgroundProps());
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getBatteryArcActiveProps());
  },

  buildSleepTime() {
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getSleepArcBackgroundProps());
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getSleepArcActiveProps());

    const sleepTimeWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      getSleepTimeProps(),
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
              color: COLORS.primary,
            });
          } else {
            sleepTimeWidget.setProperty(hmUI.widget.MORE, {
              text: '— —',
              color: COLORS.secondary,
            });
          }
        }
      },
    });
  },

  buildDisconnectionStatus() {
    hmUI.createWidget(hmUI.widget.IMG, getConnectImageProps());
    hmUI.createWidget(hmUI.widget.IMG_STATUS, getDisconnectImageProps());
  },

  buildAlarmStatus() {
    hmUI.createWidget(hmUI.widget.IMG, getAlarmOffImageProps());
    hmUI.createWidget(hmUI.widget.IMG_STATUS, getAlarmOnImageProps());
  },
});
