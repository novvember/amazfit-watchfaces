/**
 * Zepp App
 */
declare function App(descriptor: {
  onCreate?: () => void;
  onDestroy?: () => void;
  [key: string]: unknown;
}): void;
