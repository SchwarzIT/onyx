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
