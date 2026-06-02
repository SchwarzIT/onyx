import type { ComponentMeta } from "vue-component-meta";

type OnyxComponentMeta =
  | typeof import("sit-onyx/dist/component-meta.json")
  | typeof import("@sit-onyx/tiptap/component-meta.json");

/**
 * Gets the meta data for a given onyx component.
 */
export async function getComponentMeta(
  componentName: string,
  packageName = "sit-onyx",
): Promise<ComponentMeta | undefined> {
  let data: OnyxComponentMeta | undefined;

  if (packageName === "sit-onyx") {
    data = (await import("sit-onyx/dist/component-meta.json")).default;
  } else if (packageName === "@sit-onyx/tiptap") {
    data = (await import("@sit-onyx/tiptap/component-meta.json")).default;
  }

  const meta = data?.find((component) => component.displayName === componentName);
  return meta as ComponentMeta | undefined;
}
