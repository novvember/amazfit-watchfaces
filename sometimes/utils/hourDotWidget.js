import { DotWidget } from './dotWidget';

export class HourDotWidget {
  constructor(props) {
    this._dotWidget = new DotWidget(props);
  }

  setState(state) {
    this._dotWidget.toggleState(state);
  }
}