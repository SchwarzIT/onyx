import componentMeta from "sit-onyx/dist/component-meta.json";
import type { ComponentMeta } from "vue-component-meta";

/**
 * Gets the meta data for a given onyx component.
 */
export function getComponentMeta(componentName: string): ComponentMeta | undefined {
  const meta = componentMeta.find((component) => component.displayName === componentName);
  return meta as ComponentMeta | undefined;
}
