import { gettext } from 'i18n';
import { Digits } from './Digits';
import { CircleText } from './CIrcleText';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();
    this.buildBattery();
    this.buildSteps();
    this.buildWeather();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    const digitsTop = new Digits('top');
    const digitsBottom = new Digits('bottom');
    const circleText = new CircleText({
      angleStart: 45,
      angleEnd: 90,
      isReversed: false,
    });

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const { hour, minute, day, week } = timeSensor;

      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
      const hourText = hourValue.toString().padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');

      const weekdayTextKey = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][
        week - 1
      ];
      const dateText = `${gettext(weekdayTextKey)} ${day}`;

      digitsTop.set(hourText);
      digitsBottom.set(minuteText);
      circleText.set(dateText);
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

  buildBattery() {
    const circleText = new CircleText({
      angleStart: -135,
      angleEnd: -90,
      isReversed: true,
    });

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current = 0 } = batterySensor;
      const text = `${current}%`;
      circleText.set(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildSteps() {
    const circleText = new CircleText({
      angleStart: -90,
      angleEnd: -45,
      isReversed: false,
    });

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current = 0 } = stepSensor;
      circleText.set(current.toString());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildWeather() {
    const circleText = new CircleText({
      angleStart: 90,
      angleEnd: 135,
      isReversed: true,
    });

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const update = () => {
      const temp = weatherSensor.current || '--';
      const text = `${temp}°`;
      circleText.set(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },
});
