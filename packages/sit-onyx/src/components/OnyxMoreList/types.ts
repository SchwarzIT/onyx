import type { MoreListInjectionKey } from "../../composables/useMoreList";

export type OnyxMoreListProps = {
  /**
   * Component to render (e.g. `<ul>` or `<div>`).
   */
  is: string;
  /**
   * Injection key to use. Must match the one used in the child components.
   * Will not be reactive so it must not be changed.
   */
  injectionKey: MoreListInjectionKey;
};

export type MoreListSlotBindings = {
  /**
   * Number of currently fully visible elements.
   */
  visibleElements: number;
  /**
   * Number of currently completely or partially hidden elements.
   */
  hiddenElements: number;
};
