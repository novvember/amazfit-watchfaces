import {
  EDIT_SCREEN_BACKGROUND_PROPS,
  WIDGET_EDIT_GROUP_PROPS,
  WIDGET_OPTIONAL_TYPES,
  WIDGET_TOP_EDIT_GROUP_PROPS,
  WIDGET_TOP_OPTIONAL_TYPES,
} from './widgetSettings.r.layout';

export class WidgetSettings {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG, EDIT_SCREEN_BACKGROUND_PROPS);

    const editGroupTop = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      WIDGET_TOP_EDIT_GROUP_PROPS,
    );

    const editGroupBottom = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      WIDGET_EDIT_GROUP_PROPS,
    );

    const typeIdTop = editGroupTop.getProperty(hmUI.prop.CURRENT_TYPE);
    const typeIdBottom = editGroupBottom.getProperty(hmUI.prop.CURRENT_TYPE);

    this.typeTop = WIDGET_TOP_OPTIONAL_TYPES.find(
      (item) => item.type === typeIdTop,
    )?.data?.type;

    this.typeBottom = WIDGET_OPTIONAL_TYPES.find(
      (item) => item.type === typeIdBottom,
    )?.data?.type;
  }
}
