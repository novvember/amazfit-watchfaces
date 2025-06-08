import {
  AOD_TIME_BACKGROUND_IMAGE_PROPS,
  AOD_TIME_POINTERS_PROPS,
  DATE_TEXT_PROPS,
  TIME_BACKGROUND_IMAGE_PROPS,
  TIME_POINTERS_PROPS,
} from './clock.r.layout';
import { createWidget, widget, prop } from '@zos/ui';
import { Time } from '@zos/sensor';
import { getScene, SCENE_WATCHFACE } from '@zos/app';
import { getText } from '@zos/i18n';

export class Clock {
  constructor() {
    this.buildDate();
    this.buildTime();
  }

  buildDate() {
    const textWidget = createWidget(widget.TEXT, DATE_TEXT_PROPS);
    const timeSensor = new Time();

    const update = () => {
      const date = timeSensor.getDate();
      const weekDay = timeSensor.getDay();

      const weekDayText = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][
        weekDay - 1
      ];

      const text = `${getText(weekDayText)} ${date}`;

      textWidget.setProperty(prop.TEXT, text);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          timeSensor.onPerMinute?.(update);
          update();
        }
      },
    });
  }

  buildTime() {
    createWidget(widget.IMG, TIME_BACKGROUND_IMAGE_PROPS);
    createWidget(widget.IMG, AOD_TIME_BACKGROUND_IMAGE_PROPS);

    createWidget(widget.TIME_POINTER, TIME_POINTERS_PROPS);
    createWidget(widget.TIME_POINTER, AOD_TIME_POINTERS_PROPS);
  }
}
