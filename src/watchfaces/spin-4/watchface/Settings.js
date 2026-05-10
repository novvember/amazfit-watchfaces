import { gettext } from 'i18n';

const EDIT_GROUPS_PARAMS = [
  {
    name: 'top',
    props: {
      x: px(150),
      y: px(108),
    },
  },
  {
    name: 'bottom',
    props: {
      x: px(150),
      y: px(302),
    },
  },
];

const EDIT_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('steps'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100002,
    title_en: gettext('battery'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100003,
    title_en: gettext('heart rate'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100004,
    title_en: gettext('sun'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'sun',
    },
  },
  {
    type: 100005,
    title_en: gettext('sleep time'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'sleep',
    },
  },

  {
    type: 100100,
    title_en: gettext('empty'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'empty',
    },
  },
];

export class Settings {
  constructor() {
    return this._buildEditWidgets();
  }

  _buildEditWidgets() {
    const editGroupParams = EDIT_GROUPS_PARAMS;
    const optionalTypes = EDIT_OPTIONAL_TYPES;

    const editGroups = editGroupParams.map((editGroupParam, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        x: 0,
        y: 0,
        w: px(180),
        h: px(70),

        select_image: 'edit/slot_select.png',
        un_select_image: 'edit/slot_unselect.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(30),
        tips_y: px(20),

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

    return editGroupParams.reduce((res, editGroupParam, index) => {
      res[editGroupParam.name] = chosenTypes[index];
      return res;
    }, {});
  }
}
