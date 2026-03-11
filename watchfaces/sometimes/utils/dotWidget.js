/**
 * Simple widget to represent a dot and to contol it
 * visibility (opacity change) or active/disable state (can change color/radius)
 */
export class DotWidget {
  constructor({
    center_x,
    center_y,
    radius,
    color,
    colorDisabled,
    animationDuration,
    radiusDisabled,
  }) {
    this._props = {
      center_x: center_x || px(240),
      center_y: center_y || px(240),
      radius: radius || px(20),
      radiusDisabled: radiusDisabled || px(20),
      color: color || 0xffffff,
      colorDisabled: colorDisabled || 0x808080,
      animationDuration: animationDuration || 500,
    };

    this._circleWidget = hmUI.createWidget(hmUI.widget.CIRCLE, {
      center_x: this._props.center_x,
      center_y: this._props.center_y,
      radius: this._props.radius,
      color: this._props.color,
      alpha: 255,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._isVisible = true;
    this._isDisabled = false;
  }

  toggleVisibility(state) {
    if (this._isVisible === state) {
      return;
    }

    this._isVisible = state;
    const alphaTo = state ? 255 : 0;

    this._circleWidget.setProperty(hmUI.prop.ALPHA, alphaTo);
  }

  toggleState(state) {
    if (this._isDisabled !== state) {
      return;
    }

    this._isDisabled = !state;

    const color = state ? this._props.color : this._props.colorDisabled;
    const radius = state ? this._props.radius : this._props.radiusDisabled;

    this._circleWidget.setProperty(hmUI.prop.COLOR, color);
    this._circleWidget.setProperty(hmUI.prop.RADIUS, radius);
  }
}
