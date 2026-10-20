/**
 * Extracts the CSS variable name from the given variable.
 *
 * @param variable CSS variable, e.g. `var(--example-variable)`
 * @returns Variable name, e.g. `--example-variable`
 */
export function getCssVariableName(variable: string) {
  return variable.match(/^var\(\s*(.*?)\s*\)$/)?.at(1);
}
