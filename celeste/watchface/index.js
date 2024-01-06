const { width, height } = hmSetting.getDeviceInfo();
const centerX = width / 2;
const centerY = height / 2;

const MODE_1 = {
  min: 'min1.png',
  hour: 'hour1.png',
  'min-pointer': 'min-pointer1.png',
};

const MODE_2 = {
  min: 'min2.png',
  hour: 'hour2.png',
  'min-pointer': 'min-pointer2.png',
};

const MODE_3 = {
  min: 'min3.png',
  hour: 'hour3.png',
  'min-pointer': 'min-pointer3.png',
};

const mode = MODE_1;

WatchFace({
  initView() {
    this.setBackground();
    this.buildTime();
    this.buildDots();
    this.buildMinPointer();
    this.buildTop();
    this.buildTarget();
    this.buildDate();
  },

  setBackground() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: width,
      h: height,
      src: 'bg.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_centerX: centerX,
      minute_centerY: centerY,
      minute_posX: centerX,
      minute_posY: centerY,
      minute_path: mode.min,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      hour_centerX: centerX,
      hour_centerY: centerY,
      hour_posX: centerX,
      hour_posY: centerY,
      hour_path: mode.hour,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildDots() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: width,
      h: height,
      src: 'dots.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildMinPointer() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_centerX: centerX,
      minute_centerY: centerY,
      minute_posX: 3,
      minute_posY: centerY,
      minute_path: mode['min-pointer'],
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildTop() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: width,
      h: height,
      src: 'top.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  },

  buildTarget() {
    const IMG_SIZE = 220;
    const OUTER_DIAMETER = 110;
    const INNER_DIAMETER = 50;

    const arcProgress = hmUI.createWidget(hmUI.widget.ARC_PROGRESS);
    const topImg = hmUI.createWidget(hmUI.widget.IMG);

    const updateTarget = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const ratio = (360 * current) / target;

      arcProgress.setProperty(hmUI.prop.MORE, {
        center_x: centerX,
        center_y: centerY,
        radius: 40,
        start_angle: 0,
        color: 0x1c1c1c,
        line_width: (OUTER_DIAMETER - INNER_DIAMETER) / 2,
        level: 100,
        end_angle: ratio,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });

      topImg.setProperty(hmUI.prop.MORE, {
        x: centerX - IMG_SIZE / 2,
        y: centerY - IMG_SIZE / 2,
        w: IMG_SIZE,
        h: IMG_SIZE,
        center_x: IMG_SIZE / 2,
        center_y: IMG_SIZE / 2,
        src: 'target-pointer.png',
        angle: ratio,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
    };

    updateTarget();

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: function () {
        console.log('ui resume');
        updateTarget();
      },
      pause_call: function () {
        console.log('ui pause');
      },
    });
  },

  buildDate() {
    const DIGIT_HEIGHT = 28;
    const DIGIT_WIDTH = 16;
    const digits = new Array(10).fill(null).map((_, i) => `date/${i}.png`);

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: centerX - DIGIT_WIDTH,
      day_startY: centerY - DIGIT_HEIGHT / 2,
      day_align: hmUI.align.CENTER,
      day_zero: 0,
      day_en_array: digits,
    })

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
