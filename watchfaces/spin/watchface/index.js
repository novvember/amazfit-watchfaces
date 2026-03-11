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

WatchFace({
  onInit() {
    console.log('index page.js on init invoke')
  },

  build() {
    console.log('index page.js on build invoke')

    this.initView()
  },

  onDestroy() {
    console.log('index page.js on destroy invoke')
  },

  initView() {
    this.buildHours()
    this.buildMinutes()
    this.buildDate()
    this.buildConnectionStatus()
    this.buildStepCounter()
    this.buildSeconds()
  },

  buildHours() {
    const CIRCLE_SIZE = 156
    const DIGIT_HEIGHT = 88
    const DIGIT_WIDTH = 56

    const hourCircle = hmUI.createWidget(hmUI.widget.IMG, {
      x: centerX - CIRCLE_SIZE / 2,
      y: centerY - CIRCLE_SIZE / 2,
      src: 'hour-circle.png',
    })

    const hours = hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 0,
      hour_startX: centerX - DIGIT_WIDTH,
      hour_startY: centerY - DIGIT_HEIGHT / 2,
      hour_array: new Array(10).fill(null).map((_, i) => `hours/${i}.png`),
      hour_align: hmUI.align.CENTER_H,
    })
  },

  buildMinutes() {
    const DIGIT_HEIGHT = 56
    const DIGIT_WIDTH = 22
    const BUBBLE_SIZE = 56
    const BUBBLE_PADDING = 10
    const MINUTE_RADIUS = 118

    const minuteBubble = hmUI.createWidget(hmUI.widget.IMG, {
      pos_x: BUBBLE_PADDING,
      pos_y: BUBBLE_PADDING,
      w: BUBBLE_SIZE + BUBBLE_PADDING * 2,
      h: BUBBLE_SIZE + BUBBLE_PADDING * 2,
      center_x: BUBBLE_SIZE / 2 + BUBBLE_PADDING,
      center_y: BUBBLE_SIZE / 2 + BUBBLE_PADDING,
      src: 'minute-bubble.png',
    })

    const minuteDigit0 = hmUI.createWidget(hmUI.widget.IMG, false)
    const minuteDigit1 = hmUI.createWidget(hmUI.widget.IMG, false)

    const updateMinutes = () => {
      const { minute, second } = hmSensor.createSensor(hmSensor.id.TIME)
      const digits = minute.toString().padStart(2, '0')
      const { x, y } = calculateRadialPosition(minute, second)
      const minuteCenterX = MINUTE_RADIUS * x + centerX
      const minuteCenterY = MINUTE_RADIUS * y + centerY

      minuteBubble.setProperty(hmUI.prop.MORE, {
        x: minuteCenterX - BUBBLE_SIZE / 2 - BUBBLE_PADDING,
        y: minuteCenterY - BUBBLE_SIZE / 2 - BUBBLE_PADDING,
        angle: 6 * (minute + second / 60)
      })

      minuteDigit0.setProperty(hmUI.prop.MORE, {
        x: minuteCenterX - DIGIT_WIDTH,
        y: minuteCenterY - DIGIT_HEIGHT / 2,
        src: `minutes/${digits[0]}.png`,
      })

      minuteDigit1.setProperty(hmUI.prop.MORE, {
        x: minuteCenterX,
        y: minuteCenterY - DIGIT_HEIGHT / 2,
        src: `minutes/${digits[1]}.png`,
      })
    }

    const widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
        resume_call: (function () {
            console.log('ui resume')
            updateMinutes()
        }),
        pause_call: (function () {
            console.log('ui pause')
        }),
    })

      updateMinutes()
    setInterval(updateMinutes, 1000)
  },

  buildSeconds() {
    const POINTER_SIZE = 16
    const POINTER_RADIUS = 157

    const secondPointer = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_centerX: centerX,
      second_centerY: centerY,
      second_posX: POINTER_SIZE / 2,
      second_posY: POINTER_RADIUS + POINTER_SIZE / 2,
      second_path: 'second-led.png',
    })
  },

  buildDate() {
    const BUBBLE_SIZE = 30
    const BUBLE_RADIUS = 184
    const DIGIT_HEIGHT = 30
    const DIGIT_WIDTH = 10

    const bubble = hmUI.createWidget(hmUI.widget.IMG, {
      x: centerX - BUBBLE_SIZE / 2,
      y: centerY + BUBLE_RADIUS - BUBBLE_SIZE / 2,
      src: 'date-bubble.png',
    })

    const date = hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: centerX - DIGIT_WIDTH,
      day_startY: centerY + BUBLE_RADIUS - DIGIT_HEIGHT / 2,
      day_en_array: new Array(10).fill(null).map((_, i) => `date/${i}.png`),
      day_align: hmUI.align.CENTER_H,
      day_zero: 0,
      day_follow: 0,
      day_space: 0,
      day_is_character: false,
    })

    const weekDay = hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: centerX + BUBBLE_SIZE / 2 + 5,
      y: centerY + BUBLE_RADIUS - BUBBLE_SIZE / 2,
      week_en: new Array(7).fill(null).map((_, i) => `weekday/${i}.png`),
  })
  },

  buildConnectionStatus() {
    const STATUS_HEIGHT = 18
    const STATUS_WIDTH = 92
    const STATUS_RADIUS = 184

    const connectionStatus = hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      x: centerX - STATUS_WIDTH / 2,
      y: centerY - STATUS_RADIUS + STATUS_HEIGHT / 2,
      type: hmUI.system_status.DISCONNECT,
      src: 'connection-status.png'
    })
  },

  buildStepCounter() {
    const ARC_RADIUS = 184
    const LINE_WIDTH = 4

    const arcProgressBg = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: centerX,
      center_y: centerY,
      radius: ARC_RADIUS - LINE_WIDTH / 2,
      start_angle: 200,
      end_angle: 230,
      color: 0x2e2e2e,
      line_width: LINE_WIDTH,
      level: 100
    })

    const arcProgress = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, false)

    const counter = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 34,
      y: 295,
      type: hmUI.data_type.STEP,
      font_array: new Array(10).fill(null).map((_, i) => `date/${i}.png`),
      align_h: hmUI.align.CENTER_H
    })

    const updateArcProgress = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP)
      arcProgress.setProperty(hmUI.prop.MORE, {
        center_x: centerX,
        center_y: centerY,
        radius: ARC_RADIUS - LINE_WIDTH / 2,
        start_angle: 200,
        end_angle: 230,
        color: 0x8e8e8e,
        line_width: LINE_WIDTH,
        level: (current / target) * 100
      })
    }

    setInterval(updateArcProgress, 2000)
    updateArcProgress()
  }
})
