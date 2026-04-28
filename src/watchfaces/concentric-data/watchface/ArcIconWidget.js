/**
 * @typedef {Object} ArcIconWidgetParams
 * @property {string} name
 * @property {number} angle
 * @property {boolean} isExternal
 */

import { DATA_RADIUS } from './index.const';

const IMAGE_WIDTH = px(30);
const IMAGE_HEIGHT = px(24);

export class ArcIconWidget {
  /**
   * @param {ArcIconWidgetParams} params
   */
  constructor({ name, angle, isExternal }) {
    this._widget = hmUI.createWidget(hmUI.widget.IMG, {
      src: this._buildSrc(name),
      w: px(480),
      h: px(480),
      x: 0,
      y: 0,
      pos_x: px(480 / 2) - IMAGE_WIDTH / 2,
      pos_y: isExternal
        ? px(480 / 2) + DATA_RADIUS - IMAGE_HEIGHT / 2
        : px(480 / 2) - DATA_RADIUS - IMAGE_HEIGHT / 2,
      center_x: px(480 / 2),
      center_y: px(480 / 2),
      angle: isExternal ? (angle + 180) % 360 : angle,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  /**
   * @param {string} name
   */
  setName(name) {
    this._widget.setProperty(hmUI.prop.SRC, this._buildSrc(name));
  }

  /**
   * @param {string} name
   */
  _buildSrc(name) {
    return `data_icons/${name}.png`;
  }
}
