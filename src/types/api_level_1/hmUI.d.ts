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
    params?: HmWidgetProps | null,
  ): HmWidgetInstance;

  /**
   * Delete a widget
   */
  function deleteWidget(widget: HmWidgetInstance): void;

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
    /** Arc */
    readonly ARC: number;
    /** Arc widget with progress level */
    readonly ARC_PROGRESS: number;
    /** Rectangle with filled color */
    readonly FILL_RECT: number;
    /** Rectangle with border (dont have inside color fill) */
    readonly STROKE_RECT: number;
    /** Circle */
    readonly CIRCLE: number;
    /** Display the images sequentially according to the given order. */
    readonly IMG_PROGRESS: number;
    /** Progress widget with an image for every state */
    readonly IMG_LEVEL: number;
    /** Animated image */
    readonly IMG_ANIM: number;
    /** Text (number) displayed with array of images - one image per digit */
    readonly TEXT_IMG: number;
    /** Button control (clickable) */
    readonly BUTTON: number;
    /** Group of different widgets */
    readonly GROUP: number;
    /** General configuration widget to change data slot */
    readonly WATCHFACE_EDIT_GROUP: number;
    /** Configuration widget to change background image */
    readonly WATCHFACE_EDIT_BG: number;
    /** Hour, minute, second hands */
    readonly TIME_POINTER: number;
    /** Digit time with array of images - one per digit */
    readonly IMG_TIME: number;
    /** Shows image when a system status is active */
    readonly IMG_STATUS: number;
    /** Date (day/month) with array of images - one per digit */
    readonly IMG_DATE: number;
    /** Weekday with array of images - one per day */
    readonly IMG_WEEK: number;
    /** Polyline widget (very buggy realization) */
    readonly GRADKIENT_POLYLINE: number;
    /** Widget for monitoring watchface lifecycle events (pause, resume) */
    readonly WIDGET_DELEGATE: number;
    /** Configuration widget to change time pointers */
    readonly WATCHFACE_EDIT_POINTER: number;
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
    /** Alarm clock is on */
    readonly CLOCK: number;
    /** Silent mode is on */
    readonly DISTURB: number;
    /** Screen is locked */
    readonly LOCK: number;
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
    /** Default behaviour */
    readonly NONE: number;
    /** Text wraps on the next line */
    readonly CHAR_WRAP: number;
    /** Text wraps on the next line word by word */
    readonly WRAP: number;
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
    /** Current step count [0, 99999] */
    readonly STEP: number;
    /** Current calories [0, 9999] */
    readonly CAL: number;
    /** Current outside temperature */
    readonly WEATHER_CURRENT: number;
    /** Current  day highest temperature */
    readonly WEATHER_HIGH: number;
    /** Current  day lowest temperature */
    readonly WEATHER_LOW: number;
    /** Humidity (%) */
    readonly HUMIDITY: number;
    /** UV level (not UV index) */
    readonly UVI: number;
    /** Air quality index (works only for China) */
    readonly AQI: number;
    /** Today PAI */
    readonly PAI_DAILY: number;
    /** Accumulated PAI for latest week [0, 525] */
    readonly PAI_WEEKLY: number;
    /** Readiness */
    readonly READINESS: number;
    /** Current second value (for TEXT_FONT) */
    readonly SECOND: number;
    /** Stand count */
    readonly STAND: number;
    /** Wind speed */
    readonly WIND: number;
    /** Wind direction (for IMG_LEVEL) */
    readonly WIND_DIRECTION: number;
    /** UV Index (not real uv-index, just several levels) */
    readonly UVI: number;
    /** Closest sunrise/sunset */
    readonly SUN_CURRENT: number;
    /** Fat burning ? (current) */
    readonly FAT_BURNING: number;
    /** Stand count (current) */
    readonly STAND: number;
    /** Moon phase (for IMG_LEVEL) */
    readonly MOON: number;
  };

  /**
   * Edit types (for watchface edit groups)
   */
  const edit_type: {
    readonly HEART: number;
    readonly STEP: number;
    readonly HEART: number;
    readonly CAL: number;
    readonly DISTANCE: number;
    readonly BATTERY: number;
    readonly WEATHER: number;
    readonly SLEEP: number;
    readonly WEATHER: number;
  };

  const prop: {
    /** Text */
    readonly TEXT: number;
    /** Angle */
    readonly ANGLE: number;
    /** Level (for ARC_LEVEL) */
    readonly LEVEL: number;
    /** Alpha-channel */
    readonly ALPHA: number;
    /** Width */
    readonly W: number;
    /** Height */
    readonly H: number;
    /** X-coord */
    readonly X: number;
    /** Y-coord */
    readonly Y: number;
    /** Color */
    readonly COLOR: number;
    /** Asset source file */
    readonly SRC: number;
    /** Widget visibility (true/false) */
    readonly VISIBLE: number;
    /** Radius */
    readonly RADIUS: number;
    /** Animation properties */
    readonly ANIM: number;
    /** Chosen configuration type for EDIT widget (getProperty) */
    readonly CURRENT_TYPE: number;
    /** All properties at once */
    readonly MORE: number;
  };
}

