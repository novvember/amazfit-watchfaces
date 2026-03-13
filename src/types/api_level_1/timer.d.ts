/**
 * Zepp Internal Timer
 */
declare namespace timer {
  /**
   * Creates a repeating or one-shot timer
   * @param delay - initial delay in milliseconds
   * @param period - repeat interval in milliseconds
   * @param callback - function to call on each tick
   * @returns timer identifier
   */
  function createTimer(
    delay: number,
    period: number,
    callback: () => void,
  ): number;

  /**
   * Stops and destroys a timer
   */
  function stopTimer(timerId?: number): void;
}
