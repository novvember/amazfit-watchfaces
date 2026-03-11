export class Wheel {
  constructor({ x, color }) {
    this._VISIBLE_CHARS_COUNT = 5;

    this._CHAR_WIDTH = px(92);
    this._CHAR_HEIGHT = px(106);
    this._CHAR_COUNT = this._getCharCount();

    this._yUp = px(480 / 2) - 2.5 * this._CHAR_HEIGHT;
    this._yDown =
      this._yUp -
      (this._CHAR_COUNT - this._VISIBLE_CHARS_COUNT) * this._CHAR_HEIGHT;

    this._position = this._getInitialPosition();
    this._prevAnimationStart = 0;

    this._groupWidget = hmUI.createWidget(hmUI.widget.GROUP, {
      x,
      y: this._position === 'up' ? this._yUp : this._yDown,
      w: this._CHAR_WIDTH,
      h: this._CHAR_HEIGHT * this._CHAR_COUNT,
    });

    this._charWidgets = new Array(this._CHAR_COUNT).fill(null).map((_, i) => {
      const props = {
        x: 0,
        y: i * this._CHAR_HEIGHT,
        w: this._CHAR_WIDTH,
        h: this._CHAR_HEIGHT,
        color,
        text_size: px(80),
        font: 'fonts/MartianMono-Medium.ttf',
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text: this._getRandomChar(),
        show_level: hmUI.show_level.ONLY_NORMAL,
      };

      return this._groupWidget.createWidget(hmUI.widget.TEXT, props);
    });
  }

  _getRandomChar() {
    return Math.floor(Math.random() * 10).toString();
  }

  _getCharCount() {
    const MIN = 2 * this._VISIBLE_CHARS_COUNT;
    const MAX = 12;
    return Math.floor(MIN + Math.random() * (MAX - MIN));
  }

  _getAnimationDuration() {
    const MIN = 300;
    const MAX = 1000;
    return Math.floor(MIN + Math.random() * (MAX - MIN));
  }

  _getInitialPosition() {
    return Math.random() > 0.5 ? 'up' : 'down';
  }

  _getAnimationStatus() {
    const diff = Date.now() - this._prevAnimationStart;
    return diff > 2500 && diff < 0;
  }

  _toggleAnimationStatus(isRunning) {
    if (isRunning) {
      this._prevAnimationStart = Date.now();
    } else {
      this._prevAnimationStart = 0;
    }
  }

  _getPreMoveLength() {
    const MIN = 0.2 * this._CHAR_HEIGHT;
    const MAX = 0.8 * this._CHAR_HEIGHT;
    return Math.floor(MIN + Math.random() * (MAX - MIN));
  }

  _updateChars(visibleChars, position) {
    const newCharsIndexStart =
      position === 'up' ? 0 : this._CHAR_COUNT - this._VISIBLE_CHARS_COUNT;
    const newCharsIndexEnd =
      position === 'up' ? this._VISIBLE_CHARS_COUNT - 1 : this._CHAR_COUNT - 1;

    const prevCharsIndexStart =
      position === 'down' ? 0 : this._CHAR_COUNT - this._VISIBLE_CHARS_COUNT;
    const prevCharsIndexEnd =
      position === 'down'
        ? this._VISIBLE_CHARS_COUNT - 1
        : this._CHAR_COUNT - 1;

    this._charWidgets.forEach((charWidget, i) => {
      if (i >= prevCharsIndexStart && i <= prevCharsIndexEnd) {
        return;
      }

      if (i >= newCharsIndexStart && i <= newCharsIndexEnd) {
        const char = visibleChars.shift() || this._getRandomChar();
        charWidget.setProperty(hmUI.prop.TEXT, char);
        return;
      }
      const char = this._getRandomChar();
      charWidget.setProperty(hmUI.prop.TEXT, char);
    });
  }

  _moveGroup(newPosition, { hasAnimation, needPreMove }) {
    let yStart = newPosition === 'up' ? this._yDown : this._yUp;

    if (needPreMove) {
      const preMoveLength = this._getPreMoveLength();
      yStart =
        newPosition === 'up' ? yStart - preMoveLength : yStart + preMoveLength;
    }

    const yEnd = newPosition === 'up' ? this._yUp : this._yDown;

    if (!hasAnimation) {
      this._groupWidget.setProperty(hmUI.prop.Y, yEnd);
      this._position = newPosition;
      return;
    }

    this._toggleAnimationStatus(true);

    const _animId = this._groupWidget.setProperty(hmUI.prop.ANIM, {
      anim_fps: 25,
      anim_auto_destroy: 1,
      anim_auto_start: 1,
      anim_repeat: 0,
      anim_steps: [
        {
          anim_prop: hmUI.prop.Y,
          anim_rate: 'ease',
          anim_duration: this._getAnimationDuration(),
          anim_from: yStart,
          anim_to: yEnd,
          anim_offset: 0,
        },
      ],
      anim_complete_func: () => {
        this._groupWidget.setProperty(hmUI.prop.Y, yEnd);
        this._position = newPosition;
        this._toggleAnimationStatus(false);
      },
    });
  }

  set(visibleChars = [], { hasAnimation, needPreMove }) {
    if (this._getAnimationStatus()) {
      return;
    }

    const newPosition = this._position === 'up' ? 'down' : 'up';

    this._updateChars(
      visibleChars,
      hasAnimation ? newPosition : this._position,
    );

    this._moveGroup(newPosition, { hasAnimation, needPreMove });
  }
}
