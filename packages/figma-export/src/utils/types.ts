export type FigmaVariablesApiResponse = {
  meta: {
    variableCollections: Record<string, VariablesCollection>;
    variables: Record<string, Variable>;
  };
};

export type VariablesCollection = {
  defaultModeId: string;
  modes: Mode[];
};

export type Mode = {
  modeId: string;
  name: string;
};

export type Variable = {
  name: string;
  variableCollectionId: string;
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
  type: string;
  id: string;
};

export type ParsedFigmaVariables = Record<string, Record<string, { value: unknown }>>;
