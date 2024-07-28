import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import {
  getAngleFromHours,
  getAngleFromMinutes,
} from '../utils/getAngleFromTime';
import { MARK_SRC, MINUTE, MONTHS, SCREEN, WEEKDAYS } from '../utils/constants';
import { isInsideCircleAngle } from '../utils/isInsideCircleAngle';
import { formatNumber } from '../utils/formatNumber';
import { getSleepTimeString } from '../utils/getSleepTime';
import {
  BACKGROUND_IMAGE_PROPS,
  DATE_TEXT_PROPS,
  DISCONNECT_STATUS_PROPS,
  HOUR_AOD_TEXT_PROPS,
  HOUR_TEXT_PROPS,
  MARK_AOD_IMAGE_PROPS,
  MARK_IMAGE_PROPS,
  MINUTE_AOD_TEXT_PROPS,
  MINUTE_TEXT_PROPS,
  MOON_LEVEL_PROPS,
  SLEEP_TEXT_PROPS,
  STEPS_TEXT_PROPS,
  WEEKDAY_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildBackground();
    this.buildMoonPhase();
    this.buildDisconnectStatus();

    this.buildTime();

    this.buildDate();
    this.buildWeekDay();
    this.buildSteps();
    this.buildSleepTime();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildTime() {
    const markWidgets = [
      0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330,
    ].map((angle) => ({
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

    let updateTimer = undefined;
    let lastValue = '';

    const update = () => {
      const { hour, minute } = hmSensor.createSensor(hmSensor.id.TIME);
      const is12HourFormat = hmSetting.getTimeFormat() === 0;

      const hourString = (is12HourFormat ? hour % 12 || 12 : hour).toString();
      const minuteString = minute.toString().padStart(2, '0');

      if (lastValue === minuteString) {
        return;
      }

      console.log('time rerendered');
      lastValue = minuteString;

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
          alpha: isHidden ? 0 : 255,
        });
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          updateTimer = timer.createTimer(5000, 5000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    let updateTimer = undefined;
    let lastValue = 0;

    const update = () => {
      const { day, month } = hmSensor.createSensor(hmSensor.id.TIME);

      if (lastValue === day) {
        return;
      }

      console.log('date rerendered');
      lastValue = day;

      const dayString = day.toString().padStart(2, '0');
      const monthString = MONTHS[month - 1];

      textWidget.setProperty(hmUI.prop.TEXT, `${dayString} ${monthString}`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(2000, 2000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildWeekDay() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, WEEKDAY_TEXT_PROPS);
    let updateTimer = undefined;
    let lastValue = 0;

    const update = () => {
      const { week } = hmSensor.createSensor(hmSensor.id.TIME);

      if (lastValue === week) {
        return;
      }

      console.log('weekday rerendered');
      lastValue = week;

      textWidget.setProperty(hmUI.prop.TEXT, WEEKDAYS[week - 1]);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(2000, 2000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.STEP);
      textWidget.setProperty(hmUI.prop.TEXT, formatNumber(current, '.') + '.');
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');
        update();
      },
    });
  },

  buildSleepTime() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);

    const update = () => {
      const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
      const sleepTimeString = getSleepTimeString(sleepSensor);

      if (sleepTimeString) {
        textWidget.setProperty(hmUI.prop.TEXT, sleepTimeString);
      } else {
        textWidget.setProperty(hmUI.prop.TEXT, '');
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');
        update();
      },
    });
  },

  buildMoonPhase() {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, MOON_LEVEL_PROPS);
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
