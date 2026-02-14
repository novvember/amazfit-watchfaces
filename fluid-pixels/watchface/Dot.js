import { DOT_PROPS } from './Dot.layout';

export class Dot {
  constructor() {
    this._x = 0;
    this._y = 0;

    this._prevAnimationStart = 0;

    this.width = DOT_PROPS.w;
    this.height = DOT_PROPS.h;

    this._widget = hmUI.createWidget(hmUI.widget.FILL_RECT, DOT_PROPS);
  }

  _getAnimationDuration() {
    const MIN = 100;
    const MAX = 500;
    return Math.floor(MIN + Math.random() * (MAX - MIN));
  }

  _getAnimationStatus() {
    const diff = Date.now() - this._prevAnimationStart;
    return diff > 500 && diff < 0;
  }

  _toggleAnimationStatus(isRunning) {
    if (isRunning) {
      this._prevAnimationStart = Date.now();
    } else {
      this._prevAnimationStart = 0;
    }
  }

  _moveWithoutAnimation(x, y) {
    this._widget.setProperty(hmUI.prop.X, x);
    this._widget.setProperty(hmUI.prop.Y, y);

    this._x = x;
    this._y = y;
  }

  _moveWithAnimation(x, y, x0, y0) {
    this._toggleAnimationStatus(true);

    const animationDuration = this._getAnimationDuration();

    const _animId = this._widget.setProperty(hmUI.prop.ANIM, {
      anim_fps: 25,
      anim_auto_destroy: 1,
      anim_auto_start: 1,
      anim_repeat: 0,
      anim_steps: [
        {
          anim_prop: hmUI.prop.X,
          anim_rate: 'ease',
          anim_duration: animationDuration,
          anim_from: x0 || this._x || x,
          anim_to: x,
          anim_offset: 0,
        },
        {
          anim_prop: hmUI.prop.Y,
          anim_rate: 'ease',
          anim_duration: animationDuration,
          anim_from: y0 || this._y || y,
          anim_to: y,
          anim_offset: 0,
        },
      ],
      anim_complete_func: () => {
        this._moveWithoutAnimation(x, y);
        this._x = x;
        this._y = y;
        this._toggleAnimationStatus(false);
      },
    });
  }

  move({ x, y }, { x: x0, y: y0 } = {}, hasAnimation) {
    if (this._getAnimationStatus()) {
      return;
    }

    if (hasAnimation) {
      this._moveWithAnimation(x, y, x0, y0);
    } else {
      this._moveWithoutAnimation(x, y);
    }
  }
}
