import { COLORS, FONTS, isRusLang } from './constants';
import { gettext } from 'i18n';

const SIZE = px(140);
const WEEK_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const TEXT_PROPS = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_size: px(32),
  color: COLORS.primary,
  font: FONTS.primary,
  text: '--',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export class DateWidget {
  constructor() {
    this.width = SIZE;
    this.height = SIZE;

    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: px(0),
      y: px(0),
      w: SIZE,
      h: SIZE,
    });

    this._group.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'date/background.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._dayText = this._group.createWidget(hmUI.widget.TEXT, {
      ...TEXT_PROPS,
      x: px(41),
      y: px(72),
      w: px(58),
      h: px(32),
    });

    this._weekText = this._group.createWidget(hmUI.widget.TEXT, {
      ...TEXT_PROPS,
      x: px(25),
      y: px(26),
      w: px(90),
      h: px(42),
      font: isRusLang ? undefined : FONTS.condensed,
    });
  }

  updateValue(day, week) {
    const weekdayText = gettext(WEEK_KEYS[week - 1]);

    this._dayText.setProperty(hmUI.prop.TEXT, day.toString());
    this._weekText.setProperty(hmUI.prop.TEXT, weekdayText);
  }

  move(x, y) {
    this._group.setProperty(hmUI.prop.MORE, {
      x,
      y,
    });
  }
}
