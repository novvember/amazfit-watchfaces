import { InfoWidget } from './InfoWidget';
import { TimeWidget } from './TimeWidget';
import { gettext } from 'i18n';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();
    this.buildDate();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    new TimeWidget();
  },

  buildDate() {
    const infoWidget = new InfoWidget();
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const weekdayTextKey = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][
        week - 1
      ];
      const dayText = day.toString();

      infoWidget.set(gettext(weekdayTextKey), dayText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },
});
