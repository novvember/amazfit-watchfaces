import {
  SECONDS_GROUP_PROPS,
  SECONDS_VALUE_TEXT_PROPS,
  SECONDS_RECT_PROPS,
  SECONDS_COLON_TEXT_PROPS,
} from './SecondsWidget.layout';

export class SecondsWidget {
  constructor() {
    const group = hmUI.createWidget(hmUI.widget.GROUP, SECONDS_GROUP_PROPS);

    group.createWidget(hmUI.widget.TEXT, SECONDS_COLON_TEXT_PROPS);
    group.createWidget(hmUI.widget.TEXT_FONT, SECONDS_VALUE_TEXT_PROPS);
    group.createWidget(hmUI.widget.FILL_RECT, SECONDS_RECT_PROPS);
  }
}
