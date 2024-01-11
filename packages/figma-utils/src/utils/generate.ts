import { ParsedVariable } from "../types/figma.js";

/**
 * Generates the given parsed Figma variables into CSS variables.
 *
 * @param data Parsed Figma variables
 * @param selector CSS selector to use for the CSS format. The mode name will be added to the selector
 * if it is set to something other than ":root", e.g. for the mode named "dark", passing the selector "html" will result in "html.dark"
 * @returns File content of the .css file
 */
export const generateAsCSS = (data: ParsedVariable, selector: string = ":root"): string => {
  const variableContent = Object.entries(data.variables).map(([name, value]) => {
    const { isAlias, variableName } = isAliasVariable(value);
    const variableValue = isAlias ? `var(--${variableName})` : value;
    return `  --${name}: ${variableValue};`;
  });

  let fullSelector = selector.trim();
  if (fullSelector !== ":root") fullSelector += `.${data.modeName}`;

  return `${generateTimestampComment(data.modeName)}
${fullSelector} {\n${variableContent.join("\n")}\n}\n`;
};

/**
 * Generates the given parsed Figma variables into SCSS variables.
 *
 * @returns File content of the .scss file
 */
export const generateAsSCSS = (data: ParsedVariable): string => {
  const variableContent = Object.entries(data.variables).map(([name, value]) => {
    const { isAlias, variableName } = isAliasVariable(value);
    const variableValue = isAlias ? `$${variableName}` : value;
    return `$${name}: ${variableValue};`;
  });

  return `${generateTimestampComment(data.modeName)}\n${variableContent.join("\n")}\n`;
};

/**
 * Generates the timestamp comment that is added to the start of every generated file.
 */
export const generateTimestampComment = (modeName?: string): string => {
  return `/**
 * Do not edit directly.${
   modeName ? `\n * This file contains the specific variables for the "${modeName}" theme.` : ""
 }
 * Imported from Figma API on ${new Date().toUTCString()}
 */`;
};

/**
 * Checks whether the given variable value is an alias / variable reference to another variable.
 * Alias values are enclosed by curly braces.
 *
 * @example "{your-variable-name}"
 * @returns `isAlias` whether the variable is an alias and `variableName` the raw variable name without curly braces.
 */
export const isAliasVariable = (variableValue: string) => {
  const isAlias = /{.*}/.exec(variableValue);
  const variableName = variableValue.replace("{", "").replace("}", "");
  return { isAlias, variableName };
};
