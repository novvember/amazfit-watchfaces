import { WEEKDAYS } from '../utils/constants';
import { transliterateToLatin } from '../utils/transliterateToLatin';
import {
  BACKGROUND_IMAGE_PROPS,
  TIME_COLON_TEXT_PROPS,
  HOUR_TEXT_PROPS,
  MINUTE_TEXT_PROPS,
  SECOND_TEXT_PROPS,
  TIME_POSTFIX_TEXT_PROPS,
  DATE_TEXT_PROPS,
  CITY_TEXT_PROPS,
  STATUS_LIGHT_PROPS,
  STATUS_VIB_PROPS,
  STATUS_ALARM_PROPS,
  STATUS_DND_PROPS,
  STATUS_LOCK_PROPS,
  STATUS_BATTERY_PROPS,
  STATUS_VIB_OFF_PROPS,
  SUN_IMAGE_PROPS,
  SUNRISE_TEXT_PROPS,
  SUNSET_TEXT_PROPS,
  STATUS_CONNECTED_PROPS,
  STATUS_DISCONNECTED_PROPS,
  BATTERY_IMAGE_PROPS,
  BATTERY_TEXT_PROPS,
  HEART_IMAGE_PROPS,
  HEART_TEXT_PROPS,
  TODAY_RECT_PROPS,
  TODAY_TEXT_PROPS,
  TODAY_STEPS_PROPS,
  TODAY_PAI_PROPS,
  MOON_LEVEL_PROPS,
  DIAGRAM_BACKGROUND_PROPS,
  DIAGRAM_TEXT_PROPS,
  DIAGRAM_BAR_PROPS,
  DIAGRAM_BAR_EMPTY_PROPS,
  DIAGRAM_MARK_PROPS,
  AOD_HOUR_TEXT_PROPS,
  AOD_TIME_COLON_TEXT_PROPS,
  AOD_MINUTE_TEXT_PROPS,
  AOD_TIME_POSTFIX_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();

    this.buildConnectionStatus();
    this.buildBatteryLevel();
    this.buildHeartRate();

    this.buildTodayStats();

    this.buildSun();
    this.buildMoon();

    this.buildDiagram();

    this.buildCity();
    this.buildTime();
    this.buildDate();
    this.buildStatusIcons();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildTime() {
    const hourWidget = hmUI.createWidget(hmUI.widget.TEXT, HOUR_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT, TIME_COLON_TEXT_PROPS);
    const minuteWidget = hmUI.createWidget(hmUI.widget.TEXT, MINUTE_TEXT_PROPS);
    const secondWidget = hmUI.createWidget(hmUI.widget.TEXT, SECOND_TEXT_PROPS);
    const postfixWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_POSTFIX_TEXT_PROPS,
    );

    const aodHourWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      AOD_HOUR_TEXT_PROPS,
    );
    hmUI.createWidget(hmUI.widget.TEXT, AOD_TIME_COLON_TEXT_PROPS);
    const aodMinuteWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      AOD_MINUTE_TEXT_PROPS,
    );
    const aodPostfixWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      AOD_TIME_POSTFIX_TEXT_PROPS,
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    let updateTimer = undefined;

    const updateSeconds = () => {
      const { second } = timeSensor;

      const secondString = second.toString().padStart(2, '0');
      secondWidget.setProperty(hmUI.prop.TEXT, secondString);
    };

    const updateMinutes = () => {
      const { hour, minute } = timeSensor;
      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;

      const hourString = hourValue.toString();
      const minuteString = minute.toString().padStart(2, '0');
      const postfixString = is12HourFormat && hour > 11 ? 'P' : '';

      hourWidget.setProperty(hmUI.prop.TEXT, hourString);
      minuteWidget.setProperty(hmUI.prop.TEXT, minuteString);
      postfixWidget.setProperty(hmUI.prop.TEXT, postfixString);

      aodHourWidget.setProperty(hmUI.prop.TEXT, hourString);
      aodMinuteWidget.setProperty(hmUI.prop.TEXT, minuteString);
      aodPostfixWidget.setProperty(hmUI.prop.TEXT, postfixString);
    };

    const updateAll = () => {
      updateMinutes();
      updateSeconds();
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, updateAll);
          updateAll();
          updateTimer = timer.createTimer(1000, 1000, updateSeconds);
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener?.(
            timeSensor.event.MINUTEEND,
            updateMinutes,
          );
          updateMinutes();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, updateAll);
        timeSensor.removeEventListener?.(
          timeSensor.event.MINUTEEND,
          updateMinutes,
        );
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    let prevDay = undefined;

    const update = () => {
      const { day, month, week } = timeSensor;

      if (prevDay === day) {
        return;
      }

      prevDay = day;

      const weekdayString = WEEKDAYS[week - 1];
      const monthString = month.toString().padStart(2, ' ');
      const dayString = day.toString().padStart(2, ' ');
      const dateText = `${weekdayString} ${monthString}/${dayString}`;

      textWidget.setProperty(hmUI.prop.TEXT, dateText);
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

  buildCity() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, CITY_TEXT_PROPS);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const weatherData = weatherSensor.getForecastWeather();
      const cityName = weatherData.cityName || '';
      const cityNameTransliterated = transliterateToLatin(cityName);

      textWidget.setProperty(
        hmUI.prop.TEXT,
        cityNameTransliterated.toUpperCase(),
      );
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        update();
      },
    });
  },

  buildStatusIcons() {
    const lightWidget = hmUI.createWidget(hmUI.widget.IMG, STATUS_LIGHT_PROPS);

    const vibWidget = hmUI.createWidget(hmUI.widget.IMG, STATUS_VIB_PROPS);
    const vibOffWidget = hmUI.createWidget(
      hmUI.widget.IMG_STATUS,
      STATUS_VIB_OFF_PROPS,
    );

    const alarmWidget = hmUI.createWidget(
      hmUI.widget.IMG_STATUS,
      STATUS_ALARM_PROPS,
    );

    const dndWidget = hmUI.createWidget(
      hmUI.widget.IMG_STATUS,
      STATUS_DND_PROPS,
    );

    const lockWidget = hmUI.createWidget(
      hmUI.widget.IMG_STATUS,
      STATUS_LOCK_PROPS,
    );

    const batteryWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      STATUS_BATTERY_PROPS,
    );

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;

      if (current <= 20) {
        batteryWidget.setProperty(hmUI.prop.ALPHA, 255);
      } else {
        batteryWidget.setProperty(hmUI.prop.ALPHA, 0);
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
        update();
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildSun() {
    hmUI.createWidget(hmUI.widget.IMG, SUN_IMAGE_PROPS);
    const sunriseWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      SUNRISE_TEXT_PROPS,
    );
    const sunsetWidget = hmUI.createWidget(hmUI.widget.TEXT, SUNSET_TEXT_PROPS);

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const forecastWeather = weatherSensor.getForecastWeather();
      const tideData = forecastWeather.tideData;
      const is12HourFormat = hmSetting.getTimeFormat() === 0;

      if (tideData.count <= 0) {
        sunriseWidget.setProperty(hmUI.prop.TEXT, '--:--');
        sunsetWidget.setProperty(hmUI.prop.TEXT, '--:--');
        return;
      }

      const { sunrise, sunset } = tideData.data[0];

      const sunriseHour = (
        is12HourFormat ? sunrise.hour % 12 || 12 : sunrise.hour
      )
        .toString()
        .padStart(2, '0');
      const sunriseMinute = sunrise.minute.toString().padStart(2, '0');
      const sunrisePostfix = is12HourFormat && sunrise.hour > 11 ? 'P' : '';
      const sunriseText = is12HourFormat
        ? `${sunriseHour}:${sunriseMinute} ${sunrisePostfix}`
        : `${sunriseHour}:${sunriseMinute}`;

      const sunsetHour = (is12HourFormat ? sunset.hour % 12 || 12 : sunset.hour)
        .toString()
        .padStart(2, '0');
      const sunsetMinute = sunset.minute.toString().padStart(2, '0');
      const sunsetPostfix = is12HourFormat && sunset.hour > 11 ? 'P' : '';
      const sunsetText = is12HourFormat
        ? `${sunsetHour}:${sunsetMinute} ${sunsetPostfix}`
        : `${sunsetHour}:${sunsetMinute}`;

      sunriseWidget.setProperty(hmUI.prop.TEXT, sunriseText);
      sunsetWidget.setProperty(hmUI.prop.TEXT, sunsetText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        update();
      },
    });
  },

  buildConnectionStatus() {
    hmUI.createWidget(hmUI.widget.IMG, STATUS_CONNECTED_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, STATUS_DISCONNECTED_PROPS);
  },

  buildBatteryLevel() {
    hmUI.createWidget(hmUI.widget.IMG, BATTERY_IMAGE_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, BATTERY_TEXT_PROPS);

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current = '--' } = batterySensor;
      textWidget.setProperty(hmUI.prop.TEXT, `${current}%`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
        update();
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildHeartRate() {
    hmUI.createWidget(hmUI.widget.IMG, HEART_IMAGE_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, HEART_TEXT_PROPS);

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const { last } = heartSensor;
      const text = (last || '--').toString();

      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        heartSensor.addEventListener?.(hmSensor.event.LAST, update);
        update();
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  },

  buildTodayStats() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, TODAY_RECT_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT, TODAY_TEXT_PROPS);

    const stepsWidget = hmUI.createWidget(hmUI.widget.TEXT, TODAY_STEPS_PROPS);
    const paiWidget = hmUI.createWidget(hmUI.widget.TEXT, TODAY_PAI_PROPS);

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);
    const paiSensor = hmSensor.createSensor(hmSensor.id.PAI);

    const update = () => {
      const stepsValue = stepSensor.current || 0;
      const paiValue = paiSensor.totalpai || 0;

      stepsWidget.setProperty(hmUI.prop.TEXT, `${stepsValue} steps`);
      paiWidget.setProperty(hmUI.prop.TEXT, `${paiValue} pai`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
        update();
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildMoon() {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, MOON_LEVEL_PROPS);
  },

  buildDiagram() {
    const X_START = px(141);
    const X_GAP = px(10);
    const BAR_WIDTH = px(32);
    const Y_COORD = DIAGRAM_BAR_PROPS.y;
    const BAR_HEIGHT = DIAGRAM_BAR_PROPS.h;

    const xCoords = new Array(6)
      .fill(null)
      .map((_, i) => X_START + i * (X_GAP + BAR_WIDTH));

    hmUI.createWidget(hmUI.widget.IMG, DIAGRAM_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, {
      ...DIAGRAM_MARK_PROPS,
      x: xCoords[xCoords.length - 1] - px(12),
    });

    xCoords.map((x) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...DIAGRAM_BAR_EMPTY_PROPS,
        x,
      }),
    );

    const textWidgets = xCoords.map((x) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...DIAGRAM_TEXT_PROPS,
        x,
      }),
    );

    const barWidgets = xCoords.map((x) =>
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        ...DIAGRAM_BAR_PROPS,
        x,
      }),
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const paiSensor = hmSensor.createSensor(hmSensor.id.PAI);

    let prevDay = undefined;

    const updateDates = () => {
      const { day, month, year } = timeSensor;

      const currentDate = new Date(year, month - 1, day);
      const date = new Date(currentDate);
      date.setDate(date.getDate() - 6);

      textWidgets.forEach((textWidget) => {
        date.setDate(date.getDate() + 1);
        textWidget.setProperty(hmUI.prop.TEXT, date.getDate().toString());
      });
    };

    const updateBars = () => {
      barWidgets.forEach((barWidget, i) => {
        const paiValue = paiSensor[`prepai${i + 1}`] || 0;
        const level = Math.min(paiValue / 100, 1);

        let height = level * BAR_HEIGHT;

        if (level) {
          height = Math.max(2, height);
        }

        const y = Y_COORD + BAR_HEIGHT - height;

        barWidget.setProperty(hmUI.prop.MORE, {
          ...DIAGRAM_BAR_PROPS,
          x: xCoords[i],
          h: height,
          y,
        });
      });
    };

    const update = () => {
      const { day } = timeSensor;

      if (prevDay !== day) {
        prevDay = day;
        updateDates();
      }

      updateBars();
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        update();
      },
    });
  },
});
