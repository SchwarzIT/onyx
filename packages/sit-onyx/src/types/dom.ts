/**
 * Allows to define a DOM event with a typed and non-null target.
 * This is useful as the native events are not generic.
 * E.g.:
 * @type {Event}
 * @type {InputEvent}
 */
export type TargetEvent<T extends HTMLElement, E extends Event = Event> = E & {
  target: T;
};
