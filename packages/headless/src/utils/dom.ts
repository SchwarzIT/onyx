/**
 * Checks if an element has focus-visible state (keyboard focus).
 * Falls back to false if :focus-visible is not supported.
 */
export const isFocusVisible = (element: Element): boolean => {
  try {
    return element.matches(":focus-visible");
  } catch {
    return false;
  }
};

/**
 * Determines whether a given event is a `TouchEvent`.
 *
 * This function uses property-based detection instead of `instanceof TouchEvent`,
 * because Safari and other WebKit-based browsers may not expose the global
 * `TouchEvent` constructor, causing `instanceof` checks to fail or throw errors.
 *
 * @param event - The event object to check.
 * @returns `true` if the event is a touch event, otherwise `false`.
 */
export const isTouchEvent = (event: Event): event is TouchEvent =>
  "touches" in event || "changedTouches" in event || "targetTouches" in event;
