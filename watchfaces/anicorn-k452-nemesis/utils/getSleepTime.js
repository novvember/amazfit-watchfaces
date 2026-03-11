function formatTime(minutes) {
  const hh = Math.floor(minutes / 60).toString();
  const mm = (minutes % 60).toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

function getWakeTime(sleepSensor) {
  const modelData = sleepSensor.getSleepStageModel();
  const sleepStages = sleepSensor.getSleepStageData();

  return sleepStages
    .filter((stage) => stage.model === modelData.WAKE_STAGE)
    .reduce((sum, { start, stop }) => sum + stop - start + 1, 0);
}

export function getSleepTimeTotal(sleepSensor) {
  return sleepSensor.getTotalTime();
}

export function getSleepTime(sleepSensor) {
  const totalTime = getSleepTimeTotal(sleepSensor);

  if (totalTime) {
    return totalTime - getWakeTime(sleepSensor);
  }
}

export function getSleepTimeString(sleepSensor) {
  const sleepTime = getSleepTime(sleepSensor);

  if (sleepTime) {
    return formatTime(sleepTime);
  }
}
