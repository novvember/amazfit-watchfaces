import { DisctanceWidget } from './DistanceWidget';
import { HeartSideWidget } from './sideWidgets/HeartSideWidget';
import { WIDGETS } from './index.const';
import { WidgetSettings } from './settings/WidgetSettings';
import { SleepWidget } from './SleepWidget';
import { StepSideWidget } from './sideWidgets/StepSideWidget';
import { TimeWidget } from './TimeWidget';
import { TemperatureSlotWidget } from './slotWidgets/TemperatureSlotWidget';
import { DateSlotWidget } from './slotWidgets/DateSlotWidget';
import { UviSlotWidget } from './slotWidgets/UviSlotWidget';
import { SunSlotWidget } from './slotWidgets/SunSlotWidget';
import { WindSlotWidget } from './slotWidgets/WindSlotWidget';
import { BatterySlotWidget } from './slotWidgets/BatterySlotWidget';
import { SecondsSlotWidget } from './slotWidgets/SecondsSlotWidget';
import { HumiditySlotWidget } from './slotWidgets/HumiditySlotWidget';
import { WorldClockSlotWidget } from './slotWidgets/WorldClockSlotWidget';
import { WeatherSlotWidget } from './slotWidgets/WeatherSlotWidget';
import { MoonSlotWidget } from './slotWidgets/MoonSlotWidget';
import { ActivityRingsSlotWidget } from './slotWidgets/ActivityRingsSlotWidget';
import { AirPressureSlotWidget } from './slotWidgets/AirPressureSlotWidget';
import { AqiSlotWidget } from './slotWidgets/AqiSlotWidget';
import { PaiSlotWidget } from './slotWidgets/PaiSlotWidget';
import { CaloriesSlotWidget } from './slotWidgets/CaloriesSlotWidget';
import { RecoverySlotWidget } from './slotWidgets/RecoverySlotWidget';
import { AlarmSlotWidget } from './slotWidgets/AlarmSlotWidget';
import { ClickerSlotWidget } from './slotWidgets/ClickerSlotWidget';
import { StatusIconsWidget } from './StatusIconsWidget';
import { TimeSettings } from './settings/TimeSettings';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();

    this.buildStepSide();
    this.buildHeartSide();

    this.buildSleep();
    this.buildDistance();
    this.buildStatusIcons();

    this.buildWidgets();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    const timeSettings = new TimeSettings();
    const mode = timeSettings.settings.time;

    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    new TimeWidget({
      timeSensor: this._timeSensor,
      // @ts-ignore
      mode,
    });
  },

  buildStepSide() {
    this._stepSensor =
      this._stepSensor || hmSensor.createSensor(hmSensor.id.STEP);

    new StepSideWidget({
      stepSensor: this._stepSensor,
    });
  },

  buildHeartSide() {
    this._heartSensor =
      this._heartSensor || hmSensor.createSensor(hmSensor.id.HEART);

    new HeartSideWidget({
      heartSensor: this._heartSensor,
    });
  },

  buildDistance() {
    this._distanceSensor =
      this._distanceSensor || hmSensor.createSensor(hmSensor.id.DISTANCE);

    new DisctanceWidget({
      distanceSensor: this._distanceSensor,
    });
  },

  buildSleep() {
    this._sleepSensor =
      this._sleepSensor || hmSensor.createSensor(hmSensor.id.SLEEP);

    new SleepWidget({
      sleepSensor: this._sleepSensor,
    });
  },

  buildStatusIcons() {
    new StatusIconsWidget();
  },

  buildWidgets() {
    const widgetSettings = new WidgetSettings();

    let hasClicker = false;

    for (let i = 0; i < 6; i++) {
      const type = widgetSettings.settings[i] || 'unknown';

      if (type === 'clicker') {
        hasClicker = true;
      }

      this.buildWidget(type, i);
    }

    /** Resets clicker widget counter if clicker is not selected */
    if (!hasClicker) {
      this.saveClickerCounter(0);
    }
  },

  /**
   *
   * @param {string} type
   * @param {number} slotNumber
   */
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

      case 'calories':
        this.buildCalories(slotNumber);
        break;

      case 'recovery-time':
        this.buildRecoveryTime(slotNumber);
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
        console.log('Unknown widget type', type);
        break;
    }
  },

  /**
   * @param {number} slotNumber
   */
  buildTemperature(slotNumber) {
    new TemperatureSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildDate(slotNumber) {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    new DateSlotWidget({
      ...WIDGETS[slotNumber],
      timeSensor: this._timeSensor,
    });
  },

  /**
   * @param {number} slotNumber
   */
  buildUvi(slotNumber) {
    new UviSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildSunPosition(slotNumber) {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    this._weatherSensor =
      this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);

    new SunSlotWidget({
      ...WIDGETS[slotNumber],
      timeSensor: this._timeSensor,
      weatherSensor: this._weatherSensor,
    });
  },

  /**
   * @param {number} slotNumber
   */
  buildWind(slotNumber) {
    new WindSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildBattery(slotNumber) {
    new BatterySlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildSeconds(slotNumber) {
    new SecondsSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildHumidity(slotNumber) {
    new HumiditySlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildWorldTime(slotNumber) {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    this._worldClockSensor =
      this._worldClockSensor || hmSensor.createSensor(hmSensor.id.WORLD_CLOCK);

    new WorldClockSlotWidget({
      ...WIDGETS[slotNumber],
      timeSensor: this._timeSensor,
      worldClockSensor: this._worldClockSensor,
    });
  },

  /**
   * @param {number} slotNumber
   */
  buildWeather(slotNumber) {
    this._weatherSensor =
      this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);

    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    new WeatherSlotWidget({
      ...WIDGETS[slotNumber],
      weatherSensor: this._weatherSensor,
      timeSensor: this._timeSensor,
    });
  },

  /**
   * @param {number} slotNumber
   */
  buildMoon(slotNumber) {
    new MoonSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildActivityRings(slotNumber) {
    new ActivityRingsSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildAirPressure(slotNumber) {
    new AirPressureSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildAirQuality(slotNumber) {
    new AqiSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildPai(slotNumber) {
    this._paiSensor = this._paiSensor || hmSensor.createSensor(hmSensor.id.PAI);

    new PaiSlotWidget({
      ...WIDGETS[slotNumber],
      paiSensor: this._paiSensor,
    });
  },

  /**
   * @param {number} slotNumber
   */
  buildCalories(slotNumber) {
    new CaloriesSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildRecoveryTime(slotNumber) {
    new RecoverySlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildAlarm(slotNumber) {
    new AlarmSlotWidget(WIDGETS[slotNumber]);
  },

  /**
   * @param {number} slotNumber
   */
  buildClicker(slotNumber) {
    new ClickerSlotWidget({
      ...WIDGETS[slotNumber],
      getClickerCounter: this.getClickerCounter,
      saveClickerCounter: this.saveClickerCounter,
    });
  },

  /**
   * @returns {number}
   */
  getClickerCounter() {
    return hmFS.SysProGetInt('modular-clicker-counter') || 0;
  },

  /**
   * @param {number} counter
   * @returns {void}
   */
  saveClickerCounter(counter = 0) {
    return hmFS.SysProSetInt('modular-clicker-counter', counter);
  },
});
