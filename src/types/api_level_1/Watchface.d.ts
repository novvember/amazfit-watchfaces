/**
 * Zepp Watchface
 */
declare function WatchFace(descriptor: {
  onInit?: (params?: string) => void;
  build?: (params?: string) => void;
  onDestroy?: () => void;
  [key: string]: any;
}): void;
