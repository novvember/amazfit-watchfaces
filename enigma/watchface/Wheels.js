import { Wheel } from './Wheel';

const CHAR_WIDTH = px(92);
const WHEELS_COUNT = 6;

export class Wheels {
  constructor() {
    this._wheels = new Array(WHEELS_COUNT).fill(null).map((_, i) => {
      return new Wheel(px(480 / 2) - (3 - i) * CHAR_WIDTH);
    });

    this._prevWheelTexts = [];
  }

  set(lineTexts = []) {
    const wheelTexts = new Array(WHEELS_COUNT - 2)
      .fill(null)
      .map((_, i) => lineTexts.map((line) => line[i] || '').join(''));

    const wasWheelUpdated = new Array(6).fill(false);

    for (let i = 1; i < WHEELS_COUNT - 1; i++) {
      const text = wheelTexts[i - 1];
      const prevText = this._prevWheelTexts[i - 1];

      if (text !== prevText) {
        this._wheels[i].set([null, ...text, null]);
        wasWheelUpdated[i] = true;
      }
    }

    if (wasWheelUpdated[1]) {
      this._wheels[0].set([]);
      wasWheelUpdated[0] = true;
    }

    if (wasWheelUpdated[WHEELS_COUNT - 2]) {
      this._wheels[WHEELS_COUNT - 1].set([]);
      wasWheelUpdated[WHEELS_COUNT - 1] = true;
    }

    this._prevWheelTexts = wheelTexts;
  }
}
