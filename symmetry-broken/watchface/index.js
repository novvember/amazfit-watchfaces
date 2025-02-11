import { DOT_COORDS, DOT_SIZE, SCREEN } from '../utils/constants';
import { getAngleFromSeconds } from '../utils/getAngleFromTime';
import { getCoordsFromAngleR1 } from '../utils/getCoordsFromAngle';
import { RotatingDot } from '../utils/RotatingDot';
import { TIME_TEXT_PROPS } from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildDots();
    this.buildTime();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { hour, minute } = timeSensor;

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
      const hourText = hourValue.toString().padStart(2, '0');

      const minuteText = minute.toString().padStart(2, '0');

      const text = `${hourText}\n${minuteText}`;

      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildDots() {
    const widgets = DOT_COORDS.map(
      ([x, y]) =>
        new RotatingDot({
          x: px(x),
          y: px(y),
          w: DOT_SIZE,
          h: DOT_SIZE,
          src: 'dot.png',
          show_level: hmUI.show_level.ONLY_NORMAL,
          getSrc: (level) => `dot/dot_${level}.png`,
        }),
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    let updateTimer = undefined;

    const update = () => {
      const { second } = timeSensor;
      const angle = getAngleFromSeconds(second);
      const { x, y } = getCoordsFromAngleR1(angle);
      widgets.forEach((widget) =>
        widget.rotateToPoint(
          x * px(300) + SCREEN.centerX,
          y * px(300) + SCREEN.centerY,
        ),
      );
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },
});
