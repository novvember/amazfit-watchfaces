/**
 * Zepp Watchface
 */
declare function WatchFace(descriptor: {
  onInit?: () => void;
  build?: () => void;
  onDestroy?: () => void;
  [key: string]: unknown;
}): void;
