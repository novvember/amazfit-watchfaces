import { OPTIONAL_TYPES } from '../utils/constants';
import {
  BACKGROUND_IMAGE_PROPS,
  EDIT_BACKGROUND_IMAGE_PROPS,
  HOUR_POINTER_PROPS,
  MARKS_EDIT_GROUP_PROPS,
  MARKS_IMAGE_PROPS,
  MINUTE_POINTER_PROPS,
  SECOND_POINTER_PROPS,
  TIME_TEXT_EDIT_GROUP_PROPS,
  TIME_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildBackground();
    this.buildMarks();
    this.buildHourPointer();
    this.handleBuildTimeText();
    this.buildMinutePointer();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, EDIT_BACKGROUND_IMAGE_PROPS);
  },

  buildMarks() {
    const editGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      MARKS_EDIT_GROUP_PROPS,
    );
    const isMarksEnabled =
      editGroup.getProperty(hmUI.prop.CURRENT_TYPE) === OPTIONAL_TYPES.enabled;

    if (isMarksEnabled) {
      hmUI.createWidget(hmUI.widget.IMG, MARKS_IMAGE_PROPS);
    }
  },

  buildHourPointer() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, SECOND_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, HOUR_POINTER_PROPS);
  },

  buildMinutePointer() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_PROPS);
  },

  handleBuildTimeText() {
    const editGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      TIME_TEXT_EDIT_GROUP_PROPS,
    );
    const isTextTimeEnabled =
      editGroup.getProperty(hmUI.prop.CURRENT_TYPE) === OPTIONAL_TYPES.enabled;

    if (isTextTimeEnabled) {
      this.buildTimeText();
    }
  },

  buildTimeText() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    let updateTimer = undefined;
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const { hour, minute } = hmSensor.createSensor(hmSensor.id.TIME);
      const hourText = (is12HourFormat ? hour % 12 || 12 : hour)
        .toString()
        .padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');
      textWidget.setProperty(hmUI.prop.TEXT, `${hourText} ${minuteText}`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },
});
