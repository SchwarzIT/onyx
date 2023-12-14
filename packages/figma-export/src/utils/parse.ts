import {
  ColorValue,
  FigmaVariablesApiResponse,
  ParsedFigmaVariables,
  RGBAValue,
  Variable,
} from "./types.js";

/**
 * Parses Figma variables received from the Figma API to a format that is useable with style-dictionary.
 *
 * @param apiResponse Variables response body received from the Figma API.
 */
export const parseFigmaVariables = (apiResponse: FigmaVariablesApiResponse) => {
  const transformedData: ParsedFigmaVariables = {};

  /**
   * Loop through each variable and mode and create a new object.
   */
  Object.values(apiResponse.meta.variables).forEach((variable) => {
    const { name, valuesByMode, variableCollectionId } = variable;

    const { defaultModeId } = apiResponse.meta.variableCollections[variableCollectionId];

    const defaultModeValue = valuesByMode?.[defaultModeId]
      ? resolveFigmaVariableValue(valuesByMode[defaultModeId], apiResponse.meta.variables)
      : undefined;

    Object.values(apiResponse.meta.variableCollections[variableCollectionId].modes).forEach(
      (mode) => {
        const { modeId, name: modeName } = mode;
        const modeValue = valuesByMode?.[modeId];

        if (!transformedData[modeName]) {
          transformedData[modeName] = {};
        }

        /**
         * If a variable is not defined for a given mode, we'll fall back to the default mode.
         */
        transformedData[modeName][name.toLowerCase()] = {
          value:
            resolveFigmaVariableValue(modeValue, apiResponse.meta.variables) || defaultModeValue,
        };
      },
    );
  });

  return transformedData;
};

/**
 * Resolves the given Figma color value to a string value.
 *
 * @param value Figma variable value
 * @param allVariables Object of all variables. Needed for variables that use aliases.
 */
const resolveFigmaVariableValue = (
  value: ColorValue,
  allVariables: Record<string, Variable>,
): string => {
  if (typeof value === "number") return value.toString();

  if ("type" in value) {
    if (value.type !== "VARIABLE_ALIAS") {
      throw new Error(`Unknown color value type: ${value.type}`);
    }

    const reference = allVariables[value.id];
    if (!reference) {
      throw new Error(`Could not find variables alias ${value.id}`);
    }

    return `{${reference.name}.value}`;
  }

  return rgbaToHex(value);
};

/**
 * Converts a RGBA value to a hex color.
 */
const rgbaToHex = (value: RGBAValue): string => {
  const hex = Object.values(value)
    .map((color) => Math.floor(color * 255))
    .map((color) => color.toString(16))
    .map((color) => color.padStart(2, "0"))
    .join("")
    .replace(/^/, "#");

  if (value.a === 1) return hex.substring(0, hex.length - 2);
  return hex;
};
