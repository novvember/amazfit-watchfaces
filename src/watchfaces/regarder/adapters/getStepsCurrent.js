import { formatNumber } from '../utils/formatNumber';

export function getStepsCurrent(stepSensor, devider = '') {
  const { current = 0 } = stepSensor;
  return formatNumber(current, devider);
}
