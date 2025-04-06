/**
 * Legacy detection for air pressure if supported by device.
 * - Reads system files of barometer,
 * - use `getData()` method to get all values,
 * - thanks to leXxiR and SashaCX75 for the method.
 */
export class Barometer {
  /** Path to the system file with barometer data.
   * Add another level (/../) to work in the Zepp OS simulatorF
   * */
  _DATA_FILE_PATH = '../../../baro_altim/pressure.dat';

  constructor() {}

  /**
   * Parses system data and finds two latest different values.
   * @param {Number[]} Float32Array with values
   * @returns {[Number | undefined, Number | undefined]} current and previous values if there are
   */
  _getLastValues(array) {
    if (!array.length) {
      return [];
    }

    const MIN_DIFF = 133; // 133 Pa ~ 1 mmHg
    let value;
    let prevValue;

    for (let i = array.length - 1; i >= 0; i--) {
      const currentValue = Number(array[i]);

      if (!value && currentValue) {
        value = currentValue;
        continue;
      } else if (!value) {
        continue;
      } else if (currentValue && Math.abs(value - currentValue) >= MIN_DIFF) {
        prevValue = currentValue;
        break;
      }
    }

    return [value, prevValue];
  }

  /**
   * Reads system barometer file and returns its content.
   * @returns {Number[] | Error} Float32Array with values or throws and error if reading was failed
   */
  _readDataFile() {
    const [stat, error] = hmFS.stat(this._DATA_FILE_PATH);

    if (error !== 0) {
      throw new Error(`Barometer: Can't get stat for data file: ${error}`);
    }

    const bytesCount = stat.size;
    const fileId = hmFS.open(this._DATA_FILE_PATH, hmFS.O_RDONLY);
    const bufferArray = new Float32Array(bytesCount / 4);
    const readResult = hmFS.read(fileId, bufferArray.buffer, 0, bytesCount);

    if (readResult < 0) {
      throw new Error(`Barometer: Can't read data file: ${readResult}`);
    }

    const closeResult = hmFS.close(fileId);

    if (closeResult < 0) {
      throw new Error(`Barometer: Can't close data file: ${closeResult}`);
    }

    return bufferArray;
  }

  /**
   * Converts pressure in Pa to hPa.
   * @param {Number}
   * @returns {Number}
   */
  _convertPaToHPa(paValue) {
    return paValue / 100;
  }

  /**
   * Converts pressure in Pa to mm Hg.
   * @param {Number}
   * @returns {Number}
   */
  _convertPaToMmHg(paValue) {
    return paValue / 133.322;
  }

  /**
   * Gets all values for air pressure
   * @returns {[String | undefined, Object | undefined]} First item for possible error, second for all data
   */
  getData() {
    let data = null;

    try {
      data = this._readDataFile();
    } catch (error) {
      console.log(error.message);
      return ['read failed'];
    }

    const [value, prevValue] = this._getLastValues(data);

    if (!value) {
      console.log('Barometer: Empty data file');
      return ['empty data'];
    }

    return [
      undefined,
      {
        hPa: Math.round(this._convertPaToHPa(value)),
        mmHg: Math.round(this._convertPaToMmHg(value)),
        diff: prevValue ? Math.sign(value - prevValue) : 0,
      },
    ];
  }
}
