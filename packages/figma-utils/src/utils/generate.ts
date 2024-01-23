import { ParsedVariable } from "../types/figma.js";

export type BaseGenerateOptions = {
  /**
   * If `true`, alias variable values will be resolved to their actual value instead
   * of using a reference by their name.
   *
   * @default false
   */
  resolveAlias?: boolean;
};

export type GenerateAsCSSOptions = BaseGenerateOptions & {
  /**
   * Selector to use for the CSS format. You can use {mode} as placeholder for the mode name.
   *
   * @default ":root"
   * @example
   * for the mode named "dark", passing the selector "html.{mode}" will result in "html.dark"
   */
  selector?: string;
};

/**
 * Generates the given parsed Figma variables into CSS variables.
 *
 * @param data Parsed Figma variables
 * @param options Optional options to fine-tune the generated output
 * @returns File content of the .css file
 */
export const generateAsCSS = (data: ParsedVariable, options?: GenerateAsCSSOptions): string => {
  const variableContent = getCssOrScssVariableContent(
    data.variables,
    (name) => `  --${name}`,
    (name) => `var(--${name})`,
    options,
  );

  const fullSelector =
    options?.selector?.trim().replaceAll("{mode}", data.modeName ?? "") || ":root";

  return `${generateTimestampComment(data.modeName)}
${fullSelector} {\n${variableContent.join("\n")}\n}\n`;
};

/**
 * Generates the given parsed Figma variables into SCSS variables.
 *
 * @returns File content of the .scss file
 */
export const generateAsSCSS = (data: ParsedVariable, options?: BaseGenerateOptions): string => {
  const variableContent = getCssOrScssVariableContent(
    data.variables,
    (name) => `$${name}`,
    (name) => `$${name}`,
    options,
  );

  return `${generateTimestampComment(data.modeName)}\n${variableContent.join("\n")}\n`;
};

/**
 * Generates the given parsed Figma variables as JSON.
 * Alias variables will be resolved to their actual value.
 *
 * @returns File content of the .json file
 */
export const generateAsJSON = (data: ParsedVariable): string => {
  const variables = structuredClone(data.variables);

  // recursively resolve aliases to plain values since keys can not be referenced in a .json file
  // like we could e.g. in a .css file
  Object.keys(variables).forEach((name) => {
    variables[name] = resolveValue(name, variables);
  });

  return `${JSON.stringify(variables, null, 2)}\n`;
};

/**
 * Recursively resolves the value for the given variable name.
 * So if the value is an alias, the output will be the actual alias value instead of a reference by name.
 * If the value is not an alias, its value will be directly returned.
 *
 * @param name Variable name to resolve
 * @param allVariables All available variables
 * @example
 * ```ts
 * const allVariables = {
 *   "variable-a": 42,
 *   "variable-b": "{variable-a}"
 * }
 *
 * const resolvedValue = resolveValue("variable-b", allVariables);
 * // const resolvedValue = 42;
 * ```
 */
export const resolveValue = (name: string, allVariables: ParsedVariable["variables"]): string => {
  const { isAlias, aliasName } = isAliasVariable(allVariables[name]);
  if (!isAlias) return allVariables[name];
  return resolveValue(aliasName, allVariables);
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
 * @returns `isAlias` whether the variable is an alias and `aliasName` the raw variable name without curly braces.
 */
export const isAliasVariable = (variableValue: string) => {
  const isAlias = /{.*}/.exec(variableValue);
  const aliasName = variableValue.replace("{", "").replace("}", "");
  return { isAlias, aliasName };
};

/**
 * Gets the variable file content of the CSS or SCSS file as array where each element
 * represents a single line of the file.
 *
 * @param variables Variable data (name + value)
 * @param nameFormatter Function to format the variable name
 * @param aliasFormatter Function to format a reference to another variable (e.g. `var(--name)` for CSS)
 * @param options Generator options
 */
const getCssOrScssVariableContent = (
  variables: Record<string, string>,
  nameFormatter: (name: string) => string,
  aliasFormatter: (name: string) => string,
  options?: BaseGenerateOptions,
) => {
  return Object.entries(variables).map(([name, value]) => {
    const { isAlias, aliasName } = isAliasVariable(value);
    let variableValue = isAlias ? aliasFormatter(aliasName) : value;

    if (isAlias && options?.resolveAlias) {
      variableValue = resolveValue(name, variables);
    }

    return `${nameFormatter(name)}: ${variableValue};`;
  });
};
