import type { VueTemplateRefElement } from "../../composables/useResizeObserver";

export type OnyxResizeHandleProps = {
  /**
   * Template ref (or getter) of the element to do the resizing on.
   */
  element: VueTemplateRefElement;
  /**
   * Minimum width (in pixels) that should not be fallen below while resizing.
   */
  min?: number;
  /**
   * Whether the resizing is currently active/dragging.
   * Useful if the resize handle is rerendered based on some conditions but the dragging state should be kept.
   */
  active?: boolean;
};
