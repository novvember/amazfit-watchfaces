import { formatNumber } from '../utils/formatNumber';
import {
  CALORIE_TEXT,
  HEART_TEXT,
  KILOMETER_TEXT,
  METER_TEXT,
  SLEEP_TEXT,
  STEPS_POSTFIX,
  WEEKDAYS,
} from '../utils/constants';
import {
  BACKGROUND_AOD_IMAGE_PROPS,
  BACKGROUND_EDIT_IMAGE_PROPS,
  BACKGROUND_IMAGE_PROPS,
  BOTTOM_TEXT_PROPS,
  DATA_EDIT_GROUP_PROPS,
  TIME_AOD_HANDS_PROPS,
  TIME_HANDS_PROPS,
  TOP_TEXT_PROPS,
} from './index.r.layout';
import { decline } from '../utils/decline';
import { getSleepTimeString } from '../utils/getSleepTime';

WatchFace({
  onInit() {
    console.log('watchface init');
  },

  build() {
    console.log('watchface build');

    this.buildBackground();
    
    this.setDataWidgetType();

    this.buildDate();
    this.buildDataWidget();
    this.buildTimeHands();
  },

  onDestroy() {
    console.log('watchface destroy');
  },

  setDataWidgetType() {
    const dataEditGroup = hmUI.createWidget(
      hmUI.widget.WATCHFACE_EDIT_GROUP,
      DATA_EDIT_GROUP_PROPS,
    );

    this.dataType = dataEditGroup.getProperty(hmUI.prop.CURRENT_TYPE);
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_EDIT_IMAGE_PROPS);
  },

  buildTimeHands() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_HANDS_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_AOD_HANDS_PROPS);
  },

  buildDate() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TOP_TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { week, day } = timeSensor;
      const weekText = WEEKDAYS[week - 1];
      const dayText = day.toString();
      const text = `${weekText} ${dayText}`;
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildDataWidget() {
    const type = this.dataType;
    const props = BOTTOM_TEXT_PROPS;

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

  buildHeart(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, props);
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const getHeartText = () => {
      const { last } = heartSensor;
      return HEART_TEXT.replace('%s', last);
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getHeartText(heartSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener(hmSensor.event.LAST, update);
      },
    });
  },

  buildSteps(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, props);
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const getStepsText = () => {
      const { current } = stepSensor;
      return `${formatNumber(current, ' ')} ${decline(current, STEPS_POSTFIX)}`;
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getStepsText());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildSleep(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, props);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const getSleepText = (sleepSensor) => {
      const sleepTimeString = getSleepTimeString(sleepSensor);

      if (!sleepTimeString) {
        return '';
      }

      return SLEEP_TEXT.replace('%s', sleepTimeString);
    };

    const update = () => {
      sleepSensor.updateInfo();
      text.setProperty(hmUI.prop.TEXT, getSleepText(sleepSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildCalorie(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, props);
    const calorieSensor = hmSensor.createSensor(hmSensor.id.CALORIE);

    const getCalorieText = (calorieSensor) => {
      const { current = 0 } = calorieSensor;
      const calText = formatNumber(current, ' ');
      return CALORIE_TEXT.replace('%s', calText);
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getCalorieText(calorieSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          calorieSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        calorieSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildDistance(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, props);
    const distanceSensor = hmSensor.createSensor(hmSensor.id.DISTANCE);

    const getDistanceText = (distanceSensor) => {
      const { current } = distanceSensor;
      let value = current;
      let text = METER_TEXT;

      if (current >= 1000) {
        value = (current / 1000).toFixed(1);
        text = KILOMETER_TEXT;
      }

      return text.replace('%s', value);
    };

    const update = () => {
      text.setProperty(hmUI.prop.TEXT, getDistanceText(distanceSensor));
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          distanceSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        distanceSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildBattery(props) {
    const text = hmUI.createWidget(hmUI.widget.TEXT, props);
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

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
          batterySensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildWeather(props) {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...props,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    });
  },
});
