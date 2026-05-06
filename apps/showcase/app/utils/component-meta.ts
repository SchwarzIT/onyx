import componentMeta from "sit-onyx/dist/component-meta.json";

export type PropertyMeta = (typeof componentMeta)[number]["props"][number];

/**
 * Gets the meta data for a given onyx component.
 */
export function getComponentMeta(componentName: string) {
  return componentMeta.find((component) => component.displayName === componentName);
}
