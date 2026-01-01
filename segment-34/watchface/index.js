import { WEATHER_DESCRIPTIONS } from '../utils/constants';
import { formatTime } from '../utils/formatTime';
import { getSleepTimeString } from '../utils/getSleepTime';
import {
  ALARM_IMAGE_PROPS,
  ALARM_STATUS_PROPS,
  BATTERY_ICON_PROPS,
  BATTERY_PROGRESS_PROPS,
  CONNECT_IMAGE_PROPS,
  CONNECT_STATUS_PROPS,
  DATE_TEXT_PROPS,
  MOON_IMAGE_PROPS,
  SECOND_DECORATIVE_TEXT_PROPS,
  SECOND_TEXT_PROPS,
  SECONDARY_DIGIT_EMPTY_PROPS,
  SECONDARY_DIGIT_WIDTH,
  SECONDARY_IMAGE_TEXT_PROPS,
  SECONDARY_TITLE_PROPS,
  SUNRISE_TEXT_PROPS,
  SUNSET_TEXT_PROPS,
  TIME_GRADIENT_PROPS,
  TIME_PROPS,
  WEATHER_HUMIDUTY_TEXT_PROPS,
  WEATHER_TEMP_TEXT_PROPS,
  WEATHER_TEXT_PROPS,
  WEATHER_WIND_IMAGE_PROPS,
  WEATHER_WIND_TEXT_PROPS,
} from './index.layout';

import { gettext } from 'i18n';

