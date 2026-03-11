/**
 * Format time in HH:MM format
 * @param {Number} minutes
 * @returns {String}
 */
function formatTime(minutes) {
  const hh = Math.floor(minutes / 60).toString();
  const mm = (minutes % 60).toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

/**
 * Calculates total wake time during sleeping
 * @param {Object} sleepSensor
 * @returns {Number}
 */
function getWakeTime(sleepSensor) {
  const modelData = sleepSensor.getSleepStageModel();
  const sleepStages = sleepSensor.getSleepStageData();

  return sleepStages
    .filter((stage) => stage.model === modelData.WAKE_STAGE)
    .reduce((sum, { start, stop }) => sum + stop - start + 1, 0);
}

/**
 * Calculates total sleep time (sleep time + wake time)
 * @param {Object} sleepSensor
 * @returns {Number}
 */
export function getSleepTimeTotal(sleepSensor) {
  return sleepSensor.getTotalTime();
}

/**
 * Calculates sleep time without wake time
 * @param {Object} sleepSensor
 * @returns {Number}
 */
export function getSleepTime(sleepSensor) {
  const totalTime = getSleepTimeTotal(sleepSensor);

  if (totalTime) {
    return totalTime - getWakeTime(sleepSensor);
  }
}

/**
 * Calculates sleep time without wake time and formats it in HH:MM format
 * @param {Object} sleepSensor
 * @returns {String}
 */
export function getSleepTimeString(sleepSensor) {
  const sleepTime = getSleepTime(sleepSensor);

  if (sleepTime) {
    return formatTime(sleepTime);
  }
}

/**
 * Calculates number of slept hours
 * @param {Object} sleepSensor
 * @returns {Number}
 */
export function getSleepTimeHours(sleepSensor) {
  const minutes = getSleepTime(sleepSensor);
  return Math.floor(minutes / 60);
}
