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
  deletedButReferenced?: boolean;
  valuesByMode: Record<string, VariableValue>;
};

export type VariableValue = RGBAValue | ColorsAlias | number | string;

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

/**
 * Figma API response when fetching from https://api.figma.com/v1/files/${fileKey}/components
 */
export type FigmaComponentsApiResponse = {
  meta: {
    components: Component[];
  };
};

/**
 * An arrangement of published UI elements that can be instantiated across Figma files
 */
export type Component = {
  /**
   * ID of the component node within the Figma file
   */
  node_id: string;
  /**
   * Name of the component
   */
  name: string;
  /**
   * Data on component's containing frame, if component resides within a frame
   */
  containing_frame: FrameInfo;
  /**
   * The description of the component as entered by the publisher
   */
  description: string;
};

/**
 * Data on the frame a component resides in
 */
export type FrameInfo = {
  /**
   * ID of the frame node within the file
   */
  nodeId: string;
  /**
   * Name of the frame
   */
  name: string;
  /**
   * ID of the frame's residing page
   */
  pageId: string;
  /**
   * Name of the frame's residing page
   */
  pageName: string;
};

export type ParsedIcon = {
  id: string;
  name: string;
  aliases: string[];
  category: string;
};

export type ParsedFlag = {
  id: string;
  code: string;
  internationalName: string;
  continent: string;
};
