const { width, height } = hmSetting.getDeviceInfo();
const centerX = width / 2;
const centerY = height / 2;

WatchFace({
  initView() {
    this.buildTime();
    this.buildDate();
    this.buildDayOfWeek();
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: width,
      h: height,
      src: 'digits.png',
    });

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_centerX: centerX,
      minute_centerY: centerY,
      minute_posX: centerX,
      minute_posY: centerY,
      minute_path: 'minute-window.png',
      hour_centerX: centerX,
      hour_centerY: centerY,
      hour_posX: centerX,
      hour_posY: centerY,
      hour_path: 'hour-window.png',
    });
  },

  buildDate() {
    const VERTICAL_OFFSET = 14.5;
    const DIGIT_WIDTH = 36;
    const DIGIT_HEIGHT = 55;
    const digits = new Array(10).fill(null).map((_, i) => `digits/${i}.png`);

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: centerX - DIGIT_WIDTH,
      day_startY: centerY - DIGIT_HEIGHT / 2 - VERTICAL_OFFSET,
      day_en_array: digits,
      day_align: hmUI.align.CENTER_H,
      day_zero: 0,
      day_follow: 0,
      day_space: 0,
      day_is_character: false,
    });
  },

  buildDayOfWeek() {
    const VERTICAL_OFFSET = 18;
    const WIDTH = 64;
    const HEIGHT = 30;
    const days = new Array(7).fill(null).map((_, i) => `day/${i}.png`);

    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: centerX - WIDTH / 2,
      y: centerY + VERTICAL_OFFSET,
      week_en: days,
    });
  },


  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.initView();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },
})
