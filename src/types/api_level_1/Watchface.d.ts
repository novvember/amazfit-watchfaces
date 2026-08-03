/**
 * Zepp Watchface
 */
declare function WatchFace<T extends Record<string, any>>(
  descriptor: T & {
    onInit?: () => void;
    build?: () => void;
    onDestroy?: () => void;
  } & ThisType<T & Record<string, any>>
): void;
