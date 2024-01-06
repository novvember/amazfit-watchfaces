const { width, height } = hmSetting.getDeviceInfo();
const centerX = width / 2;
const centerY = height / 2;

const FRAME_SIZE = 50;

const TIME_ZONE = {
  start: { x: centerX - 2 * FRAME_SIZE, y: centerY - 1 * FRAME_SIZE },
  end: { x: centerX + 2 * FRAME_SIZE, y: centerY + 1 * FRAME_SIZE },
};

const DATE_ZONE = {
  start: { x: centerX - 1 * FRAME_SIZE, y: centerY - 3 * FRAME_SIZE },
  end: { x: centerX + 1 * FRAME_SIZE, y: centerY - 2 * FRAME_SIZE },
};

const STEPS_ZONE = {
  start: { x: centerX - 1 * FRAME_SIZE, y: centerY + 2 * FRAME_SIZE },
  end: { x: centerX + 1 * FRAME_SIZE, y: centerY + 3 * FRAME_SIZE },
};

const emptyZones = [TIME_ZONE, DATE_ZONE, STEPS_ZONE];

function isInsideZone(frame, zone) {
  return (
    frame.center.x > zone.start.x &&
    frame.center.x < zone.end.x &&
    frame.center.y > zone.start.y &&
    frame.center.y < zone.end.y
  );
}

function isInsideEmptyZones(frame) {
  return emptyZones.some((zone) => isInsideZone(frame, zone));
}

function isFrameInsideTheScreen(frame) {
  return (
    (frame.center.x - centerX) ** 2 + (frame.center.y - centerY) ** 2 <
    (width / 2) ** 2
  );
}

function shouldShowFrame(frame) {
  return isFrameInsideTheScreen(frame) && !isInsideEmptyZones(frame);
}

// Calculates initial frame offset so that central frame is in the center of the screen
function calculateInitailOffset() {
  return {
    x: centerX % FRAME_SIZE,
    y: centerY % FRAME_SIZE,
  };
}

function radiansToDegrees(rad) {
  return (rad * 180) / Math.PI;
}

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

// Calculates position of point on circle which corresponds to current time
function calculateRadialPosition(
  timeSensor,
  name,
  { radius, centerX, centerY },
) {
  const { hour, minute, second, utc } = timeSensor;
  let angle;

  if (name === 'hour') {
    angle = ((hour % 12) * 360) / 12;
  } else if (name === 'minute') {
    angle = ((minute + second / 60) * 360) / 60;
  } else if (name === 'second') {
    const value = second + (utc % 1000) / 1000;
    angle = (value * 360) / 60;
  }

  return {
    x: Math.sin(degreesToRadians(angle)) * radius + centerX,
    y: -1 * Math.cos(degreesToRadians(angle)) * radius + centerY,
  };
}

function calculateFrameParamsToPoint(frame, { x, y }) {
  const dx = x - frame.center.x;
  const dy = y - frame.center.y;
  const angle = radiansToDegrees(Math.atan(dy / dx)); // - 90;
  const r = Math.sqrt(dx ** 2 + dy ** 2);
  return [angle, r];
}

