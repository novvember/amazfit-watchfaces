import { AlarmDataWidget } from './AlarmDataWidget';
import { BatteryDataWidget } from './BatteryDataWidget';
import { BiochargeDataWidget } from './BiochargeDataWidget';
import { CaloriesDataWidget } from './CaloriesDataWidget';
import { DateDataWidget } from './DateDataWidget';
import { HeartDataWidget } from './HeartDataWidget';
import { DATA_WIDGET_COORDS } from './index.const';
import {
  BACKGROUND_AOD_IMAGE_PROPS,
  DISCONNECT_STATUS_PROPS,
  EDIT_BACKGROUND_PROPS,
  OVERLAY_CIRCLE_AOD_PROPS,
  TIME_POINTER_AOD_PROPS,
  TIME_POINTER_PROPS,
} from './index.r.layout';
import { PaiDataWidget } from './PaiDataWidget';
import { ReadinessDataWidget } from './ReadinessDataWidget';
import { RecoveryDataWidget } from './RecoveryDataWidget';
import { Settings } from './Settings';
import { SleepDataWidget } from './SleepDataWidget';
import { StepsDataWidget } from './StepsDataWidget';
import { SunDataWidget } from './SunDataWidget';
import { TimeDataWidget } from './TimeDataWidget';
import { WeatherDataWidget } from './WeatherDataWidget';
import { WorldClockDataWidget } from './WorldClockDataWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildSettings();

    this.buildBackground();
    this.buildDataWidgets();
    this.buildTime();
    this.buildDisconnectStatus();

    hmUI.createWidget(hmUI.widget.CIRCLE, OVERLAY_CIRCLE_AOD_PROPS);
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildSettings() {
    this.settings = new Settings();
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_BG, EDIT_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_POINTER_AOD_PROPS);
  },

  buildDataWidgets() {
    for (let i = 0; i < 4; i++) {
      const [x, y] = DATA_WIDGET_COORDS[i];
      const type = this.settings[i];

      this.buildDataWidget(x, y, type);
    }
  },

  buildDataWidget(x, y, type) {
    switch (type) {
      case 'date':
        this._timeSensor =
          this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

        new DateDataWidget({
          x,
          y,
          timeSensor: this._timeSensor,
        });

        break;

      case 'steps':
        this._stepSensor =
          this._stepSensor || hmSensor.createSensor(hmSensor.id.STEP);

        new StepsDataWidget({
          x,
          y,
          stepSensor: this._stepSensor,
        });

        break;

      case 'time':
        this._timeSensor =
          this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

        new TimeDataWidget({
          x,
          y,
          timeSensor: this._timeSensor,
        });

        break;

      case 'battery':
        new BatteryDataWidget({
          x,
          y,
        });

        break;

      case 'sleep':
        this._sleepSensor =
          this._sleepSensor || hmSensor.createSensor(hmSensor.id.SLEEP);

        new SleepDataWidget({
          x,
          y,
          sleepSensor: this._sleepSensor,
        });

        break;

      case 'calories':
        new CaloriesDataWidget({
          x,
          y,
        });

        break;

      case 'heart':
        new HeartDataWidget({
          x,
          y,
        });

        break;

      case 'pai-total':
        new PaiDataWidget({
          x,
          y,
        });

        break;

      case 'weather':
        this._weatherSensor =
          this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);

        new WeatherDataWidget({
          x,
          y,
          weatherSensor: this._weatherSensor,
        });

        break;

      case 'sun':
        this._weatherSensor =
          this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);
        this._timeSensor =
          this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

        new SunDataWidget({
          x,
          y,
          weatherSensor: this._weatherSensor,
          timeSensor: this._timeSensor,
        });

        break;

      case 'biocharge':
        new BiochargeDataWidget({
          x,
          y,
        });

        break;

      case 'recovery':
        new RecoveryDataWidget({
          x,
          y,
        });

        break;

      case 'readiness':
        new ReadinessDataWidget({
          x,
          y,
        });

        break;

      case 'alarm':
        new AlarmDataWidget({
          x,
          y,
        });

        break;

      case 'world-clock':
        this._worldClockSensor =
          this._worldClockSensor ||
          hmSensor.createSensor(hmSensor.id.WORLD_CLOCK);
        this._timeSensor =
          this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

        new WorldClockDataWidget({
          x,
          y,
          timeSensor: this._timeSensor,
          worldClockSensor: this._worldClockSensor,
        });

        break;

      default:
        break;
    }
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
