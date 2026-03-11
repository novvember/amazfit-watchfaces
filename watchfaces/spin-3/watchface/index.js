import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import {
  getAngleFromHours,
  getAngleFromMinutes,
} from '../utils/getAngleFromTime';
import { MARK_SRC, MINUTE, WEEKDAYS } from '../utils/constants';
import { isInsideCircleAngle } from '../utils/isInsideCircleAngle';
import { formatNumber } from '../utils/formatNumber';
import { getSleepTimeString } from '../utils/getSleepTime';
import {
  BACKGROUND_AOD_IMAGE_PROPS,
  BACKGROUND_IMAGE_PROPS,
  BATTERY_LEVEL_PROPS,
  DATE_TEXT_PROPS,
  DISCONNECT_STATUS_PROPS,
  HOUR_AOD_TEXT_PROPS,
  HOUR_TEXT_PROPS,
  MARK_AOD_IMAGE_PROPS,
  MARK_IMAGE_PROPS,
  MINUTE_AOD_TEXT_PROPS,
  MINUTE_TEXT_PROPS,
  SLEEP_TEXT_PROPS,
  STEPS_TEXT_PROPS,
  WEATHER_TEXT_PROPS,
  SCREEN,
} from './index.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();
    this.buildBattery();
    this.buildDisconnectStatus();

    this.buildTime();

    this.buildDate();
    this.buildWeather();
    this.buildSteps();
    this.buildSleepTime();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
  },

  buildTime() {
    const ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

    const markWidgets = ANGLES.map((angle) => ({
      angle,
      widget: hmUI.createWidget(hmUI.widget.IMG, {
        ...MARK_IMAGE_PROPS,
        angle,
      }),
      widgetAod: hmUI.createWidget(hmUI.widget.IMG, {
        ...MARK_AOD_IMAGE_PROPS,
        angle,
      }),
    }));

    const hourWidget = hmUI.createWidget(hmUI.widget.TEXT, HOUR_TEXT_PROPS);
    const hourAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      HOUR_AOD_TEXT_PROPS,
    );

    const minuteWidget = hmUI.createWidget(hmUI.widget.TEXT, MINUTE_TEXT_PROPS);
    const minuteAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      MINUTE_AOD_TEXT_PROPS,
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    let lastValue = '';

    const update = () => {
      const { hour, minute } = timeSensor;
      const hourString = (is12HourFormat ? hour % 12 || 12 : hour).toString();
      const minuteString = minute.toString().padStart(2, '0');
      const value = hourString + minuteString;

      if (value === lastValue) {
        return;
      }

      lastValue = value;

      const { x, y } = getCoordsFromAngle(minute);
      const centerX = MINUTE.radius * x + SCREEN.centerX;
      const centerY = MINUTE.radius * y + SCREEN.centerY;
      const textX = centerX - MINUTE.size / 2;
      const textY = centerY - MINUTE.size / 2;

      const hourAngle = getAngleFromHours(hour);
      const minuteAngle = getAngleFromMinutes(minute);

      hourWidget.setProperty(hmUI.prop.TEXT, hourString);
      hourAodWidget.setProperty(hmUI.prop.TEXT, hourString);

      minuteWidget.setProperty(hmUI.prop.MORE, {
        ...MINUTE_TEXT_PROPS,
        text: minuteString,
        x: textX,
        y: textY,
      });

      minuteAodWidget.setProperty(hmUI.prop.MORE, {
        ...MINUTE_AOD_TEXT_PROPS,
        text: minuteString,
        x: textX,
        y: textY,
      });

      markWidgets.forEach(({ angle, widget, widgetAod }) => {
        const isHidden = isInsideCircleAngle(
          angle,
          minuteAngle,
          MINUTE.angleSize,
        );
        const isAccent = angle === hourAngle;

        widget.setProperty(hmUI.prop.MORE, {
          ...MARK_IMAGE_PROPS,
          angle,
          src: isAccent ? MARK_SRC.accent : MARK_SRC.general,
          alpha: isHidden ? 0 : 255,
        });

        widgetAod.setProperty(hmUI.prop.MORE, {
          ...MARK_AOD_IMAGE_PROPS,
          angle,
          src: isAccent ? MARK_SRC.aodAccent : MARK_SRC.aod,
          alpha: isHidden ? 0 : 255,
        });
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;

      const dayString = day.toString().padStart(2, '0');
      const weekString = WEEKDAYS[week - 1];
      const text = `${weekString} ${dayString}`;

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

  buildWeather() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_TEXT_PROPS);
  },

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current } = stepSensor;
      textWidget.setProperty(hmUI.prop.TEXT, formatNumber(current, '.') + '.');
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildSleepTime() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTimeString = getSleepTimeString(sleepSensor);

      if (sleepTimeString) {
        textWidget.setProperty(hmUI.prop.TEXT, sleepTimeString);
      } else {
        textWidget.setProperty(hmUI.prop.TEXT, '');
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        update();
      },
    });
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, BATTERY_LEVEL_PROPS);
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
