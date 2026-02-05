import { gettext } from 'i18n';

const EDIT_GROUPS_PARAMS = [
  {
    name: 'top',
    props: {
      y: px(57),
    },
  },
  {
    name: 'bottom',
    props: {
      y: px(365),
    },
  },
];

const EDIT_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('time'),
    preview: 'edit/slot_preview_time.png',
    data: {
      type: 'time',
    },
  },
  {
    type: 100002,
    title_en: gettext('steps'),
    preview: 'edit/slot_preview_steps.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100003,
    title_en: gettext('heart'),
    preview: 'edit/slot_preview_heart.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100004,
    title_en: gettext('temperature'),
    preview: 'edit/slot_preview_temperature.png',
    data: {
      type: 'temperature',
    },
  },
  {
    type: 100005,
    title_en: gettext('battery'),
    preview: 'edit/slot_preview_battery.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100006,
    title_en: gettext('date'),
    preview: 'edit/slot_preview_date.png',
    data: {
      type: 'date',
    },
  },

  {
    type: 100100,
    title_en: gettext('empty'),
    preview: 'edit/slot_preview_empty.png',
    data: {
      type: 'empty',
    },
  },
];

export class Settings {
  constructor() {
    this._buildBackground();

    return this._buildEditWidgets();
  }

  _buildBackground() {
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0,
      w: px(480),
      h: px(480),
      text_size: px(36),
      color: 0xffffff,
      text: 'Nonius',
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      char_space: 0,
      line_space: 0,
      show_level: hmUI.show_level.ONLY_EDIT,
    });
  }

  _buildEditWidgets() {
    const editGroupParams = EDIT_GROUPS_PARAMS;
    const optionalTypes = EDIT_OPTIONAL_TYPES;

    const editGroups = editGroupParams.map((editGroupParam, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        x: px(165),
        y: 0,
        w: px(156),
        h: px(54),

        select_image: 'edit/slot_select_0.png',
        un_select_image: 'edit/slot_unselect_0.png',

        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(18),
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
