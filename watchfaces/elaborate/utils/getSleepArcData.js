import { getSleepTimeTotal } from './getSleepTime';
import { getAngleFromTime } from './getAngleFromTime'

/**
 * Calculates start/end angles for circle arc widget to display sleep time
 * @param {Object} sleepSensor - current value to display
 * @returns {[Number, Number]} - [angleStart, angleEnd]
 */
export function getSleepArcData(sleepSensor) {
    let { startTime, endTime } = sleepSensor.getBasicInfo();
    const totalSleepTimeHours = getSleepTimeTotal(sleepSensor) / 60;
    let angleStart = getAngleFromTime(startTime);
    let angleEnd = getAngleFromTime(endTime);

    if (angleEnd < angleStart) {
        angleEnd += 360;
    }

    if (totalSleepTimeHours >= 12) {
        angleEnd += 360;
    }

    return [angleStart, angleEnd];
}