import { DATE, MINUTES, SCREEN, SECONDS } from '../utils/constants';
import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import { getAngleFromSeconds } from '../utils/getAngleFromSeconds';

import {
  getDateCircleProps,
  getDateTextProps,
  getDisconnectProps,
  getHoursCircleProps,
  getHoursTextProps,
  getMinutesCircleProps,
  getMinutesTextProps,
  getSecondsAnimationProps,
  getSecondsFakePointerProps,
  getSecondsImageProps,
  getStepsArcActiveProps,
  getStepsArcBackgroundProps,
  getStepsValueProps,
  getUVICircleProps,
  getUVITextProps,
  getUVIValueProps,
  getWeekdayTextProps,
} from './index.r.layout';

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
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, getHoursTextProps());

    const update = () => {
      const { hour } = hmSensor.createSensor(hmSensor.id.TIME);
      textWidget.setProperty(hmUI.prop.TEXT, hour.toString());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.updateHoursTimer = timer.createTimer(1000, 1000, update);
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

    const textWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      getMinutesTextProps(),
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

      textWidget.setProperty(
        hmUI.prop.MORE,
        getMinutesTextProps(textX, textY, textValue),
      );
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.updateMinutesTimer = timer.createTimer(1000, 1000, update);
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
    let animationTimer = undefined;
    let prevTime = 0;

    hmUI.createWidget(hmUI.widget.TIME_POINTER, getSecondsFakePointerProps());
    const widget = hmUI.createWidget(hmUI.widget.IMG, getSecondsImageProps());

    const startAnimation = () => {
      const { second, utc } = timeSensor;
      prevTime = utc;

      const angle =
        widget.getProperty(hmUI.prop.ANIM)?.anim_steps?.anim_to ||
        getAngleFromSeconds(second);
      const nextAngle = getAngleFromSeconds(
        second + SECONDS.animationDuration / 1000,
      );

      widget.setProperty(
        hmUI.prop.ANIM,
        getSecondsAnimationProps(angle, nextAngle),
      );
    };

    const stopAnimation = () => {
      if (animationTimer) {
        timer.stopTimer(animationTimer);
        animationTimer = undefined;
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() === hmSetting.screen_type.AOD) {
          stopAnimation();
          return;
        }

        if (animationTimer) {
          return;
        }

        const diffTime = timeSensor.utc - prevTime;
        const delay =
          diffTime < SECONDS.animationDuration
            ? SECONDS.animationDuration - diffTime
            : SECONDS.animationDuration;

        console.log(diffTime, delay);

        animationTimer = timer.createTimer(
          delay,
          SECONDS.animationDuration,
          startAnimation,
        );

        if (delay === SECONDS.animationDuration) {
          startAnimation();
        }
      },
      pause_call: function () {
        console.log('ui pause');

        stopAnimation();
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
});
