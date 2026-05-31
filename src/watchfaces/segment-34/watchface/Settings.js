import { gettext } from 'i18n';

const DATA_EDIT_GROUPS_PARAMS = [
  {
    name: 'data-1',
    props: {
      x: px(62),
      y: px(372),
    },
  },
  {
    name: 'data-2',
    props: {
      x: px(190),
      y: px(372),
    },
  },
  {
    name: 'data-3',
    props: {
      x: px(318),
      y: px(372),
    },
  },
];

const DATA_EDIT_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('heart_rate'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'heart_rate',
    },
  },
  {
    type: 100002,
    title_en: gettext('calories'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100003,
    title_en: gettext('sleep_time'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'sleep_time',
    },
  },
  {
    type: 100004,
    title_en: gettext('distance'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'distance',
    },
  },
  {
    type: 100005,
    title_en: gettext('pai'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'pai',
    },
  },
  {
    type: 100006,
    title_en: gettext('fat_burning'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'fat_burning',
    },
  },
  {
    type: 100007,
    title_en: gettext('stress'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'stress',
    },
  },
  {
    type: 100008,
    title_en: gettext('floors'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'floors',
    },
  },
  {
    type: 100009,
    title_en: gettext('recovery_time'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'recovery_time',
    },
  },
  {
    type: 100010,
    title_en: gettext('readiness'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'readiness',
    },
  },
];

export class Settings {
  constructor() {
    this._buildBackground();
    return this._buildEditWidgets();
  }

  _buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'edit/background.png',
      show_level: hmUI.show_level.ONLY_EDIT,
    });
  }

  _buildEditWidgets() {
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
        tips_y: px(-40),

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
