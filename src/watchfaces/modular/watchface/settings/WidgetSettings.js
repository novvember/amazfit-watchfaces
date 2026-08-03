import {
  SETTINGS_EDIT_GROUP_SIZE,
  SETTINGS_WIDGET_EDIT_GROUP_OFFSET,
  SETTINGS_WIDGET_OPTIONAL_TYPES,
} from './WidgetSettings.const';
import { COLORS, WIDGETS } from '../index.const';

const EDIT_GROUPS_PARAMS = new Array(6).fill(null).map((_, i) => ({
  name: i.toString(),
  props: {
    x: WIDGETS[i].x - SETTINGS_WIDGET_EDIT_GROUP_OFFSET,
    y: WIDGETS[i].y - SETTINGS_WIDGET_EDIT_GROUP_OFFSET,
    tips_y: i < 3 ? SETTINGS_EDIT_GROUP_SIZE + px(5) : -1 * px(30 + 5),
  },
}));

export class WidgetSettings {
  constructor() {
    this._buildBackground();
    this.settings = this._buildEditWidgets();
  }

  _buildBackground() {
    const { name, version, vender } = hmApp.getPackageInfo();

    const text = [
      name,
      version ? `v. ${version}` : undefined,
      vender ? `github: @${vender}` : undefined,
    ]
      .filter(Boolean)
      .join(' | ');

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(126),
      y: px(424),
      w: px(228),
      h: px(32),
      text,
      color: COLORS.primary,
      text_size: px(24),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      show_level: hmUI.show_level.ONLY_EDIT,
    });
  }

  _buildEditWidgets() {
    const editGroupParams = EDIT_GROUPS_PARAMS;
    const optionalTypes = SETTINGS_WIDGET_OPTIONAL_TYPES;

    const editGroups = editGroupParams.map((editGroupParam, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        // @ts-ignore
        x: 0,
        // @ts-ignore
        y: 0,
        w: SETTINGS_EDIT_GROUP_SIZE,
        h: SETTINGS_EDIT_GROUP_SIZE,

        select_image: 'edit/widget_select.png',
        un_select_image: 'edit/widget_unselect.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(-15),
        // @ts-ignore
        tips_y: 0,

        edit_id: index,
        optional_types: optionalTypes,
        count: optionalTypes.length,
        default_type: optionalTypes[index].type,

        ...editGroupParam.props,
      }),
    );

    const chosenTypes = editGroups.map((editGroup) => {
      const typeId = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
      return optionalTypes.find((item) => item.type === typeId)?.data?.type;
    });

    return Object.fromEntries(
      editGroupParams.map((param, index) => [param.name, chosenTypes[index]]),
    );
  }
}
