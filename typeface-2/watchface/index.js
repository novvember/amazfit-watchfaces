import { gettext } from 'i18n';
import { Digits } from './Digits';
import { CircleText } from './CIrcleText';
import { formatNumber } from '../utils/formatNumber';
import { Settings } from './Settings';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';
import { formatTime } from '../utils/formatTime';
import { getSleepTimeString } from '../utils/getSleepTime';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildSettings();
    this.buildTime();
    this.buildSlots();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  getTimeStrings(timeSensor, is12HourFormat) {
    const { hour, minute } = timeSensor;
    const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
    const hourText = hourValue.toString().padStart(2, '0');
    const minuteText = minute.toString().padStart(2, '0');

    return [hourText, minuteText];
  },

  getDateString(timeSensor) {
    const { day, week } = timeSensor;

    const weekdayTextKey = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][
      week - 1
    ];
    return `${gettext(weekdayTextKey)} ${day}`;
  },

  getBatteryString(batterySensor) {
    const { current = '--' } = batterySensor;
    return `${current}%`;
  },

  getTemperatureString(weatherSensor) {
    const temp = weatherSensor.current || '--';
    return `${temp}°`;
  },

  getStepsString(stepSensor) {
    const { current = 0 } = stepSensor;
    const formattedValue = formatNumber(current, ' ');
    return formattedValue;
  },

  getSunriseSunsetString(timeSensor, weatherSensor, is12HourFormat) {
    const event = getClosestSunriseSunsetTime(timeSensor, weatherSensor);

    if (!event) {
      return '--:--';
    }

    return formatTime(event.hour, event.minute, is12HourFormat, true, false);
  },

  getHeartString(heartSensor) {
    const { last = '--' } = heartSensor;
    return gettext('BPM').replace('%s', last.toString());
  },

  getCaloriesString(calorieSensor) {
    const { current = 0 } = calorieSensor;
    return `${current} K`;
  },

  getDistanceString(distanceSensor) {
    const { current = 0 } = distanceSensor;

    if (current < 1000) {
      return `${current} M`;
    }

    return `${Math.floor(current / 1000)} KM`;
  },

  buildSettings() {
    this.settings = new Settings();
  },

  buildSlots() {
    const CIRLCE_TEXT_PARAMS = [
      {
        angleStart: -90,
        angleEnd: -45,
        isReversed: false,
      },
      {
        angleStart: 45,
        angleEnd: 90,
        isReversed: false,
      },
      {
        angleStart: -135,
        angleEnd: -90,
        isReversed: true,
      },
      {
        angleStart: 90,
        angleEnd: 135,
        isReversed: true,
      },
    ];

    for (let i = 0; i < 4; i++) {
      const type = this.settings.dataSlots[i];
      const circleTextParams = CIRLCE_TEXT_PARAMS[i];
      this.buildSlot(type, circleTextParams);
    }
  },

  buildSlot(type, circleTextParams) {
    const circleText = new CircleText(circleTextParams);

    switch (type) {
      case 'steps':
        this.buildSteps(circleText);
        return;

      case 'date':
        this.buildDate(circleText);
        return;

      case 'battery':
        this.buildBattery(circleText);
        return;

      case 'temperature':
        this.buildWeather(circleText);
        return;

      case 'sunrise-sunset':
        this.buildSunsetSunrise(circleText);
        return;

      case 'sleep':
        this.buildSleepTime(circleText);
        return;

      case 'heart':
        this.buildHeart(circleText);
        return;

      case 'calories':
        this.buildCalories(circleText);
        return;

      case 'distance':
        this.buildDistance(circleText);
        return;

      default:
        console.log('Unknown widget type', type);
    }
  },

  buildTime() {
    const digitsTop = new Digits('top');
    const digitsBottom = new Digits('bottom');

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const [hourText, minuteText] = this.getTimeStrings(
        timeSensor,
        is12HourFormat,
      );

      digitsTop.set(hourText);
      digitsBottom.set(minuteText);
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

  buildDate(circleText) {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const dateText = this.getDateString(timeSensor);
      circleText.set(dateText);
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

  buildBattery(circleText) {
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const text = this.getBatteryString(batterySensor);
      circleText.set(text);
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

  buildSteps(circleText) {
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const text = this.getStepsString(stepSensor);
      circleText.set(text);
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

  buildWeather(circleText) {
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const text = this.getTemperatureString(weatherSensor);
      circleText.set(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSunsetSunrise(circleText) {
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const text = this.getSunriseSunsetString(
        timeSensor,
        weatherSensor,
        is12HourFormat,
      );
      circleText.set(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSleepTime(circleText) {
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      const text = getSleepTimeString(sleepSensor) || '--:--';
      circleText.set(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildHeart(circleText) {
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const text = this.getHeartString(heartSensor);
      circleText.set(text);
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

  buildCalories(circleText) {
    const calorieSensor = hmSensor.createSensor(hmSensor.id.CALORIE);

    const update = () => {
      const text = this.getCaloriesString(calorieSensor);
      circleText.set(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          calorieSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        calorieSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildDistance(circleText) {
    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);

    const update = () => {
      const text = this.getDistanceString(distanceSensor);
      circleText.set(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },
});
