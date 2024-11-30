import {
  ACCENT_COLORS,
  DATE_TYPES,
  HOUR_COORD,
  KM_TEXT,
  M_TEXT,
  MINUTE_COORD,
  MINUTE_SMALL_DOT_GAP,
  WEEKDAYS,
} from '../utils/constants';
import { formatNumber } from '../utils/formatNumber';
import { getSleepTimeString } from '../utils/getSleepTime';
import { getTimeString } from '../utils/getTimeString';
import { HourDotWidget } from '../utils/hourDotWidget';
import { MinuteDotWidget } from '../utils/minuteDotWidget';
import {
  COLOR_EDIT_GROUP_PROPS,
  DATA_1_EDIT_GROUP_PROPS,
  DATA_1_TEXT_PROPS,
  DATA_2_EDIT_GROUP_PROPS,
  DATA_2_TEXT_PROPS,
  DATE_EDIT_GROUP_PROPS,
  DATE_TEXT_PROPS,
  EDIT_BACKGROUND_IMAGE_PROPS,
  HOUR_DOT_PROPS,
  MINUTE_BIG_DOT_PROPS,
  MINUTE_SMALL_DOT_PROPS,
  TIME_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface init');
  },

  build() {
    console.log('watchface build');

    this.setAccentColor();
    this.setDateType();
    this.setDataWidgetType();

    this.buildTime();
    this.buildDate();
    this.buildDataWidgets();
  },

  onDestroy() {
    console.log('watchface destroy');
  },

  setAccentColor() {
    hmUI.createWidget(hmUI.widget.IMG, EDIT_BACKGROUND_IMAGE_PROPS);

    const colorEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      COLOR_EDIT_GROUP_PROPS,
    );

    const accentColorType = colorEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);

    this.accenColor = ACCENT_COLORS.find(
      (obj) => obj.type === accentColorType,
    )?.color;
  },

  setDataWidgetType() {
    const data1EditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      DATA_1_EDIT_GROUP_PROPS,
    );
    const data2EditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      DATA_2_EDIT_GROUP_PROPS,
    );

    this.data1Type = data1EditGroup.getProperty(hmUI.prop.CURRENT_TYPE);
    this.data2Type = data2EditGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  },

  setDateType() {
    const dateEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      DATE_EDIT_GROUP_PROPS,
    );

    const dateType = dateEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);
    this.dateType = dateType === DATE_TYPES[0].type ? 'month' : 'weekday';
  },

  buildTime() {
    const hourDotWidgets = new Array(12).fill(null).map(
      (_, i) =>
        new HourDotWidget({
          ...HOUR_DOT_PROPS,
          center_x: HOUR_COORD[i][0],
          center_y: HOUR_COORD[i][1],
        }),
    );

    const minuteDotWidgets = new Array(12).fill(null).map(
      (_, i) =>
        new MinuteDotWidget(
          {
            ...MINUTE_BIG_DOT_PROPS,
            center_x: MINUTE_COORD[i][0],
            center_y: MINUTE_COORD[i][1],
            color: this.accenColor,
          },
          {
            ...MINUTE_SMALL_DOT_PROPS,
            color: this.accenColor,
          },
          MINUTE_SMALL_DOT_GAP,
        ),
    );

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    let updateTimer = undefined;

    const updateHour = () => {
      const { hour } = timeSensor;
      const hourValue = hour % 12 || 12;

      hourDotWidgets.forEach((dotWidget, i) =>
        dotWidget.setState(i + 1 <= hourValue),
      );
    };

    const updateMinute = () => {
      const { minute } = timeSensor;
      const activeDotCount = Math.floor(minute / 5);
      const restDotValue = minute % 5;

      minuteDotWidgets.forEach((dotWidget, i) => {
        let value = 0;

        if (i < activeDotCount) value = 5;
        else if (i === activeDotCount) value = restDotValue;

        dotWidget.setValue(value);
      });
    };

    const updateText = () => {
      const { hour, minute } = timeSensor;
      const text = getTimeString(hour, minute, is12HourFormat);
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    const update = () => {
      updateHour();
      updateMinute();
      updateText();
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDataWidgets() {
    this.buildData(this.data1Type, DATA_1_TEXT_PROPS);
    this.buildData(this.data2Type, DATA_2_TEXT_PROPS);
  },

  buildData(type, props) {
    switch (type) {
      case hmUI.edit_type.HEART:
        this.buildHeart(props);
        break;

      case hmUI.edit_type.STEP:
        this.buildSteps(props);
        break;

      case hmUI.edit_type.SLEEP:
        this.buildSleep(props);
        break;

      case hmUI.edit_type.CAL:
        this.buildCalorie(props);
        break;

      case hmUI.edit_type.DISTANCE:
        this.buildDistance(props);
        break;

      case hmUI.edit_type.BATTERY:
        this.buildBattery(props);
        break;

      case hmUI.edit_type.WEATHER:
        this.buildWeather(props);
        break;

      default:
        break;
    }
  },

  buildDate() {
    const text = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    let updateTimer = undefined;

    const getDateText = () => {
      const { day, month, week } = timeSensor;

      if (this.dateType === 'weekday') {
        return `${day} ${WEEKDAYS[week - 1]}`;
      }

      return `${day}.${month}`;
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getDateText(timeSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(3000, 3000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildHeart(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...props,
      color: this.accenColor,
    });
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);
    let updateTimer = undefined;

    const getHeartText = () => {
      const { last } = heartSensor;
      return `:${last}`;
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getHeartText(heartSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(3000, 3000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildSteps(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...props,
      color: this.accenColor,
    });
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);
    let updateTimer = undefined;

    const getStepsText = () => {
      const { current } = stepSensor;
      return `${formatNumber(current, '.')}.`;
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getStepsText(stepSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(3000, 3000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildSleep(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...props,
      color: this.accenColor,
    });
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
    let updateTimer = undefined;

    const getSleepText = (sleepSensor) => {
      return getSleepTimeString(sleepSensor) || '';
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getSleepText(sleepSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(3000, 3000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildCalorie(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...props,
      color: this.accenColor,
    });
    const calorieSensor = hmSensor.createSensor(hmSensor.id.CALORIE);
    let updateTimer = undefined;

    const getCalorieText = (calorieSensor) => {
      const { current = 0 } = calorieSensor;
      return `${formatNumber(current, '.')}*`;
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getCalorieText(calorieSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(3000, 3000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDistance(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...props,
      color: this.accenColor,
    });
    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);
    let updateTimer = undefined;

    const getDistanceText = (distanceSensor) => {
      const { current } = distanceSensor;

      if (current >= 1000) {
        return `${(current / 1000).toFixed(1)} ${KM_TEXT}`;
      }

      return `${current} ${M_TEXT}`;
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getDistanceText(distanceSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(3000, 3000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildBattery(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...props,
      color: this.accenColor,
    });
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);
    let updateTimer = undefined;

    const getBatteryText = (batterySensor) => {
      const { current } = batterySensor;
      return `${current}%`;
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getBatteryText(batterySensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(3000, 3000, update);
          update();
        }
      },
      pause_call: () => {
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildWeather(props) {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...props,
      color: this.accenColor,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    });
  },
});
