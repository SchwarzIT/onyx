/**
 * Gets the current value for the given CSS variable.
 * @param name Name of the CSS variable (without `var(--)`).
 */
export const getCssVariableValue = (name: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
};
