import { createWidget, widget, prop } from '@zos/ui';
import {
  Battery,
  Calorie,
  Distance,
  FatBurning,
  HeartRate,
  Pai,
  Stand,
  Step,
  Weather,
} from '@zos/sensor';
import { getScene, SCENE_WATCHFACE } from '@zos/app';
import { clamp } from '../utils/clamp';
import { getText } from '@zos/i18n';
import { Clock } from './clock';
import { InnerScale } from './innerScale';
import { OuterScale } from './outerScale';
import { BottomInfo } from './bottomInfo';

import {
  BOTTOM_INFO_EDIT_GROUP_PROPS,
  EDIT_BACKGROUND_IMAGE_PROPS,
  OUTER_SCALE_EDIT_GROUP_PROPS,
} from './index.r.layout';
import {
  BOTTOM_INFO_OPTIONAL_TYPES,
  OUTER_SCALE_OPTIONAL_TYPES,
} from '../utils/constants';
import { decline } from '../utils/decline';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.getSettings();

    this.buildOuterScale();
    this.buildInnerScale();

    new Clock();

    this.buildBottomInfo();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  getSettings() {
    createWidget(widget.IMG, EDIT_BACKGROUND_IMAGE_PROPS);

    const outerEditGroup = createWidget(
      widget.WATCHFACE_EDIT_GROUP,
      OUTER_SCALE_EDIT_GROUP_PROPS,
    );

    const bottomEditGroup = createWidget(
      widget.WATCHFACE_EDIT_GROUP,
      BOTTOM_INFO_EDIT_GROUP_PROPS,
    );

    const outerType = outerEditGroup.getProperty(prop.CURRENT_TYPE);
    const bottomType = bottomEditGroup.getProperty(prop.CURRENT_TYPE);

    if (!(outerType >= 0) || !(bottomType >= 0)) {
      return;
    }

    this._outerScaleType = OUTER_SCALE_OPTIONAL_TYPES.find(
      (item) => item.type === outerType,
    ).data.type;
    this._bottomInfoType = BOTTOM_INFO_OPTIONAL_TYPES.find(
      (item) => item.type === bottomType,
    ).data.type;
  },

  buildInnerScale() {
    const innerScale = new InnerScale();
    const batterySensor = new Battery();

    const update = () => {
      const level = batterySensor.getCurrent() || 0;
      innerScale.update(level);
    };

    createWidget(widget.WIDGET_DELEGATE, {
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

  buildOuterScale() {
    const widget = new OuterScale();
    const updateWidget = widget.update.bind(widget);

    switch (this._outerScaleType) {
      case 'steps':
        this.buildOuterSteps(updateWidget);
        break;

      case 'calories':
        this.buildOuterCalories(updateWidget);
        break;

      case 'stand':
        this.buildOuterStand(updateWidget);
        break;

      case 'fat_burning':
        this.buildOuterFatBurning(updateWidget);
        break;

      default:
        break;
    }
  },

  buildOuterSteps(updateWidget) {
    const sensor = new Step();

    const update = () => {
      const current = sensor.getCurrent() || 0;
      const target = sensor.getTarget() || 10000;
      const level = clamp(0, (current / target) * 100, 100);
      updateWidget(level);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildOuterCalories(updateWidget) {
    const sensor = new Calorie();

    const update = () => {
      const current = sensor.getCurrent() || 0;
      const target = sensor.getTarget() || 400;
      const level = clamp(0, (current / target) * 100, 100);
      updateWidget(level);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildOuterStand(updateWidget) {
    const sensor = new Stand();

    const update = () => {
      const current = sensor.getCurrent() || 0;
      const target = sensor.getTarget() || 10;
      const level = clamp(0, (current / target) * 100, 100);
      updateWidget(level);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildOuterFatBurning(updateWidget) {
    const sensor = new FatBurning();

    const update = () => {
      const current = sensor.getCurrent() || 0;
      const target = sensor.getTarget() || 30;
      const level = clamp(0, (current / target) * 100, 100);
      updateWidget(level);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildBottomInfo() {
    const widget = new BottomInfo();
    const updateWidget = widget.update.bind(widget);

    switch (this._bottomInfoType) {
      case 'steps':
        this.buildBottomSteps(updateWidget);
        break;

      case 'calories':
        this.buildBottomCalories(updateWidget);
        break;

      case 'stand':
        this.buildBottomStand(updateWidget);
        break;

      case 'fat_burning':
        this.buildBottomFatBurning(updateWidget);
        break;

      case 'battery':
        this.buildBottomBattery(updateWidget);
        break;

      case 'heart_rate':
        this.buildBottomHeartRate(updateWidget);
        break;

      case 'total_pai':
        this.buildBottomTotalPai(updateWidget);
        break;

      case 'distance':
        this.buildBottomDistance(updateWidget);
        break;

      case 'weather':
        this.buildBottomWeather(updateWidget);
        break;

      default:
        break;
    }
  },

  buildBottomSteps(updateWidget) {
    const sensor = new Step();
    const postfixs = getText('steps_postfix').split(' ');

    const update = () => {
      const value = sensor.getCurrent() || 0;
      const postfix = decline(value, postfixs);

      updateWidget(value, postfix);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildBottomCalories(updateWidget) {
    const sensor = new Calorie();

    const update = () => {
      const value = sensor.getCurrent() || 0;
      const postfix = getText('calories_postfix');
      updateWidget(value, postfix);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildBottomStand(updateWidget) {
    const sensor = new Stand();

    const update = () => {
      const value = sensor.getCurrent() || 0;
      updateWidget(value);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildBottomFatBurning(updateWidget) {
    const sensor = new FatBurning();

    const update = () => {
      const value = sensor.getCurrent() || 0;
      const postfix = getText('min');
      updateWidget(value, postfix);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildBottomBattery(updateWidget) {
    const sensor = new Battery();

    const update = () => {
      const value = sensor.getCurrent() || '--';
      updateWidget(`${value}%`);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildBottomHeartRate(updateWidget) {
    const sensor = new HeartRate();

    const update = () => {
      const value = sensor.getLast() || '--';
      const postfix = getText('bpm');
      updateWidget(value, postfix);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onLastChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offLastChange(update);
      },
    });
  },

  buildBottomTotalPai(updateWidget) {
    const sensor = new Pai();

    const update = () => {
      const value = sensor.getTotal() || '--';
      updateWidget(value);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          update();
        }
      },
    });
  },

  buildBottomDistance(updateWidget) {
    const sensor = new Distance();

    const update = () => {
      let value = sensor.getCurrent() || 0;
      let postfix = getText('m');

      if (value > 1000) {
        value = (value / 1000).toFixed(1);
        postfix = getText('km');
      }

      updateWidget(value, postfix);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          sensor.onChange(update);
          update();
        }
      },
      pause_call: () => {
        sensor.offChange(update);
      },
    });
  },

  buildBottomWeather(updateWidget) {
    const sensor = new Weather();

    const update = () => {
      const value = sensor.current || '--';
      updateWidget(`${value}°`);
    };

    createWidget(widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          update();
        }
      },
    });
  },
});
