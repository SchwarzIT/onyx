/**
 * Gets the current value of the given CSS variable.
 * @param CSS variable name, e.g. `--onyx-color-base-primary-500`
 */
export const getCSSVariableValue = (variableName: string) => {
  return getComputedStyle(document.body).getPropertyValue(variableName);
};

/**
 * Converts the given HEX color to rgb.
 */
export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};
