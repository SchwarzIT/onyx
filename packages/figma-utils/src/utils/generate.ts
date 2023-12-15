import { ParsedVariable } from "../types/figma.js";

type GenericGeneratorOptions = {
  data: ParsedVariable;
  /**
   * Function which returns the full variable name depending on the used format.
   *
   * @example
   * ```ts
   * // for CSS:
   * (name) => `--${name}`
   * ```
   */
  nameTransformer: (name: string) => string;
  /**
   * Function which returns the full variable value if its an alias / reference to another variable.
   *
   * @example
   * ```ts
   * // for CSS:
   * (name) => `var(--${name})`
   * ```
   */
  aliasTransformer: (name: string) => string;
};

/**
 * Generates the given parsed Figma variables into CSS variables.
 *
 * @returns File content of the .css file
 */
export const generateAsCSS = (data: ParsedVariable): string => {
  return genericGenerator({
    data,
    nameTransformer: (name) => `--${name}`,
    aliasTransformer: (name) => `var(--${name})`,
  });
};

/**
 * Generates the given parsed Figma variables into Sass/SCSS variables.
 *
 * @returns File content of the .scss file
 */
export const generateAsSass = (data: ParsedVariable): string => {
  return genericGenerator({
    data,
    nameTransformer: (name) => `$${name}`,
    aliasTransformer: (name) => `$${name}`,
  });
};

/**
 * Generic base generator for CSS, SCSS etc. files.
 * Will take care of defining selectors and formatting.
 */
const genericGenerator = (options: GenericGeneratorOptions) => {
  const variableContent = Object.entries(options.data.variables).map(([name, value]) => {
    const { isAlias, variableName } = isAliasVariable(value);
    const variableValue = isAlias ? options.aliasTransformer(variableName) : value;
    return `  ${options.nameTransformer(name)}: ${variableValue};`;
  });

  return `:root {\n${variableContent.join("\n")}\n}\n`;
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
