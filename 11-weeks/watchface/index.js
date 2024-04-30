import { makeCalendarData } from './makeCalendarData';
import { buildTimeMatrix } from './buildTimeMatrix';
import { withCache } from './withCache';

const { width, height } = hmSetting.getDeviceInfo();
const screenCenterX = width / 2;
const screenCenterY = height / 2;

const GRID_COLUMN_COUNT = 7;
const GRID_ROW_COUNT = 11;

const GRID_CELL_WIDTH = 28;
const GRID_CELL_HEIGHT = 28;

const CURRENT_WEEK_INDEX = 2;

const DATE_IMAGE_WIDTH = 26;
const DATE_IMAGE_HEIGHT = 26;

const WEEK_IMAGE_WIDTH = 26;
const WEEK_IMAGE_HEIGHT = 26;

const YEAR_IMAGE_WIDTH = 26;
const YEAR_IMAGE_HEIGHT = 26;

const MONTH_IMAGE_WIDTH = 31;
const MONTH_IMAGE_HEIGHT = 26;

const DIGIT_WIDTH = 10;
const DIGIT_HEIGHT = 16;
const DIGITS = new Array(10).fill(null).map((_, i) => `digits/${i}.png`);

const SECOND_PROGRESS_BAR_WIDTH = 196;
const SECOND_PROGRESS_BAR_HEIGHT = 26;

const ARC_BG_COLOR = 0x3B3A3B;
const ARC_ACTIVE_COLOR = 0xD9D9D9;
const ARC_RADIUS = 200;
const ARC_WIDTH = 12;

const buildTimeMatrixCached = withCache(buildTimeMatrix);
const makeCalendarDataCached = withCache(makeCalendarData);

