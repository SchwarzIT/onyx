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
 *   ```ts
 *   const chartData: ChartData<"line"> = {
 *     labels: ["A", "B", "C"],
 *     datasets: [
 *       {
 *         label: "Dataset A",
 *         data: [1, 2, 3],
 *         ...getDatasetColors("primary"),
 *       },
 *     ],
 *   };
 *   ```;
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
 *
 * @param CSS Variable name, e.g. `--onyx-color-base-primary-500`
 */

export const getCSSVariableValue = (variableName: string, el = document.body): string => {
  const rawValue = getComputedStyle(el).getPropertyValue(variableName).trim();

  // if the CSS variable is no "color" (e.g. font family or numeric value), return the raw value
  //  otherwise we resolve the actual color below
  if (!CSS.supports("color", rawValue)) {
    return rawValue;
  }

  const element = el.ownerDocument.createElement("div");
  element.style.display = "none";
  element.style.color = `var(${variableName})`;
  // color scheme is inherited from the parent, so we don't need to handle it manually
  el.appendChild(element);

  const resolvedColor = getComputedStyle(element).color;
  element.remove();

  return rgbToHex(resolvedColor);
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

/**
 * Converts an rgb() or rgba() string (comma- or space-separated) to hex.
 *
 * @param {string} rgbValue - e.g. "rgb(255, 0, 128)" or "rgba(0, 0, 0, 0.5)"
 * @returns {string} - e.g. "#ff0080" or "#00000080"
 */
export function rgbToHex(rgbValue: string) {
  // Extract all numeric components (supports standard numbers and percentages)
  const values = rgbValue.match(/[\d.]+%?/g);
  if (!values || values.length < 3) return rgbValue;

  const toHex = (val: string, isAlpha = false) => {
    let num = val.endsWith("%") ? (parseFloat(val) / 100) * (isAlpha ? 1 : 255) : parseFloat(val);

    if (isAlpha) num = Math.round(num * 255);
    else num = Math.round(num);

    return Math.min(255, Math.max(0, num)).toString(16).padStart(2, "0");
  };

  const r = toHex(values[0]);
  const g = toHex(values[1]!);
  const b = toHex(values[2]!);

  // Include 2-digit alpha only if an alpha channel < 1 is present
  let a = "";
  if (values[3] !== undefined) {
    const alphaVal = values[3].endsWith("%") ? parseFloat(values[3]) / 100 : parseFloat(values[3]);
    if (alphaVal < 1) {
      a = toHex(values[3], true);
    }
  }

  return `#${r}${g}${b}${a}`;
}
