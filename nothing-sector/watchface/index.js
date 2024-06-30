import {
  BATTERY_PROGRESS_PROPS,
  BATTERY_TEXT_PROPS,
  DATE_DAY_PROPS,
  DATE_WEEK_PROPS,
  DISCONNECT_PROPS,
  GAUGE_IMAGE_PROPS,
  HOURS_IMAGE_PROPS,
  HOUR_POINTER_PROPS,
  MINUTE_POINTER_PROPS,
  SECOND_POINTER_PROPS,
  STEPS_PROGRESS_PROPS,
  STEPS_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildBackground();
    this.buildBattery();
    this.buildSteps();
    this.buildDate();
    this.buildDisconnect();
    this.buildPointers();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, GAUGE_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, HOURS_IMAGE_PROPS);
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.IMG, BATTERY_TEXT_PROPS);
    const progressWidget = hmUI.createWidget(hmUI.widget.IMG, BATTERY_PROGRESS_PROPS);
    let prevValue = null;

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);
      const level = Math.round((current * 12) / 100);

      if (prevValue === level) {
        return;
      }

      console.log('battery rerendered');

      prevValue = level;
      const imageSrc = `battery/${level}.png`;
      progressWidget.setProperty(hmUI.prop.MORE, {
        ...BATTERY_PROGRESS_PROPS,
        src: imageSrc,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSteps() {
    hmUI.createWidget(hmUI.widget.IMG, STEPS_TEXT_PROPS);
    const progressWidget = hmUI.createWidget(hmUI.widget.IMG, STEPS_PROGRESS_PROPS);
    let prevValue = null;

    const update = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const ratio = current / target;
      const level = Math.round(ratio * 6);

      if (prevValue === level) {
        return;
      }

      console.log('steps rerendered');

      prevValue = level;
      const imageSrc = `steps/${level}.png`;
      progressWidget.setProperty(hmUI.prop.MORE, {
        ...STEPS_PROGRESS_PROPS,
        src: imageSrc,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildDate() {
    hmUI.createWidget(hmUI.widget.IMG_WEEK, DATE_WEEK_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_DAY_PROPS);
  },

  buildDisconnect() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_PROPS);
  },

  buildPointers() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, HOUR_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, SECOND_POINTER_PROPS);
  },
});
