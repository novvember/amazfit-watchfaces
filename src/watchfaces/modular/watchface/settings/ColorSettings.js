import { SETTINGS_TIME_OPTIONAL_TYPES } from './ColorSettings.const';

const EDIT_GROUPS_PARAMS = [
  {
    name: 'accent',
    props: {
      x: px(208),
      y: px(412),
    },
  },
];

export class ColorSettings {
  constructor() {
    this.settings = this._buildEditWidgets();
  }

  _buildEditWidgets() {
    const editGroupParams = EDIT_GROUPS_PARAMS;
    const optionalTypes = SETTINGS_TIME_OPTIONAL_TYPES;

    const editGroups = editGroupParams.map((editGroupParam, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        // @ts-ignore
        x: 0,
        // @ts-ignore
        y: 0,
        w: px(64),
        h: px(64),

        select_image: 'edit/color_select.png',
        un_select_image: 'edit/color_unselect.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(-28),
        tips_y: px(-35),

        edit_id: 130,
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
