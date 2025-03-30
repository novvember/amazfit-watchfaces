import {
  ARCS,
  COLORS,
  SLEEP_TEXT,
  WEEKDAYS,
  WIDGET_OPTIONAL_TYPES,
  WIDGETS,
  WIND_POSTFIX,
} from '../utils/constants';
import { formatNumber } from '../utils/formatNumber';
import { formatTime } from '../utils/formatTime';
import { getAnglePosition } from '../utils/getAnglePosition';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';
import { getSleepTimeString } from '../utils/getSleepTime';
import { getSunDayDuration, getSunPosition } from '../utils/getSunParams';
import {
  DISTANCE_TEXT_PROPS,
  EDIT_SCREEN_BACKGROUND_PROPS,
  HEART_ARC_PROPS,
  HEART_LINES_IMAGE_PROPS,
  HEART_TEXT_PROPS,
  HUMIDITY_ICON_IMAGE_PROPS,
  MARK_IMAGE_PROPS,
  SECONDS_BACKGROUND_PROPS,
  SECONDS_POINTER_PROPS,
  SLEEP_TEXT_PROPS,
  STEPS_ARC_PROPS,
  STEPS_LINES_IMAGE_PROPS,
  STEPS_TEXT_PROPS,
  SUN_ICON_IMAGE_PROPS,
  TIME_AOD_TEXT_PROPS,
  TIME_TEXT_PROPS,
  UVI_IMAGE_LEVEL_PROPS,
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
  WIDGET_BACKGROUND_CIRCLE_PROPS,
  WIDGET_DOT_IMAGE_PROPS,
  WIDGET_EDIT_GROUP_PROPS,
  WIDGET_TEXT_L_PROPS,
  WIDGET_TEXT_S_PROPS,
  WIDGET_TEXT_XS_PROPS,
  WIND_IMAGE_LEVEL_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();

    this.buildSteps();
    this.buildHeart();

    this.buildSleep();
    this.buildDistance();

    this.buildWidgets();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    const textAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_AOD_TEXT_PROPS,
    );
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { hour, minute } = timeSensor;
      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      textWidget.setProperty(
        hmUI.prop.TEXT,
        formatTime(hour, minute, is12HourFormat),
      );
      textAodWidget.setProperty(
        hmUI.prop.TEXT,
        formatTime(hour, minute, is12HourFormat),
      );
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (time updating)');

        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildSteps() {
    const arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      STEPS_ARC_PROPS,
    );
    hmUI.createWidget(hmUI.widget.IMG, STEPS_LINES_IMAGE_PROPS);
    const markWidget = hmUI.createWidget(hmUI.widget.IMG, MARK_IMAGE_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const getAngle = (steps, target) =>
      getAnglePosition({
        value: steps,
        minValue: 0,
        maxValue: target,
        minAngle: ARCS.steps.angleStart,
        maxAngle: ARCS.steps.angleEnd,
      });

    const update = () => {
      const { current, target } = stepSensor;
      const angleStart = getAngle(0, target || 10000);
      const angleEnd = getAngle(current || 0, target || 10000);

      arcWidget.setProperty(hmUI.prop.MORE, {
        ...STEPS_ARC_PROPS,
        start_angle: angleStart - ARCS.steps.angleGap,
        end_angle: angleEnd + ARCS.steps.angleGap,
      });
      markWidget.setProperty(hmUI.prop.ANGLE, angleEnd);
      textWidget.setProperty(hmUI.prop.TEXT, formatNumber(current, ' '));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

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

  buildHeart() {
    const arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      HEART_ARC_PROPS,
    );
    hmUI.createWidget(hmUI.widget.IMG, HEART_LINES_IMAGE_PROPS);
    const markWidget = hmUI.createWidget(hmUI.widget.IMG, MARK_IMAGE_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, HEART_TEXT_PROPS);

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const getAngle = (heartRate) =>
      getAnglePosition({
        value: heartRate,
        minValue: 40,
        maxValue: 140,
        minAngle: ARCS.heart.angleStart,
        maxAngle: ARCS.heart.angleEnd,
      });

    const update = () => {
      const { last = 0, today = [] } = heartSensor;
      let min = today.length ? Math.min(...today) : 0;
      let max = today.length ? Math.max(...today) : 0;

      const lastAngle = getAngle(last);
      const minAngle = getAngle(min);
      const maxAngle = getAngle(max);

      markWidget.setProperty(hmUI.prop.ANGLE, lastAngle);
      textWidget.setProperty(hmUI.prop.TEXT, last ? last.toString() : ' ');

      if (!min || !max) {
        arcWidget.setProperty(hmUI.prop.MORE, {
          ...STEPS_ARC_PROPS,
          start_angle: 0,
          end_angle: 0,
        });
        return;
      }

      arcWidget.setProperty(hmUI.prop.MORE, {
        ...STEPS_ARC_PROPS,
        start_angle: minAngle + ARCS.heart.angleGap,
        end_angle: maxAngle - ARCS.heart.angleGap,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener(hmSensor.event.LAST, update);
      },
    });
  },

  buildDistance() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DISTANCE_TEXT_PROPS);
    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);

    const getDistanceText = (meters) => {
      if (meters < 1000) {
        return `${meters} M`;
      }

      return `${(meters / 1000).toFixed(1)} KM`;
    };

    const update = () => {
      const { current } = distanceSensor;
      const text = getDistanceText(current);
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          distanceSensor.addEventListener(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        distanceSensor.removeEventListener(hmSensor.event.LAST, update);
      },
    });
  },

  buildSleep() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTime = getSleepTimeString(sleepSensor);
      const text = sleepTime ? SLEEP_TEXT.replace('%s', sleepTime) : '';
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildWidgets() {
    const EDIT_GROUP_SIZE = px(100);

    hmUI.createWidget(hmUI.widget.IMG, EDIT_SCREEN_BACKGROUND_PROPS);

    new Array(6)
      .fill(null)
      .map((_, index) => {
        const { x, y, w, h } = WIDGETS[index];
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const isTipOnBottom = index < 3;

        return hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
          ...WIDGET_EDIT_GROUP_PROPS,
          edit_id: index,
          x: centerX - EDIT_GROUP_SIZE / 2,
          y: centerY - EDIT_GROUP_SIZE / 2,
          w: EDIT_GROUP_SIZE,
          h: EDIT_GROUP_SIZE,
          default_type: WIDGET_OPTIONAL_TYPES[index].type,
          tips_y: isTipOnBottom
            ? EDIT_GROUP_SIZE + px(5)
            : -1 * (px(30) + px(5)),
        });
      })
      .forEach((editGroup, index) => {
        const typeId = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);

        if (!typeId) {
          return;
        }

        const type = WIDGET_OPTIONAL_TYPES.find((item) => item.type === typeId)
          .data.type;
        this.buildWidget(type, index);
      });
  },

  buildWidget(type, slotNumber) {
    switch (type) {
      case 'temperature':
        this.buildTemperature(slotNumber);
        break;

      case 'uvi':
        this.buildUvi(slotNumber);
        break;

      case 'sun':
        this.buildSunPosition(slotNumber);
        break;

      case 'wind':
        this.buildWind(slotNumber);
        break;

      case 'date':
        this.buildDate(slotNumber);
        break;

      case 'battery':
        this.buildBattery(slotNumber);
        break;

      case 'seconds':
        this.buildSeconds(slotNumber);
        break;

      case 'humidity':
        this.buildHumidity(slotNumber);
        break;

      case 'empty':
        break;

      default:
        console.warn('Unknown widget type', type);
        break;
    }
  },

  buildTemperature(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -120,
      end_angle: 120,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -120,
      end_angle: 120,
      type: hmUI.data_type.WEATHER_CURRENT,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      x: x + 0.1 * w,
      y: y + 0.4 * h,
      w,
      h,
      align_h: hmUI.align.LEFT,
      type: hmUI.data_type.WEATHER_LOW,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      x: x - 0.1 * w,
      y: y + 0.4 * h,
      w,
      h,
      align_h: hmUI.align.RIGHT,
      type: hmUI.data_type.WEATHER_HIGH,
    });
  },

  buildDate(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    const dateTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
    });

    const weekdayTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y - 0.2 * h,
      w,
      h,
      color: COLORS.accent,
    });

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      dateTextWidget.setProperty(hmUI.prop.TEXT, day.toString());
      weekdayTextWidget.setProperty(hmUI.prop.TEXT, WEEKDAYS[week - 1]);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildUvi(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];

    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      ...UVI_IMAGE_LEVEL_PROPS,
      x,
      y,
      w,
      h,
    });
  },

  buildSunPosition(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const dayArcProps = {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: 0,
      end_angle: 0,
    };

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
    });

    const dayArc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, dayArcProps);

    const DOT_SIZE = px(14);
    const DOT_OVERSIZE = px(2);
    const dotAreaSize = w + 2 * DOT_OVERSIZE;

    const dotImageWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_DOT_IMAGE_PROPS,
      x: x - DOT_OVERSIZE,
      y: y - DOT_OVERSIZE,
      w: dotAreaSize,
      h: dotAreaSize,
      pos_x: dotAreaSize / 2 - DOT_SIZE / 2,
      pox_y: dotAreaSize / 2 - DOT_SIZE / 2,
      center_x: dotAreaSize / 2,
      center_y: dotAreaSize / 2,
    });

    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...SUN_ICON_IMAGE_PROPS,
      x,
      y: y - 0.15 * h,
    });

    const sunTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
      color: COLORS.primary,
    });

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const updateDayArc = () => {
      const sunDayDuration = getSunDayDuration(weatherSensor);
      const ratio = sunDayDuration / (24 * 60);
      const angle = (360 * ratio) / 2;
      dayArc.setProperty(hmUI.prop.MORE, {
        ...dayArcProps,
        start_angle: -1 * angle,
        end_angle: angle,
      });
    };

    const updateSunTime = () => {
      const { type, hour, minute } = getClosestSunriseSunsetTime(
        timeSensor,
        weatherSensor,
      );

      if (type) {
        const text = formatTime(hour, minute, is12HourFormat);
        sunTextWidget.setProperty(hmUI.prop.TEXT, text);
        iconWidget.setProperty(hmUI.prop.SRC, `sun/${type}.png`);
      } else {
        sunTextWidget.setProperty(hmUI.prop.TEXT, '--:--');
      }
    };

    const updateDotPosition = () => {
      const angle = getSunPosition(weatherSensor, timeSensor) * 360 - 180;
      dotImageWidget.setProperty(hmUI.prop.ANGLE, angle);
    };

    const update = () => {
      updateDayArc();
      updateSunTime();
      updateDotPosition();
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildWind(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const DIRECTION_SIZE = px(96);

    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      ...WIND_IMAGE_LEVEL_PROPS,
      x: centerX - DIRECTION_SIZE / 2,
      y: centerY - DIRECTION_SIZE / 2,
      w: DIRECTION_SIZE,
      h: DIRECTION_SIZE,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y: y - 0.07 * h,
      w,
      h,
      type: hmUI.data_type.WIND,
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_XS_PROPS,
      x,
      y: y + 0.17 * h,
      w,
      h,
      text: WIND_POSTFIX,
    });
  },

  buildBattery(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      type: hmUI.data_type.BATTERY,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.BATTERY,
    });
  },

  buildSeconds(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.IMG, {
      ...SECONDS_BACKGROUND_PROPS,
      x,
      y,
    });

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      ...SECONDS_POINTER_PROPS,
      second_centerX: centerX,
      second_centerY: centerY,
      second_cover_x: x,
      second_cover_y: y,
    });
  },

  buildHumidity(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.IMG, {
      ...HUMIDITY_ICON_IMAGE_PROPS,
      x,
      y: y + 0.35 * h,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -145,
      end_angle: 145,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -145,
      end_angle: 145,
      type: hmUI.data_type.HUMIDITY,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.HUMIDITY,
      unit_type: 0,
    });
  },
});
