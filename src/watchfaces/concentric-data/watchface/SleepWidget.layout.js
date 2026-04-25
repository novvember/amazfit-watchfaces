import { BATTERY_CIRCLE_TEXT_PROPS } from './BatteryWidget.layout';

export const SLEEP_CIRCLE_TEXT_PROPS = {
  ...BATTERY_CIRCLE_TEXT_PROPS,
  maxLength: 6,
  text: '00:00 ',
  angleStart: 30,
  isTextReversed: false,
};
