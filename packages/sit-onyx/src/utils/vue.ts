import type { Component, RendererElement, RendererNode, VNode } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

/**
 * Filters the given VNodes (e.g. from a component slot) to only include nodes that are an instance of the given component.
 *
 * @param vnodes VNodes, e.g. from `defineSlots()`
 * @param component Vue component to filter the VNodes.
 * @returns
 */
export const filterVNodesByComponent = <T extends Component>(
  vnodes: VNode[],
  component: T,
): VNode<RendererNode, RendererElement, ComponentProps<T>>[] => {
  // if the slot only contains a v-for, we need to use the children here which are the "actual" slot content
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
