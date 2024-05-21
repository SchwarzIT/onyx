export type OnyxTimerProps = {
  /**
   * The end time of the timer. Supports all values of `new Date()`.
   */
  endTime: ConstructorParameters<typeof Date>[0];
  /**
   * Timer label. Required due to accessibility / screen readers.
   * If you want to visually hide the label, use the `hideLabel` property.
   */
  label: string;
  /**
   * If `true`, the label will be visually hidden and the `title` attribute will be set.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
};
