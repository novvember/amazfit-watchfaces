export function getTimeAngles(hours = 0, minutes = 0, seconds = 0) {
  hours = hours % 12;

  return {
    hours: ((hours + minutes / 60) * 360) / 12,
    minutes: ((minutes + seconds / 60) * 360) / 60,
    seconds: seconds * 6,
  };
}
