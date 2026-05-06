import componentMeta from "sit-onyx/dist/component-meta.json";

type ArrayItem<T extends unknown[]> = T[number];
type Meta = ArrayItem<typeof componentMeta>;

export type PropertyMeta = ArrayItem<Meta["props"]>;
export type EventMeta = ArrayItem<Meta["events"]>;
export type SlotMeta = ArrayItem<Meta["slots"]>;
export type ExposeMeta = ArrayItem<Meta["exposed"]>;

/**
 * Gets the meta data for a given onyx component.
 */
export function getComponentMeta(componentName: string) {
  return componentMeta.find((component) => component.displayName === componentName);
}
