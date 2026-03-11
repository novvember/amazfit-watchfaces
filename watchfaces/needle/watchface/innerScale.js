import { INNER_PROGRESS_ARC_PROPS } from './innerScale.r.layout';
import { createWidget, widget, prop } from '@zos/ui';

export class InnerScale {
  constructor() {
    this._build();
  }

  _build() {
    this._arcWidget = createWidget(
      widget.ARC_PROGRESS,
      INNER_PROGRESS_ARC_PROPS,
    );
  }

  update(level) {
    this._arcWidget.setProperty(prop.LEVEL, level);
  }
}
