import { Wheel } from './Wheel';

const CHAR_WIDTH = px(92);
const WHEELS_COUNT = 6;

export class Wheels {
  constructor() {
    this._wheels = new Array(WHEELS_COUNT).fill(null).map((_, i) => {
      return new Wheel({
        x: px(480 / 2) - (3 - i) * CHAR_WIDTH,
        color: i === 0 || i === WHEELS_COUNT - 1 ? 0xcccccc : 0xffffff,
      });
    });

    this._prevWheelTexts = [];
  }

  set(lineTexts = [], { needFullAnimation, needPreMove }) {
    const wheelTexts = new Array(WHEELS_COUNT - 2)
      .fill(null)
      .map((_, i) => lineTexts.map((line) => line[i] || '').join(''));

    const hasSomeChanges = wheelTexts.some(
      (wheelText, i) => wheelText !== this._prevWheelTexts[i],
    );

    for (let i = 0; i < WHEELS_COUNT; i++) {
      let needUpdate = false;

      if (hasSomeChanges && needFullAnimation) {
        needUpdate = true;
      } else if (i === 0) {
        needUpdate = wheelTexts[1] !== this._prevWheelTexts[1];
      } else if (i === WHEELS_COUNT - 1) {
        needUpdate =
          wheelTexts[wheelTexts.length - 1] !==
          this._prevWheelTexts[wheelTexts.length - 1];
      } else {
        needUpdate = wheelTexts[i - 1] !== this._prevWheelTexts[i - 1];
      }

      if (needUpdate) {
        const text = wheelTexts[i - 1];
        this._wheels[i].set(text ? [null, ...text, null] : [], {
          hasAnimation: true,
          needPreMove,
        });
      }
    }

    this._prevWheelTexts = wheelTexts;
  }
}
