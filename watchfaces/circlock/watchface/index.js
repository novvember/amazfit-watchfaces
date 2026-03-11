import { createWidget, widget, prop, event } from '@zos/ui';
import {
  AOD_HOUR_IMAGE_PROPS,
  AOD_POINTERS_PROPS,
  HOUR_IMAGE_PROPS,
  POINTERS_PROPS,
} from './index.r.layout';
import { Time } from '@zos/sensor';
import { getScene, SCENE_AOD, SCENE_WATCHFACE } from '@zos/app';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildPointers();
    this.buildHour();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildHour() {
    const imageWidget = createWidget(widget.IMG, HOUR_IMAGE_PROPS);
    const imageAodWidget = createWidget(widget.IMG, AOD_HOUR_IMAGE_PROPS);

    const timeSensor = new Time();

    const update = () => {
      const hour24 = timeSensor.getHours();
      const hour12 = hour24 % 12 || 12;

      imageWidget.setProperty(prop.SRC, `hours/${hour12}.png`);
      imageAodWidget.setProperty(prop.SRC, `hours_aod/${hour12}.png`);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE || getScene() === SCENE_AOD) {
          timeSensor.onPerMinute(update);
          update();
        }
      },
    });
  },

  buildPointers() {
    createWidget(widget.TIME_POINTER, POINTERS_PROPS);
    createWidget(widget.TIME_POINTER, AOD_POINTERS_PROPS);
  },
});
