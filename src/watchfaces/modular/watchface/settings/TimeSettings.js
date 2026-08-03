import { SETTINGS_TIME_OPTIONAL_TYPES } from './TimeSettings.const';

const EDIT_GROUPS_PARAMS = [
  {
    name: 'time',
    props: {
      x: px(45),
      y: px(176),
    },
  },
];

export class TimeSettings {
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
        w: px(390),
        h: px(128),

        select_image: 'edit/time_select.png',
        un_select_image: 'edit/time_unselect.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(135),
        tips_y: px(-35),

        edit_id: 110,
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
