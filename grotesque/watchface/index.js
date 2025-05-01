import { formatNumber } from '../utils/formatNumber';
import {
  AOD_HOUR_TEXT_PROPS,
  AOD_MINUTE_NEXT_TEXT_PROPS,
  AOD_MINUTE_TEXT_PROPS,
  BOTTOM_RECT_PROPS,
  TEMPERATURE_TEXT_PROPS,
  TOP_RECT_PROPS,
  UVI_IMAGE_LEVEL_PROPS,
} from './index.r.layout';
import { TextWidget } from './textWidget';
import { TimeSlide } from './timeSlide';
import { gettext } from 'i18n';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
      this.buildTime();
      this.buildRects();
      this.buildHeartRate();
      this.buildSteps();
      this.buildDate();
      this.buildBattery();
      this.buildTemperature();
      this.buildUVI();
    } else {
      this.buildAodTime();
    }
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildAodTime() {
    const hourWidget = hmUI.createWidget(hmUI.widget.TEXT, AOD_HOUR_TEXT_PROPS);
    const minuteWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      AOD_MINUTE_TEXT_PROPS,
    );
    const minuteNextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      AOD_MINUTE_NEXT_TEXT_PROPS,
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const { hour = 0, minute = 0 } = timeSensor;
      const nextMinute = (minute + 1) % 60;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;

      const hourText = hourValue.toString().padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');
      const nextMinuteText = nextMinute.toString().padStart(2, '0');

      hourWidget.setProperty(hmUI.prop.TEXT, hourText);
      minuteWidget.setProperty(hmUI.prop.TEXT, minuteText);
      minuteNextWidget.setProperty(hmUI.prop.TEXT, nextMinuteText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.AOD) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildTime() {
    const is12HourFormat = hmSetting.getTimeFormat() === 0;
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const timeSlide = new TimeSlide(timeSensor, is12HourFormat);
    const update = timeSlide.update.bind(timeSlide);

    let updateTimer = undefined;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildRects() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, TOP_RECT_PROPS);
    hmUI.createWidget(hmUI.widget.FILL_RECT, BOTTOM_RECT_PROPS);
  },

  buildHeartRate() {
    const textWidget = new TextWidget('top-left');
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const { last = '--' } = heartSensor;
      const isHighlighted = last > 100;
      textWidget.update(gettext('bpm'), last, isHighlighted);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener(hmSensor.event.LAST, update);
      },
    });
  },

  buildSteps() {
    const textWidget = new TextWidget('top-right');
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current = 0, target = 10000 } = stepSensor;
      const isHighlighted = current >= target;
      textWidget.update(gettext('steps'), formatNumber(current), isHighlighted);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildDate() {
    const textWidget = new TextWidget('bottom-center');
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    const update = () => {
      const { day = '', week = '' } = timeSensor;
      const dayText = day.toString().padStart(2, '0');
      const weekText = gettext(WEEKDAY_KEYS[week - 1]);
      textWidget.update(weekText, dayText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildBattery() {
    const textWidget = new TextWidget('bottom-right');
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current = '---' } = batterySensor;
      const isHighlighted = current < 20;
      textWidget.update(`${current}%`, '', isHighlighted);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildTemperature() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, TEMPERATURE_TEXT_PROPS);
  },

  buildUVI() {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, UVI_IMAGE_LEVEL_PROPS);
  },
});
