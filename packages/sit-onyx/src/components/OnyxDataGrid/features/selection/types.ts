import { type MaybeRef, type MaybeRefOrGetter } from "vue";
import type { DataGridEntry } from "../../types";

export type SelectionState = {
  /**
   * If the `contingent` set refers to entries that are included in the final selection or excluded from it.
   * The `selectMode` is closely coupled with the `HeaderSelectionCheckbox` which is used to "select all" or "deselect all".
   * It allows for tracking selections even when not all rows are known.
   * This especially useful in case of pagination or asynchronous data loading.
   *
   * Based on this there are the following scenarios:
   *
   * | selectMode | selected.size |      result      | HeaderSelectionCheckbox |
   * |------------|:-------------:|:----------------:|-------------------------|
   * | "include"  |      == 0     | nothing selected | unchecked               |
   * | "include"  |       > 0     |   some selected  | indeterminate           |
   * | "exclude"  |       > 0     |   all selected   | checked                 |
   * | "exclude"  |       > 0     |   some selected  | indeterminate           |
   *
   */
  selectMode: "include" | "exclude";
  /**
   * The entries that are included or excluded from the selection, based on `selectMode`.
   */
  contingent: Set<DataGridEntry["id"]>;
};

/**
 * The options of the selection feature for the OnyxDataGrid component.
 */
export type SelectionOptions = {
  /**
   * The currently active selection.
   */
  selectionState?: MaybeRef<SelectionState>;
  /**
   * If the row selection column is shown or not.
   */
  enabled?: MaybeRefOrGetter<boolean>;
  /**
   * If `true` the selection checkbox of a row will only be shown if the row is hovered or selected.
   */
  hover?: boolean;
};
