import { FONTS, WEATHER_DESCRIPTIONS } from '../utils/constants';
import { formatNumber } from '../utils/formatNumber';
import { formatTime } from '../utils/formatTime';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';
import { getSleepTimeString } from '../utils/getSleepTime';
import {
  BACKGROUND_AOD_IMAGE_PROPS,
  BACKGROUND_IMAGE_PROPS,
  BATTERY_ARC_PROPS,
  BATTERY_TEXT_PROPS,
  TEXT_AOD_PROPS,
  TEXT_PROPS,
  TIME_AOD_POINTERS_PROPS,
  TIME_POINTERS_PROPS,
  TIME_SHADOW_POINTERS_PROPS,
} from './index.r.layout';

import { gettext } from 'i18n';

const WEEK_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();

    this.buildWeather();
    this.buildSteps();
    this.buildSunsetSunrise();
    this.buildSleep();
    this.buildBattery();
    this.buildDate();

    this.buildTime();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_AOD_POINTERS_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_SHADOW_POINTERS_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_POINTERS_PROPS);
  },

  buildDate() {
    const Y_COORDS = [px(418), px(448)];
    const HEIGHT = px(30);

    const textWidgets = Y_COORDS.map((y) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...TEXT_PROPS,
        y,
        h: HEIGHT,
        text_size: HEIGHT,
      }),
    );

    const textAodWidgets = Y_COORDS.map((y) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...TEXT_AOD_PROPS,
        y: y - px(10),
        h: HEIGHT,
        text_size: HEIGHT,
      }),
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { week, day } = timeSensor;

      [gettext(WEEK_KEYS[week - 1]), day.toString()].map((text, index) => {
        textWidgets[index].setProperty(hmUI.prop.TEXT, text);
        textAodWidgets[index].setProperty(hmUI.prop.TEXT, text);
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

  buildWeather() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...TEXT_PROPS,
      y: px(149),
      h: px(42),
      text_size: px(42),
    });

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const temperatureValue = weatherSensor.current;
      const iconIndex = weatherSensor.curAirIconIndex;
      const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;

      if (!hasIcon && isNaN(temperatureValue)) {
        textWidget.setProperty(hmUI.prop.TEXT, '');
        return;
      }

      const iconDescription = hasIcon
        ? gettext(WEATHER_DESCRIPTIONS[iconIndex])
        : '';

      textWidget.setProperty(
        hmUI.prop.TEXT,
        [iconDescription, `${temperatureValue}°`].join(' '),
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

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...TEXT_PROPS,
      y: px(191),
      h: px(42),
      text_size: px(42),
    });

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current = 0 } = stepSensor;
      const formattedValue = formatNumber(current, ' ');

      textWidget.setProperty(
        hmUI.prop.TEXT,
        `${formattedValue} ${gettext('steps')}`,
      );
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

  buildSunsetSunrise() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...TEXT_PROPS,
      y: px(233),
      h: px(42),
      text_size: px(42),
    });

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const event = getClosestSunriseSunsetTime(timeSensor, weatherSensor);

      let time = '--:--';
      let eventName = gettext('sunset');

      if (event) {
        time = formatTime(
          event.hour,
          event.minute,
          is12HourFormat,
          true,
          false,
        );
        eventName = gettext(event.type);
      }

      textWidget.setProperty(hmUI.prop.TEXT, `${eventName} ${time}`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSleep() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...TEXT_PROPS,
      y: px(275),
      h: px(42),
      text_size: px(42),
    });

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const time = getSleepTimeString(sleepSensor);

      if (time) {
        textWidget.setProperty(hmUI.prop.TEXT, `${gettext('sleep')} ${time}`);
      } else {
        textWidget.setProperty(hmUI.prop.TEXT, '');
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_ARC_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, BATTERY_TEXT_PROPS);
  },
});
