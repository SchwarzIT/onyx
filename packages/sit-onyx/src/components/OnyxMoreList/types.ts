import type { MoreInjectionKey } from "../../composables/useMoreList";

export type OnyxMoreListProps = {
  /**
   * Component to render (e.g. `<ul>` or `<div>`).
   */
  is: string;
  /**
   * Injection key to use. Must match the one used in the child components.
   * Will not be reactive so it must not be changed.
   */
  injectionKey: MoreInjectionKey;
  /**
   * Whether the intersection observer should be disabled (e.g. when more feature is currently not needed due to mobile layout).
   * Can increase performance.
   */
  disabled?: boolean;
};
