import {
  BOTTOM_OPTIONAL_TYPES,
  BOTTOMLINE_COLONS_COORDS,
  BOTTOMLINE_DIGITS_BIG_COORDS,
  BOTTOMLINE_DIGITS_SMALL_COORDS,
  CENTRAL_OPTIONAL_TYPES,
  CITY_1_DEFAULT,
  CITY_2_DEFAULT,
  COLORS,
  TOPLINE_COLONS_COORDS,
  TOPLINE_DIGITS_BIG_COORDS,
  TOPLINE_DIGITS_SMALL_COORDS,
} from '../utils/constants';
import { getSleepTimeString } from '../utils/getSleepTime';
import { SegmentDigitsWidget } from '../utils/SegmentDigitsWidget';
import {
  ALARM_IMAGE_PROPS,
  ALARM_STATUS_PROPS,
  BACKGROUND_AOD_IMAGE_PROPS,
  BATTERY_LEVEL_IMAGE_PROPS,
  BOTTOMLINE_EDIT_GROUP_PROPS,
  CENTRALLINE_LEFT_EDIT_GROUP_PROPS,
  CENTRALLINE_RIGHT_EDIT_GROUP_PROPS,
  CITY1_TEXT_PROPS,
  CITY2_TEXT_PROPS,
  COLON_BIG_EMPTY_PROPS,
  DATE_DAY_PROPS,
  DATE_MONTH_PROPS,
  DATE_WEEK_PROPS,
  DIGIT_BIG_EMPTY_PROPS,
  DIGITS_BIG_EXTRA_EMPTY_PROPS,
  DIGITS_SMALL_EMPTY_PROPS,
  DISCONNECT_IMAGE_PROPS,
  DISCONNECT_STATUS_PROPS,
  DND_IMAGE_PROPS,
  DND_STATUS_PROPS,
  FIELD_ICON_IMAGE_PROPS,
  FIELD_IMAGE_PROPS,
  LOCK_IMAGE_PROPS,
  LOCK_STATUS_PROPS,
  TIME_AMPM_BACKGROUND_PROPS,
  TIME_AMPM_PROPS,
  TIME_COLON_PROPS,
  TIME_HOUR_PROPS,
  TIME_MINUTE_PROPS,
  TIME_SECOND_PROPS,
  WORLD_CLOCK_COLON_PROPS,
  WORLD_CLOCK_HOUR_PROPS,
  WORLD_CLOCK_MINUTE_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();

    this.buildTopLine();
    this.buildCentralLine();
    this.buildBottomLine();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
  },

  buildTopLine() {
    TOPLINE_COLONS_COORDS.forEach(([x, y]) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...COLON_BIG_EMPTY_PROPS,
        x,
        y,
      }),
    );

    TOPLINE_DIGITS_BIG_COORDS.forEach(([x, y]) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...DIGIT_BIG_EMPTY_PROPS,
        x,
        y,
      }),
    );

    TOPLINE_DIGITS_SMALL_COORDS.forEach(([x, y]) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...DIGITS_SMALL_EMPTY_PROPS,
        x,
        y,
      }),
    );

    this.buildTime();
    this.buildCity1();
    this.buildAlarm();
    this.buildBattery();
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG, TIME_COLON_PROPS);

    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_HOUR_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_MINUTE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_SECOND_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, TIME_AMPM_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AMPM_PROPS);
  },

  buildCity1() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, CITY1_TEXT_PROPS);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const weatherData = weatherSensor.getForecastWeather();
      const text = weatherData.cityName?.toUpperCase() || CITY_1_DEFAULT;
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

  buildAlarm() {
    hmUI.createWidget(hmUI.widget.IMG, ALARM_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, ALARM_STATUS_PROPS);
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, BATTERY_LEVEL_IMAGE_PROPS);
  },

  getShouldRenderWorldClock() {
    const bottomEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      BOTTOMLINE_EDIT_GROUP_PROPS,
    );
    const bottomTypeId = bottomEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);
    const bottomTypeData = BOTTOM_OPTIONAL_TYPES.find(
      (type) => type.type === bottomTypeId,
    );

    return bottomTypeData?.data.type === 'world_time';
  },

  buildBottomLine() {
    BOTTOMLINE_COLONS_COORDS.forEach(([x, y]) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...COLON_BIG_EMPTY_PROPS,
        x,
        y,
      }),
    );

    BOTTOMLINE_DIGITS_BIG_COORDS.slice(0, 2).forEach(([x, y]) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...DIGITS_BIG_EXTRA_EMPTY_PROPS,
        x,
        y,
      }),
    );

    BOTTOMLINE_DIGITS_BIG_COORDS.slice(2, 4).forEach(([x, y]) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...DIGIT_BIG_EMPTY_PROPS,
        x,
        y,
      }),
    );

    BOTTOMLINE_DIGITS_SMALL_COORDS.forEach(([x, y]) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...DIGITS_SMALL_EMPTY_PROPS,
        x,
        y,
      }),
    );

    const shouldRenderWorldClock = this.getShouldRenderWorldClock();

    if (shouldRenderWorldClock) {
      this.buildWorldClock();
    } else {
      this.buildDate();
    }

    this.buildCity2(shouldRenderWorldClock);
    this.buildDnd();
    this.buildScreenLock();
    this.buildDisconnect();
  },

  buildWorldClock() {
    hmUI.createWidget(hmUI.widget.IMG, WORLD_CLOCK_COLON_PROPS);

    const hourWidget = hmUI.createWidget(
      hmUI.widget.TEXT_IMG,
      WORLD_CLOCK_HOUR_PROPS,
    );
    const minuteWidget = hmUI.createWidget(
      hmUI.widget.TEXT_IMG,
      WORLD_CLOCK_MINUTE_PROPS,
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const worldClockSensor = hmSensor.createSensor(hmSensor.id.WORLD_CLOCK);

    const setText = (hh, mm) => {
      if (hh === undefined || mm == undefined) {
        hourWidget.setProperty(hmUI.prop.MORE, {
          ...WORLD_CLOCK_HOUR_PROPS,
          alpha: 0,
        });
        minuteWidget.setProperty(hmUI.prop.MORE, {
          ...WORLD_CLOCK_MINUTE_PROPS,
          alpha: 0,
        });
      } else {
        hourWidget.setProperty(hmUI.prop.MORE, {
          ...WORLD_CLOCK_HOUR_PROPS,
          alpha: 255,
          text: hh,
        });
        minuteWidget.setProperty(hmUI.prop.MORE, {
          ...WORLD_CLOCK_MINUTE_PROPS,
          alpha: 255,
          text: mm,
        });
      }
    };

    const update = () => {
      worldClockSensor?.init();
      const count = worldClockSensor?.getWorldClockCount();
      const { hour, minute } = worldClockSensor?.getWorldClockInfo(0) || {};

      if (hour === undefined || minute === undefined) {
        setText();
        return;
      }

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourText = is12HourFormat ? hour % 12 || 12 : hour;
      const minuteText = minute.toString().padStart(2, '0');
      setText(hourText, minuteText);
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

  buildDate() {
    hmUI.createWidget(hmUI.widget.IMG_WEEK, DATE_WEEK_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_DAY_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_MONTH_PROPS);
  },

  buildCity2(isActive) {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...CITY2_TEXT_PROPS,
      color: isActive ? COLORS.primary : COLORS.secondary,
    });
    const worldClockSensor = hmSensor.createSensor(hmSensor.id.WORLD_CLOCK);

    const update = () => {
      worldClockSensor?.init();
      const count = worldClockSensor?.getWorldClockCount();
      const text =
        worldClockSensor?.getWorldClockInfo(0)?.city || CITY_2_DEFAULT;
      textWidget.setProperty(hmUI.prop.TEXT, text.toUpperCase());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildDnd() {
    hmUI.createWidget(hmUI.widget.IMG, DND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DND_STATUS_PROPS);
  },

  buildDisconnect() {
    hmUI.createWidget(hmUI.widget.IMG, DISCONNECT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },

  buildScreenLock() {
    hmUI.createWidget(hmUI.widget.IMG, LOCK_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, LOCK_STATUS_PROPS);
  },

  buildCentralLine() {
    const LEFT_COORDS = {
      x: px(64),
      y: px(218),
    };

    const RIGHT_COORDS = {
      x: px(296),
      y: px(218),
    };

    const [leftType, rightType] = this.getCentralTypes();

    if (!leftType || !rightType) {
      return;
    }

    this.buildCentralWidget(LEFT_COORDS, leftType);
    this.buildCentralWidget(RIGHT_COORDS, rightType);

    const ICON_LEFT_COORDS = {
      x: px(192),
      y: px(218),
    };

    const ICON_RIGHT_COORDS = {
      x: px(248),
      y: px(218),
    };

    hmUI.createWidget(hmUI.widget.IMG, FIELD_IMAGE_PROPS);
    this.buildCentralIcon(ICON_LEFT_COORDS, leftType);
    this.buildCentralIcon(ICON_RIGHT_COORDS, rightType);
  },

  getCentralTypes() {
    const leftEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      CENTRALLINE_LEFT_EDIT_GROUP_PROPS,
    );
    const rightEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      CENTRALLINE_RIGHT_EDIT_GROUP_PROPS,
    );

    const leftTypeId = leftEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);
    const rightTypeId = rightEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);

    const leftTypeData = CENTRAL_OPTIONAL_TYPES.find(
      (type) => type.type === leftTypeId,
    );
    const rightTypeData = CENTRAL_OPTIONAL_TYPES.find(
      (type) => type.type === rightTypeId,
    );

    const leftType = leftTypeData?.data.type;
    const rightType = rightTypeData?.data.type;

    return [leftType, rightType];
  },

  buildCentralWidget(coords, type) {
    switch (type) {
      case 'sunset':
        this.buildSunriseSunset(coords, 'sunset');
        break;

      case 'sunrise':
        this.buildSunriseSunset(coords, 'sunrise');
        break;

      case 'sleep':
        this.buildSleepTime(coords);
        break;

      case 'weather':
        this.buildWeather(coords);
        break;

      case 'heart':
        this.buildHeart(coords);
        break;

      case 'steps':
        this.buildSteps(coords);
        break;

      case 'calories':
        this.buildCalories(coords);
        break;

      case 'distance':
        this.buildDistance(coords);
        break;

      default:
        console.warn('Unknown data type for central widget: ' + type);
        break;
    }
  },

  buildCentralIcon(coords, type) {
    hmUI.createWidget(hmUI.widget.IMG, {
      ...FIELD_ICON_IMAGE_PROPS,
      ...coords,
      src: `field/icon_${type}.png`,
    });
  },

  buildSunriseSunset(coords, type) {
    const digitsWidget = new SegmentDigitsWidget(coords);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const getText = () => {
      const weatherData = weatherSensor.getForecastWeather();
      const { sunrise, sunset } = weatherData?.tideData?.data?.[0] || {};
      const data = type === 'sunrise' ? sunrise : sunset;

      if (!data) {
        digitsWidget.setValue();
        return;
      }

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hh = (is12HourFormat ? data.hour % 12 || 12 : data.hour)
        .toString()
        .padStart(2, ' ');
      const mm = data.minute.toString().padStart(2, '0');
      return `${hh}:${mm}`;
    };

    const update = () => {
      digitsWidget.setValue(getText());
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

  buildSleepTime(coords) {
    const digitsWidget = new SegmentDigitsWidget(coords);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const getText = () => {
      sleepSensor.updateInfo();
      const sleepTimeString = getSleepTimeString(sleepSensor);
      return (sleepTimeString || '--:--').padStart(5, ' ');
    };

    const update = () => {
      digitsWidget.setValue(getText());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildWeather(coords) {
    const digitsWidget = new SegmentDigitsWidget(coords);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const getText = () => {
      const temp = weatherSensor.current;
      return (temp || '--').toString().padStart(4, ' ');
    };

    const update = () => {
      digitsWidget.setValue(getText());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildHeart(coords) {
    const digitsWidget = new SegmentDigitsWidget(coords);
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const getText = () => {
      const { last = '--' } = heartSensor;
      return last.toString().padStart(4, ' ');
    };

    const update = () => {
      digitsWidget.setValue(getText());
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

  buildSteps(coords) {
    const digitsWidget = new SegmentDigitsWidget(coords);
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const getText = () => {
      const { current = 0 } = stepSensor;
      return SegmentDigitsWidget.formatNumber(current);
    };

    const update = () => {
      digitsWidget.setValue(getText());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildCalories(coords) {
    const digitsWidget = new SegmentDigitsWidget(coords);
    const calorieSensor = hmSensor.createSensor(hmSensor.id.CALORIE);

    const getText = () => {
      const { current = 0 } = calorieSensor;
      return SegmentDigitsWidget.formatNumber(current);
    };

    const update = () => {
      digitsWidget.setValue(getText());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          calorieSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        calorieSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildDistance(coords) {
    const digitsWidget = new SegmentDigitsWidget(coords);
    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);

    const getText = () => {
      const { current = 0 } = distanceSensor;
      return SegmentDigitsWidget.formatNumber(current);
    };

    const update = () => {
      digitsWidget.setValue(getText());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          distanceSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        distanceSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },
});
