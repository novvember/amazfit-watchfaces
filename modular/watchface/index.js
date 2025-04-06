import { Barometer } from '../utils/Barometer';
import { clamp } from '../utils/clamp';
import {
  AIR_QUALITY_TEXT,
  ARCS,
  BAROMETER_POSTFIX,
  COLORS,
  isRusLang,
  MOON_IMAGES,
  PAI_TEXT,
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
import { isNight } from '../utils/isNight';
import { updateWeatherIcons, WEATHER_ICONS } from '../utils/weatherIcons';
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
  WIDGET_BAR_PROPS,
  WIDGET_BUTTON_PROPS,
  WIDGET_DOT_IMAGE_PROPS,
  WIDGET_EDIT_GROUP_PROPS,
  WIDGET_ICON_IMAGE_PROPS,
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
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
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
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildWidgets() {
    const EDIT_GROUP_SIZE = px(100);

    hmUI.createWidget(hmUI.widget.IMG, EDIT_SCREEN_BACKGROUND_PROPS);

    const types = Array(6)
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
      .map((editGroup) => {
        return editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
      });

    types.forEach((typeId, index) => {
      if (!typeId) {
        return;
      }

      const type = WIDGET_OPTIONAL_TYPES.find((item) => item.type === typeId)
        .data.type;
      this.buildWidget(type, index);
    });

    if (!types.includes('clicker')) {
      this.saveClickerCounter(0);
    }
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

      case 'worldtime':
        this.buildWorldTime(slotNumber);
        break;

      case 'weather':
        this.buildWeather(slotNumber);
        break;

      case 'moon':
        this.buildMoon(slotNumber);
        break;

      case 'rings':
        this.buildActivityRings(slotNumber);
        break;

      case 'pressure':
        this.buildAirPressure(slotNumber);
        break;

      case 'aqi':
        this.buildAirQuality(slotNumber);
        break;

      case 'pai':
        this.buildPai(slotNumber);
        break;

      case 'alarm':
        this.buildAlarm(slotNumber);
        break;

      case 'clicker':
        this.buildClicker(slotNumber);
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
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
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

  buildWorldTime(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    const timeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y - 0.12 * h,
      w,
      h,
      color: COLORS.primary,
    });

    const cityTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.12 * h,
      w,
      h,
      color: COLORS.accent,
    });

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const worldClockSensor = hmSensor.createSensor(hmSensor.id.WORLD_CLOCK);

    const update = () => {
      worldClockSensor?.init();
      const count = worldClockSensor?.getWorldClockCount();
      const { hour, minute, city } =
        worldClockSensor?.getWorldClockInfo(0) || {};

      if (hour === undefined || minute === undefined || !city) {
        timeTextWidget.setProperty(hmUI.prop.TEXT, '--:--');
        cityTextWidget.setProperty(hmUI.prop.TEXT, '');
        return;
      }

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const timeText = formatTime(hour, minute, is12HourFormat, true);
      const cityText = city.toUpperCase().slice(0, 3);

      timeTextWidget.setProperty(hmUI.prop.TEXT, timeText);
      cityTextWidget.setProperty(hmUI.prop.TEXT, cityText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildWeather(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const ICON_SIZE = px(40);

    const textPropsWhenIcon = {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.27 * h,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    };

    const textPropsWithoutIcon = {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    };

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x: centerX - ICON_SIZE / 2,
      y: centerY - ICON_SIZE / 2 - 0.13 * h,
      w: ICON_SIZE,
      h: ICON_SIZE,
    });

    const textWidget = hmUI.createWidget(
      hmUI.widget.TEXT_FONT,
      textPropsWhenIcon,
    );

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const iconIndex = weatherSensor.curAirIconIndex;
      updateWeatherIcons(isNight(timeSensor));

      const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;

      iconWidget.setProperty(
        hmUI.prop.SRC,
        hasIcon ? WEATHER_ICONS[iconIndex] : '',
      );

      textWidget.setProperty(
        hmUI.prop.MORE,
        hasIcon ? textPropsWhenIcon : textPropsWithoutIcon,
      );
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildMoon(slotNumber) {
    const { x, y } = WIDGETS[slotNumber];

    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y,
      image_array: MOON_IMAGES,
      image_length: MOON_IMAGES.length,
      type: hmUI.data_type.MOON,
    });
  },

  buildActivityRings(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const LINE_WIDTH = px(10);
    const GAP = px(3);

    const dataTypes = [
      hmUI.data_type.CAL,
      hmUI.data_type.FAT_BURNING,
      hmUI.data_type.STAND,
    ];

    dataTypes.forEach((dataType, i) => {
      const radius = WIDGET_ACTIVE_ARC_PROPS.radius - i * (LINE_WIDTH + GAP);

      hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
        ...WIDGET_BACKGROUND_ARC_PROPS,
        center_x: centerX,
        center_y: centerY,
        radius,
      });

      hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
        ...WIDGET_ACTIVE_ARC_PROPS,
        center_x: centerX,
        center_y: centerY,
        radius,
        type: dataType,
      });
    });
  },

  buildAirPressure(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];

    const DOT_SIZE = px(14);
    const DOT_OVERSIZE = px(2);
    const dotAreaSize = w + 2 * DOT_OVERSIZE;

    const dotImageProps = {
      ...WIDGET_DOT_IMAGE_PROPS,
      x: x - DOT_OVERSIZE,
      y: y - DOT_OVERSIZE,
      w: dotAreaSize,
      h: dotAreaSize,
      pos_x: dotAreaSize / 2 - DOT_SIZE / 2,
      pox_y: dotAreaSize / 2 - DOT_SIZE / 2,
      center_x: dotAreaSize / 2,
      center_y: dotAreaSize / 2,
      alpha: 0,
    };

    hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y,
      w,
      h,
      src: 'barometer/background.png',
    });

    const dotImageWidget = hmUI.createWidget(hmUI.widget.IMG, dotImageProps);

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y,
      w,
      h,
      color: COLORS.primary,
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_XS_PROPS,
      x,
      y: y + 0.2 * h,
      w,
      h,
      text: BAROMETER_POSTFIX,
    });

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const barometer = new Barometer();

    const getDotSrc = (diff) => {
      let fileName = 'dot';

      if (diff > 0) {
        fileName = 'dot_up';
      } else if (diff < 0) {
        fileName = 'dot_down';
      }

      return `widget/${fileName}.png`;
    };

    const getDotAngle = (hPaValue) =>
      getAnglePosition({
        value: hPaValue,
        minValue: 960,
        maxValue: 1060,
        minAngle: -135,
        maxAngle: 135,
      });

    const update = () => {
      const [error, data] = barometer.getData();

      if (error) {
        textWidget.setProperty(hmUI.prop.TEXT, '---');
        dotImageWidget.setProperty(hmUI.prop.ALPHA, 0);
        return;
      }

      const { hPa, mmHg, diff } = data;
      const text = isRusLang ? mmHg.toString() : hPa.toString();

      textWidget.setProperty(hmUI.prop.TEXT, text);

      dotImageWidget.setProperty(hmUI.prop.MORE, {
        ...dotImageProps,
        alpha: 255,
        src: getDotSrc(diff),
        angle: getDotAngle(hPa),
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildAirQuality(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_XS_PROPS,
      x,
      y: y + 0.35 * h,
      w,
      h,
      text: AIR_QUALITY_TEXT,
      color: COLORS.accent,
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
      type: hmUI.data_type.AQI,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.AQI,
      unit_type: 0,
    });
  },

  buildPai(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const BAR_WIDTH = px(8);
    const BAR_HEIGHT = px(30);
    const BAR_GAP = px(2);

    const barXCoords = new Array(7)
      .fill(null)
      .map(
        (_, i) =>
          centerX - 3.5 * BAR_WIDTH - 3 * BAR_GAP + i * (BAR_WIDTH + BAR_GAP),
      );

    const barWidgetProps = {
      ...WIDGET_BAR_PROPS,
      x: 0,
      y: centerY - BAR_HEIGHT / 2,
      w: BAR_WIDTH,
      h: BAR_HEIGHT,
      radius: BAR_WIDTH / 2,
      color: COLORS.accent,
    };

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.32 * h,
      w,
      h,
      text: PAI_TEXT,
      color: COLORS.accent,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y - 0.3 * h,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.PAI_WEEKLY,
    });

    barXCoords.map((x) =>
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        ...barWidgetProps,
        x,
        color: COLORS.accentSecondary,
      }),
    );

    const barWidgets = barXCoords.map((x) =>
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        ...barWidgetProps,
        x,
      }),
    );

    const paiSensor = hmSensor.createSensor(hmSensor.id.PAI);

    const update = () => {
      barWidgets.forEach((barWidget, i) => {
        const value = paiSensor[`prepai${i}`];
        const level = (value || 0) / 100;
        const height = clamp(0, level * BAR_HEIGHT, BAR_HEIGHT);
        const y = barWidgetProps.y + BAR_HEIGHT - height;

        barWidget.setProperty(hmUI.prop.MORE, {
          ...barWidgetProps,
          x: barXCoords[i],
          h: height,
          y,
        });
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');
        update();
      },
    });
  },

  buildAlarm(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: y - 0.15 * h,
      src: 'alarm/alarm_off.png',
    });

    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: y - 0.15 * h,
      src: 'alarm/alarm_on.png',
      type: hmUI.system_status.CLOCK,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.ALARM_CLOCK,
    });
  },

  buildClicker(slotNumber) {
    const { x, y, w, h } = WIDGETS[slotNumber];
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const iconY = y - 0.15 * h;

    const animateCoin = () => {
      const yStart = iconY;
      const yEnd = iconY - px(30);

      animId = iconWidget.setProperty(hmUI.prop.ANIM, {
        anim_fps: 25,
        anim_auto_destroy: 1,
        anim_auto_start: 1,
        anim_steps: [
          {
            anim_prop: hmUI.prop.Y,
            anim_rate: 'easeout',
            anim_duration: 300,
            anim_from: yStart,
            anim_to: yEnd,
            anim_offset: 0,
          },
          {
            anim_prop: hmUI.prop.Y,
            anim_rate: 'easein',
            anim_duration: 100,
            anim_from: yEnd,
            anim_to: yStart,
            anim_offset: 300,
          },
        ],
      });
    };

    let counter = this.getClickerCounter();

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: iconY,
      src: 'clicker/coin.png',
    });

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
      color: COLORS.primary,
      text: counter.toString(),
    });

    const onButtonClick = () => {
      counter++;
      animateCoin();
      textWidget.setProperty(hmUI.prop.TEXT, counter.toString());
      this.saveClickerCounter(counter);
    };

    hmUI.createWidget(hmUI.widget.BUTTON, {
      ...WIDGET_BUTTON_PROPS,
      x,
      y,
      w,
      h,
      click_func: onButtonClick,
    });
  },

  getClickerCounter() {
    return hmFS.SysProGetInt('modular-clicker-counter') || 0;
  },

  saveClickerCounter(counter = 0) {
    return hmFS.SysProSetInt('modular-clicker-counter', counter);
  },
});
