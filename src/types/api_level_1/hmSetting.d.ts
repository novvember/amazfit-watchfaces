/**
 * Zepp Internal Watch Data
 */
declare namespace hmSetting {
  /**
   * Get the current screen type (mode)
   */
  function getScreenType(): number;

  /**
   * Screen type (mode)
   */
  const screen_type: {
    /** Normal mode */
    readonly WATCHFACE: number;
    /** Aod mode */
    readonly AOD: number;
  };
}
