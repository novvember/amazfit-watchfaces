export class StatusIconsWidget {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      x: px(268),
      y: px(18),
      type: hmUI.system_status.DISCONNECT,
      src: 'status/disconnect.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }
}
