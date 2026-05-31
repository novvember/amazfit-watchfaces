import { gettext } from 'i18n';
import { SunTime } from './SunTime';
import { Moon } from './Moon';
import { Weather } from './Weather';
import { Time } from './Time';
import { StatusIcons } from './StatusIcons';
import { CommonDataWidget } from './CommonDataWidget';
import { getSleepTime } from '../../../adapters/getSleepTime';
import { Settings } from './Settings';
import { getIs12HourFormat } from '../../../adapters/getIs12HourFormat';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._settings = new Settings();

    this._createEventHadlers();

    this._buildSunTime();
    this._buildMoon();
    this._buildWeather();
    this._buildTime();

    this._buildDataWidgets();

    this._buildStatusIcons();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  _buildDataWidgets() {
    this._buildDataWidget(this._settings['data-1'], [px(62), px(372)]);
    this._buildDataWidget(this._settings['data-2'], [px(190), px(372)]);
    this._buildDataWidget(this._settings['data-3'], [px(318), px(372)]);
    this._buildSteps();
  },

  _buildDataWidget(dataType, coords) {
    switch (dataType) {
      case 'heart_rate':
        this._buildHeartRate(coords);
        break;

      case 'calories':
        this._buildCalories(coords);
        break;

      case 'sleep_time':
        this._buildSleepTime(coords);
        break;

      case 'distance':
        this._buildDistance(coords);
        break;

      case 'pai':
        this._buildPaiDaily(coords);
        break;

      case 'fat_burning':
        this._buildFatBurning(coords);
        break;

      default:
        console.log('Unknown data type', dataType);
    }
  },

  _createEventHadlers() {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

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
    const weatherSensor =
      this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);
    const is12HourFormat = getIs12HourFormat();

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
    const weatherSensor =
      this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);

    const weather = new Weather({
      weatherSensor,
    });

    const update = () => {
      weather.update();
    };

    this._onResumeNormalHandlers.push(update);
  },

  _buildTime() {
    const timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    const time = new Time({
      timeSensor,
    });

    const update = () => {
      time.update();
    };

    this._onMinuteEndNormalHandlers.push(update);
    this._onMinuteEndAodHandlers.push(update);
  },

  _buildStatusIcons() {
    const batterySensor =
      this._batterySensor || hmSensor.createSensor(hmSensor.id.BATTERY);

    const statusIcons = new StatusIcons({
      batterySensor,
    });

    const update = () => {
      statusIcons.update();
    };

    this._onResumeNormalHandlers.push(update);
  },

  _buildHeartRate([x, y]) {
    new CommonDataWidget({
      digitsCount: 4,
      x,
      y,
      titleText: gettext('heart_rate'),
      titlePosition: 'top',
      dataType: hmUI.data_type.HEART,
    });
  },

  _buildCalories([x, y]) {
    new CommonDataWidget({
      digitsCount: 4,
      x,
      y,
      titleText: gettext('calories'),
      titlePosition: 'top',
      dataType: hmUI.data_type.CAL,
    });
  },

  _buildSleepTime([x, y]) {
    const sleepSensor =
      this._sleepSensor || hmSensor.createSensor(hmSensor.id.SLEEP);

    const dataWidget = new CommonDataWidget({
      digitsCount: 4,
      x,
      y,
      titleText: gettext('sleep_time'),
      titlePosition: 'top',
      dataType: undefined,
      dataText: '',
    });

    const update = () => {
      sleepSensor.updateInfo();
      const { hours = 0, minutes = 0 } = getSleepTime(sleepSensor);
      let text = `${hours}-${minutes.toString().padStart(2, '0')}`;

      if (text.length > 4) {
        text = (hours + minutes / 60).toFixed(1);
      }

      dataWidget.updateText(text);
    };

    this._onResumeNormalHandlers.push(update);
  },

  _buildSteps() {
    new CommonDataWidget({
      digitsCount: 5,
      x: px(190),
      y: px(411),
      titleText: gettext('steps'),
      titlePosition: 'left',
      dataType: hmUI.data_type.STEP,
    });
  },

  _buildDistance([x, y]) {
    this._distanceSensor =
      this._distanceSensor || hmSensor.createSensor(hmSensor.id.DISTANCE);

    const dataWidget = new CommonDataWidget({
      digitsCount: 4,
      x,
      y,
      titleText: gettext('distance'),
      titlePosition: 'top',
      dataType: undefined,
      dataText: '',
    });

    const update = () => {
      const { current = 0 } = this._distanceSensor;
      const value = current / 1000;

      let text = value.toFixed(2);

      if (text.length > 4) {
        text = value.toFixed(1);
      }

      if (text.length > 4) {
        text = Math.floor(value).toString();
      }

      dataWidget.updateText(text);
    };

    this._onResumeNormalHandlers.push(update);
  },

  _buildPaiDaily([x, y]) {
    new CommonDataWidget({
      digitsCount: 4,
      x,
      y,
      titleText: gettext('pai'),
      titlePosition: 'top',
      dataType: hmUI.data_type.PAI_DAILY,
    });
  },

  _buildFatBurning([x, y]) {
    new CommonDataWidget({
      digitsCount: 4,
      x,
      y,
      titleText: gettext('fat_burning'),
      titlePosition: 'top',
      dataType: hmUI.data_type.FAT_BURNING,
    });
  },
});
