import tiptapComponentMeta from "@sit-onyx/tiptap/component-meta.json";
import componentMeta from "sit-onyx/dist/component-meta.json";
import type { ComponentMeta } from "vue-component-meta";

/**
 * Gets the meta data for a given onyx component.
 */
export function getComponentMeta(
  componentName: string,
  packageName: string,
): ComponentMeta | undefined {
  const data = packageName === "@sit-onyx/tiptap" ? tiptapComponentMeta : componentMeta;
  const meta = data.find((component) => component.displayName === componentName);
  return meta as ComponentMeta | undefined;
}
