import {
  AOD_MARKS_IMAGE_PROPS,
  AOD_POINTERS_PROPS,
  BACKGROUND_IMAGE_PROPS,
  MARKS_IMAGE_PROPS,
  POINTERS_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();
    this.buildTimeAod();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, MARKS_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, POINTERS_PROPS);
  },

  buildTimeAod() {
    hmUI.createWidget(hmUI.widget.IMG, AOD_MARKS_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, AOD_POINTERS_PROPS);
  },
});
