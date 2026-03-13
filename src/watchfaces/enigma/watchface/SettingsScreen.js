const PADDING_TOP = px(20);
const COLUMN_WIDTH = px(320);
const X_START = px(480 / 2) - COLUMN_WIDTH / 2;

export class SettingsScreen {
  constructor({ title, onBackClick, elements }) {
    this._xVisible = X_START;
    this._xHidden = px(480);

    this._currentY = PADDING_TOP;

    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: this._xHidden,
      y: 0,
      w: COLUMN_WIDTH,
      h: px(480),
    });

    this._group.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: COLUMN_WIDTH,
      h: px(480),
      color: 0x000000,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._buildHeader(title, onBackClick);
    this._buildElements(elements);
  }

  toggleVisibility(isVisible) {
    const xStart = isVisible ? this._xHidden : this._xVisible;
    const xEnd = isVisible ? this._xVisible : this._xHidden;

    const _animId = this._group.setProperty(hmUI.prop.ANIM, {
      anim_fps: 25,
      anim_auto_destroy: 1,
      anim_auto_start: 1,
      anim_repeat: 0,
      anim_steps: [
        {
          anim_prop: hmUI.prop.X,
          anim_rate: 'ease',
          anim_duration: 500,
          anim_from: xStart,
          anim_to: xEnd,
          anim_offset: 0,
        },
      ],
    });
  }

  _buildHeader(title, onBackClick) {
    const HEADER_HEIGHT = px(80);
    const BACK_BUTTON_SIZE = px(80);
    const BACK_ICON_SIZE = px(32);

    const x = 0;
    const y = this._currentY;
    const w = COLUMN_WIDTH;
    const h = HEADER_HEIGHT;

    this._currentY += h;

    this._group.createWidget(hmUI.widget.IMG, {
      x: x + BACK_BUTTON_SIZE / 2 - BACK_ICON_SIZE / 2,
      y: y + BACK_BUTTON_SIZE / 2 - BACK_ICON_SIZE / 2,
      w: BACK_ICON_SIZE,
      h: BACK_ICON_SIZE,
      src: 'settings/arrow_left.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.BUTTON, {
      x,
      y,
      text: '',
      w: BACK_BUTTON_SIZE,
      h: BACK_BUTTON_SIZE,
      normal_src: 'empty.png',
      press_src: 'empty.png',
      click_func: onBackClick,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.TEXT, {
      x: x + BACK_BUTTON_SIZE,
      y,
      w: w - BACK_BUTTON_SIZE,
      h,
      color: 0xffffff,
      text_size: px(24),
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text: title,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  _buildElements(elements) {
    elements.forEach((element) => {
      if (element.type === 'submenu_button') {
        this._buildSubmenuButton(element);
      }
    });
  }

  _buildSubmenuButton(element) {
    const ICON_SIZE = px(32);
    const HEIGHT = px(80);

    const x = 0;
    const y = this._currentY;
    const w = COLUMN_WIDTH;
    const h = HEIGHT;

    this._currentY += h;

    const { text, onClick } = element;

    this._group.createWidget(hmUI.widget.TEXT, {
      x,
      y,
      w: w - ICON_SIZE,
      h,
      color: 0xffffff,
      text_size: px(36),
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.IMG, {
      x: COLUMN_WIDTH - ICON_SIZE,
      y: y + h / 2 - ICON_SIZE / 2,
      w: ICON_SIZE,
      h: ICON_SIZE,
      src: 'settings/arrow_right.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.BUTTON, {
      x,
      y,
      text: '',
      w,
      h,
      normal_src: 'empty.png',
      press_src: 'empty.png',
      click_func: onClick,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }
}
