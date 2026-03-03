export class Dot {
  constructor() {
    this._propsBase = {
      center_x: 0,
      center_y: 0,
      radius: px(10),
      color: 0xe64b00,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    this._widget = hmUI.createWidget(hmUI.widget.CIRCLE, this._propsBase);
  }

  set({ x, y }) {
    this._widget.setProperty(hmUI.prop.MORE, {
      ...this._propsBase,
      center_x: x,
      center_y: y,
    });
  }
}
