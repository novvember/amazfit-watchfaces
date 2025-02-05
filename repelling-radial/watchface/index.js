import { COLOR_TYPES } from '../utils/constants';
import {
  BACKGROUND_AOD_IMAGE_PROPS,
  BACKGROUND_IMAGE_PROPS,
  COLOR_EDIT_GROUP_PROPS,
  GRID_AOD_IMAGE_PROPS,
  GRID_IMAGE_PROPS,
  HOUR_ARC_PROPS,
  MINUTE_ARC_PROPS,
  SECOND_ARC_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.setColor();

    this.buildTime();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG, {
      ...BACKGROUND_IMAGE_PROPS,
      src: this.colorType.data.background_src,
    });
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);

    const hourArcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      HOUR_ARC_PROPS,
    );
    const minuteArcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      MINUTE_ARC_PROPS,
    );
    const secondArcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      SECOND_ARC_PROPS,
    );

    hmUI.createWidget(hmUI.widget.IMG, {
      ...GRID_IMAGE_PROPS,
      src: this.colorType.data.grid_src,
    });
    hmUI.createWidget(hmUI.widget.IMG, GRID_AOD_IMAGE_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    let updateTimer = undefined;

    const ANGLE_GAP = 2;
    const UPDATE_INTERVAL = 1000;

    const update = () => {
      const { hour, minute, second } = timeSensor;

      const hourAngleStart = (360 / 12) * (hour % 12) + ANGLE_GAP;
      const hourAngleEnd = hour % 12 === 0 ? 0 + ANGLE_GAP : 360 + ANGLE_GAP;

      const minuteAngleStart = (360 / 60) * minute + ANGLE_GAP;
      const minuteAngleEnd = 360 - ANGLE_GAP;

      const isSecondInreasing = minute % 2 === 0;
      const secondAngle = (360 / 60) * second;
      const secondAngleStart = isSecondInreasing
        ? secondAngle - ANGLE_GAP
        : ANGLE_GAP;
      const secondAngleEnd = isSecondInreasing
        ? 360 + ANGLE_GAP
        : secondAngle + ANGLE_GAP;

      hourArcWidget.setProperty(hmUI.prop.MORE, {
        ...HOUR_ARC_PROPS,
        start_angle: hourAngleStart,
        end_angle: hourAngleEnd,
      });

      minuteArcWidget.setProperty(hmUI.prop.MORE, {
        ...MINUTE_ARC_PROPS,
        start_angle: minuteAngleStart,
        end_angle: minuteAngleEnd,
      });

      secondArcWidget.setProperty(hmUI.prop.MORE, {
        ...SECOND_ARC_PROPS,
        start_angle: secondAngleStart,
        end_angle: secondAngleEnd,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          updateTimer = timer.createTimer(
            UPDATE_INTERVAL,
            UPDATE_INTERVAL,
            update,
          );
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
        timer.stopTimer(updateTimer);
      },
    });
  },

  setColor() {
    const colorEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      COLOR_EDIT_GROUP_PROPS,
    );

    const colorType = colorEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);
    this.colorType = COLOR_TYPES.find((type) => type.type === colorType);
  },
});