function makeEmptyGrid() {
  const firstCellPosition = {
    x: screenCenterX - Math.floor(GRID_COLUMN_COUNT / 2) * GRID_CELL_WIDTH,
    y: screenCenterY - Math.floor(GRID_ROW_COUNT / 2) * GRID_CELL_HEIGHT,
  };

  const getCellPosition = (rowIndex, columnIndex) => ({
    x: firstCellPosition.x + columnIndex * GRID_CELL_WIDTH,
    y: firstCellPosition.y + rowIndex * GRID_CELL_HEIGHT,
  });

  return new Array(GRID_ROW_COUNT)
    .fill(null)
    .map((_, rowIndex) => new Array(GRID_COLUMN_COUNT)
      .fill(null)
      .map((_, columnIndex) => ({
        centerPosition: getCellPosition(rowIndex, columnIndex),
        backgroundImageWidget: hmUI.createWidget(hmUI.widget.IMG, null),
        dateWidget: hmUI.createWidget(hmUI.widget.IMG, null),
        status: '',
        dateText: '',
      }))
    );
}

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildGrid();
    this.buildWeekDays();
    this.buildSeconds();

    this.buildSteps();
    this.buildBattery();
    this.buildUV();

    this.buildDisconnectionStatus();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');

    clearInterval(this.renderInterval);
  },

  buildGrid() {
    this.grid = makeEmptyGrid();

    const startUpdate = () => {
      this.renderInterval = setInterval(this.handleRenderInterval.bind(this), 500);
      this.handleRenderInterval();
    };

    const stopUpdate = () => {
      clearInterval(this.renderInterval);
    }

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: (function () {
          console.log('ui resume');

          if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
            startUpdate();
          }
      }),
      pause_call: (function () {
          console.log('ui pause');

          stopUpdate();
      }),
    });
  },

  handleRenderInterval() {
    const { hour, minute, day } = hmSensor.createSensor(hmSensor.id.TIME);
    const newTimestamp = [hour, minute].join('-');

    if (this.timestamp !== newTimestamp) {
      this.timestamp = newTimestamp;
      this.renderGrid();
    }

    if (this.day !== day) {
      this.day = day;
      this.renderYears();
      this.renderMonths();
    }
  },

  renderGrid() {
    const { hour, minute, day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);

    const timeMatrix = buildTimeMatrixCached(hour, minute, GRID_COLUMN_COUNT, GRID_ROW_COUNT);
    const { dateMatrix } = makeCalendarDataCached(day, month, year, GRID_COLUMN_COUNT, GRID_ROW_COUNT, CURRENT_WEEK_INDEX);

    for (let row = 0; row < GRID_ROW_COUNT; row++) {
      for (let column = 0; column < GRID_COLUMN_COUNT; column++) {
        const cell = this.grid[row][column];

        const {
          centerPosition,
          backgroundImageWidget,
          dateWidget,
          status,
          dateText,
        } = cell;

        const isPartOfBigDigit = timeMatrix[row][column];
        const isCurrentDay = dateMatrix[row][column].isCurrentDay;
        
        let newStatus = isPartOfBigDigit ? 'active' : 'normal';
        if (isCurrentDay) newStatus += '_today';

        const newDateText = dateMatrix[row][column].text;

        if (status !== newStatus) {
          cell.status = newStatus;

          backgroundImageWidget.setProperty(hmUI.prop.MORE, {
            x: centerPosition.x - GRID_CELL_WIDTH / 2,
            y: centerPosition.y - GRID_CELL_HEIGHT / 2,
            w: GRID_CELL_WIDTH,
            h: GRID_CELL_HEIGHT,
            src: `cell/${newStatus}.png`,
            show_level: hmUI.show_level.ONLY_NORMAL,
          });
        }

        if (dateText !== newDateText || status !== newStatus) {
          cell.dateText = newDateText;

          dateWidget.setProperty(hmUI.prop.MORE, {
            x: centerPosition.x - DATE_IMAGE_WIDTH / 2,
            y: centerPosition.y - DATE_IMAGE_HEIGHT / 2,
            src: `${isPartOfBigDigit ? 'date_dark' : 'date'}/${newDateText}.png`,
            show_level: hmUI.show_level.ONLY_NORMAL,
          });
        }
      }
    }
  },

  renderYears() {
    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
    const { yearsList } = makeCalendarDataCached(day, month, year, GRID_COLUMN_COUNT, GRID_ROW_COUNT, CURRENT_WEEK_INDEX);

    for (let row = 0; row < yearsList.length; row++) {
      const value = yearsList[row];

      if (value === null) {
        continue;
      }

      const closestCell = this.grid[row][0];

      hmUI.createWidget(hmUI.widget.IMG, {
        x: closestCell.centerPosition.x - GRID_CELL_WIDTH / 2 - YEAR_IMAGE_WIDTH,
        y: closestCell.centerPosition.y - YEAR_IMAGE_HEIGHT / 2,
        src: `year/${value}.png`,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
    }
  },

  renderMonths() {
    const { day, month, year } = hmSensor.createSensor(hmSensor.id.TIME);
    const { monthsList } = makeCalendarDataCached(day, month, year, GRID_COLUMN_COUNT, GRID_ROW_COUNT, CURRENT_WEEK_INDEX);

    for (let row = 0; row < monthsList.length; row++) {
      const value = monthsList[row];

      if (value === null) {
        continue;
      }

      const closestCell = this.grid[row][GRID_COLUMN_COUNT - 1];

      hmUI.createWidget(hmUI.widget.IMG, {
        x: closestCell.centerPosition.x + GRID_CELL_WIDTH / 2,
        y: closestCell.centerPosition.y - MONTH_IMAGE_HEIGHT / 2,
        src: `month/${value}.png`,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
    }
  },

  buildWeekDays() {
    new Array(7).fill(null).map((_, index) => {
      const closestCell = this.grid[0][index];
      
      hmUI.createWidget(hmUI.widget.IMG, {
        x: closestCell.centerPosition.x - WEEK_IMAGE_WIDTH / 2,
        y: closestCell.centerPosition.y - DATE_IMAGE_HEIGHT / 2 - WEEK_IMAGE_HEIGHT,
        src: `week/${index}.png`,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
    })
  },

  buildSeconds() {
    const bottomRow = this.grid[GRID_ROW_COUNT - 1];
    const centralBottomCell = bottomRow[Math.floor(bottomRow.length / 2)];

    const secondX = centralBottomCell.centerPosition.x - DIGIT_WIDTH;
    const secondY = centralBottomCell.centerPosition.y + GRID_CELL_HEIGHT - DIGIT_HEIGHT / 2;

    const progressBarX = centralBottomCell.centerPosition.x - SECOND_PROGRESS_BAR_WIDTH / 2;
    const progressBarY = centralBottomCell.centerPosition.y + GRID_CELL_HEIGHT - SECOND_PROGRESS_BAR_HEIGHT / 2;;

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      second_zero: 0, 
      second_startX: secondX,
      second_startY: secondY,
      second_array: DIGITS,
      second_align: hmUI.align.CENTER_H,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    const progressBar = hmUI.createWidget(hmUI.widget.IMG, null);

    const handleRenderSecondInterval = () => {
      const { second } = hmSensor.createSensor(hmSensor.id.TIME);
      const newSecondRound = Math.round(second / 10) * 10;
  
      if (!this.secondRound !== newSecondRound) {
        this.secondRound = newSecondRound;

        progressBar.setProperty(hmUI.prop.MORE, {
          x: progressBarX,
          y: progressBarY,
          w: SECOND_PROGRESS_BAR_WIDTH,
          h: SECOND_PROGRESS_BAR_HEIGHT,
          src: `seconds_progress_bar/${newSecondRound}.png`,
          show_level: hmUI.show_level.ONLY_NORMAL,
        });
      }
    }

    const startUpdate = () => {
      this.renderSecondInterval = setInterval(handleRenderSecondInterval, 500);
      handleRenderSecondInterval();
    };

    const stopUpdate = () => {
      clearInterval(this.renderSecondInterval);
    }

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: (function () {
          console.log('ui resume');

          if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
            startUpdate();
          }
      }),
      pause_call: (function () {
          console.log('ui pause');

          stopUpdate();
      }),
    });
  },

  buildSteps() {
    const ANGLE_START = 130;
    const ANGLE_END = 50;

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: screenCenterX + ARC_RADIUS - ARC_WIDTH - DIGIT_WIDTH * 5,
      y: screenCenterY - DIGIT_HEIGHT / 2,
      type: hmUI.data_type.STEP,
      font_array: DIGITS,
      align_h: hmUI.align.RIGHT,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: screenCenterX,
      center_y: screenCenterY,
      radius: ARC_RADIUS,
      start_angle: ANGLE_START,
      end_angle: ANGLE_END,
      color: ARC_BG_COLOR,
      line_width: ARC_WIDTH,
      level: 100,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: screenCenterX,
      center_y: screenCenterY,
      radius: ARC_RADIUS,
      start_angle: ANGLE_START,
      end_angle: ANGLE_END,
      color: ARC_ACTIVE_COLOR,
      line_width: ARC_WIDTH,
      type: hmUI.data_type.STEP,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildBattery() {
    const ANGLE_START = 230;
    const ANGLE_END = 265;

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 32,
      y: 255,
      type: hmUI.data_type.BATTERY,
      font_array: DIGITS,
      unit_en: 'percent.png',
      align_h: hmUI.align.LEFT,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: screenCenterX,
      center_y: screenCenterY,
      radius: ARC_RADIUS,
      start_angle: ANGLE_START,
      end_angle: ANGLE_END,
      color: ARC_BG_COLOR,
      line_width: ARC_WIDTH,
      level: 100,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: screenCenterX,
      center_y: screenCenterX,
      start_angle: ANGLE_START,
      end_angle: ANGLE_END,
      radius: ARC_RADIUS,
      line_width: ARC_WIDTH,
      corner_flag: 0,
      color: ARC_ACTIVE_COLOR,
      type: hmUI.data_type.BATTERY,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildUV() {
    const ANGLE_START = 275;
    const ANGLE_END = 310;

    const x = 32;
    const y = 143;

    hmUI.createWidget(hmUI.widget.IMG, {
      x,
      y,
      src: 'uvi.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: x + 30,
      y,
      type: hmUI.data_type.UVI,
      font_array: DIGITS,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: screenCenterX,
      center_y: screenCenterY,
      radius: ARC_RADIUS,
      start_angle: ANGLE_START,
      end_angle: ANGLE_END,
      color: ARC_BG_COLOR,
      line_width: ARC_WIDTH,
      level: 100,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: screenCenterX,
      center_y: screenCenterY,
      start_angle: ANGLE_START,
      end_angle: ANGLE_END,
      radius: ARC_RADIUS,
      line_width: ARC_WIDTH,
      corner_flag: 0,
      color: ARC_ACTIVE_COLOR,
      type: hmUI.data_type.UVI,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildDisconnectionStatus() {
    const HEIGHT = 24;
    const WIDTH = 24;

    const x = 30;
    const y = screenCenterY - HEIGHT / 2;

    hmUI.createWidget(hmUI.widget.IMG, {
      x,
      y,
      w: WIDTH,
      h: HEIGHT,
      src: 'connect/connect.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      x,
      y,
      type: hmUI.system_status.DISCONNECT,
      src: 'connect/disconnect.png',
    });
  },
});