WatchFace({
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

  initView() {
    this.initialOffset = calculateInitailOffset();
    this.buildFrames();
    this.buildSecondLines();

    this.buildTime();
    this.buildSteps();
    this.buildDate();

    this.handleLifecycle();
  },

  handleLifecycle() {
    let intervalTimer;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() != hmSetting.screen_type.WATCHFACE) {
          return;
        } 

        if (intervalTimer) {
          return;
        }

        intervalTimer = timer.createTimer(1000, 1000, () => {
          this.updateLines();
        });

        this.updateLines();
      },

      pause_call: () => {
        console.log('ui pause');

        if (intervalTimer) {
          timer.stopTimer(intervalTimer);
          intervalTimer = undefined;
        }
      }
    });
  },

  getNextFrame(prevFrame) {
    const frameSize = FRAME_SIZE;
    const maxX = width;
    const maxY = height;
    let start;

    const getEndPoint = (startPoint) => ({
      x: startPoint.x + frameSize,
      y: startPoint.y + frameSize,
    });
    const getCenterPoint = (startPoint) => ({
      x: startPoint.x + frameSize / 2,
      y: startPoint.y + frameSize / 2,
    });

    if (!prevFrame) {
      // first frame
      start = { x: this.initialOffset.x, y: this.initialOffset.y };
    } else if (prevFrame.end.x + frameSize < maxX) {
      // frame is in the same row
      start = { x: prevFrame.end.x, y: prevFrame.start.y };
    } else if (prevFrame.end.y + frameSize < maxY) {
      // first frame in new row, when has enough space for new row
      start = { x: this.initialOffset.x, y: prevFrame.end.y };
    }

    if (!start) {
      // no enough space
      return null;
    }

    return {
      start,
      end: getEndPoint(start),
      center: getCenterPoint(start),
    };
  },

  buildFrames() {
    const frameSize = FRAME_SIZE;

    let frames = [this.getNextFrame()];

    while (true) {
      const newFrame = this.getNextFrame(frames[frames.length - 1]);

      if (!newFrame) {
        break;
      }

      frames.push(newFrame);
    }

    frames = frames.filter(shouldShowFrame);
    this.frames = frames;
  },

  buildSecondLines() {
    const frameSize = FRAME_SIZE;
    this.secondLines = [];

    this.frames.forEach((frame) => {
      this.secondLines.push(
        hmUI.createWidget(hmUI.widget.IMG, {
          x: frame.start.x,
          y: frame.start.y,
          w: frameSize,
          h: frameSize,
          pos_x: 0,
          pos_y: 0,
          center_x: frameSize / 2,
          center_y: frameSize / 2,
          angle: 0,
          src: 'lines/0.png',
        }),
      );
    });
  },

  updateLines() {
    console.log('updating lines...');
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const secondPosition = calculateRadialPosition(timeSensor, 'second', {
      radius: width / 2,
      centerX,
      centerY,
    });

    this.frames.forEach((frame, i) => {
      const [angle, r] = calculateFrameParamsToPoint(frame, secondPosition);
      const level = Math.floor((width - r) / (width / 5));

      const prevAngle = this.secondLines[i].getProperty(hmUI.prop.ANIM)?.anim_steps?.anim_to;

      this.secondLines[i].setProperty(hmUI.prop.SRC, `lines/${level}.png`);

      this.secondLines[i].setProperty(hmUI.prop.ANIM, {
        anim_steps: [{
          anim_rate: 'linear',
          anim_duration: 1000,
          anim_from: prevAngle,
          anim_to: angle,
          anim_key: 'angle',
        }],
        anim_fps: 25,
        anim_auto_start: 1,
        anim_repeat: 1,
        anim_auto_destroy: 1,
      });
    });

    console.log('updated');
  },

  buildTime() {
    const DIGIT_HEIGHT = 66;
    const hourDigits = new Array(10).fill(null).map((_, i) => `hour/${i}.png`);
    const HOUR_DIGIT_WIDTH = 40;
    const minuteDigits = new Array(10)
      .fill(null)
      .map((_, i) => `minute/${i}.png`);
    const MINUTE_DIGIT_WIDTH = 44;

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 0,
      hour_startX: centerX - 2 * HOUR_DIGIT_WIDTH,
      hour_startY: centerY - DIGIT_HEIGHT / 2,
      hour_array: hourDigits,
      hour_align: hmUI.align.RIGHT,
    });

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      minute_zero: 1,
      minute_startX: centerX,
      minute_startY: centerY - DIGIT_HEIGHT / 2,
      minute_array: minuteDigits,
      minute_align: hmUI.align.LEFT,
    });
  },

  buildSteps() {
    const digits = new Array(10).fill(null).map((_, i) => `extra/${i}.png`);
    const DIGIT_WIDTH = 16;
    const DIGIT_HEIGHT = 34;

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: centerX - 2.5 * DIGIT_WIDTH,
      y: centerY + 2.5 * FRAME_SIZE - DIGIT_HEIGHT / 2,
      type: hmUI.data_type.STEP,
      font_array: digits,
      align_h: hmUI.align.CENTER_H,
    });
  },

  buildDate() {
    const digits = new Array(10).fill(null).map((_, i) => `extra/${i}.png`);
    const DIGIT_WIDTH = 16;
    const DIGIT_HEIGHT = 34;
    const weekDays = new Array(7).fill(null).map((_, i) => `day/${i}.png`);

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: centerX - 2.5 * DIGIT_WIDTH,
      day_startY: centerY - 2.5 * FRAME_SIZE - DIGIT_HEIGHT / 2,
      day_en_array: digits,
      day_align: hmUI.align.RIGHT,
      day_zero: 0,
      day_follow: 0,
      day_space: 0,
      day_is_character: false,
    });

    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: centerX,
      y: centerY - 2.5 * FRAME_SIZE - DIGIT_HEIGHT / 2,
      week_en: weekDays,
    });
  },
});
