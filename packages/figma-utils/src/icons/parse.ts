import { Component, ParsedIcon } from "../types/figma.js";

export type ParseIconComponentsOptions = {
  /**
   * Available Figma components.
   */
  components: Component[];
  /**
   * Page ID that contains all icons. Components will be filtered accordingly.
   */
  pageId: string;
  /**
   * Separator for icon alias names (which can be set to the component description in Figma).
   *
   * @default ","
   */
  aliasSeparator?: string;
};

export const parseComponentsToIcons = (options: ParseIconComponentsOptions): ParsedIcon[] => {
  const pageComponents = options.components.filter(
    ({ containing_frame }) => containing_frame.pageId === options.pageId,
  );

  return pageComponents
    .map<ParsedIcon>((component) => {
      return {
        id: component.node_id,
        name: component.name,
        category: component.containing_frame.name.trim(),
        aliases: component.description
          .split(options.aliasSeparator ?? ",")
          .map((alias) => alias.trim())
          .filter((i) => i !== ""),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
