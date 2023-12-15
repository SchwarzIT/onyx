import { ParsedVariable } from "./parse.js";

type GenericGeneratorOptions = {
  data: ParsedVariable[];
  nameTransformer: (name: string) => string;
  aliasTransformer: (name: string) => string;
};

export const generateAsCSS = (data: ParsedVariable[]): string => {
  return genericGenerator({
    data,
    nameTransformer: (name) => `--${name}`,
    aliasTransformer: (name) => `var(--${name})`,
  });
};

export const generateAsSass = (data: ParsedVariable[]): string => {
  return genericGenerator({
    data,
    nameTransformer: (name) => `$${name}`,
    aliasTransformer: (name) => `$${name}`,
  });
};

export const genericGenerator = (options: GenericGeneratorOptions) => {
  let content = "";

  options.data.forEach(({ modeName, variables }) => {
    const selector = modeName == undefined ? ":root" : `:root[theme="${modeName}"]`;

    content += `${selector} {
${Object.entries(variables)
  .map(([name, value]) => {
    const { isAlias, variableName } = isAliasVariable(value);
    const variableValue = isAlias ? options.aliasTransformer(variableName) : value;
    return `  ${options.nameTransformer(name)}: ${variableValue};`;
  })
  .join("\n")}
}

`;
  });

  return content;
};

/**
 * Checks whether the given variable value is an alias / variable reference to another variable.
 */
export const isAliasVariable = (variableValue: string) => {
  const isAlias = /{.*}/.exec(variableValue);
  const variableName = variableValue.replace("{", "").replace("}", "");
  return { isAlias, variableName };
};
