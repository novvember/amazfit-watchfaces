import { radiansToDegrees } from '../utils/degrees';

const IMAGE_PADDING = px(5);

export class Line {
  constructor() {
    this._propsBase = {
      x: 0,
      y: 0,
      src: 'line/line.png',
      w: 0,
      h: 0,
      pos_x: 0,
      pos_y: 0,
      center_x: 0,
      center_y: 0,
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    this._widget = hmUI.createWidget(hmUI.widget.IMG, this._propsBase);
  }

  _calculateProps({ x: x0, y: y0 }, { x: x1, y: y1 }) {
    let xLeft = x0;
    let yLeft = y0;
    let xRight = x1;
    let yRight = y1;

    if (x0 > x1) {
      xLeft = x1;
      yLeft = y1;
      xRight = x0;
      yRight = y0;
    }

    let xTop = x0;
    let yTop = y0;
    let xBottom = x1;
    let yBottom = y1;

    if (y0 > y1) {
      xTop = x1;
      yTop = y1;
      xBottom = x0;
      yBottom = y0;
    }

    let isFromTopToBottom = true;

    if (xTop === xRight && yTop === yRight) {
      isFromTopToBottom = false;
    }

    let angleRadians = Math.atan2(yRight - yLeft, xRight - xLeft);

    if (!isFromTopToBottom) {
      angleRadians = Math.atan2(yLeft - yRight, xLeft - xRight) - Math.PI;
    }

    const angle = radiansToDegrees(angleRadians);

    let isCutByWidth = true;

    if (Math.abs(angle) > 45) {
      isCutByWidth = false;
    }

    const pointLeft = {
      x: xLeft,
      y: yLeft,
      x0: xLeft - IMAGE_PADDING,
      y0: yLeft - IMAGE_PADDING,
      y1: yLeft + IMAGE_PADDING,
    };

    const pointRight = {
      x: xRight,
      y: yRight,
      x1: isCutByWidth ? xRight : xRight + IMAGE_PADDING,
      y0: isCutByWidth ? yRight - IMAGE_PADDING : yRight,
      y1: isCutByWidth ? yRight + IMAGE_PADDING : yRight,
    };

    const x = pointLeft.x0;
    const y = isFromTopToBottom ? pointLeft.y0 : pointRight.y0;

    const pos_x = pointLeft.x - x;
    const pos_y = pointLeft.y0 - y;

    const w = pointRight.x1 - x;
    const h = isFromTopToBottom ? pointRight.y1 - y : pointLeft.y1 - y;

    const center_x = pos_x;
    const center_y = pos_y + IMAGE_PADDING;

    return {
      ...this._propsBase,
      x,
      y,
      w,
      h,
      pos_x,
      pos_y,
      center_x,
      center_y,
      angle,
    };
  }

  set(pointStart, pointEnd) {
    const props = this._calculateProps(pointStart, pointEnd);
    this._widget.setProperty(hmUI.prop.MORE, props);
  }
}
