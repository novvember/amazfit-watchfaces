import { clamp } from '../../../utils/clamp';
import {
  PROGRESS_COUNT,
  PROGRESS_GROUP_PROPS,
  PROGRESS_LEVEL_PROPS,
} from './ProgressWidget.layout';

const X = px(93);
const Y = px(331);

export class ProgressWidget {
  constructor() {
    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      ...PROGRESS_GROUP_PROPS,
      x: X,
      y: Y,
    });

    this._levelWidget = this._group.createWidget(
      hmUI.widget.IMG_LEVEL,
      PROGRESS_LEVEL_PROPS,
    );
  }

  /**
   * @param {Number} ratio 
   */
  setLevel(ratio) {
    const level = clamp(
      1,
      Math.floor(PROGRESS_COUNT * ratio + 1),
      PROGRESS_COUNT + 1,
    );

    this._levelWidget.setProperty(hmUI.prop.LEVEL, level);
  }
}
