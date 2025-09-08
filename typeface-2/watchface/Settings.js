import { gettext } from 'i18n';

const SLOT_PARAMS = [
  {
    x: 0,
    y: px(72),
    select_image: 'edit/slot_select_0.png',
    un_select_image: 'edit/slot_unselect_0.png',
    tips_x: px(30),
  },
  {
    x: px(380),
    y: px(72),
    select_image: 'edit/slot_select_1.png',
    un_select_image: 'edit/slot_unselect_1.png',
    tips_x: px(-80),
  },
  {
    x: 0,
    y: px(240),
    select_image: 'edit/slot_select_2.png',
    un_select_image: 'edit/slot_unselect_2.png',
    tips_x: px(30),
  },
  {
    x: px(380),
    y: px(240),
    select_image: 'edit/slot_select_3.png',
    un_select_image: 'edit/slot_unselect_3.png',
    tips_x: px(-80),
  },
];

export const SLOT_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('Steps'),
    preview: 'edit/slot_preview_heart.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100002,
    title_en: gettext('Date'),
    preview: 'edit/slot_preview_date.png',
    data: {
      type: 'date',
    },
  },
  {
    type: 100003,
    title_en: gettext('Battery Level'),
    preview: 'edit/slot_preview_battery.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100004,
    title_en: gettext('Temperature'),
    preview: 'edit/slot_preview_temperature.png',
    data: {
      type: 'temperature',
    },
  },
  {
    type: 100005,
    title_en: gettext('Sunrise/Sunset'),
    preview: 'edit/slot_preview_sunrise-sunset.png',
    data: {
      type: 'sunrise-sunset',
    },
  },
  {
    type: 100006,
    title_en: gettext('Sleep Time'),
    preview: 'edit/slot_preview_sleep.png',
    data: {
      type: 'sleep',
    },
  },
  {
    type: 100007,
    title_en: gettext('Heart Rate'),
    preview: 'edit/slot_preview_heart.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100008,
    title_en: gettext('Calories'),
    preview: 'edit/slot_preview_calories.png',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100009,
    title_en: gettext('Distance'),
    preview: 'edit/slot_preview_distance.png',
    data: {
      type: 'distance',
    },
  },
];

export class Settings {
  constructor() {
    this._buildBackground();

    const dataSlots = this._buildDataSlots();

    return { dataSlots };
  }

  _buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: px(480),
      h: px(480),
      src: 'edit/edit_background.png',
      show_level: hmUI.show_level.ONLY_EDIT,
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0,
      w: px(480),
      h: px(480),
      text_size: px(36),
      color: 0xffffff,
      text: 'Typeface 2',
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      char_space: 0,
      line_space: 0,
      show_level: hmUI.show_level.ONLY_EDIT,
    });
  }

  _buildDataSlots() {
    const SLOTS = [0, 1, 2, 3];

    const slotsEditGroups = SLOTS.map((slot, index) =>
      hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        w: px(100),
        h: px(168),
        optional_types: SLOT_OPTIONAL_TYPES,
        count: SLOT_OPTIONAL_TYPES.length,
        tips_BG: 'edit/tip.png',
        tips_width: px(150),
        tips_margin: px(6),
        edit_id: slot,
        y: SLOT_PARAMS[index].y,
        x: SLOT_PARAMS[index].x,
        select_image: SLOT_PARAMS[index].select_image,
        un_select_image: SLOT_PARAMS[index].un_select_image,
        tips_x: SLOT_PARAMS[index].tips_x,
        tips_y: px(64),
        default_type: SLOT_OPTIONAL_TYPES[index].type,
      }),
    );

    const types = slotsEditGroups.map((editGroup) => {
      const typeId = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
      return SLOT_OPTIONAL_TYPES.find((item) => item.type === typeId)?.data
        ?.type;
    });

    return SLOTS.reduce((res, slot, index) => {
      res[slot] = types[index];
      return res;
    }, {});
  }
}
