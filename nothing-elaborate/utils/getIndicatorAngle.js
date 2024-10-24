/**
 * Transforms value into angle to display it at the pulse indicator
 * @param {Number} value - current value to display
 * @param {Number} minValue - minimum visible value
 * @param {Number} maxValue - maximum visible value
 * @param {Number} minAngle - minimum indicator angle (stands for minimum value)
 * @param {Number} maxAngle - maximum indicator angle (stands for maximum value)
 * @returns {Number}
 */
export function getIndicatorAngle(value, minValue, maxValue, minAngle, maxAngle) {
    let angle =
        ((value - minValue) / (maxValue - minValue)) * (maxAngle - minAngle) +
        minAngle;

    angle = Math.min(angle, maxAngle);
    angle = Math.max(angle, minAngle);

    return angle;
}