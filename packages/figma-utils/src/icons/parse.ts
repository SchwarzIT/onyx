import { Component, ParsedIcon } from "../types/figma.js";

export const parseComponentsToIcons = (components: Component[], pageId: string): ParsedIcon[] => {
  const pageComponents = components.filter(
    ({ containing_frame }) => containing_frame.pageId === pageId,
  );

  return pageComponents.map<ParsedIcon>((component) => {
    return {
      id: component.node_id,
      name: component.name,
      aliases: component.description.split("|").map((alias) => alias.trim()),
      category: component.containing_frame.name.trim(),
    };
  });
};
