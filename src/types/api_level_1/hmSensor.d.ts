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
    // readonly BATTERY: number;
    /** Steps sensor (current, target) */
    readonly STEP: number;
    // readonly CALORIE: number;
    // readonly HEART: number;
    // readonly PAI: number;
    // readonly DISTANCE: number;
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
  };

  /**
   * Event name for event listeners
   */
  const event: {
    /** Value changes */
    readonly CHANGE: number;
    // readonly CURRENT: number;
    // readonly LAST: number;
  };
}

/**
 * Zepp Sensor Instance
 */
interface HmSensorInstance {}