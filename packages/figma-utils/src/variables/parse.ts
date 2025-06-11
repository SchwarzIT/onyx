import {
  FigmaVariablesApiResponse,
  ParsedVariable,
  RGBAValue,
  Variable,
  VariableValue,
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
    if (
      variable.hiddenFromPublishing ||
      variable.deletedButReferenced ||
      collection.hiddenFromPublishing
    )
      return;

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

  parsedData.forEach((data) => {
    if (data.modeName === DEFAULT_MODE_NAME) delete data.modeName;

    const numberRegex = /\d+/;

    // sort variables by name
    // for variables with the same name that just end with a different number (e.g. my-var-100 and my-var-200)
    // sort them by number instead of alphabetically so e.g. 100 is sorted before 1000
    data.variables = Object.keys(data.variables)
      .map((key) => {
        const asNumber = numberRegex.exec(key)?.[0] ?? "";
        return {
          key,
          asNumber: +asNumber || undefined, // prevent NaN
          base: key.replace(asNumber, ""),
        };
      })
      .sort((a, b) => {
        if (a.asNumber && b.asNumber && a.base === b.base) return a.asNumber - b.asNumber;
        return a.key.localeCompare(b.key);
      })
      .reduce<Record<string, string>>((variables, { key }) => {
        variables[key] = data.variables[key];
        return variables;
      }, {});
  });

  return parsedData;
};

/**
 * Resolves the given Figma variable value to a string value. Value types:
 * - number: converted to rem, e.g. 16 => "1rem"
 * - color: converted to HEX color, e.g. {r:1, g: 1, b: 1, a: 1} => "#ffffff"
 * - alias: referenced with variable name, e.g. "--primary-100" => "{--primary-100}"
 * (curly brackets will indicate that the value is an alias / reference)
 *
 * @param value Figma variable value
 * @param allVariables Object of all variables. Needed for variables that use aliases.
 */
export const resolveFigmaVariableValue = (
  value: VariableValue,
  allVariables: Record<string, Variable>,
  remBase: ParseFigmaVariablesOptions["remBase"] = 16,
): string => {
  if (typeof value === "number") {
    // numeric value, parse as rem or pixel value
    // note: value 0 should also be parsed as "0rem" instead of just "0" because otherwise
    // the CSS variable could not be used together with "calc()"
    if (remBase === false || remBase <= 0) return `${value}px`;
    return `${value / remBase}rem`;
  }

  if (typeof value === "string") {
    return "";
  }
  if ("type" in value) {
    // parse value as alias
    if (value.type !== "VARIABLE_ALIAS") {
      throw new Error(`Unknown variable value type: ${value.type}`);
    }

    const reference = allVariables[value.id];
    if (!reference) {
      throw new Error(`Could not find variables alias with ID "${value.id}"`);
    }

    return `{${normalizeVariableName(reference.name)}}`;
  }

  return rgbaToHex(value);
};

/**
 * Converts a RGBA value to a hex color.
 * Transparency will only be added if its not 1, e.g. "#000000" instead of "#000000ff"
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
 * - replace "+" with "-"
 * - replace "&" with "-"
 */
export const normalizeVariableName = (name: string): string => {
  return name.replaceAll("/", "-").replaceAll(" ", "-").replaceAll("+", "-").replaceAll("&", "-");
};
