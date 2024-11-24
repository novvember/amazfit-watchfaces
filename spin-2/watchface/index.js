import { DATE, MINUTES, SCREEN, SECONDS } from '../utils/constants';
import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import { getAngleFromSeconds } from '../utils/getAngleFromSeconds';

import {
  getDateCircleProps,
  getDateTextProps,
  getDisconnectProps,
  getHoursCircleAODProps,
  getHoursCircleProps,
  getHoursTextAODProps,
  getHoursTextProps,
  getMinutesCircleAODProps,
  getMinutesCircleExternalAODProps,
  getMinutesCircleProps,
  getMinutesTextAODProps,
  getMinutesTextProps,
  getSecondsFakePointerProps,
  getSecondsImageProps,
  getSleepArcActiveProps,
  getSleepArcBackgroundProps,
  getSleepValueProps,
  getStepsArcActiveProps,
  getStepsArcBackgroundProps,
  getStepsValueProps,
  getUVICircleProps,
  getUVITextProps,
  getUVIValueProps,
  getWeekdayTextProps,
} from './index.r.layout';
import { getSleepTimeString } from '../utils/getSleepTime';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildDate();
    this.buildUvIndex();
    this.buildConnectionStatus();
    this.buildStepCounter();
    this.buildSleepTime();

    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');

    timer.stopTimer(this.updateHoursTimer);
    timer.stopTimer(this.updateMinutesTimer);
    timer.stopTimer(this.updateDateTimer);
  },

  buildHours() {
    hmUI.createWidget(hmUI.widget.CIRCLE, getHoursCircleProps());
    hmUI.createWidget(hmUI.widget.STROKE_RECT, getHoursCircleAODProps());

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, getHoursTextProps());
    const textWidgetAOD = hmUI.createWidget(
      hmUI.widget.TEXT,
      getHoursTextAODProps(),
    );

    const update = () => {
      const { hour } = hmSensor.createSensor(hmSensor.id.TIME);
      textWidget.setProperty(hmUI.prop.TEXT, hour.toString());
      textWidgetAOD.setProperty(hmUI.prop.TEXT, hour.toString());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.updateHoursTimer = timer.createTimer(1000, 1000, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          this.updateHoursTimer = timer.createTimer(2000, 2000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(this.updateHoursTimer);
      },
    });
  },

  buildMinutes() {
    const circleWidget = hmUI.createWidget(
      hmUI.widget.CIRCLE,
      getMinutesCircleProps(),
    );

    const circleAODWidget = hmUI.createWidget(
      hmUI.widget.CIRCLE,
      getMinutesCircleAODProps(),
    );

    const circleExternalAODWidget = hmUI.createWidget(
      hmUI.widget.STROKE_RECT,
      getMinutesCircleExternalAODProps(),
    );

    const textWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      getMinutesTextProps(),
    );

    const textAODWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      getMinutesTextAODProps(),
    );

    const update = () => {
      const { minute, second } = hmSensor.createSensor(hmSensor.id.TIME);
      const { x, y } = getCoordsFromAngle(minute, second);
      const centerX = MINUTES.orbitRadius * x + SCREEN.centerX;
      const centerY = MINUTES.orbitRadius * y + SCREEN.centerY;
      const textX = centerX - MINUTES.radius;
      const textY = centerY - MINUTES.radius;
      const textValue = minute.toString().padStart(2, '0');

      circleWidget.setProperty(
        hmUI.prop.MORE,
        getMinutesCircleProps(centerX, centerY),
      );

      circleAODWidget.setProperty(
        hmUI.prop.MORE,
        getMinutesCircleAODProps(centerX, centerY),
      );

      circleExternalAODWidget.setProperty(
        hmUI.prop.MORE,
        getMinutesCircleExternalAODProps(centerX, centerY),
      );

      textWidget.setProperty(
        hmUI.prop.MORE,
        getMinutesTextProps(textX, textY, textValue),
      );

      textAODWidget.setProperty(
        hmUI.prop.MORE,
        getMinutesTextAODProps(textX, textY, textValue),
      );
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.updateMinutesTimer = timer.createTimer(1000, 1000, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          this.updateMinutesTimer = timer.createTimer(2000, 2000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(this.updateMinutesTimer);
      },
    });
  },

  buildSeconds() {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    hmUI.createWidget(hmUI.widget.TIME_POINTER, getSecondsFakePointerProps());
    const widget = hmUI.createWidget(hmUI.widget.IMG, getSecondsImageProps());

    let updateTimer = undefined;

    const update = () => {
      const { utc } = timeSensor;
      const date = new Date(utc);
      const second = date.getSeconds() + date.getMilliseconds() / 1000;
      const angle = getAngleFromSeconds(second) % 360;

      widget.setProperty(hmUI.prop.ANGLE, angle);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timer.stopTimer(updateTimer);
          updateTimer = timer.createTimer(330, 330, update);
          update();
        }
      },
      pause_call: function () {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDate() {
    let prevDay = 0;

    hmUI.createWidget(hmUI.widget.CIRCLE, getDateCircleProps());
    const dateWidget = hmUI.createWidget(hmUI.widget.TEXT, null);
    const weekdayWidget = hmUI.createWidget(hmUI.widget.TEXT, null);

    const update = () => {
      const { day, week } = hmSensor.createSensor(hmSensor.id.TIME);

      if (prevDay !== day) {
        console.log('date rerendered');

        prevDay = day;
        dateWidget.setProperty(hmUI.prop.MORE, getDateTextProps(day));
        weekdayWidget.setProperty(
          hmUI.prop.MORE,
          getWeekdayTextProps(DATE.texts[week - 1]),
        );
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.updateDateTimer = timer.createTimer(2000, 2000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(this.updateDateTimer);
      },
    });
  },

  buildUvIndex() {
    hmUI.createWidget(hmUI.widget.CIRCLE, getUVICircleProps());
    hmUI.createWidget(hmUI.widget.TEXT_IMG, getUVIValueProps());
    hmUI.createWidget(hmUI.widget.TEXT, getUVITextProps());
  },

  buildConnectionStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, getDisconnectProps());
  },

  buildStepCounter() {
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getStepsArcBackgroundProps());
    const arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      getStepsArcActiveProps(),
    );
    const valueWidget = hmUI.createWidget(hmUI.widget.TEXT, null);

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
          const level = (current / target) * 100;

          arcWidget.setProperty(hmUI.prop.LEVEL, level);
          valueWidget.setProperty(
            hmUI.prop.MORE,
            getStepsValueProps(current.toString()),
          );
        }
      },
    });
  },

  buildSleepTime() {
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getSleepArcBackgroundProps());
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, getSleepArcActiveProps());

    const valueWidget = hmUI.createWidget(hmUI.widget.TEXT, null);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const sleepTime = getSleepTimeString(sleepSensor);

          if (sleepTime) {
            valueWidget.setProperty(
              hmUI.widget.MORE,
              getSleepValueProps(sleepTime),
            );
          } else {
            valueWidget.setProperty(hmUI.widget.MORE, getSleepValueProps(''));
          }
        }
      },
    });
  },
});
