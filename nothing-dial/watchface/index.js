const { width, height } = hmSetting.getDeviceInfo();
const centerX = width / 2;
const centerY = height / 2;

const GENERAL_CONFIG = {
  min: 'min1.png',
  hour: 'hour1.png',
  'min-pointer': 'min-pointer1.png',
};

const config = GENERAL_CONFIG;

function secondsToAngle(seconds) {
  return seconds * 6;
}

WatchFace({
  initView() {
    this.setBackground();
    this.buildMinutes();
    this.buildHours();
    this.buildSeconds();
    this.buildTime();
    this.buildDate();
    this.buildSteps();
    this.buildUvIndex();
    this.buildDisconnectedIcon();
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

  buildMinutes() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_centerX: centerX,
      minute_centerY: centerY,
      minute_posX: centerX,
      minute_posY: centerY,
      minute_path: 'minute.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: width,
      h: height,
      src: 'center.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

  },

  buildHours() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      hour_centerX: centerX,
      hour_centerY: centerY,
      hour_posX: centerX,
      hour_posY: centerY,
      hour_path: 'hour.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildSeconds() {
    const ANIMATION_DURATION = 1000;
    let animationTimer = undefined;
    let lastTime = 0;

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_centerX: centerX,
      second_centerY: centerY,
      second_posX: centerX,
      second_posY: centerY,
      second_path: 'empty.png',
    });

    const secondImg = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      pos_x: 193,
      pos_y: 9,
      w: width,
      h: height,
      src: 'second-dot.png',
      center_x: centerX,
      center_y: centerY,
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    const startAnimation = () => {
      const time = hmSensor.createSensor(hmSensor.id.TIME);
      lastTime = time;
      const seconds = time.second;
      const prevAngle = secondImg.getProperty(hmUI.prop.ANIM)?.anim_steps
        ?.anim_to;

      const animationProps = {
        anim_steps: [
          {
            anim_rate: 'linear',
            anim_duration: ANIMATION_DURATION,
            anim_from: prevAngle || secondsToAngle(seconds),
            anim_to: secondsToAngle(seconds + ANIMATION_DURATION / 1000),
            anim_key: 'angle',
          },
        ],
        anim_fps: 25,
        anim_auto_start: 1,
        anim_auto_destroy: 1,
        anim_repeat: 1,
      };

      secondImg.setProperty(hmUI.prop.ANIM, animationProps);
    };

    const handleAnimation = () => {
      hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
        resume_call: () => {
          console.log('ui resume');

          if (hmSetting.getScreenType() !== hmSetting.screen_type.WATCHFACE) {
            return stopSecAnim();
          }
          
          if (animationTimer) {
            return;
          }

          const time = hmSensor.createSensor(hmSensor.id.TIME);
          const diffTime = time - lastTime;
          const duration =
            diffTime < ANIMATION_DURATION ? ANIMATION_DURATION - diffTime : 0;

          animationTimer = timer.createTimer(
            duration,
            ANIMATION_DURATION,
            () => {
              startAnimation();
            },
          );

          startAnimation();
        },
        pause_call: function () {
          console.log('ui pause');
          if (animationTimer) {
            timer.stopTimer(animationTimer);
            animationTimer = undefined;
          }
        },
      });
    };

    handleAnimation();
  },

  buildTime() {
    const digits = new Array(10).fill(null).map((_, i) => `time/${i}.png`);
    const DIGIT_WIDTH = 26;
    const DIGIT_HEIGHT = 30;
    const X = 190;
    const Y = 130;

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 1,
      hour_startX: X,
      hour_startY: Y,
      hour_array: digits,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: X + 1.75 * DIGIT_WIDTH,
      y: Y,
      w: DIGIT_WIDTH,
      h: DIGIT_HEIGHT,
      src: 'time/colon.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      minute_zero: 1,
      minute_startX: X + 2.5 * DIGIT_WIDTH,
      minute_startY: Y,
      minute_array: digits,
    });
  },

  buildDate() {
    const days = new Array(7).fill(null).map((_, i) => `date-days/${i}.png`);
    const digits = new Array(10)
      .fill(null)
      .map((_, i) => `date-digits/${i}.png`);
    const DIGIT_WIDTH = 14;
    const DIGIT_HEIGHT = 18;
    const DAY_WIDTH = 3 * DIGIT_WIDTH;
    const X = 190;
    const Y = 313;

    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: X,
      y: Y,
      week_en: days,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: X + DAY_WIDTH + DIGIT_WIDTH,
      day_startY: Y,
      day_align: hmUI.align.LEFT,
      day_zero: 0,
      day_en_array: digits,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildSteps() {
    const digits = new Array(10).fill(null).map((_, i) => `other/${i}.png`);
    const DIGIT_WIDTH = 14;
    const DIGIT_HEIGHT = 18;
    const X = 190;
    const Y = 343;

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: X,
      y: Y,
      type: hmUI.data_type.STEP,
      font_array: digits,
      unit_en: 'other/steps.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildUvIndex() {
    const digits = new Array(10).fill(null).map((_, i) => `other/${i}.png`);
    const DIGIT_WIDTH = 14;
    const DIGIT_HEIGHT = 18;
    const X = 190;
    const Y = 373;

    hmUI.createWidget(hmUI.widget.IMG, {
      x: X,
      y: Y,
      w: 2 * DIGIT_WIDTH,
      h: DIGIT_HEIGHT,
      src: 'other/uv.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: X + 3 * DIGIT_WIDTH,
      y: Y,
      type: hmUI.data_type.UVI,
      font_array: digits,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildDisconnectedIcon() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      x: 68,
      y: 185,
      type: hmUI.system_status.DISCONNECT,
      src: 'disconnected.png'
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
