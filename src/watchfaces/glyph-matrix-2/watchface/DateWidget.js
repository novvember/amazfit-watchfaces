import { DATE_DAY_PROPS, DATE_GROUP_PROPS } from './DateWidget.layout';

const Y = px(51);

const X = {
  '-2': px(93),
  '-1': px(135),
  0: px(177),
  1: px(218),
  2: px(275),
};

export class DateWidget {
  constructor() {
    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      ...DATE_GROUP_PROPS,
      x: X[0],
      y: Y,
    });

    this._group.createWidget(hmUI.widget.IMG_DATE, DATE_DAY_PROPS);
  }

  /**
   * @param {-2 | -1 | 0 | 1 | 2} position
   */
  setPosition(position) {
    this._group.setProperty(hmUI.prop.X, X[position] || X[0]);
  }
}
