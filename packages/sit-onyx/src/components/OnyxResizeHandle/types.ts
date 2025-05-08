import type { VueTemplateRefElement } from "../../composables/useResizeObserver";

export type OnyxResizeHandleProps = {
  /**
   * Template ref (or getter) of the element to do the resizing on.
   */
  element: VueTemplateRefElement | ((event: MouseEvent) => VueTemplateRefElement);
  /**
   * Minimum width (in pixels) that should not be fallen below while resizing.
   */
  min?: number;
};
