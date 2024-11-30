import { DotWidget } from './dotWidget';
import { getMatrixCoords } from './getMatrixCoords';

/**
 * Dot to represent minute value.
 * Can have values 0...5
 */
export class MinuteDotWidget {
  constructor(bigDotProps, smallDotProps, smallDotGap) {
    const smallDotsCoords = getMatrixCoords(
      [2, 2],
      [
        2 * smallDotProps.radius + smallDotGap,
        2 * smallDotProps.radius + smallDotGap,
      ],
      [
        bigDotProps.center_x - smallDotProps.radius - smallDotGap / 2,
        bigDotProps.center_y - smallDotProps.radius - smallDotGap / 2,
      ],
    );

    this._smallDotWidgets = new Array(4).fill(null).map(
      (_, i) =>
        new DotWidget({
          ...smallDotProps,
          center_x: smallDotsCoords[i][0],
          center_y: smallDotsCoords[i][1],
        }),
    );

    this._bigDotWidget = new DotWidget(bigDotProps);

    this.value = undefined;
  }

  setValue(value) {
    if (value >= 5) {
      this._bigDotWidget.toggleVisibility(true);
      this._smallDotWidgets.forEach((widget) => widget.toggleVisibility(false));
      return;
    }

    this._bigDotWidget.toggleVisibility(false);
    this._smallDotWidgets.forEach((widget) => widget.toggleVisibility(true));
    this._smallDotWidgets.forEach((widget, i) =>
      widget.toggleState(i <= value - 1),
    );
  }
}
