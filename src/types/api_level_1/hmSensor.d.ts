/**
 * Zepp Sensors
 */
declare namespace hmSensor {
  /**
   * Create a sensor instance
   */
  function createSensor(sensorId: number): HmSensorInstance;

  const id: {
    /** Time sensor (time, date) */
    readonly TIME: number;
    /** Battery level (current value) */
    readonly BATTERY: number;
    /** Steps sensor (current, target) */
    readonly STEP: number;
    /** Calories sensor (current, target) */
    readonly CALORIE: number;
    /** Heart rate sensor */
    readonly HEART: number;
    // readonly PAI: number;
    /** Disstance sensor */
    readonly DISTANCE: number;
    // readonly STAND: number;
    /** Weather info sensor */
    readonly WEATHER: number;
    // readonly FAT_BURRING: number;
    // readonly SPO2: number;
    // readonly STRESS: number;
    // readonly VIBRATE: number;
    // readonly WEAR: number;
    /** World clock app info */
    readonly WORLD_CLOCK: number;
    /** Sleep info sensor */
    readonly SLEEP: number;
    // readonly MUSIC: number;
    // readonly BODY_TEMP: number;
    // readonly SUN: number;
    // readonly WIND: number;
    // readonly MOON: number;
    // readonly TIME_ZONE: number;
    readonly PAI: number;
  };

  const event: {
    /** Value changes */
    readonly CHANGE: number;
    // readonly CURRENT: number;
    /** Last value changes (heart rate sensor) */
    readonly LAST: number;
  };
}

/**
 * Zepp Sensor Instance
 */
interface HmSensorInstance {
  // --- TIME ---
  /** Current second [0-59] */
  readonly second?: number;
  /** Current day [1-31] */
  readonly day?: number;
  /** Current weekday [0-6] 0 - Monday */
  readonly week?: number;
  /** UTC timestamp */
  readonly utc?: number;
  /** Current hour value [0-23] */
  readonly hour?: number;
  /** Current minute value [0-59] */
  readonly minute?: number;
  /** Current month [1-12] */
  readonly month?: number;
  /** Current year */
  readonly year?: number;

  // --- STEP, BATTERY and other ---
  /** Current value (step count, battery level, weather temperature) */
  readonly current?: number;
  /** Target value (step count) */
  readonly target?: number;

  // --- WEATHER ---
  /** Current outside temperature */
  readonly current?: number;
  /** Weather condition index [1-28] */
  curAirIconIndex?: number;
  /** Gets weather forecast data */
  getForecastWeather?(): {
    cityName: string;
    forecastData: {
      count: number;
      data: {
        index: number;
        high: number;
        low: number;
      }[];
      tideData: {
        count: number;
        data: {
          sunrise: {
            hour: number;
            minute: number;
          };
          sunset: {
            hour: number;
            minute: number;
          };
        }[];
      };
    };
  };

  // --- HEART ---
  last?: number;
  today?: number[];

  // --- SLEEP ---
  /** Refreshes sleep data */
  updateInfo?(): void;
  // /** Get detailed sleep stage data */
  // getSleepStageData?(): Array<{ model: number; start: number; stop: number }>;
  /** Get total sleep time in minutes */
  getTotalTime?(): number;
  /** Get detailed sleep stage data */
  getBasicInfo?(): {
    startTime: number;
    endTime: number;
  };

  // --- WORLD CLOCK ---
  init?(): void;
  getWorldClockCount?(): number;
  getWorldClockInfo?(index: number): {
    city: string;
    hour: number;
    minute: number;
  };

  // --- PAI ---
  dailypai?: number;
  totalpai?: number;
  prepai0?: number;
  prepai1?: number;
  prepai2?: number;
  prepai3?: number;
  prepai4?: number;
  prepai5?: number;
  prepai6?: number;

  // --- Common ---
  /** Subscribe to sensor events */
  addEventListener?(event: keyof hmSensor['event'], callback: () => void): void;
  /** Unsubscribe from sensor events */
  removeEventListener?(event: number, callback?: Function): void;

  event: {
    /** Time sensor: minute ends */
    readonly MINUTEEND: number;
  };
}
