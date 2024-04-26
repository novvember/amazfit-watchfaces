const { width, height } = hmSetting.getDeviceInfo();
const centerX = width / 2;
const centerY = height  / 2;

function calculateRadialPosition(min, sec = 0) {
  const angle =  (min + sec / 60) * Math.PI / 30
  return {
    x: Math.sin(angle),
    y: -1 * Math.cos(angle),
  }
}

function secondsToAngle(seconds) {
  return seconds * 6;
}

WatchFace({
  onInit() {
    console.log('index page.js on init invoke')
  },

  build() {
    console.log('index page.js on build invoke')

    this.buildDate();
    this.buildUvIndex();
    this.buildConnectionStatus();
    this.buildStepCounter();
    this.buildCenter();
    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke')
  },

  buildCenter() {
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
    const DIGIT_HEIGHT = 76;
    const DIGIT_WIDTH = 56;

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 0,
      hour_startX: centerX - DIGIT_WIDTH,
      hour_startY: centerY - DIGIT_HEIGHT / 2,
      hour_array: new Array(10).fill(null).map((_, i) => `hours/${i}.png`),
      hour_align: hmUI.align.CENTER_H,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildMinutes() {
    const DIGIT_HEIGHT = 30;
    const DIGIT_WIDTH = 22;
    const BUBBLE_SIZE = 60;
    const BUBBLE_PADDING = 10;
    const MINUTE_RADIUS = 200 / 2;

    const minuteBubble = hmUI.createWidget(hmUI.widget.IMG, {
      pos_x: BUBBLE_PADDING,
      pos_y: BUBBLE_PADDING,
      w: BUBBLE_SIZE + BUBBLE_PADDING * 2,
      h: BUBBLE_SIZE + BUBBLE_PADDING * 2,
      center_x: BUBBLE_SIZE / 2 + BUBBLE_PADDING,
      center_y: BUBBLE_SIZE / 2 + BUBBLE_PADDING,
      src: 'minute-bubble.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    const minuteDigit0 = hmUI.createWidget(hmUI.widget.IMG, false);
    const minuteDigit1 = hmUI.createWidget(hmUI.widget.IMG, false);

    const updateMinutes = () => {
      const { minute, second } = hmSensor.createSensor(hmSensor.id.TIME);
      const digits = minute.toString().padStart(2, '0');
      const { x, y } = calculateRadialPosition(minute, second);
      const minuteCenterX = MINUTE_RADIUS * x + centerX;
      const minuteCenterY = MINUTE_RADIUS * y + centerY;

      minuteBubble.setProperty(hmUI.prop.MORE, {
        x: minuteCenterX - BUBBLE_SIZE / 2 - BUBBLE_PADDING,
        y: minuteCenterY - BUBBLE_SIZE / 2 - BUBBLE_PADDING,
        angle: 6 * (minute + second / 60),
      });

      minuteDigit0.setProperty(hmUI.prop.MORE, {
        x: minuteCenterX - DIGIT_WIDTH,
        y: minuteCenterY - DIGIT_HEIGHT / 2,
        src: `minutes/${digits[0]}.png`,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });

      minuteDigit1.setProperty(hmUI.prop.MORE, {
        x: minuteCenterX + 1,
        y: minuteCenterY - DIGIT_HEIGHT / 2,
        src: `minutes/${digits[1]}.png`,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
    }

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
        resume_call: (function () {
            console.log('ui resume');
            updateMinutes();
        }),
        pause_call: (function () {
            console.log('ui pause');
        }),
    });

    updateMinutes();
    setInterval(updateMinutes, 1000);
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
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    const secondImg = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      pos_x: 193,
      pos_y: 53,
      w: width,
      h: height,
      src: 'second.png',
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

  buildDate() {
    const BUBBLE_SIZE = 30;
    const BUBLE_RADIUS = 370 / 2;
    const DIGIT_HEIGHT = 18;
    const DIGIT_WIDTH = 14;

    hmUI.createWidget(hmUI.widget.IMG, {
      x: centerX - BUBBLE_SIZE / 2,
      y: centerY + BUBLE_RADIUS - BUBBLE_SIZE / 2,
      src: 'value-bubble.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: centerX - DIGIT_WIDTH,
      day_startY: centerY + BUBLE_RADIUS - DIGIT_HEIGHT / 2,
      day_en_array: new Array(10).fill(null).map((_, i) => `values-secondary/${i}.png`),
      day_align: hmUI.align.CENTER_H,
      day_zero: 0,
      day_follow: 0,
      day_space: 0,
      day_is_character: false,
      show_level: hmUI.show_level.ONLY_NORMAL,
    })

    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: centerX + BUBBLE_SIZE / 2 + 7,
      y: centerY + BUBLE_RADIUS - DIGIT_HEIGHT / 2,
      week_en: new Array(7).fill(null).map((_, i) => `weekday/${i}.png`),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildUvIndex() {
    const X = 105;
    const Y = 54;

    const BUBBLE_SIZE = 30;
    const DIGIT_HEIGHT = 18;
    const DIGIT_WIDTH = 14;

    hmUI.createWidget(hmUI.widget.IMG, {
      x: X - BUBBLE_SIZE / 2,
      y: Y - BUBBLE_SIZE / 2,
      src: 'value-bubble.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: X - DIGIT_WIDTH / 2,
      y: Y - DIGIT_HEIGHT / 2,
      type: hmUI.data_type.UVI,
      font_array: new Array(10).fill(null).map((_, i) => `values-secondary/${i}.png`),
      show_level: hmUI.show_level.ONLY_NORMAL,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: X + BUBBLE_SIZE / 2 + 6,
      y: Y - DIGIT_HEIGHT / 2,
      src: 'uv.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildConnectionStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      x: 379,
      y: 194,
      type: hmUI.system_status.DISCONNECT,
      src: 'disconnect.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildStepCounter() {
    const LINE_WIDTH = 15;
    const ARC_RADIUS = 370 / 2 + LINE_WIDTH / 2;
    const ANGLE_START = 210;
    const ANGLE_FINISH = 250;

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 20,
      y: 239,
      type: hmUI.data_type.STEP,
      font_array: new Array(10).fill(null).map((_, i) => `values-secondary/${i}.png`),
      align_h: hmUI.align.LEFT_H,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: centerX,
      center_y: centerY,
      radius: ARC_RADIUS - LINE_WIDTH / 2,
      start_angle: ANGLE_START,
      end_angle: ANGLE_FINISH,
      color: 0x272627,
      line_width: LINE_WIDTH,
      level: 100,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    const arcProgress = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, false);

    const updateArcProgress = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP)
      arcProgress.setProperty(hmUI.prop.MORE, {
        center_x: centerX,
        center_y: centerY,
        radius: ARC_RADIUS - LINE_WIDTH / 2,
        start_angle: ANGLE_START,
        end_angle: ANGLE_FINISH,
        color: 0x767578,
        line_width: LINE_WIDTH,
        level: (current / target) * 100,
        show_level: hmUI.show_level.ONLY_NORMAL,
      })
    };

    setInterval(updateArcProgress, 2000);
    updateArcProgress();
  }
})
