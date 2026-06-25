import type { MaybeRef } from "vue";
import type { DataGridEntry } from "../../types.js";

export type RowClickOptions<TEntry extends DataGridEntry> = {
  /**
   * Label that describes the click action. Required for accessibility.
   *
   * @example "Show details"
   */
  label: string;
  /**
   * Callback when a specific row is clicked.
   */
  onClick: (entry: TEntry, event: MouseEvent) => void;
  /**
   * Whether the feature is enabled.
   * Can also be a function that returns the enabled state for the given entry/row.
   *
   * @default true
   */
  enabled?:
    | MaybeRef<boolean | undefined>
    | ((entry: TEntry, column: keyof TEntry) => boolean | undefined);
  /**
   * Whether the click is also triggered when the user has a [selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection)
   * inside the row (e.g. marked text to copy).
   *
   * @default false
   */
  ignoreSelection?: boolean;
};
