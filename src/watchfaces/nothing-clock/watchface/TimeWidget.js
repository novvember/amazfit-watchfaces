import {
  TIME_POINTERS_AOD_PROPS,
  TIME_POINTERS_PROPS,
} from './TimeWidget.layout';

export class TimeWidget {
  /**
   * @param {{ colorAccent: keyof typeof import('./index.const').COLOR_ACCENT }} params
   */
  constructor({ colorAccent }) {
    this._colorAccent = colorAccent;

    this._buildNormal();
    this._buildAod();
  }

  _buildNormal() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      ...TIME_POINTERS_PROPS,
      second_path: `time/second_${this._colorAccent}.png`,
      second_cover_path: `time/second_top_${this._colorAccent}.png`,
    });
  }

  _buildAod() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_POINTERS_AOD_PROPS);
  }
}
