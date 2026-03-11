import { COLORS, FONTS } from './constants';

const SIZE = px(40);

export class ConnectionStatusWidget {
  constructor() {
    this.width = SIZE;
    this.height = SIZE;

    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: px(0),
      y: px(0),
      w: SIZE,
      h: SIZE,
    });

    this._group.createWidget(hmUI.widget.IMG_STATUS, {
      x: 0,
      y: 0,
      type: hmUI.system_status.DISCONNECT,
      src: 'connection_status/icon.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  move(x, y) {
    this._group.setProperty(hmUI.prop.MORE, {
      x,
      y,
    });
  }
}
