import { gettext } from 'i18n';

const EDIT_GROUPS_PARAMS = [
  {
    name: 0,
    props: {
      x: px(180),
      y: px(70),
    },
  },
  {
    name: 1,
    props: {
      x: px(290),
      y: px(180),
    },
  },
  {
    name: 2,
    props: {
      x: px(180),
      y: px(290),
    },
  },
  {
    name: 3,
    props: {
      x: px(70),
      y: px(180),
    },
  },
];

const EDIT_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('date'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'date',
    },
  },
  {
    type: 100002,
    title_en: gettext('steps'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100003,
    title_en: gettext('time'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'time',
    },
  },
  {
    type: 100004,
    title_en: gettext('battery'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100005,
    title_en: gettext('sleep'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'sleep',
    },
  },
  {
    type: 100006,
    title_en: gettext('calories'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100007,
    title_en: gettext('heart'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100008,
    title_en: gettext('pai total'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'pai-total',
    },
  },
  {
    type: 100009,
    title_en: gettext('weather'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'weather',
    },
  },
  {
    type: 100010,
    title_en: gettext('sun'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'sun',
    },
  },
  {
    type: 100011,
    title_en: gettext('biocharge'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'biocharge',
    },
  },
  {
    type: 100012,
    title_en: gettext('recovery time'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'recovery',
    },
  },
  {
    type: 100013,
    title_en: gettext('readiness'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'readiness',
    },
  },
  {
    type: 100014,
    title_en: gettext('alarm time'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'alarm',
    },
  },
  {
    type: 100015,
    title_en: gettext('world clock'),
    preview: 'edit/slot_preview.png',
    data: {
      type: 'world-clock',
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
        w: px(120),
        h: px(120),

        select_image: 'edit/slot_select.png',
        un_select_image: 'edit/slot_unselect.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: 0,
        tips_y: px(45),

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
