import { gettext } from 'i18n';
import { SunTime } from './SunTime';
import { Moon } from './Moon';
import { Weather } from './Weather';
import { Time } from './Time';
import { StatusIcons } from './StatusIcons';
import { CommonDataWidget } from './CommonDataWidget';
import { getSleepTimeString } from '../utils/getSleepTime';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._createVars();
    this._createEventHadlers();

    this._buildSunTime();
    this._buildMoon();
    this._buildWeather();
    this._buildTime();

    this._buildHeartRate();
    this._buildCalories();
    this._buildSleepTime();
    this._buildSteps();

    this._buildStatusIcons();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  _createVars() {
    this._weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    this._is12HourFormat = hmSetting.getTimeFormat() === 0;
    this._timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    this._batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);
    this._sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
  },

  _createEventHadlers() {
    this._onResumeNormalHandlers = [];
    this._onResumeAodHandlers = [];

    this._onMinuteEndNormalHandlers = [];
    this._onMinuteEndAodHandlers = [];

    const callOnce = (handlers) => {
      handlers.forEach((fn) => fn());
    };

    const addOnMinuteEnd = (handlers) => {
      handlers.forEach((fn) => {
        this._timeSensor.addEventListener?.(
          this._timeSensor.event.MINUTEEND,
          fn,
        );

        fn();
      });
    };

    const removeOnMinuteEnd = (handlers) => {
      handlers.forEach((fn) => {
        this._timeSensor.removeEventListener?.(
          this._timeSensor.event.MINUTEEND,
          fn,
        );
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        const screenType = hmSetting.getScreenType();

        if (screenType == hmSetting.screen_type.WATCHFACE) {
          addOnMinuteEnd(this._onMinuteEndNormalHandlers);
          callOnce(this._onResumeNormalHandlers);
        } else if (screenType == hmSetting.screen_type.AOD) {
          addOnMinuteEnd(this._onMinuteEndAodHandlers);
          callOnce(this._onResumeAodHandlers);
        }
      },
      pause_call: () => {
        removeOnMinuteEnd(this._onMinuteEndNormalHandlers);
        removeOnMinuteEnd(this._onMinuteEndAodHandlers);
      },
    });
  },

  _buildSunTime() {
    const weatherSensor = this._weatherSensor;
    const is12HourFormat = this._is12HourFormat;

    const sunTime = new SunTime({
      weatherSensor,
      is12HourFormat,
    });

    const update = () => {
      sunTime.update();
    };

    this._onResumeNormalHandlers.push(update);
  },

  _buildMoon() {
    new Moon();
  },

  _buildWeather() {
    const weatherSensor = this._weatherSensor;

    const weather = new Weather({
      weatherSensor,
    });

    const update = () => {
      weather.update();
    };

    this._onResumeNormalHandlers.push(update);
  },

  _buildTime() {
    const timeSensor = this._timeSensor;

    const time = new Time({
      timeSensor,
    });

    const update = () => {
      time.update();
    };

    this._onMinuteEndNormalHandlers.push(update);
    this._onMinuteEndAodHandlers.push(update);
  },

  _buildHeartRate() {
    new CommonDataWidget({
      digitsCount: 4,
      x: px(62),
      y: px(372),
      titleText: gettext('heart_rate'),
      titlePosition: 'top',
      dataType: hmUI.data_type.HEART,
    });
  },

  _buildCalories() {
    new CommonDataWidget({
      digitsCount: 4,
      x: px(178),
      y: px(372),
      titleText: gettext('calories'),
      titlePosition: 'top',
      dataType: hmUI.data_type.CAL,
    });
  },

  _buildSleepTime() {
    const sleepSensor = this._sleepSensor;

    const dataWidget = new CommonDataWidget({
      digitsCount: 5,
      x: px(293),
      y: px(372),
      titleText: gettext('sleep_time'),
      titlePosition: 'top',
      dataType: undefined,
      dataText: '',
    });

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTime = getSleepTimeString(sleepSensor);

      if (!sleepTime) {
        dataWidget.updateText('0-00');
        return;
      }

      const text = sleepTime.replace(':', '-');
      dataWidget.updateText(text);
    };

    this._onResumeNormalHandlers.push(update);
  },

  _buildSteps() {
    new CommonDataWidget({
      digitsCount: 5,
      x: px(177),
      y: px(411),
      titleText: gettext('steps'),
      titlePosition: 'left',
      dataType: hmUI.data_type.STEP,
    });
  },

  _buildStatusIcons() {
    const batterySensor = this._batterySensor;

    const statusIcons = new StatusIcons({
      batterySensor,
    });

    const update = () => {
      statusIcons.update();
    };

    this._onResumeNormalHandlers.push(update);
  },
});
