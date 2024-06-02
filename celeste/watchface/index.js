import { TARGET_DOT_SIZE } from '../utils/constants';
import {
  BACKGROUND_PROPS,
  CENTER_AOD_PROPS,
  CENTER_PROPS,
  DATE_PROPS,
  DOTS_AOD_PROPS,
  DOTS_PROPS,
  HOUR_POINTER_AOD_PROPS,
  HOUR_POINTER_PROPS,
  MINUTE_POINTER_AOD_PROPS,
  MINUTE_POINTER_LINE_PROPS,
  MINUTE_POINTER_PROPS,
  TARGET_ARC_PROGRESS_PROPS,
  TARGET_TOP_IMAGE_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildTime();

    this.buildTarget();
    this.buildDate();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_PROPS);

    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_AOD_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, HOUR_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, HOUR_POINTER_AOD_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, DOTS_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, DOTS_AOD_PROPS);

    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_LINE_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, CENTER_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, CENTER_AOD_PROPS);
  },

  buildTarget() {
    const arcProgress = hmUI.createWidget(hmUI.widget.ARC_PROGRESS);
    const topImg = hmUI.createWidget(hmUI.widget.IMG);

    const update = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const angle = 360 + TARGET_DOT_SIZE.angleEnd + (360 * current) / target;

      arcProgress.setProperty(hmUI.prop.MORE, {
        ...TARGET_ARC_PROGRESS_PROPS,
        end_angle: angle,
      });

      topImg.setProperty(hmUI.prop.MORE, {
        ...TARGET_TOP_IMAGE_PROPS,
        angle,
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
    hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_PROPS);
  },
});
