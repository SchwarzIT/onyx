import { createBuilder } from "../../utils/builder.js";

export type CreateDragAndDropOptions<TItem> = {
  /**
   * Emitted while actively dragging.
   * Will be called for each animation frame.
   */
  onDragover?(event: DragEvent): void;
  /**
   * Emitted when an active drag is dropped over a valid drop target.
   */
  onDrop?: (event: DragEvent) => void;
  /**
   * Emitted when an item starts to be dragged.
   */
  onDragstart?: (event: DragEvent, item: TItem) => void;
  /**
   * Emitted when the user ends stops dragging the element.
   */
  onDragend?: (event: DragEvent, item: TItem) => void;
};

/**
 * Composable for creating drag and drop functionality.
 */
export const createDragAndDrop = createBuilder(
  <TItem>(options: CreateDragAndDropOptions<TItem>) => {
    let isDragoverAnimationFrameTicking = false;

    const onDragover = (event: DragEvent) => {
      event.preventDefault(); // required to allow a drop

      // optimize triggering too many events by throttling them with animation frames
      if (!isDragoverAnimationFrameTicking) {
        requestAnimationFrame(() => {
          options.onDragover?.(event);
          isDragoverAnimationFrameTicking = false;
        });
        isDragoverAnimationFrameTicking = true;
      }
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      options.onDrop?.(event);
    };

    const onDragstart = (event: DragEvent, item: TItem) => options.onDragstart?.(event, item);

    const onDragend = (event: DragEvent, item: TItem) => options.onDragend?.(event, item);

    return {
      elements: {
        /**
         * Drop target where draggable elements are allowed to be dropped.
         * drop).
         */
        target: {
          onDragover,
          onDrop,
        },
        /**
         * Drag and drop trigger / handle (e.g. an icon) that starts the drag.
         */
        trigger: ({ item }: { item: TItem }) => ({
          draggable: true,
          onDragstart: (event) => onDragstart(event, item),
          onDragend: (event) => onDragend(event, item),
        }),
      },
    };
  },
);
