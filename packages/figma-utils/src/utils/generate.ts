import { ParsedVariable } from "../types/figma.js";

/**
 * Generates the given parsed Figma variables into CSS variables.
 *
 * @param selector CSS selector to use. The mode name will be added to the selector
 * if its set to something other than ":root", e.g. "html.dark" is the selector is set to "html"
 * @returns File content of the .css file
 */
export const generateAsCSS = (data: ParsedVariable, selector: string = ":root"): string => {
  const variableContent = Object.entries(data.variables).map(([name, value]) => {
    const { isAlias, variableName } = isAliasVariable(value);
    const variableValue = isAlias ? `var(--${variableName})` : value;
    return `  --${name}: ${variableValue};`;
  });

  selector = selector.trim();
  if (selector !== ":root") selector += `.${data.modeName}`;

  return `${generateTimestampComment(data.modeName)}
${selector} {\n${variableContent.join("\n")}\n}\n`;
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

  return `${generateTimestampComment(data.modeName)}
${variableContent.join("\n")}\n`;
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
