import { createWidget, widget, prop } from '@zos/ui';
import {
  ACTIVITY_ICON_IMAGE_PROPS,
  OUTER_BACKGROUND_IMAGE_PROPS,
  OUTER_PROGRESS_ARC_PROPS,
  OUTER_TICK_BACKGROUND_CIRCLE_PROPS,
  OUTER_TICK_GROUP_PROPS,
  OUTER_TICK_TEXT_PROPS,
  OUTER_TICKS_IMAGE_PROPS,
  OUTER_TICKS_PARAMS,
} from './outerScale.r.layout';

export class OuterScale {
  constructor() {
    this._build();
  }

  _build() {
    createWidget(widget.IMG, OUTER_TICKS_IMAGE_PROPS);

    this._progressWidget = createWidget(
      widget.ARC_PROGRESS,
      OUTER_PROGRESS_ARC_PROPS,
    );

    createWidget(widget.IMG, OUTER_BACKGROUND_IMAGE_PROPS);

    createWidget(widget.IMG, ACTIVITY_ICON_IMAGE_PROPS);

    this._labelWidgets = OUTER_TICKS_PARAMS.map(({ x, y, value }) => {
      const group = createWidget(widget.GROUP, {
        ...OUTER_TICK_GROUP_PROPS,
        x,
        y,
      });

      group.createWidget(widget.CIRCLE, OUTER_TICK_BACKGROUND_CIRCLE_PROPS);

      group.createWidget(widget.TEXT, {
        ...OUTER_TICK_TEXT_PROPS,
        text: value.toString(),
      });

      return group;
    });
  }

  update(level) {
    this._progressWidget.setProperty(prop.LEVEL, 100 - level);

    this._labelWidgets.forEach((widget, i) => {
      const value = OUTER_TICKS_PARAMS[i].value;
      widget.setProperty(prop.VISIBLE, value > level);
    });
  }
}
