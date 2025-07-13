import {
  EDIT_SCREEN_BACKGROUND_PROPS,
  WIDGET_EDIT_GROUP_PROPS,
  WIDGET_OPTIONAL_TYPES,
} from './widgetSettings.r.layout';

export class WidgetSettings {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG, EDIT_SCREEN_BACKGROUND_PROPS);

    const editGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      WIDGET_EDIT_GROUP_PROPS,
    );

    const typeId = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);

    this.type = WIDGET_OPTIONAL_TYPES.find(
      (item) => item.type === typeId,
    )?.data?.type;
  }
}
