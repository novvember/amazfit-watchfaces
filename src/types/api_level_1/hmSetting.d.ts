/**
 * Zepp Internal Watch Data
 */
declare namespace hmSetting {
  /**
   * Get the current screen type (mode)
   */
  function getScreenType(): keyof hmSetting['screen_type'];

  /**
   * Get the time format setting
   * @returns 0 for 12-hour, 1 for 24-hour
   */
  function getTimeFormat(): number;

  /**
   * Get device hardware information
   */
  function getDeviceInfo(): {
    /** Screen width (px) */
    width: number;
    /** Screen height (px) */
    height: number;
    /** Screen shape, 0-square screen, 1-round screen */
    screenShape: number;
    /** Device name */
    deviceName: string;
    /** number of keys */
    keyNumber: number;
    /** Device code as per https://docs.zepp.com/docs/reference/related-resources/device-list/  */
    deviceSource: number;
  };

  /**
   * Get user profile data
   */
  function getUserData(): {
    /** Age */
    age: number;
    /** Height */
    height: number;
    /** Wight */
    weight: number;
    /** Gender ('0' - male, '1' - female, '2' - unspecified) */
    gender: number;
    /** Nickname */
    nickName: string;
    /** User registration area, ISO standard ('jp', 'br', 'ca') */
    region: string;
  };

  /**
   * Screen type (mode) - result of getScreenType()
   */
  const screen_type: {
    /** Normal mode */
    readonly WATCHFACE: number;
    /** Aod mode */
    readonly AOD: number;
  };
}
