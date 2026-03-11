import { getAngleFromMinutes } from '../utils/getAngleFromTime';
import { getWidgetCoordsFromAngle } from '../utils/getWidgetCoordsFromAngle';
import { BatteryWidget } from './BatteryWidget';
import { DateWidget } from './DateWidget';
import { ArcWidget } from './ArcWidget';
import { HourWidget } from './HourWidget';
import { Minutes } from './Minutes';
import { Seconds } from './Seconds';
import { ConnectionStatusWidget } from './ConnectionStatusWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.minuteChangeCallbacks = [];
    this.minuteChangeCallbacksAod = [];

    this.buildHours();
    this.buildDate();
    this.buildSteps();
    this.buildBattery();
    this.buildHeart();
    this.buildConnectionStatus();

    this.buildMinutes();
    this.buildSeconds();

    this.handleMinuteChange();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  handleMinuteChange() {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      for (const callback of this.minuteChangeCallbacks) {
        callback(timeSensor);
      }
    };

    const updateAod = () => {
      for (const callback of this.minuteChangeCallbacksAod) {
        callback(timeSensor);
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, updateAod);
          updateAod();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildSeconds() {
    new Seconds();
  },

  buildMinutes() {
    new Minutes();
  },

  buildHours() {
    const widget = new HourWidget();

    const onMinuteChange = (timeSensor) => {
      const { hour, minute } = timeSensor;
      const angle = getAngleFromMinutes(minute);

      const [x, y] = getWidgetCoordsFromAngle({
        angle: (angle + 180) % 360,
        radius: px(101),
        rotationCenterX: px(240),
        rotationCenterY: px(240),
        widgetWidth: widget.width,
        widgetHeight: widget.height,
      });

      widget.move(x, y);
      widget.updateValue(hour, minute);
    };

    this.minuteChangeCallbacks.push(onMinuteChange);
    this.minuteChangeCallbacksAod.push(onMinuteChange);
  },

  buildDate() {
    const widget = new DateWidget();

    const onMinuteChange = (timeSensor) => {
      const { minute, day, week } = timeSensor;
      const angle = getAngleFromMinutes(minute);

      const [x, y] = getWidgetCoordsFromAngle({
        angle: (angle + 250) % 360,
        radius: px(120),
        rotationCenterX: px(240),
        rotationCenterY: px(240),
        widgetWidth: widget.width,
        widgetHeight: widget.height,
      });

      widget.move(x, y);
      widget.updateValue(day, week);
    };

    this.minuteChangeCallbacks.push(onMinuteChange);
  },

  buildSteps() {
    const widget = new ArcWidget({
      dataType: hmUI.data_type.STEP,
      iconType: 'steps',
      hasDangerZoneEnd: false,
      textSize: px(32),
    });

    const onMinuteChange = (timeSensor) => {
      const { minute } = timeSensor;
      const angle = getAngleFromMinutes(minute);

      const [x, y] = getWidgetCoordsFromAngle({
        angle: (angle + 310) % 360,
        radius: px(120),
        rotationCenterX: px(240),
        rotationCenterY: px(240),
        widgetWidth: widget.width,
        widgetHeight: widget.height,
      });

      widget.move(x, y);
    };

    this.minuteChangeCallbacks.push(onMinuteChange);
  },

  buildBattery() {
    const widget = new BatteryWidget();

    const onMinuteChange = (timeSensor) => {
      const { minute } = timeSensor;
      const angle = getAngleFromMinutes(minute);

      const [x, y] = getWidgetCoordsFromAngle({
        angle: (angle + 110) % 360,
        radius: px(120),
        rotationCenterX: px(240),
        rotationCenterY: px(240),
        widgetWidth: widget.width,
        widgetHeight: widget.height,
      });

      widget.move(x, y);
    };

    this.minuteChangeCallbacks.push(onMinuteChange);
  },

  buildHeart() {
    const widget = new ArcWidget({
      dataType: hmUI.data_type.HEART,
      iconType: 'heart',
      hasDangerZoneEnd: true,
    });

    const onMinuteChange = (timeSensor) => {
      const { minute } = timeSensor;
      const angle = getAngleFromMinutes(minute);

      const [x, y] = getWidgetCoordsFromAngle({
        angle: (angle + 50) % 360,
        radius: px(120),
        rotationCenterX: px(240),
        rotationCenterY: px(240),
        widgetWidth: widget.width,
        widgetHeight: widget.height,
      });

      widget.move(x, y);
    };

    this.minuteChangeCallbacks.push(onMinuteChange);
  },

  buildConnectionStatus() {
    const widget = new ConnectionStatusWidget();

    const onMinuteChange = (timeSensor) => {
      const { minute } = timeSensor;
      const angle = getAngleFromMinutes(minute);

      const [x, y] = getWidgetCoordsFromAngle({
        angle: (angle + 142) % 360,
        radius: px(162),
        rotationCenterX: px(240),
        rotationCenterY: px(240),
        widgetWidth: widget.width,
        widgetHeight: widget.height,
      });

      widget.move(x, y);
    };

    this.minuteChangeCallbacks.push(onMinuteChange);
  },
});
