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
  WEATHER,
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
  PULSE_MIN_TEXT_PROPS,
  PULSE_MAX_TEXT_PROPS,
  SLEEP_ICON_IMAGE_PROPS,
  PULSE_ICON_IMAGE_PROPS,
  AOD_BACKGROUND_PROPS,
  PULSE_BACKGROUND_ARC_PROPS,
  PULSE_TODAY_ARC_PROPS,
  PULSE_LAST_ARC_PROPS,
  STEPS_ICON_IMAGE_PROPS,
  BATTERY_ICON_IMAGE_PROPS,
  AOD_DATE_IMAGE_PROPS,
  WEATHER_SUNRISE_TEXT_PROPS,
  WEATHER_SUNSET_TEXT_PROPS,
  WEATHER_TEXT_IMAGE_PROPS,
  WEATHER_PHASE_IMAGE_PROPS,
  WEATHER_DOT_IMAGE_PROPS,
} from './index.r.layout';
import { clamp } from '../utils/clamp';
import { getSunriseSunsetTimeStrings } from '../utils/getSunriseSunsetTimeStrings';
import { getSunDayDuration, getSunPosition } from '../utils/getSunParams';
import { getFirstWeekDaySetting } from '../utils/getFirstWeekDaySetting';

const makeDigitMatrixCached = withWeakCache(makeDigitMatrix);
const makeCalendarDataCached = withWeakCache(makeCalendarData);

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.firstWeekDaySetting = getFirstWeekDaySetting();

    this.initGrid();
    this.buildWeekDays();
    this.buildSeconds();

    this.buildSteps();
    this.buildPulse();
    this.buildBattery();
    this.buildSleepTime();
    this.buildWeather();

    this.buildDisconnectionStatus();
    this.buildAlarmStatus();

    this.buildAod();
  },

  onDestroy() {
    console.log('watchface destroying');
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
      this.firstWeekDaySetting,
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

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

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
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    let prevWeek = null;

    const update = () => {
      const { week } = timeSensor;

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
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
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

    const progressBar = hmUI.createWidget(hmUI.widget.IMG, {});

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    let prevSecondRound = null;
    let updateTimer = undefined;

    const update = () => {
      const { second } = timeSensor;
      const secondRound = Math.round(second / 10) * 10;
      const level = secondRound / 10;

      if (prevSecondRound === secondRound) {
        return;
      }

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
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildSteps() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, STEPS_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, STEPS_ICON_IMAGE_PROPS);
    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      STEPS_PROGRESS_PROPS,
    );

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current, target } = stepSensor;
      const ratio = (current || 0) / (target || 10000);
      const level = clamp(0, Math.floor(10 * ratio), 10);
      const imageSrc = `steps/${level}.png`;
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildPulse() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, PULSE_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, PULSE_ICON_IMAGE_PROPS);

    const minTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      PULSE_MIN_TEXT_PROPS,
    );
    const maxTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      PULSE_MAX_TEXT_PROPS,
    );

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, PULSE_BACKGROUND_ARC_PROPS);
    const todayArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      PULSE_TODAY_ARC_PROPS,
    );
    const lastArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      PULSE_LAST_ARC_PROPS,
    );

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const getAnglePosition = (heartRate) => {
      if (!heartRate) {
        return;
      }

      const MIN_VALUE = 40;
      const MAX_VALUE = 140;

      const ratio = (heartRate - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);
      const ratioClamped = clamp(0, ratio, 1);

      const { start_angle, end_angle } = PULSE_BACKGROUND_ARC_PROPS;
      const angle = ratioClamped * (end_angle - start_angle) + start_angle;

      return angle;
    };

    const update = () => {
      const { last, today } = heartSensor;
      let min = today.length ? Math.min(...today) : 0;
      let max = today.length ? Math.max(...today) : 0;

      if (min === max) {
        min = 0;
        max = 0;
      }

      const lastAngle = getAnglePosition(last);
      const minAngle = getAnglePosition(min);
      const maxAngle = getAnglePosition(max);

      todayArc.setProperty(hmUI.prop.MORE, {
        ...PULSE_TODAY_ARC_PROPS,
        start_angle: maxAngle,
        end_angle: minAngle,
      });

      lastArc.setProperty(hmUI.prop.MORE, {
        ...PULSE_LAST_ARC_PROPS,
        start_angle: lastAngle ? lastAngle + 1 : undefined,
        end_angle: lastAngle ? lastAngle - 1 : undefined,
      });

      minTextWidget.setProperty(hmUI.prop.TEXT, min > 0 ? min.toString() : '');
      maxTextWidget.setProperty(hmUI.prop.TEXT, max > 0 ? max.toString() : '');
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, BATTERY_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BATTERY_ICON_IMAGE_PROPS);
    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      BATTERY_PROGRESS_PROPS,
    );

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;
      const level = clamp(0, Math.round((current || 0) / 10), 10);
      const imageSrc = `battery/${level}.png`;
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildSleepTime() {
    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      SLEEP_PROGRESS_PROPS,
    );
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    const iconWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      SLEEP_ICON_IMAGE_PROPS,
    );

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTime = getSleepTimeString(sleepSensor);

      if (sleepTime) {
        const level = clamp(0, getSleepTimeHours(sleepSensor), 8);

        textWidget.setProperty(hmUI.prop.TEXT, sleepTime);
        iconWidget.setProperty(hmUI.prop.ALPHA, 255);
        progressWidget.setProperty(hmUI.prop.SRC, `sleep/${level}.png`);
      } else {
        textWidget.setProperty(hmUI.prop.TEXT, '');
        iconWidget.setProperty(hmUI.prop.ALPHA, 0);
        progressWidget.setProperty(hmUI.prop.MORE, SLEEP_PROGRESS_PROPS);
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
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
    hmUI.createWidget(hmUI.widget.IMG, AOD_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_HOURS_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, AOD_MINUTES_PROPS);

    const dateImage = hmUI.createWidget(hmUI.widget.IMG, AOD_DATE_IMAGE_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

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
  },

  buildWeather() {
    const phaseImage = hmUI.createWidget(
      hmUI.widget.IMG,
      WEATHER_PHASE_IMAGE_PROPS,
    );
    const sunriseText = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEATHER_SUNRISE_TEXT_PROPS,
    );
    const sunsetText = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEATHER_SUNSET_TEXT_PROPS,
    );
    hmUI.createWidget(hmUI.widget.TEXT_IMG, WEATHER_TEXT_IMAGE_PROPS);

    const dotImage = hmUI.createWidget(
      hmUI.widget.IMG,
      WEATHER_DOT_IMAGE_PROPS,
    );

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const calculatePhase = () => {
      const sunDayDuration = getSunDayDuration(weatherSensor);
      const ratio = (100 * sunDayDuration) / (24 * 60);
      return Math.round(ratio / 5) * 5;
    };

    const calculateDotPosition = () => {
      const ratio = getSunPosition(weatherSensor, timeSensor);
      const { x, y, width, height } = WEATHER.sineWave;

      const yDot =
        height * (0.5 * Math.sin(ratio / (Math.PI / 20) - Math.PI / 2) + 0.5);
      const xDot = ratio * width;

      return {
        x: Math.round(x + xDot - WEATHER.dot.width / 2),
        y: Math.round(y + height - Math.round(yDot) - WEATHER.dot.height / 2),
      };
    };

    const update = () => {
      console.log('weather data updated');

      const [sunrise, sunset] = getSunriseSunsetTimeStrings(
        weatherSensor,
        is12HourFormat,
      );

      sunriseText.setProperty(hmUI.prop.TEXT, sunrise);
      sunsetText.setProperty(hmUI.prop.TEXT, sunset);

      phaseImage.setProperty(
        hmUI.prop.SRC,
        WEATHER.phaseImage.src.replace('%s', calculatePhase()),
      );

      const { x, y } = calculateDotPosition();
      dotImage.setProperty(hmUI.prop.MORE, {
        ...WEATHER_DOT_IMAGE_PROPS,
        x,
        y,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },
});
