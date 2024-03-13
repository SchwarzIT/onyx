import type { OnyxColor } from "sit-onyx/types";

/**
 * Utility for easily styling a Chart.js dataset with a specific onyx color.
 *
 * @example
 * ```ts
 * const chartData: ChartData<"line"> = {
 *   labels: ["A", "B", "C"],
 *   datasets: [
 *     {
 *       label: "Dataset A",
 *       data: [1, 2, 3],
 *       ...getDatasetColors("primary"),
 *     },
 *   ],
 * };
 * ```
 */
export const getDatasetColors = (
  color: OnyxColor | `quantitatives-${100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`,
) => {
  const cssVariable = `--onyx-color-base-${color.startsWith("quantitatives-") ? color : `${color}-500`}`;
  const baseColor = getCSSVariableValue(cssVariable);

  return {
    borderColor: baseColor,
    backgroundColor: `rgba(${hexToRgb(baseColor)}, 0.3)`,
  };
};

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
  const number = parseInt(hex.replace("#", ""), 16);
  const r = (number >> 16) & 255;
  const g = (number >> 8) & 255;
  const b = number & 255;
  return `${r}, ${g}, ${b}`;
};
