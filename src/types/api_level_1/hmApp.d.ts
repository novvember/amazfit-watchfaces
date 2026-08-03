declare namespace hmApp {
  /**
   * Gets App Package Info
   */
  function getPackageInfo(): HmAppPackageInfo;
}

/**
 * App Package Info
 */
interface HmAppPackageInfo {
  /** App name (as in app.json) */
  readonly name?: string;
  /** App ID (as in app.json) */
  readonly appId?: number;
  /** App type (watchface/app) */
  readonly type?: string;
  /** App version (as in app.json) */
  readonly version?: string;
  /** App version (as in app.json) */
  readonly versionCode?: number;
  /** App author (vender) (as in app.json) */
  readonly vender?: string;
}
