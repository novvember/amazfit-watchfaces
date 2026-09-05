import { SETTINGS_COLOR_OPTIONAL_TYPES } from './ColorSettings.const';
import {
  COLOR_EDIT_GROUP_PROPS,
  BACKGROUND_IMAGE_PROPS,
  BACKGROUND_OVERLAY_PROPS,
} from './ColorSettings.layout';

export class ColorSettings {
  constructor() {
    this.buildBackground();
    this.settings = this._buildEditWidgets();
  }

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.CIRCLE, BACKGROUND_OVERLAY_PROPS);
  }

  _buildEditWidgets() {
    const optionalTypes = SETTINGS_COLOR_OPTIONAL_TYPES;
    const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      ...COLOR_EDIT_GROUP_PROPS,
      edit_id: 110,
      optional_types: optionalTypes,
      count: optionalTypes.length,
      default_type: optionalTypes[0].type,
    });

    const typeId = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
    const chosenType = optionalTypes.find((item) => item.type === typeId);

    return { accent: (chosenType || optionalTypes[0]).data.type };
  }
}
