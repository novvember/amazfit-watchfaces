import { SETTINGS_SIDE_OPTIONAL_TYPES } from './SideSettings.const';
import { SIDE_BACKGROUND_IMAGE_PROPS } from './SideSettings.layout';

const EDIT_GROUPS_PARAMS = [
  {
    name: 'left',
    props: {
      x: 0,
      y: px(136),
      tips_x: px(6),
      select_image: 'edit/side_select_left.png',
      un_select_image: 'edit/side_unselect_left.png',
    },
  },
  {
    name: 'right',
    props: {
      x: px(424),
      y: px(136),
      tips_x: px(-70),
      select_image: 'edit/side_select_right.png',
      un_select_image: 'edit/side_unselect_right.png',
    },
  },
];

export class SideSettings {
  constructor() {
    this._buildBackground();
    this.settings = this._buildEditWidgets();
  }

  _buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, SIDE_BACKGROUND_IMAGE_PROPS);
  }

  _buildEditWidgets() {
    const editGroupParams = EDIT_GROUPS_PARAMS;
    const optionalTypes = SETTINGS_SIDE_OPTIONAL_TYPES;

    const editGroups = editGroupParams.map((editGroupParam, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        // @ts-ignore
        x: 0,
        // @ts-ignore
        y: 0,
        w: px(56),
        h: px(210),

        // @ts-ignore
        select_image: '.',
        // @ts-ignore
        un_select_image: '.',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        // @ts-ignore
        tips_x: 0,
        tips_y: px(90),

        edit_id: 120 + index,
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