interface HmWidgetProps {
  // --- COMMON ---
  x?: number;
  y?: number;
  show_level?: keyof hmUI['show_level'];
  src?: string;
  w?: number;
  h?: number;

  // --- IMG ---
  pos_x?: number;
  pos_y?: number;
  angle?: number;

  // --- TIME_POINTER ---
  minute_path?: string;
  second_centerX?: number;
  second_centerY?: number;
  second_posX?: number;
  second_posY?: number;
  second_path?: string;
  /** Rerender update frequence (frames per seconds) */
  fresh_frequency?: number;
  second_cover_x?: number;
  second_cover_y?: number;

  // --- IMG_TIME ---
  second_startX?: number;
  second_startY?: number;
  hour_zero?: number;
  hour_startX?: number;
  hour_startY?: number;
  hour_array?: string[];
  hour_align?: hmUI['align'];
  hour_unit_sc?: string;
  hour_unit_tc?: string;
  hour_unit_en?: string;
  minute_zero?: number;
  minute_startX?: number;
  minute_startY?: number;
  minute_array?: string[];

  // --- TEXT, TEXT_IMG ---
  text?: string;
  align_h?: hmUI['align'];
  align_v?: hmUI['align'];
  text_size?: number;
  char_space?: number;
  line_space?: number;
  text_style?: hmUI['text_style'];

  // --- TEXT_FONT ---
  type?: hmUI['data_type'];
  font?: string;
  /** Should show units (km, %, m) - '1', or just value - '0 */
  unit_type?: 0 | 1;
  /** Should add more symbols (zero for seconds for example) */
  padding?: boolean;

  // --- TEXT_IMG ---
  font_array?: string[];
  negative_image?: string;

  // --- WATCHFACE_EDIT_GROUP ---
  edit_id?: number;
  default_type?: number;
  tips_BG?: string;
  tips_width?: number;
  tips_margin?: number;
  tips_x?: number;
  tips_y?: number;
  select_image?: string;
  un_select_image?: string;
  optional_types?: {
    type: number;
    title_en: string;
    title_sc: string;
    title_tc: string;
    preview: string;
    data?: Record<string, unknown>;
  }[];
  count?: number;

  // --- ARC ---
  start_angle?: number;
  end_angle?: number;

  // --- GEOMETRY WIDGETS (CIRCLE) ---
  center_x?: number;
  center_y?: number;
  radius?: number;
  color?: number;

  // --- BUTTON ---
  normal_src?: string;
  press_src?: string;
  click_func?: () => void;

  // --- IMG_LEVEL ---
  image_array?: string[];
  image_length?: number;

  // --- WIDGET_DELEGATE ---
  resume_call?: () => void;
  pause_call?: () => void;
}

interface HmWidgetInstance {
  /**
   * Set a widget property
   */
  setProperty(prop: keyof hmUI['prop'], value: any): void;

  /**
   * Creates new widget inside a group widget
   */
  createWidget?: hmUI['createWidget'];

  /**
   * Get a widget property
   */
  getProperty(prop: hmUI['prop']): unknown;
}
