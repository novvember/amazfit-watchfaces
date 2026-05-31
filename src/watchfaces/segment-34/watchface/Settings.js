import {
  BATTERY_EDIT_GROUPS_PARAMS,
  BATTERY_EDIT_OPTIONAL_TYPES,
  DATA_EDIT_GROUPS_PARAMS,
  DATA_EDIT_OPTIONAL_TYPES,
} from './Settings.const';

export class Settings {
  constructor() {
    this._buildBackground();

    return {
      data: this._buildDataEditWidgets(),
      battery: this._buildBatteryEditWidgets(),
    };
  }

  _buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'edit/background.png',
      show_level: hmUI.show_level.ONLY_EDIT,
    });
  }

  _buildDataEditWidgets() {
    const editGroupParams = DATA_EDIT_GROUPS_PARAMS;
    const optionalTypes = DATA_EDIT_OPTIONAL_TYPES;

    const editGroups = editGroupParams.map((editGroupParam, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        x: 0,
        y: 0,
        w: px(100),
        h: px(35),

        select_image: 'edit/data_slot_select.png',
        un_select_image: 'edit/data_slot_unselect.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(-10),
        tips_y: px(-36),

        edit_id: 0,
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

    return editGroupParams.reduce((res, editGroupParam, index) => {
      res[editGroupParam.name] = chosenTypes[index];
      return res;
    }, {});
  }

  _buildBatteryEditWidgets() {
    const editGroupParams = BATTERY_EDIT_GROUPS_PARAMS;
    const optionalTypes = BATTERY_EDIT_OPTIONAL_TYPES;

    const editGroups = editGroupParams.map((editGroupParam, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        x: 0,
        y: 0,
        w: px(50),
        h: px(30),

        select_image: 'edit/battery_slot_select.png',
        un_select_image: 'edit/battery_slot_unselect.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(-35),
        tips_y: px(-36),

        edit_id: 0,
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

    return editGroupParams.reduce((res, editGroupParam, index) => {
      res[editGroupParam.name] = chosenTypes[index];
      return res;
    }, {});
  }
}
