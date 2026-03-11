function formatTime(minutes) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(1, '0');
  const mm = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${mm}`;
}

function getWakeTime(sleepSensor) {
  const modelData = sleepSensor.getSleepStageModel();
  const sleepStages = sleepSensor.getSleepStageData();

  return sleepStages
    .filter((stage) => stage.model === modelData.WAKE_STAGE)
    .reduce((sum, { start, stop }) => sum + stop - start + 1, 0);
}

function getSleepTimeTotal(sleepSensor) {
  return sleepSensor.getTotalTime();
}

export function getSleepTime(sleepSensor) {
  sleepSensor.updateInfo();

  const totalTime = getSleepTimeTotal(sleepSensor);

  if (totalTime) {
    const minutes = totalTime - getWakeTime(sleepSensor);

    return {
      time: formatTime(minutes),
      hours: Math.floor(minutes / 60),
    };
  }

  return {
    time: '—',
    hours: 0,
  };
}
