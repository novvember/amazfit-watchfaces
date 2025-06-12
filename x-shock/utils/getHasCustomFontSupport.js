/**
 * Devices with round screen without system update for ZeppOS 2.0
 * (custom fonts support was added there)
 */
const LEGACY_DEVICES = [
  229, // Amazfit GTR 3 Pro
  230, // Amazfit GTR 3 Pro
  242, // Amazfit GTR 3 Pro
  6095106, // Amazfit GTR 3 Pro
  226, // Amazfit GTR 3
  227, // Amazfit GTR 3
];

/**
 * @returns {Boolean} If device has support for custom fonts in ttf format
 */
export function getHasCustomFontSupport() {
  const { deviceSource } = hmSetting.getDeviceInfo();

  if (LEGACY_DEVICES.includes(deviceSource)) {
    return false;
  }

  return true;
}
