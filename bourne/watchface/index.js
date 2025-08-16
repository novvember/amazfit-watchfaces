import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { DateWidget } from './DateWidget';
import { HeartRateWidget } from './HeartRateWidget';
import { StepsWidget } from './StepsWidget';
import { TemperatureWidget } from './TemeperatureWidget';
import { TimeWidget } from './TimeWidget';
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
          src: getCharSrc(' ', 'accent'),
          show_level:
            hmUI.show_level.ONLY_NORMAL |
            hmUI.show_level.ONAL_AOD |
            hmUI.show_level.ONLY_EDIT,
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
    const COLORS = ['accent', 'primary', 'secondary', 'secondary', 'secondary'];

    return COLORS[rowIndex];
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

      default:
        console.log('Unknown widget type', type);
    }
  },

  buildDisconnectIcon() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
