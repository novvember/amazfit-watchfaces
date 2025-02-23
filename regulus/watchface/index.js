import {
  BOTTOM_OPTIONAL_TYPES,
  BOTTOMLINE_COLONS_COORDS,
  BOTTOMLINE_DIGITS_BIG_COORDS,
  BOTTOMLINE_DIGITS_SMALL_COORDS,
  COLORS,
  TOPLINE_COLONS_COORDS,
  TOPLINE_DIGITS_BIG_COORDS,
  TOPLINE_DIGITS_SMALL_COORDS,
} from '../utils/constants';
import { SegmentDigitsWidget } from '../utils/SegmentDigitsWidget';
import {
  ALARM_IMAGE_PROPS,
  ALARM_STATUS_PROPS,
  BACKGROUND_AOD_IMAGE_PROPS,
  BATTERY_LEVEL_IMAGE_PROPS,
  BOTTOMLINE_EDIT_GROUP_PROPS,
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
    this.buildBottomLine();
    this.buildCentralLine();
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
      const text = weatherData.cityName.toUpperCase();
      textWidget.setProperty(hmUI.prop.TEXT, text || 'TIME 1');
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

    return bottomTypeData.data.type === 'world_time';
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
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
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
      const text = worldClockSensor?.getWorldClockInfo(0)?.city || 'TIME 2';
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
    this.buildSunriseSunset();
  },

  buildSunriseSunset() {
    hmUI.createWidget(hmUI.widget.IMG, FIELD_IMAGE_PROPS);

    const digitsWidgets = [
      new SegmentDigitsWidget({
        x: px(64),
        y: px(218),
      }),
      new SegmentDigitsWidget({
        x: px(296),
        y: px(218),
      }),
    ];

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const weatherData = weatherSensor.getForecastWeather();
      const { sunrise, sunset } = weatherData?.tideData?.data?.[0] || {};

      [sunrise, sunset].forEach((obj, i) => {
        if (!obj) {
          digitsWidgets[i].setValue();
          return;
        }

        const is12HourFormat = hmSetting.getTimeFormat() === 0;
        const hh = (is12HourFormat ? obj.hour % 12 || 12 : obj.hour)
          .toString()
          .padStart(2, ' ');
        const mm = obj.minute.toString().padStart(2, '0');
        const text = `${hh}${mm}`;
        digitsWidgets[i].setValue(text, 'colon');
      });
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
});
