import { ColorValue, FigmaVariablesApiResponse, RGBAValue, Variable } from "./types.js";

export type ParsedVariable = {
  /** Figma mode name or undefined if its the default mode. */
  modeName?: string;
  variables: Record<string, string>;
};

/**
 * Parses Figma variables received from the Figma API to a format that is useable with style-dictionary.
 *
 * @param apiResponse Variables response body received from the Figma API.
 */
export const parseFigmaVariables = (apiResponse: FigmaVariablesApiResponse) => {
  const DEFAULT_MODE_NAME = "Mode 1" as const;

  const parsedData: ParsedVariable[] = [];

  /**
   * Loop through each variable and mode and create a new object.
   */
  Object.values(apiResponse.meta.variables).forEach((variable) => {
    const collection = apiResponse.meta.variableCollections[variable.variableCollectionId];
    if (variable.hiddenFromPublishing || collection.hiddenFromPublishing) return;

    const defaultModeValue = variable.valuesByMode?.[collection.defaultModeId]
      ? resolveFigmaVariableValue(
          variable.valuesByMode[collection.defaultModeId],
          apiResponse.meta.variables,
        )
      : undefined;

    // parse variable value for every mode
    Object.values(collection.modes).forEach((mode) => {
      const modeValue = variable.valuesByMode?.[mode.modeId];
      const variableName = normalizeVariableName(variable.name);

      /**
       * If a variable is not defined for a given mode, we'll fall back to the default mode.
       */
      const variableValue =
        (resolveFigmaVariableValue(modeValue, apiResponse.meta.variables) || defaultModeValue) ??
        "";

      const existingIndex = parsedData.findIndex((i) => i.modeName === mode.name);
      if (existingIndex !== -1) {
        parsedData[existingIndex].variables[variableName] = variableValue;
      } else {
        parsedData.push({
          modeName: mode.name,
          variables: {
            [variableName]: variableValue,
          },
        });
      }
    });
  });

  // sort default mode to be
  parsedData.sort((a, b) => {
    if (a.modeName === DEFAULT_MODE_NAME) return -1;
    if (b.modeName === DEFAULT_MODE_NAME) return 1;
    return 0;
  });

  if (parsedData[0].modeName === DEFAULT_MODE_NAME) {
    parsedData[0].modeName = undefined;
  }

  return parsedData;
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
  if (typeof value === "number") {
    const remValue = value / 16;
    return remValue ? `${remValue}rem` : "0";
  }

  if ("type" in value) {
    if (value.type !== "VARIABLE_ALIAS") {
      throw new Error(`Unknown color value type: ${value.type}`);
    }

    const reference = allVariables[value.id];
    if (!reference) {
      throw new Error(`Could not find variables alias ${value.id}`);
    }

    return `{${normalizeVariableName(reference.name)}}`;
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

const normalizeVariableName = (name: string): string => {
  return name.replaceAll("/", "-").replaceAll(" ", "-").toLowerCase();
};
