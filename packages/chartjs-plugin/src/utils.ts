import type { OnyxColor } from "sit-onyx";

export const QUANTITATIVE_COLOR_STEPS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
] as const;
export type QuantitativeColorStep = (typeof QUANTITATIVE_COLOR_STEPS)[number];

/**
 * Utility for easily styling a Chart.js dataset with a specific onyx color.
 * Will be updated automatically when switching between light/dark mode.
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
export const getDatasetColors = (color: OnyxColor | `quantitatives-${QuantitativeColorStep}`) => {
  const cssVariable = `--onyx-color-base-${color.startsWith("quantitatives-") ? color : `${color}-500`}`;
  // we use arrow functions here so the value is updated / re-evaluated when
  // switched between light and dark mode
  const borderColor = () => getCSSVariableValue(cssVariable);

  return {
    borderColor,
    backgroundColor: () => `rgba(${hexToRgb(borderColor())}, 0.3)`,
  };
};

/**
 * Gets the current value of the given CSS variable.
 * @param CSS variable name, e.g. `--onyx-color-base-primary-500`
 */

export const getCSSVariableValue = (variableName: string): string => {
  const isDark = getComputedStyle(document.body).colorScheme === "dark";
  const computedValue = getComputedStyle(document.body).getPropertyValue(variableName).trim();
  const lightDarkMatch = /^light-dark\(([^,]+),\s*([^)]+)\)$/.exec(computedValue);

  if (lightDarkMatch) {
    return lightDarkMatch[isDark ? 2 : 1].trim();
  } else {
    return computedValue;
  }
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
