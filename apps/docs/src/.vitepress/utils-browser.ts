/**
 * Gets the current value for the given CSS variable.
 * @param name Name of the CSS variable (without `var(--)`).
 */
export const getCssVariableValue = (name: string, element?: HTMLElement) => {
  return getComputedStyle(element ?? document.documentElement).getPropertyValue(`--${name}`);
};
