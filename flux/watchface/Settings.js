const EDIT_GROUPS_PARAMS = [
  {
    name: 'colors',
    props: {
      x: px(180),
      y: px(180),
      select_image: 'edit/slot_select_0.png',
      un_select_image: 'edit/slot_unselect_0.png',
    },
  },
];

const EDIT_OPTIONAL_TYPES = new Array(11).fill(null).map((_, i) => ({
  type: 100000 + (i + 1),
  title_en: (i + 1).toString(),
  preview: `edit/slot_preview_${i + 1}.png`,
  data: {
    type: (i + 1).toString(),
  },
}));

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
      h: px(100),
      text_size: px(36),
      color: 0xffffff,
      text: 'Flux',
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
        w: px(120),
        h: px(120),
        tips_BG: 'edit/tip.png',
        tips_width: px(120),
        tips_margin: px(6),
        tips_x: px(0),
        tips_y: px(-140),
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
