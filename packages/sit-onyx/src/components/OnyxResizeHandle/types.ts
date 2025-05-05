import type { VueTemplateRefElement } from "../../composables/useResizeObserver";

export type OnyxResizeHandleProps = {
  /**
   * Template ref of the element to do the resizing on.
   * If undefined, you must take care of the resizing on your own by listening to the `resize` event.
   */
  element: VueTemplateRefElement | ((event: MouseEvent) => VueTemplateRefElement);
  /**
   * Minimum width that should not be fallen below while resizing.
   */
  min?: number;
};