const WEEK_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const MONTH_KEYS = [
  'jan',
  'feb',
  ' mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildSunsetSunrise();
    this.buildMoon();

    this.buildWeatherTop();
    this.buildWeatherBottom();

    this.buildTime();
    this.buildDate();

    this.buildHeartRate();
    this.buildCalories();
    this.buildSleepTime();
    this.buildSteps();

    this.buildBattery();
    this.buildConnectStatus();
    this.buildAlarmStatus();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildSunsetSunrise() {
    hmUI.createWidget(hmUI.widget.TEXT, {
      ...SECONDARY_TITLE_PROPS,
      x: px(110),
      y: px(14),
      text: gettext('sunrise'),
      align_h: hmUI.align.RIGHT,
    });
    hmUI.createWidget(hmUI.widget.TEXT, {
      ...SECONDARY_TITLE_PROPS,
      x: px(270),
      y: px(14),
      text: gettext('sunset'),
    });

    const sunriseTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      SUNRISE_TEXT_PROPS,
    );
    const sunsetTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      SUNSET_TEXT_PROPS,
    );

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const forecastWeather = weatherSensor.getForecastWeather();
      const tideData = forecastWeather.tideData;

      if (!tideData.count) {
        sunriseTextWidget.setProperty(hmUI.prop.TEXT, '');
        sunsetTextWidget.setProperty(hmUI.prop.TEXT, '');
        return;
      }

      const { sunrise, sunset } = tideData.data[0] || {};
      const sunriseText = formatTime(
        sunrise.hour,
        sunrise.minute,
        is12HourFormat,
        true,
        false,
      );
      const sunsetText = formatTime(
        sunset.hour,
        sunset.minute,
        is12HourFormat,
        true,
        false,
      );

      sunriseTextWidget.setProperty(hmUI.prop.TEXT, sunriseText);
      sunsetTextWidget.setProperty(hmUI.prop.TEXT, sunsetText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildMoon() {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, MOON_IMAGE_PROPS);
  },

  buildWeatherTop() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_TEMP_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_WIND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_WIND_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_HUMIDUTY_TEXT_PROPS);
  },

  buildWeatherBottom() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, WEATHER_TEXT_PROPS);

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const iconIndex = weatherSensor.curAirIconIndex;
      const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;
      const text = hasIcon ? gettext(WEATHER_DESCRIPTIONS[iconIndex]) : '';
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

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, TIME_GRADIENT_PROPS);

    hmUI.createWidget(hmUI.widget.TEXT, SECOND_DECORATIVE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, SECOND_TEXT_PROPS);
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { week, day, month, year } = timeSensor;

      const weekText = gettext(WEEK_KEYS[week - 1]).toUpperCase();
      const monthText = gettext(MONTH_KEYS[month - 1]).toUpperCase();

      const text = `${weekText}, ${day} ${monthText} ${year}`;
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

  buildHeartRate() {
    const _titleWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...SECONDARY_TITLE_PROPS,
      x: px(64),
      y: px(353),
      text: gettext('heart_rate'),
    });

    const X0 = px(62);
    const Y0 = px(372);

    new Array(4).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...SECONDARY_DIGIT_EMPTY_PROPS,
        x: X0 + i * SECONDARY_DIGIT_WIDTH,
        y: Y0,
      }),
    );

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      ...SECONDARY_IMAGE_TEXT_PROPS,
      type: hmUI.data_type.HEART,
      x: X0,
      y: Y0,
    });
  },

  buildCalories() {
    const _titleWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...SECONDARY_TITLE_PROPS,
      x: px(180),
      y: px(353),
      text: gettext('calories'),
    });

    const X0 = px(178);
    const Y0 = px(372);

    new Array(4).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...SECONDARY_DIGIT_EMPTY_PROPS,
        x: X0 + i * SECONDARY_DIGIT_WIDTH,
        y: Y0,
      }),
    );

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      ...SECONDARY_IMAGE_TEXT_PROPS,
      type: hmUI.data_type.CAL,
      x: X0,
      y: Y0,
    });
  },

  buildSleepTime() {
    const _titleWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...SECONDARY_TITLE_PROPS,
      x: px(295),
      y: px(353),
      text: gettext('sleep_time'),
    });

    const X0 = px(293);
    const Y0 = px(372);

    new Array(5).fill(null).map((__, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...SECONDARY_DIGIT_EMPTY_PROPS,
        x: X0 + i * SECONDARY_DIGIT_WIDTH,
        y: Y0,
        src: i === 2 ? 'digits/colon.png' : 'digits/-.png',
      }),
    );

    const hourWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      ...SECONDARY_IMAGE_TEXT_PROPS,
      text: '-',
      x: X0,
      y: Y0,
    });

    const minuteWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      ...SECONDARY_IMAGE_TEXT_PROPS,
      text: '-',
      x: X0 + 3 * SECONDARY_DIGIT_WIDTH,
      y: Y0,
    });

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTime = getSleepTimeString(sleepSensor);

      if (!sleepTime) {
        hourWidget.setProperty(hmUI.prop.TEXT, '-');
        minuteWidget.setProperty(hmUI.prop.TEXT, '-');
        return;
      }

      const [hour, minute] = sleepTime.split(':');
      hourWidget.setProperty(hmUI.prop.TEXT, hour.padStart(2, '0'));
      minuteWidget.setProperty(hmUI.prop.TEXT, minute);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSteps() {
    const _titleWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...SECONDARY_TITLE_PROPS,
      x: px(70),
      y: px(412),
      text: gettext('steps'),
      align_h: hmUI.align.RIGHT,
    });

    const X0 = px(177);
    const Y0 = px(411);

    new Array(5).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...SECONDARY_DIGIT_EMPTY_PROPS,
        x: X0 + i * SECONDARY_DIGIT_WIDTH,
        y: Y0,
      }),
    );

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      ...SECONDARY_IMAGE_TEXT_PROPS,
      type: hmUI.data_type.STEP,
      x: X0,
      y: Y0,
    });
  },

  buildBattery() {
    const progressWidget = hmUI.createWidget(
      hmUI.widget.FILL_RECT,
      BATTERY_PROGRESS_PROPS,
    );

    hmUI.createWidget(hmUI.widget.IMG, BATTERY_ICON_PROPS);

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current = 0 } = batterySensor;
      const width = (current / 100) * BATTERY_PROGRESS_PROPS.w;
      progressWidget.setProperty(hmUI.prop.W, width);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildConnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG, CONNECT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, CONNECT_STATUS_PROPS);
  },

  buildAlarmStatus() {
    hmUI.createWidget(hmUI.widget.IMG, ALARM_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, ALARM_STATUS_PROPS);
  },
});
