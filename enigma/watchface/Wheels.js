import { Wheel } from './Wheel';

const CHAR_WIDTH = px(92);
const WHEELS_COUNT = 6;

export class Wheels {
  constructor() {
    console.log('wheels building...');

    this._wheels = new Array(WHEELS_COUNT).fill(null).map((_, i) => {
      return new Wheel({
        x: px(480 / 2) - (3 - i) * CHAR_WIDTH,
        color: i === 0 || i === WHEELS_COUNT - 1 ? 0x909090 : 0xffffff,
      });
    });

    this._prevWheelTexts = [];

    console.log('previous wheel text', this._prevWheelTexts.length);
  }

  set(lineTexts = []) {
    const wheelTexts = new Array(WHEELS_COUNT - 2)
      .fill(null)
      .map((_, i) => lineTexts.map((line) => line[i] || '').join(''));

    let wasUpdated = false;

    new Array(WHEELS_COUNT)
      .fill(null)
      .map((_, i) => {
        if (i === 0) return 1;
        if (i === 1) return 0;
        return i;
      })
      .forEach((i) => {
        const text = wheelTexts[i - 1];
        const prevText = this._prevWheelTexts[i - 1];

        if (text !== prevText || wasUpdated) {
          const chars = text ? [null, ...text, null] : [];
          this._wheels[i].set(chars);
          wasUpdated = true;
        }
      });

    this._prevWheelTexts = wheelTexts;

    console.log('wheels text updated');
    console.log('previous wheel text', this._prevWheelTexts.length);
  }
}
