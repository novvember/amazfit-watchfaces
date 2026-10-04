import * as ui from '@zos/ui';
import { Battery, Step, Time } from '@zos/sensor';
import { getScene, SCENE_AOD, SCENE_SETTINGS, SCENE_WATCHFACE } from '@zos/app';
import { getText } from '@zos/i18n';
import { formatNumber } from '../../../utils/formatNumber';
import { getMonth } from '../../../adapters2/getMonth';
import { getTimeTexts } from '../../../adapters2/getTimeTexts';
import { getWeekDay } from '../../../adapters2/getWeekDay';
import {
  BACKGROUND_GRADIENT_IMAGE_PROPS,
  BATTERY_STATUS_PROPS,
  DATA_TEXT_PROPS,
  DATE_TEXT_PROPS,
  DISCONNECT_STATUS_PROPS,
  EDIT_BACKGROUND_PROPS,
} from './index.r.layout';
import { TimeTextWidget } from './TimeTextWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._buildBackground();
    this._buildTime();
    this._buildDate();
    this._buildSteps();
    this._buildDisconnectStatus();
    this._buildBatteryStatus();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  _buildBackground() {
    ui.createWidget(ui.widget.WATCHFACE_EDIT_BG, EDIT_BACKGROUND_PROPS);
    ui.createWidget(ui.widget.IMG, BACKGROUND_GRADIENT_IMAGE_PROPS);
  },

  _buildTime() {
    this._timeSensor = this._timeSensor || new Time();

    const textWidget = new TimeTextWidget();

    let prevTime = '';

    const update = () => {
      const { hourText, minuteText } = getTimeTexts(this._timeSensor);
      const timeText = `${hourText}:${minuteText}`;

      if (prevTime === timeText) {
        return;
      }

      prevTime = timeText;
      textWidget.set(timeText);
    };

    this._timeSensor.onPerMinute(() => {
      const scene = getScene();
      if (
        scene === SCENE_WATCHFACE ||
        scene === SCENE_AOD ||
        scene === SCENE_SETTINGS
      ) {
        update();
      }
    });

    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        const scene = getScene();
        if (
          scene === SCENE_WATCHFACE ||
          scene === SCENE_AOD ||
          scene === SCENE_SETTINGS
        ) {
          update();
        }
      },
    });
  },

  _buildDate() {
    this._timeSensor = this._timeSensor || new Time();

    const textWidget = ui.createWidget(ui.widget.TEXT, DATE_TEXT_PROPS);

    let prevDay = -1;

    const update = () => {
      const day = this._timeSensor.getDate();

      if (prevDay === day) {
        return;
      }

      prevDay = day;

      const monthKey = getMonth(this._timeSensor);
      const dayText = getText(monthKey).replace('{day}', String(day));
      const weekdayKey = getWeekDay(this._timeSensor);
      const weekDay = getText(weekdayKey);
      const dateText = `${weekDay},\n${dayText}`;

      textWidget.setProperty(ui.prop.TEXT, dateText);
    };

    this._timeSensor.onPerMinute(() => {
      const scene = getScene();
      if (
        scene === SCENE_WATCHFACE ||
        scene === SCENE_AOD ||
        scene === SCENE_SETTINGS
      ) {
        update();
      }
    });

    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        const scene = getScene();
        if (
          scene === SCENE_WATCHFACE ||
          scene === SCENE_AOD ||
          scene === SCENE_SETTINGS
        ) {
          update();
        }
      },
    });
  },

  _buildSteps() {
    const stepSensor = new Step();

    const textWidget = ui.createWidget(ui.widget.TEXT, DATA_TEXT_PROPS);

    let prevValue = 0;

    const update = () => {
      const current = stepSensor.getCurrent() ?? 0;
      const target = stepSensor.getTarget() ?? 10000;

      if (prevValue === current) {
        return;
      }

      prevValue = current;
      const progressMark = current >= target ? '✓' : '';
      const text =
        `${formatNumber(current, ' ')} ${getText('steps')} ${progressMark}`.trim();

      textWidget.setProperty(ui.prop.TEXT, text);
    };

    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          stepSensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.offChange(update);
      },
    });
  },

  _buildDisconnectStatus() {
    ui.createWidget(ui.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },

  _buildBatteryStatus() {
    const MIN_VALUE = 20;
    const batterySensor = new Battery();
    const imageWidget = ui.createWidget(ui.widget.IMG, BATTERY_STATUS_PROPS);

    const update = () => {
      imageWidget.setProperty(
        ui.prop.VISIBLE,
        batterySensor.getCurrent() < MIN_VALUE,
      );
    };

    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          batterySensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.offChange(update);
      },
    });
  },
});
