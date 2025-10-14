import { getCoordsFromAngle } from './getCoordsFromAngle';

export function getWidgetCoordsFromAngle({
  angle,
  radius,
  rotationCenterX,
  rotationCenterY,
  widgetWidth,
  widgetHeight,
}) {
  const { x, y } = getCoordsFromAngle(angle);

  const centerX = radius * x + rotationCenterX;
  const centerY = radius * y + rotationCenterY;

  const widgetX = centerX - widgetWidth / 2;
  const widgetY = centerY - widgetHeight / 2;

  return [widgetX, widgetY];
}
