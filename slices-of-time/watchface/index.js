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

    const scene = getScene();

    if (scene === SCENE_WATCHFACE) {
      this.buildTime();
    } else if (scene === SCENE_AOD) {
      this.buildTimeAod();
    }
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

  getHourValues(timeSensor) {
    const hours = timeSensor.getHours();
    const hourText = timeSensor.getFormatHour().toString();

    return [hours, hourText];
  },

  getMinuteValues(timeSensor) {
    const minutes = timeSensor.getMinutes();
    const minutesText = minutes.toString().padStart(2, '0');
    const minutesLevel = Math.round((100 * minutes) / 60);

    return [minutes, minutesText, minutesLevel];
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

    const dotWidgets = this.dotCoords.map(([x, y]) => ({
      status: null,
      widget: createWidget(widget.CIRCLE, {
        ...DOT_CIRCLE_PROPS,
        center_x: x,
        center_y: y,
      }),
    }));

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

    const timeSensor = new Time();

    let prevHours = undefined;

    const rerenderDots = (hours) => {
      dotWidgets.forEach((item, i) => {
        const isActive = i < hours;

        if (item.status === isActive) {
          return;
        }

        item.status = isActive;
        const color = isActive ? COLORS.activeDot : COLORS.emptyDot;
        item.widget.setProperty(prop.COLOR, color);
      });
    };

    const rerenderSeparators = (hours) => {
      const separatorRightStatus = hours >= 12;

      separatorRightWidget.setProperty(
        prop.COLOR,
        separatorRightStatus ? COLORS.activeDot : COLORS.emptyDot,
      );
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
    };

    const rerenderMinutesText = (hours, minutes, minutesText, minutesLevel) => {
      const [x, y] = this.dotCoords[hours];

      minuteBackgroundDotWidget.setProperty(prop.MORE, {
        ...MINUTE_BACKGROUND_CIRCLE_PROPS,
        center_x: x,
        center_y: y,
      });

      minuteProgressWidget.setProperty(prop.MORE, {
        ...DOT_ARC_PROGRESS_PROPS,
        center_x: x,
        center_y: y,
        level: minutesLevel,
      });

      minuteTextWidget.setProperty(prop.MORE, {
        ...TIME_TEXT_PROPS,
        x: x - DOT_GRID_PARAMS.r,
        y: y - DOT_GRID_PARAMS.r,
        text: minutesText,
      });
    };

    const update = () => {
      const [hours, hoursText] = this.getHourValues(timeSensor);
      const [minutes, minutesText, minutesLevel] =
        this.getMinuteValues(timeSensor);

      if (prevHours !== hours) {
        prevHours = hours;

        rerenderDots(hours);
        rerenderSeparators(hours);
        rerenderHoursText(hours, hoursText);
      }

      rerenderMinutesText(hours, minutes, minutesText, minutesLevel);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        timeSensor.onPerMinute?.(update);
        update();
      },
    });
  },

  buildTimeAod() {
    const aodDotWidgets = this.dotCoords.map(() => ({
      status: null,
      widget: createWidget(widget.STROKE_RECT, AOD_DOT_STROKE_TECT_PROPS),
    }));

    const aodHourTextWidget = createWidget(widget.TEXT, AOD_TIME_TEXT_PROPS);
    const aodMinuteTextWidget = createWidget(widget.TEXT, AOD_TIME_TEXT_PROPS);

    const timeSensor = new Time();

    let prevHours = undefined;

    const rerenderDots = (hours) => {
      aodDotWidgets.forEach((item, i) => {
        const isActive = i < hours;
        const isHidden = i === hours || i === hours - 1;
        const newStatus = `${isActive}/${isHidden}`;

        if (item.status === newStatus) {
          return;
        }

        item.status = newStatus;

        const [x, y] = this.dotCoords[i];

        const props = isActive
          ? AOD_DOT_STROKE_TECT_PROPS
          : AOD_DOT_SMALL_STROKE_TECT_PROPS;

        item.widget.setProperty(prop.MORE, {
          ...props,
          color: isHidden ? 0x000000 : COLORS.aod,
          x: x - props.w / 2,
          y: y - props.h / 2,
        });
      });
    };

    const rerenderHoursText = (hours, hoursText) => {
      const [x, y] = this.dotCoords[hours - 1];

      aodHourTextWidget.setProperty(prop.MORE, {
        ...AOD_TIME_TEXT_PROPS,
        x: x - DOT_GRID_PARAMS.r,
        y: y - DOT_GRID_PARAMS.r,
        text: hoursText,
      });
    };

    const rerenderMinutesText = (
      hours,
      minutes,
      minutesText,
      _minutesLevel,
    ) => {
      const [x, y] = this.dotCoords[hours];

      aodMinuteTextWidget.setProperty(prop.MORE, {
        ...AOD_TIME_TEXT_PROPS,
        x: x - DOT_GRID_PARAMS.r,
        y: y - DOT_GRID_PARAMS.r,
        text: minutesText,
      });
    };

    const update = () => {
      const [hours, hoursText] = this.getHourValues(timeSensor);
      const [minutes, minutesText, minutesLevel] =
        this.getMinuteValues(timeSensor);

      if (prevHours !== hours) {
        prevHours = hours;

        rerenderDots(hours);
        rerenderHoursText(hours, hoursText);
      }

      rerenderMinutesText(hours, minutes, minutesText, minutesLevel);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        timeSensor.onPerMinute?.(update);
        update();
      },
    });
  },
});
