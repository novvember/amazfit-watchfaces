function formatTime(minutes) {
  const hh = Math.floor(minutes / 60).toString();
  const mm = (minutes % 60).toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

export function getWakeStages(sleepSensor) {
  const modelData = sleepSensor.getSleepStageModel();
  const sleepStages = sleepSensor.getSleepStageData();

  return sleepStages.filter((stage) => stage.model === modelData.WAKE_STAGE);
}

function getWakeTime(sleepSensor) {
  return getWakeStages(sleepSensor).reduce(
    (sum, { start, stop }) => sum + stop - start + 1,
    0,
  );
}

export function getSleepTimeTotal(sleepSensor) {
  return sleepSensor.getTotalTime();
}

export function getSleepTimeString(sleepSensor) {
  const totalTime = getSleepTimeTotal(sleepSensor);

  if (totalTime) {
    return formatTime(totalTime - getWakeTime(sleepSensor));
  }
}
