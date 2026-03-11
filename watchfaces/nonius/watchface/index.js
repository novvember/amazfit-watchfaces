import { formatNumber } from '../utils/formatNumber';
import { getAngleFromHours } from '../utils/getAngleFromTime';
import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import {
  DISK_IMAGE_CENTER_RADIUS,
  DISK_IMAGE_PROPS,
  DISK_IMAGE_SIZE,
  LINE_IMAGE_PROPS,
  OVERLAY_CIRCLE_AOD_PROPS,
  SCREEN_SIZE,
  WIDGET_AOD_BACKGROUND_PROPS,
  WIDGET_AOD_TEXT_PROPS,
  WIDGET_BACKGROUND_PROPS,
  WIDGET_TEXT_PROPS,
} from './index.layout';
import { Settings } from './Settings';
import { gettext } from 'i18n';

const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildSettings();

    this.buildTimeScale();

    this.buildDataWidgets();

    hmUI.createWidget(hmUI.widget.CIRCLE, OVERLAY_CIRCLE_AOD_PROPS);
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildSettings() {
    this.settings = new Settings();
  },

  buildTimeScale() {
    const diskWidget = hmUI.createWidget(hmUI.widget.IMG, DISK_IMAGE_PROPS);
    const lineWidget = hmUI.createWidget(hmUI.widget.IMG, LINE_IMAGE_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { hour, minute } = timeSensor;

      const timeAngle = getAngleFromHours(hour, minute);
      const baseHourValue = Math.round(hour + minute / 60) % 12 || 12;
      const deltaAngle = getAngleFromHours(baseHourValue) - timeAngle;

      const { x, y } = getCoordsFromAngle(timeAngle);
      const centerX = DISK_IMAGE_CENTER_RADIUS * x + DISK_IMAGE_SIZE;
      const centerY = DISK_IMAGE_CENTER_RADIUS * y + DISK_IMAGE_SIZE;
      const deltaX = -1 * (centerX - SCREEN_SIZE / 2);
      const deltaY = -1 * (centerY - SCREEN_SIZE / 2);

      lineWidget.setProperty(hmUI.prop.ANGLE, timeAngle);

      diskWidget.setProperty(hmUI.prop.MORE, {
        ...DISK_IMAGE_PROPS,
        src: `time/disk_${baseHourValue}.png`,
        angle: 45 + timeAngle + deltaAngle,
        pos_x: deltaX,
        pos_y: deltaY,
        center_x: DISK_IMAGE_SIZE + deltaX,
        center_y: DISK_IMAGE_SIZE + deltaY,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildDataWidgets() {
    const { top, bottom } = this.settings;

    this.buildDataWidget('top', top);
    this.buildDataWidget('bottom', bottom);
  },

  buildDataWidget(position, dataType) {
    const y = position === 'top' ? px(60) : px(368);

    switch (dataType) {
      case 'time':
        this.buildTimeWidget(y);
        break;

      case 'steps':
        this.buildStepsWidget(y);
        break;

      case 'heart':
        this.buildHeartWidget(y);
        break;

      case 'temperature':
        this.buildTemperatureWidget(y);
        break;

      case 'battery':
        this.buildBatteryWidget(y);
        break;

      case 'date':
        this.buildDateWidget(y);
        break;

      default:
        break;
    }
  },

  buildTimeWidget(y) {
    const WIDTH = px(120);

    const x = SCREEN_SIZE / 2 - WIDTH / 2;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...WIDGET_AOD_BACKGROUND_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_AOD_TEXT_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const { hour, minute } = timeSensor;
      const hourText = (is12HourFormat ? hour % 12 || 12 : hour)
        .toString()
        .padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');
      const text = `${hourText}:${minuteText}`;

      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildHeartWidget(y) {
    const WIDTH = px(90);

    const x = SCREEN_SIZE / 2 - WIDTH / 2;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...WIDGET_BACKGROUND_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const { last = 0 } = heartSensor;
      const text = last ? `:${last}` : '—';
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  },

  buildStepsWidget(y) {
    const WIDTH = px(150);

    const x = SCREEN_SIZE / 2 - WIDTH / 2;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...WIDGET_BACKGROUND_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current = 0 } = stepSensor;
      textWidget.setProperty(hmUI.prop.TEXT, formatNumber(current, '.') + '.');
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildTemperatureWidget(y) {
    const WIDTH = px(90);

    const x = SCREEN_SIZE / 2 - WIDTH / 2;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...WIDGET_BACKGROUND_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const _textWidget = hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_PROPS,
      x,
      y,
      w: WIDTH,

      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    });
  },

  buildBatteryWidget(y) {
    const WIDTH = px(100);

    const x = SCREEN_SIZE / 2 - WIDTH / 2;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...WIDGET_BACKGROUND_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const _textWidget = hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_PROPS,
      x,
      y,
      w: WIDTH,

      type: hmUI.data_type.BATTERY,
      unit_type: 1,
    });
  },

  buildDateWidget(y) {
    const WIDTH = px(150);

    const x = SCREEN_SIZE / 2 - WIDTH / 2;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...WIDGET_AOD_BACKGROUND_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_AOD_TEXT_PROPS,
      x,
      y,
      w: WIDTH,
    });

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const text = `${gettext(WEEKDAY_KEYS[week - 1])} ${day}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },
});
