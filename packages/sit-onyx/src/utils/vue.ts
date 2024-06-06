import type { Component, RendererElement, RendererNode, VNode } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

/**
 *
 * @param vnodes
 * @param component
 * @param includeChildren If `true`, all children will also be filtered and flattened into the returned array.
 * @returns
 */
export const filterVNodesByComponent = <T extends Component>(
  vnodes: VNode[],
  component: T,
): VNode<RendererNode, RendererElement, ComponentProps<T>>[] => {
  const isVFor = vnodes.length === 1 && vnodes[0].type.toString() === "Symbol(v-fgt)";
  const allNodes =
    isVFor && Array.isArray(vnodes[0].children)
      ? (vnodes[0].children as Extract<(typeof vnodes)[number]["children"], []>)
      : vnodes;

  return allNodes.filter((i): i is VNode<RendererNode, RendererElement, ComponentProps<T>> => {
    if (typeof i !== "object") return false;
    if (typeof i.type !== "object" || !("__name" in i.type)) return false;
    return "__name" in component && i.type.__name === component.__name;
  });
};
