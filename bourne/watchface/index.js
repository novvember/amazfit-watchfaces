import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { AlarmWidget } from './AlarmWidget';
import { BatteryWidget } from './BatteryWidget';
import { CaloriesWidget } from './CaloriesWidget';
import { DateWidget } from './DateWidget';
import { DistanceWidget } from './DistanceWidget';
import { HeartRateWidget } from './HeartRateWidget';
import { SecondsWidget } from './SecondsWidget';
import { SleepWidget } from './SleepWidget';
import { StepsWidget } from './StepsWidget';
import { SunWidget } from './SunWidget';
import { TemperatureWidget } from './TemeperatureWidget';
import { TimeWidget } from './TimeWidget';
import { WeekdayWidget } from './WeekdayWidget';
import { WorldTimeWidget } from './WorldTimeWidget';
import { YearWidget } from './YearWidget';
import { DISCONNECT_STATUS_PROPS } from './index.r.layout';
import { WidgetSettings } from './widgetSettings';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();

    this.buildSettings();
    this.buildRows();

    this.buildDisconnectIcon();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    for (const rowY of CHAR_POSITIONS.rowsY) {
      for (const columnX of CHAR_POSITIONS.columnsX) {
        hmUI.createWidget(hmUI.widget.IMG, {
          x: columnX,
          y: rowY,
          src: getCharSrc(' ', 'white'),
          show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT,
        });
      }
    }
  },

  buildSettings() {
    const settings = new WidgetSettings();
    settings.rows['1'] = 'time';

    this.settings = settings;
  },

  getRowType(rowIndex) {
    return this.settings.rows[rowIndex];
  },

  getRowColor(rowIndex) {
    const COLORS = {
      1: ['red', 'white', 'grey', 'grey', 'grey'],
      2: ['yellow', 'white', 'yellow', 'yellow', 'yellow'],
      3: ['blue', 'white', 'blue', 'blue', 'blue'],
      4: ['red', 'white', 'yellow', 'yellow', 'yellow'],
      5: ['red', 'white', 'green', 'green', 'green'],
      6: ['blue', 'white', 'white', 'green', 'red'],
    };

    const colors = COLORS[this.settings.colors] || COLORS[1];
    return colors[rowIndex];
  },

  buildRows() {
    for (let i = 0; i < 5; i++) {
      const type = this.getRowType(i);
      const color = this.getRowColor(i);
      this.buildRow(i, type, color);
    }
  },

  buildRow(rowIndex, type, color) {
    switch (type) {
      case 'heart-rate':
        new HeartRateWidget(rowIndex, color);
        return;

      case 'time':
        new TimeWidget(rowIndex, color);
        return;

      case 'date':
        new DateWidget(rowIndex, color);
        return;

      case 'temperature':
        new TemperatureWidget(rowIndex, color);
        return;

      case 'steps':
        new StepsWidget(rowIndex, color);
        return;

      case 'battery':
        new BatteryWidget(rowIndex, color);
        return;

      case 'seconds':
        new SecondsWidget(rowIndex, color);
        return;

      case 'alarm':
        new AlarmWidget(rowIndex, color);
        return;

      case 'sun':
        new SunWidget(rowIndex, color);
        return;

      case 'year':
        new YearWidget(rowIndex, color);
        return;

      case 'world-time':
        new WorldTimeWidget(rowIndex, color);
        return;

      case 'calories':
        new CaloriesWidget(rowIndex, color);
        return;

      case 'distance':
        new DistanceWidget(rowIndex, color);
        return;

      case 'sleep':
        new SleepWidget(rowIndex, color);
        return;

      case 'weekday':
        new WeekdayWidget(rowIndex, color);
        return;

      default:
        console.log('Unknown widget type', type);
    }
  },

  buildDisconnectIcon() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
