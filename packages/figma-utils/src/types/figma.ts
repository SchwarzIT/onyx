/**
 * Figma API response when fetching from https://api.figma.com/v1/files/${fileKey}/variables/local
 */
export type FigmaVariablesApiResponse = {
  meta: {
    variableCollections: Record<string, VariablesCollection>;
    variables: Record<string, Variable>;
  };
};

export type VariablesCollection = {
  defaultModeId: string;
  hiddenFromPublishing: boolean;
  modes: Mode[];
};

export type Mode = {
  modeId: string;
  name: string;
};

export type Variable = {
  name: string;
  variableCollectionId: string;
  hiddenFromPublishing: boolean;
  valuesByMode: Record<string, ColorValue>;
};

export type ColorValue = RGBAValue | ColorsAlias | number;

export type RGBAValue = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type ColorsAlias = {
  type: "VARIABLE_ALIAS";
  id: string;
};

export type ParsedVariable = {
  /** Figma mode name or undefined if its the default mode. */
  modeName?: string;
  /**
   * Mapping from variable name to its value.
   * @example
   * ```json
   * {
   *    "primary-100": "#ffffff",
   *    "border-radius-s": "1rem",
   * }
   * ```
   */
  variables: Record<string, string>;
};
