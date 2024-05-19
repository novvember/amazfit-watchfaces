import { GRID_POSITIONS, SYMBOLS } from '../utils/constants';
import {
  DATE_DAY_PROPS,
  DATE_DOT_PROPS,
  DATE_MONTH_PROPS,
  DISCONNECT_STATUS_PROPS,
  HEART_VALUE_PROPS,
  STEPS_VALUE_PROPS,
  TEMP_VALUE_PROPS,
  TEXTS_PROPS,
  TIME_COLON_AOD_PROPS,
  TIME_COLON_PROPS,
  TIME_HOURS_PROPS,
  TIME_MINUTES_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.setBackground();

    this.biuldHeart();
    this.buildTime();
    this.buildDate();
    this.buildWeather();
    this.buildSteps();

    this.buildDisconnectIcon();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  setBackground() {
    for (const rowY of GRID_POSITIONS.rowsY) {
      for (const columnX of GRID_POSITIONS.columnsX) {
        hmUI.createWidget(hmUI.widget.IMG, {
          x: columnX,
          y: rowY,
          src: SYMBOLS.empty,
          show_level: hmUI.show_level.ONLY_NORMAL,
        });
      }
    }

    hmUI.createWidget(hmUI.widget.IMG, TEXTS_PROPS);
  },

  biuldHeart() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, HEART_VALUE_PROPS);
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_COLON_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, TIME_COLON_AOD_PROPS);

    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_HOURS_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_MINUTES_PROPS);
  },

  buildDate() {
    hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_DAY_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, DATE_DOT_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_MONTH_PROPS);
  },

  buildWeather() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, TEMP_VALUE_PROPS);
  },

  buildSteps() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, STEPS_VALUE_PROPS);
  },

  buildDisconnectIcon() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
