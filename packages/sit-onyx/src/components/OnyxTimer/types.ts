export type OnyxTimerProps = {
  /**
   * The end time of the timer. Supports all values of `new Date()`.
   */
  endTime: ConstructorParameters<typeof Date>[0];
  /**
   * Optional label to show.
   */
  label?: string;
};
