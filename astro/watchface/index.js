import { AOD_TIME_POINTER_PROPS, BACKGROUND_IMAGE_PROPS, TIME_POINTER_PROPS } from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();
    this.buildTime();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_POINTER_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, AOD_TIME_POINTER_PROPS);
  },
});
