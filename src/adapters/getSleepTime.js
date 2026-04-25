/**
 * @param {HmSensorInstance} sleepSensor
 */
function getWakeStages(sleepSensor) {
  const modelData = sleepSensor.getSleepStageModel();
  const sleepStages = sleepSensor.getSleepStageData();

  return sleepStages.filter((stage) => stage.model === modelData.WAKE_STAGE);
}

/**
 * @param {HmSensorInstance} sleepSensor
 * @returns {number}
 */
function getWakeTime(sleepSensor) {
  return getWakeStages(sleepSensor).reduce(
    (sum, { start, stop }) => sum + stop - start + 1,
    0,
  );
}

/**
 * @param {HmSensorInstance} sleepSensor
 * @returns {number}
 */
function getSleepTimeTotal(sleepSensor) {
  return sleepSensor.getTotalTime?.() || 0;
}

/**
 * Gets sleep time duration
 * @param {HmSensorInstance} sleepSensor
 */
export function getSleepTime(sleepSensor) {
  sleepSensor.updateInfo?.();

  const totalTime = getSleepTimeTotal(sleepSensor);

  if (!totalTime) {
    return {};
  }

  const wakeTime = getWakeTime(sleepSensor);
  const pureSleepMinutes = totalTime - wakeTime;

  const hours = Math.floor(pureSleepMinutes / 60);
  const minutes = pureSleepMinutes % 60;
  const text = `${hours}:${minutes.toString().padStart(2, '0')}`;

  return {
    hours,
    minutes,
    text,
  };
}
