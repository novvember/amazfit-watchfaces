import '@zos/storage';

declare module '@zos/storage' {
  interface localStorage {
    // device-types 4.0.0 declares this method as returning void.
    getItem(key: string, defaultValue?: unknown): unknown;
  }
}
