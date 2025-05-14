import { Component, ParsedFlag } from "../types/figma.js";

export type ParseFlagComponentsOptions = {
  /**
   * Available Figma components.
   */
  components: Component[];
  /**
   * Page ID that contains all flags. Components will be filtered accordingly.
   */
  pageId: string;
};

export const parseComponentsToFlags = (options: ParseFlagComponentsOptions): ParsedFlag[] => {
  const pageComponents = options.components.filter(
    ({ containing_frame }) => containing_frame.pageId === options.pageId,
  );

  return (
    pageComponents
      .map<ParsedFlag>((component) => {
        return {
          id: component.node_id,
          code: component.description.trim(),
          continent: component.containing_frame.name.trim(),
          internationalName: component.name.trim(),
        };
      })
      // remove invalid flags without a country code
      .filter(({ code }) => code)
      .sort((a, b) => a.code.localeCompare(b.code))
  );
};
