import { radiansToDegrees } from './degrees';

export class RotatingDot {
  constructor({ x, y, w, h, src, show_level, getSrc }) {
    this._centerX = x + w / 2;
    this._centerY = y + h / 2;
    this._getSrc = getSrc;

    this._widget = hmUI.createWidget(hmUI.widget.IMG, {
      x,
      y,
      w,
      h,
      src,
      angle: 0,
      center_x: w / 2,
      center_y: h / 2,
      show_level,
    });
  }

  _getParamsToPoint(x, y) {
    const dx = x - this._centerX;
    const dy = y - this._centerY;

    const angleRadians = Math.atan2(dy, dx);
    const angleDegrees = radiansToDegrees(angleRadians) - 90;

    const r = Math.sqrt(dx ** 2 + dy ** 2);

    return [angleDegrees, r];
  }

  _calculateRLevel(r) {
    const MIN = 1;
    const MAX = 8;
    const R_MIN = 0;
    const R_MAX = px(480);
    return Math.round((r / (R_MAX - R_MIN)) * (MAX - MIN) + MIN);
  }

  rotateToPoint(x, y) {
    const [angle, r] = this._getParamsToPoint(x, y);
    const widgetAngle = angle + 90;
    const widgetSrc = this._getSrc(this._calculateRLevel(r));

    this._widget.setProperty(hmUI.prop.ANGLE, widgetAngle);
    this._widget.setProperty(hmUI.prop.SRC, widgetSrc);
  }
}
