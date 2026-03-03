export function getMiddleAngle(angle1, angle2) {
  let a = angle1 % 360;
  let b = angle2 % 360;
  if (a < 0) a += 360;
  if (b < 0) b += 360;

  const delta = (b - a + 360) % 360;

  if (delta === 0) {
    return (a + 180) % 360;
  }

  if (delta === 180) {
    return (a + 90) % 360;
  }

  if (delta > 180) {
    return (a + delta / 2) % 360;
  } else {
    const half = (360 - delta) / 2;
    const mid = a - half;
    return ((mid % 360) + 360) % 360;
  }
}
