import { DotWidget } from './dotWidget';

/**
 * Dot to represent hour value.
 * Can be active/disabled
 */
export class HourDotWidget {
  constructor(props) {
    this._dotWidget = new DotWidget(props);
  }

  setState(state) {
    this._dotWidget.toggleState(state);
  }
}
