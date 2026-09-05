import {
  BATTERY_IMAGE_LEVEL_PROPS,
  BATTERY_TEXT_PROPS,
} from './BatteryWidget.layout';

export class BatteryWidget {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, BATTERY_IMAGE_LEVEL_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, BATTERY_TEXT_PROPS);
  }
}
