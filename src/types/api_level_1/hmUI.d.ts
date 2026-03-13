/**
 * Zepp UI Widgets
 */
declare namespace hmUI {
  /**
   * Create a widget
   * @param widgetType - widget type constant (hmUI.widget.*)
   * @param params - widget configuration parameters
   */
  function createWidget(
    widgetType: number,
    params: Record<string, any>,
  ): HmWidget;

  /**
   * Widget types
   */
  const widget: {
    /** Image */
    readonly IMG: number;
    /** Text */
    readonly TEXT: number;
    /** Text with predefined data type */
    readonly TEXT_FONT: number;
    // readonly ARC: number;
    /** Rectangle with filled color */
    readonly FILL_RECT: number;
    // readonly STROKE_RECT: number;
    /** Circle */
    readonly CIRCLE: number;
    // readonly ARC_PROGRESS: number;
    // readonly IMG_PROGRESS: number;
    // readonly IMG_LEVEL: number;
    // readonly IMG_ANIM: number;
    // readonly TEXT_IMG: number;
    // readonly BUTTON: number;
    // readonly IMG_CLICK: number;
    // readonly SLIDE_SWITCH: number;
    // readonly DIALOG: number;
    /** Group of different widgets */
    readonly GROUP: number;
    /** General configuration widget to change data slot */
    readonly WATCHFACE_EDIT_GROUP: number;
    // readonly WATCHFACE_EDIT_FG_GROUP: number;
    /** Configuration widget to change background image */
    readonly WATCHFACE_EDIT_BG: number;
    // readonly WATCHFACE_EDIT_MASK: number;
    /** Hour, minute, second hands */
    readonly TIME_POINTER: number;
    // readonly IMG_TIME: number;
    /** Shows image when a system status is active */
    readonly IMG_STATUS: number;
    // readonly IMG_DATE: number;
    // readonly IMG_WEEK: number;
    // readonly DATE_POINTER: number;
    // readonly HISTOGRAM: number;
    // readonly RADIO_GROUP: number;
    // readonly CHECKBOX_GROUP: number;
    // readonly PICK_DATE: number;
    // readonly QRCODE: number;
    // readonly GRADKIENT_POLYLINE: number;
    /** Widget for monitoring watchface lifecycle events (pause, resume) */
    readonly WIDGET_DELEGATE: number;
    // readonly WATCHFACE_EDIT_POINTER: number;
  };

  /**
   * Level where widget is visible
   */
  const show_level: {
    /** Normal mode */
    readonly ONLY_NORMAL: number;
    /** AOD mode */
    readonly ONAL_AOD: number;
    /** Edit mode */
    readonly ONLY_EDIT: number;
  };

  /**
   * System status to configure IMG_STATUS widget
   */
  const system_status: {
    /** Lost bluetooth connection with phone */
    readonly DISCONNECT: number;
    // readonly DISTURB: number;
    // readonly LOCK: number;
    // readonly CLOCK: number;
  };

  /**
   * Content alignment
   */
  const align: {
    /** Horizontal - left */
    readonly LEFT: number;
    /** Horizontal - right */
    readonly RIGHT: number;
    /** Horizontal - center */
    readonly CENTER_H: number;
    /** Vertical - top */
    readonly TOP: number;
    /** Vertical - bottom */
    readonly BOTTOM: number;
    /** Vertical - center */
    readonly CENTER_V: number;
  };

  /**
   * Text style for overflow text
   */
  const text_style: {
    // readonly NONE: number;
    // readonly CHAR_WRAP: number;
    // readonly WRAP: number;
    /** Cut with '...' */
    readonly ELLIPSIS: number;
  };

  /**
   * Data type (for predefined data widgets)
   */
  const data_type: {
    /** Current battery level [0, 100] */
    readonly BATTERY: number;
    /** Full recovery time [0, 97] */
    readonly RECOVERY_TIME: number;
    /** Alarm time if set (HH:MM) */
    readonly ALARM_CLOCK: number;
    /** Bio charge */
    readonly BIO_CHARGE: number;
    /** Last measured heart rate */
    readonly HEART: number;
    // readonly STEP: number;
    // readonly CAL: number;
    // readonly DISTANCE: number;
    // readonly WEATHER: number;
    /** Current outside temperature */
    readonly WEATHER_CURRENT: number;
    // readonly WEATHER_HIGH: number;
    // readonly WEATHER_LOW: number;
    // readonly HUMIDITY: number;
    // readonly UVI: number;
    // readonly AQI: number;
    // readonly PAI_DAILY: number;
    /** Accumulated PAI for latest week [0, 525] */
    readonly PAI_WEEKLY: number;
    /** Readiness */
    readonly READINESS: number;
    // readonly STAND: number;
    // readonly SUN_RISE: number;
    // readonly SUN_SET: number;
    // readonly SPO2: number;
    // readonly STRESS: number;
    // readonly FAT_BURN: number;
    // readonly SLEEP: number;
    // readonly ALTIMETER: number;
    // readonly MOON: number;
    // readonly FLOOR: number;
    // readonly COUNT_DOWN: number;
    // readonly STOP_WATCH: number;
  };

  const prop: {
    /** Text */
    readonly TEXT: number;
    // readonly W: number;
    // readonly H: number;
    /** X-coord */
    readonly X: number;
    /** Y-coord */
    readonly Y: number;
    // readonly COLOR: number;
    // readonly TEXT_SIZE: number;
    // readonly SRC: number;
    // readonly VISIBLE: number;
    // readonly DATASET: number;
    // readonly ANIM_STATUS: number;
    // readonly ANIM_IS_RUNNING: number;
    /** Chosen configuration type for EDIT widget */
    readonly CURRENT_TYPE: number;
    // readonly UPDATE_DATA: number;
    /** All properties at once */
    readonly MORE: number;
  };
}
