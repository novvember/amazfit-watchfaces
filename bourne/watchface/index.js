import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { DateWidget } from './DateWidget';
import { HeartRateWidget } from './HeartRateWidget';
import { StepsWidget } from './StepsWidget';
import { TemperatureWidget } from './TemeperatureWidget';
import { TimeWidget } from './TimeWidget';
import { DISCONNECT_STATUS_PROPS } from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();

    new HeartRateWidget(0, 'accent');
    new TimeWidget(1, 'primary');
    new DateWidget(2, 'secondary');
    new TemperatureWidget(3, 'secondary');
    new StepsWidget(4, 'secondary');

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
          show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
        });
      }
    }
  },

  buildDisconnectIcon() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
