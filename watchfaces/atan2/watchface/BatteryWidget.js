import {
  BACKGROUND_IMAGE_PROPS,
  ICON_IMAGE_PROPS,
  TEXT_PROPS,
} from './BatteryWidget.layout';

export class BatteryWidget {
  constructor() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, ICON_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, TEXT_PROPS);
  }
}
