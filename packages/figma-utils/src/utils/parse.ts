import {
  ColorValue,
  FigmaVariablesApiResponse,
  ParsedVariable,
  RGBAValue,
  Variable,
} from "../types/figma.js";

export type ParseFigmaVariablesOptions = {
  /**
   * Base for converting pixel in rem. Set to `false` for disabling rem conversion and use pixel values.
   * @default 16
   */
  remBase?: number | false;
};

/** Default Figma mode name if only one mode exists and no other name is specified by the designer. */
export const DEFAULT_MODE_NAME = "Mode 1" as const;

/**
 * Parses Figma variables received from the Figma API to a minimal JSON.
 * Numeric / pixel values will be transformed to rem.
 * Variables / collections that are hidden from publishing will not be parsed.
 *
 * @param apiResponse Variables response body received from the Figma API.
 */
export const parseFigmaVariables = (
  apiResponse: FigmaVariablesApiResponse,
  options?: ParseFigmaVariablesOptions,
) => {
  const parsedData: ParsedVariable[] = [];

  /**
   * Loop through each variable and mode and create a new object.
   */
  Object.values(apiResponse.meta.variables).forEach((variable) => {
    const collection = apiResponse.meta.variableCollections[variable.variableCollectionId];
    if (variable.hiddenFromPublishing || collection.hiddenFromPublishing) return;

    // parse variable value for every mode
    Object.values(collection.modes).forEach((mode) => {
      const variableName = normalizeVariableName(variable.name);
      const variableValue = resolveFigmaVariableValue(
        variable.valuesByMode?.[mode.modeId],
        apiResponse.meta.variables,
        options?.remBase,
      );

      // add/update parsed variable value
      const existingIndex = parsedData.findIndex((i) => i.modeName === mode.name);
      if (existingIndex !== -1) {
        parsedData[existingIndex].variables[variableName] = variableValue;
      } else {
        parsedData.push({
          modeName: mode.name,
          variables: { [variableName]: variableValue },
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
    delete parsedData[0].modeName;
  }

  return parsedData;
};

/**
 * Resolves the given Figma color value to a string value. Value types:
 * - number: converted to rem, e.g. 16 => "1rem"
 * - color: converted to HEX color, e.g. {r:1, g: 1, b: 1, a: 1} => "#ffffff"
 * - alias: referenced with variable name, e.g. "--primary-100" => "{--primary-100}"
 * (curly brackets will indicate that the value is an alias / reference)
 *
 * @param value Figma variable value
 * @param allVariables Object of all variables. Needed for variables that use aliases.
 */
export const resolveFigmaVariableValue = (
  value: ColorValue,
  allVariables: Record<string, Variable>,
  remBase: ParseFigmaVariablesOptions["remBase"] = 16,
): string => {
  if (typeof value === "number") {
    // numeric value, parse as rem or pixel value
    if (remBase === false || remBase <= 0) {
      return value !== 0 ? `${value}px` : "0";
    }

    const remValue = value / remBase;
    return remValue !== 0 ? `${remValue}rem` : "0";
  }

  if ("type" in value) {
    // parse value as alias
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
 * Transparency will only be added if its not 1, e.g. "#000000ff" instead of "#000000"
 */
export const rgbaToHex = (value: RGBAValue): string => {
  const hex = Object.values(value)
    .map((color) => Math.floor(color * 255))
    .map((color) => color.toString(16))
    .map((color) => color.padStart(2, "0"))
    .join("")
    .replace(/^/, "#");

  if (value.a === 1) return hex.substring(0, hex.length - 2);
  return hex;
};

/**
 * Normalizes the given variable name by apply these transformations:
 * - replace slashes with "-"
 * - replace whitespace with "-"
 * - replace "+" to "-"
 */
export const normalizeVariableName = (name: string): string => {
  return name.replaceAll("/", "-").replaceAll(" ", "-").replaceAll("+", "-");
};
