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
  /**
   * How the resize handle is aligned to the parent element.
   * Will determine whether the left or right border is resizable.
   */
  alignment?: ResizeHandleAlignment;
};

export const RESIZE_HANDLE_ALIGNMENT = ["left", "right"] as const;
export type ResizeHandleAlignment = (typeof RESIZE_HANDLE_ALIGNMENT)[number];
