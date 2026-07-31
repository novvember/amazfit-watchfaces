/**
 * @typedef {Object} CreateArcTextPropsParams
 * @property {number} textSize
 * @property {number} angleStart
 * @property {number} angleEnd
 * @property {number} radius
 * @property {boolean} [isExternal]
 * @property {[number, number]} [fontOffsets]
 */

function getMinApi() {
  const { minAPI = '0' } = hmSetting.getSystemInfo?.() || {};
  return Number(minAPI);
}

/**
 * @param {CreateArcTextPropsParams} params
 */
function createArcTextPropsLegacy({
  textSize,
  angleStart,
  angleEnd,
  radius,
  isExternal = false,
  fontOffsets = [1.1, 0.2],
}) {
  const radiusFixed = isExternal
    ? radius + fontOffsets[1] * textSize
    : radius + fontOffsets[0] * textSize;

  return {
    x: px(480 / 2) - radiusFixed,
    y: px(480 / 2) - radiusFixed,
    w: radiusFixed * 2,
    h: radiusFixed * 2,
    text_size: textSize,
    start_angle: angleStart,
    end_angle: angleEnd,
    mode: isExternal ? 1 : 0,
  };
}
/**
 * @param {CreateArcTextPropsParams} params
 */
function createArcTextPropsNew({
  textSize,
  angleStart,
  angleEnd,
  radius,
  isExternal = false,
}) {
  const lineHeight = textSize * 1.3;
  const radiusFixed = radius + lineHeight / 2;

  return {
    x: px(480 / 2) - radiusFixed,
    y: px(480 / 2) - radiusFixed,
    w: radiusFixed * 2,
    h: radiusFixed * 2,
    text_size: textSize,
    start_angle: angleStart,
    end_angle: angleEnd,
    mode: isExternal ? 1 : 0,
  };
}

/**
 * Helps to create props for TEXT widget to display it as arc text
 * @param {CreateArcTextPropsParams} params
 */
export function createArcTextProps(params) {
  if (getMinApi() < 2.1) {
    return createArcTextPropsLegacy(params);
  }

  return createArcTextPropsNew(params);
}
