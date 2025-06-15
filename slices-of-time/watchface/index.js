import { createWidget, widget, prop } from '@zos/ui';
import { getScene, SCENE_AOD, SCENE_WATCHFACE } from '@zos/app';
import { Time } from '@zos/sensor';
import { COLORS, DOT_GRID_PARAMS } from '../utils/constants';
import {
  AOD_DOT_SMALL_STROKE_TECT_PROPS,
  AOD_DOT_STROKE_TECT_PROPS,
  AOD_TIME_TEXT_PROPS,
  DOT_ARC_PROGRESS_PROPS,
  DOT_CIRCLE_PROPS,
  LEFT_SEPARATOR_CIRCE_PROPS,
  MINUTE_BACKGROUND_CIRCLE_PROPS,
  RIGHT_SEPARATOR_CIRCE_PROPS,
  TIME_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.calculateDotCoords();
    this.buildTime();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  calculateDotCoords() {
    const { r, x0, y0, columnCount, columnGap, rowGap } = DOT_GRID_PARAMS;

    this.dotCoords = new Array(24).fill(null).map((_, index) => {
      const column = index % columnCount;
      const row = Math.floor(index / columnCount);
      const xCenter = x0 + column * (2 * r + columnGap);
      const yCenter = y0 + row * (2 * r + rowGap);

      return [xCenter, yCenter];
    });
  },

  buildTime() {
    const separatorLeftWidget = createWidget(
      widget.CIRCLE,
      LEFT_SEPARATOR_CIRCE_PROPS,
    );
    const separatorRightWidget = createWidget(
      widget.CIRCLE,
      RIGHT_SEPARATOR_CIRCE_PROPS,
    );
    const dotWidgets = this.dotCoords.map(([x, y]) =>
      createWidget(widget.CIRCLE, {
        ...DOT_CIRCLE_PROPS,
        center_x: x,
        center_y: y,
      }),
    );

    const aodDotWidgets = this.dotCoords.map(() =>
      createWidget(widget.STROKE_RECT, AOD_DOT_STROKE_TECT_PROPS),
    );

    const minuteBackgroundDotWidget = createWidget(
      widget.CIRCLE,
      MINUTE_BACKGROUND_CIRCLE_PROPS,
    );
    const minuteProgressWidget = createWidget(
      widget.ARC_PROGRESS,
      DOT_ARC_PROGRESS_PROPS,
    );
    const hourTextWidget = createWidget(widget.TEXT, TIME_TEXT_PROPS);
    const minuteTextWidget = createWidget(widget.TEXT, TIME_TEXT_PROPS);
    const aodHourTextWidget = createWidget(widget.TEXT, AOD_TIME_TEXT_PROPS);
    const aodMinuteTextWidget = createWidget(widget.TEXT, AOD_TIME_TEXT_PROPS);

    const timeSensor = new Time();

    let prevHours = undefined;

    const rerenderDots = (hours) => {
      dotWidgets.forEach((widget, i) => {
        const isActive = i < hours;

        widget.setProperty(
          prop.COLOR,
          isActive ? COLORS.activeDot : COLORS.emptyDot,
        );
      });

      separatorRightWidget.setProperty(
        prop.COLOR,
        hours >= 12 ? COLORS.activeDot : COLORS.emptyDot,
      );

      aodDotWidgets.forEach((widget, i) => {
        const [x, y] = this.dotCoords[i];
        const isActive = i < hours;
        const isHidden = i === hours || i === hours - 1;
        const props = isActive ? AOD_DOT_STROKE_TECT_PROPS : AOD_DOT_SMALL_STROKE_TECT_PROPS;

        widget.setProperty(prop.MORE, {
          ...props,
          color: isHidden ? 0x000000 : COLORS.aod,
          x: x - props.w / 2,
          y: y - props.h / 2,
        });
      });
    };

    const rerenderHoursText = (hours, hoursText) => {
      if (hours === 0) {
        hourTextWidget.setProperty(prop.TEXT, '');
        return;
      }

      const [x, y] = this.dotCoords[hours - 1];

      hourTextWidget.setProperty(prop.MORE, {
        ...TIME_TEXT_PROPS,
        x: x - DOT_GRID_PARAMS.r,
        y: y - DOT_GRID_PARAMS.r,
        text: hoursText,
      });

      aodHourTextWidget.setProperty(prop.MORE, {
        ...AOD_TIME_TEXT_PROPS,
        x: x - DOT_GRID_PARAMS.r,
        y: y - DOT_GRID_PARAMS.r,
        text: hoursText,
      });
    };

    const rerenderMinutesText = (hours, minutes) => {
      const [x, y] = this.dotCoords[hours];
      const level = Math.round((100 * minutes) / 60);
      const text = minutes.toString().padStart(2, '0');

      minuteBackgroundDotWidget.setProperty(prop.MORE, {
        ...MINUTE_BACKGROUND_CIRCLE_PROPS,
        center_x: x,
        center_y: y,
      });

      minuteProgressWidget.setProperty(prop.MORE, {
        ...DOT_ARC_PROGRESS_PROPS,
        center_x: x,
        center_y: y,
        level,
      });

      minuteTextWidget.setProperty(prop.MORE, {
        ...TIME_TEXT_PROPS,
        x: x - DOT_GRID_PARAMS.r,
        y: y - DOT_GRID_PARAMS.r,
        text,
      });

      aodMinuteTextWidget.setProperty(prop.MORE, {
        ...AOD_TIME_TEXT_PROPS,
        x: x - DOT_GRID_PARAMS.r,
        y: y - DOT_GRID_PARAMS.r,
        text,
      });
    };

    const update = () => {
      const hours = timeSensor.getHours();

      if (prevHours !== hours) {
        prevHours = hours;
        const hoursText = timeSensor.getFormatHour().toString();

        rerenderDots(hours);
        rerenderHoursText(hours, hoursText);
      }

      const minutes = timeSensor.getMinutes();

      rerenderMinutesText(hours, minutes);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        const scene = getScene();

        if (scene === SCENE_WATCHFACE || scene === SCENE_AOD) {
          timeSensor.onPerMinute?.(update);
          update();
        }
      },
    });
  },
});
