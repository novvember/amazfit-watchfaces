const { width, height } = hmSetting.getDeviceInfo();
const centerX = width / 2;
const centerY = height / 2;

const SYMBOL_WIDTH = 50;
const SYMBOL_HEIGHT = 60;

const FIRST_COLUMN_X = 64;

const rowsY = [
  centerY - 2.5 * SYMBOL_HEIGHT,
  centerY - 1.5 * SYMBOL_HEIGHT,
  centerY - 0.5 * SYMBOL_HEIGHT,
  centerY + 0.5 * SYMBOL_HEIGHT,
  centerY + 1.5 * SYMBOL_HEIGHT,
];

const columnsX = [
  FIRST_COLUMN_X + 0 * SYMBOL_WIDTH,
  FIRST_COLUMN_X + 1 * SYMBOL_WIDTH,
  FIRST_COLUMN_X + 2 * SYMBOL_WIDTH,
  FIRST_COLUMN_X + 3 * SYMBOL_WIDTH,
  FIRST_COLUMN_X + 4 * SYMBOL_WIDTH,
];

WatchFace({
  initView() {
    this.setBackground();

    this.biuldHeart();
    this.buildTime();
    this.buildDate();
    this.buildWeather();
    this.buildSteps();

    this.buildDisconnectIcon();
  },

  setBackground() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: width,
      h: height,
      src: 'background.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  biuldHeart() {
    const digits = new Array(10).fill(null).map((_, i) => `heart/${i}.png`);
    const y = rowsY[0];

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: columnsX[1],
      y: y,
      type: hmUI.data_type.HEART,
      font_array: digits,
      align_h: hmUI.align.RIGHT,
      invalid_image: 'heart/minus.png',
      unit_en: 'heart/heart.png', // show static heart icon instead of animation
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    // this.buildAnimatedHeartIcon(); // show animated heart icon instead of static
  },

  // Heart icon that beats in measures heart beat rythmes (has problems in real devices, turned off for now)
  buildAnimatedHeartIcon() {
    const OPACITY_MAX = 255;
    const OPACITY_MIN = 0;

    const y = rowsY[0];
    let animationTimer;

    const heartIcon = hmUI.createWidget(hmUI.widget.IMG, {
      x: columnsX[4],
      y: y,
      src: 'heart/heart.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    function animateHeart(duration) {
      const step0 = {
        anim_rate: 'linear',
        anim_duration: duration / 2,
        anim_from: OPACITY_MAX,
        anim_to: OPACITY_MAX,
        anim_offset: 0,
        anim_prop: hmUI.prop.ALPHA,
      };

      const step1 = {
        anim_rate: 'easeOutExpo',
        anim_duration: duration / 2,
        anim_from: OPACITY_MAX,
        anim_to: OPACITY_MIN,
        anim_offset: duration / 2,
        anim_prop: hmUI.prop.ALPHA,
      };

      heartIcon.setProperty(hmUI.prop.ANIM, {
        anim_auto_start: 1,
        anim_repeat: 1,
        anim_auto_destroy: 1,
        anim_steps: [step0, step1],
        anim_fps: 20,
      });
    }

    function startHeartIconAnimation() {
      const bpm = hmSensor.createSensor(hmSensor.id.HEART).last;
      const duration = Math.floor((1000 * 60) / bpm);

      animateHeart(duration);

      if (animationTimer) {
        timer.stopTimer(animationTimer);
      }

      animationTimer = timer.createTimer(duration, duration, () =>
        animateHeart(duration),
      );
    }

    function stopHeartIconAnimation() {
      if (animationTimer) {
        timer.stopTimer(animationTimer);
        animationTimer = undefined;
      }
    }

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          startHeartIconAnimation();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        stopHeartIconAnimation();
      },
    });
  },

  buildTime() {
    const digits = new Array(10).fill(null).map((_, i) => `time/${i}.png`);
    const y = rowsY[1];

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      second_zero: 1,
      second_startX: columnsX[1],
      second_startY: y,
      second_array: new Array(10)
        .fill(null)
        .map((_, i) => (i % 2 === 0 ? 'time/colon.png' : 'empty.png')),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 1,
      hour_startX: columnsX[0],
      hour_startY: y,
      hour_array: digits,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: columnsX[2],
      y: y,
      src: 'time/colon.png',
      show_level: hmUI.show_level.ONAL_AOD,
    });

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      minute_zero: 1,
      minute_startX: columnsX[3],
      minute_startY: y,
      minute_array: digits,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    });
  },

  buildDate() {
    const digits = new Array(10).fill(null).map((_, i) => `secondary/${i}.png`);
    const y = rowsY[2];

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: columnsX[0],
      day_startY: y,
      day_align: hmUI.align.RIGHT,
      day_zero: 0,
      day_en_array: digits,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: columnsX[2],
      y: y,
      w: SYMBOL_WIDTH,
      h: SYMBOL_HEIGHT,
      src: 'secondary/dot.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      month_startX: columnsX[3],
      month_startY: y,
      month_align: hmUI.align.LEFT,
      month_zero: 1,
      month_en_array: digits,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildWeather() {
    const digits = new Array(10).fill(null).map((_, i) => `secondary/${i}.png`);
    const y = rowsY[3];

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: columnsX[0],
      y: y,
      type: hmUI.data_type.WEATHER_CURRENT,
      font_array: digits,
      align_h: hmUI.align.RIGHT,
      unit_en: 'secondary/degree.png',
      negative_image: 'secondary/minus.png',
      invalid_image: 'secondary/minus.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildSteps() {
    const digits = new Array(10).fill(null).map((_, i) => `secondary/${i}.png`);
    const y = rowsY[4];

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: columnsX[0],
      y: y,
      type: hmUI.data_type.STEP,
      font_array: digits,
      align_h: hmUI.align.RIGHT,
      invalid_image: 'secondary/minus.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildDisconnectIcon() {
    const WIDTH = 50;
    const HEIGHT = 60;

    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      x: centerX - WIDTH / 2,
      y: 2 * centerY - HEIGHT,
      type: hmUI.system_status.DISCONNECT,
      src: 'disconnect.png',
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
});
