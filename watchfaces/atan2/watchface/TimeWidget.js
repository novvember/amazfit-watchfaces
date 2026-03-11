import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import { getTimeAngles } from '../utils/getTimeAngles';
import { Dot } from './Dot';
import { Line } from './Line';

const ROTATION_CENTER_X = px(240);
const ROTATION_CENTER_Y = px(240);

const SECONDS_RADIUS = px(112 / 2);
const MINUTES_RADIUS = px(432 / 2);
const HOURS_RADIUS = px(280 / 2);

const LINES_POINTS = [
  [4, 0],
  [0, 1],
  [1, 2],
  [2, 4],
  [4, 1],
  [1, 3],
  [3, 2],
  [2, 0],
  [0, 3],
];

export class TimeWidget {
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;
    this._updateTimer = undefined;

    this._pointsCoords = [];

    this._lines = new Array(9).fill(null).map(() => new Line());
    this._dots = new Array(5).fill(null).map(() => new Dot());

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { hour = 0, minute = 0, second = 0 } = this._timeSensor;
    const angles = getTimeAngles(hour, minute, second);

    this._pointsCoords = [
      this._calculatePoint(angles.seconds, SECONDS_RADIUS),
      this._calculatePoint(angles.seconds + 120, SECONDS_RADIUS),
      this._calculatePoint(angles.seconds - 120, SECONDS_RADIUS),
      this._calculatePoint(angles.minutes, MINUTES_RADIUS),
      this._calculatePoint(angles.hours, HOURS_RADIUS),
    ];

    this._updateLayout();
  }

  _calculatePoint(degrees, radius) {
    const { x, y } = getCoordsFromAngle(degrees);

    return {
      x: radius * x + ROTATION_CENTER_X,
      y: radius * y + ROTATION_CENTER_Y,
    };
  }

  _updateLayout() {
    this._lines.forEach((line, i) => {
      const [j, k] = LINES_POINTS[i];
      line.set(this._pointsCoords[j], this._pointsCoords[k]);
    });

    this._dots.forEach((dot, i) => {
      dot.set(this._pointsCoords[i]);
    });
  }

  _bindHandlers() {
    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this._updateTimer = timer.createTimer(1000, 1000, this._update);
          this._update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          this._timeSensor.addEventListener?.(
            this._timeSensor.event.MINUTEEND,
            this._update,
          );
          this._update();
        }
      },
      pause_call: () => {
        this._timeSensor.removeEventListener?.(
          this._timeSensor.event.MINUTEEND,
          this._update,
        );
        timer.stopTimer(this._updateTimer);
      },
    });
  }
}
