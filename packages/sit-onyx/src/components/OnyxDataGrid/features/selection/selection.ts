import { h, toRef, type Ref } from "vue";
import { createFeature, type ModifyColumns } from "..";
import { injectI18n } from "../../../../i18n";
import OnyxCheckbox from "../../../OnyxCheckbox/OnyxCheckbox.vue";
import type { DataGridEntry } from "../../types";
import "./selection.scss";
import type { SelectionOptions, SelectionState } from "./types";

export const SELECTION_FEATURE = Symbol("Selection");
export const SELECTION_COLUMN = Symbol("SelectionColumn");

export const useSelection = createFeature(
  <TEntry extends DataGridEntry>(options?: SelectionOptions) => {
    const selectionState: Ref<SelectionState> = toRef(
      options?.selectionState ??
        ({
          selectMode: "include",
          contingent: new Set<TEntry["id"]>(),
        } as const),
    );

    const getCheckState = (id: PropertyKey) =>
      selectionState.value.selectMode === "include"
        ? selectionState.value.contingent.has(id)
        : !selectionState.value.contingent.has(id);

    const updateSelectMode = (checked: boolean) => {
      selectionState.value.selectMode = checked ? "exclude" : "include";
      selectionState.value.contingent.clear();
    };

    const updateToggleState = (checked: boolean, id: PropertyKey) => {
      if (
        (selectionState.value.selectMode === "include" && checked === true) ||
        (selectionState.value.selectMode === "exclude" && checked === false)
      ) {
        selectionState.value.contingent.add(id);
      } else {
        selectionState.value.contingent.delete(id);
      }
    };

    const { t } = injectI18n();

    return {
      name: SELECTION_FEATURE,
      watch: [selectionState],
      modifyColumns: {
        func: (columnConfig) => [
          { key: SELECTION_COLUMN, type: SELECTION_COLUMN },
          ...columnConfig,
        ],
      } satisfies ModifyColumns<TEntry>,
      typeRenderer: {
        [SELECTION_COLUMN]: {
          header: {
            thAttributes: { class: "onyx-data-grid-selection-cell" },
            component: () =>
              h(OnyxCheckbox, {
                label:
                  selectionState.value.selectMode === "include"
                    ? t.value("dataGrid.head.selection.selectAll")
                    : t.value("dataGrid.head.selection.deselectAll"),
                value: `selection-all-rows`,
                hideLabel: true,
                "onUpdate:modelValue": (checked) => updateSelectMode(checked),
                modelValue: selectionState.value.selectMode === "exclude",
              }),
          },
          cell: {
            tdAttributes: { class: "onyx-data-grid-selection-cell" },
            component: ({ row }) =>
              h(OnyxCheckbox, {
                label:
                  selectionState.value.selectMode === "include"
                    ? t.value("dataGrid.head.selection.select", { id: String(row.id) })
                    : t.value("dataGrid.head.selection.deselect", { id: String(row.id) }),
                value: `selection-${String(row.id)}`,
                hideLabel: true,
                "onUpdate:modelValue": (checked) => updateToggleState(checked, row.id),
                modelValue: getCheckState(row.id),
              }),
          },
        },
      },
    };
  },
);
