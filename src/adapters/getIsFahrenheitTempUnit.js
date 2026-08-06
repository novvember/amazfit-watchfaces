/**
 * Check user's settings about temperature degree units (Celsius or Fahrenheit)
 * @returns {boolean}
 */
export function getIsFahrenheitTempUnit() {
  return hmSetting.getTemperatureUnit() === 1;
}
