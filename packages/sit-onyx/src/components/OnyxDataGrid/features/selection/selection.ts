import { h, ref, toRef, useId, type Ref } from "vue";
import { createFeature, useFeatureContext, type ModifyColumns } from "..";
import OnyxCheckbox from "../../../OnyxCheckbox/OnyxCheckbox.vue";
import type { DataGridEntry } from "../../types";
import { createTypeRenderer } from "../renderer";
import "./selection.scss";
import type { SelectionOptions, SelectionState } from "./types";

export const SELECTION_FEATURE = Symbol("Selection");
export const SELECTION_MUTATION_ORDER = 1000;

export const useSelection = <TEntry extends DataGridEntry>(options?: SelectionOptions) =>
  createFeature((ctx) => {
    const SELECTION_COLUMN = `selection-column-${useId()}`;
    const selectionState: Ref<SelectionState> = toRef(
      options?.selectionState ??
        ({
          selectMode: "include",
          contingent: new Set<TEntry["id"]>(),
        } as const),
    );
    const rowsCount = ref(0);
    const hover = toRef(options?.hover ?? false);
    const { isEnabled } = useFeatureContext(ctx, options);

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

    const isIndeterminate = () =>
      selectionState.value.contingent.size !== 0 &&
      selectionState.value.contingent.size !== rowsCount.value;

    const isChecked = () =>
      (selectionState.value.selectMode === "exclude" &&
        selectionState.value.contingent.size !== rowsCount.value) ||
      (selectionState.value.selectMode === "include" &&
        selectionState.value.contingent.size === rowsCount.value);

    const modifyColumns: ModifyColumns<TEntry> = {
      func: (cols) => {
        if (!isEnabled.value()) return [...cols];

        return [
          {
            key: SELECTION_COLUMN,
            type: { name: SELECTION_COLUMN },
            label: "",
            width: "2.5rem",
          },
          ...cols,
        ];
      },
    };
    return {
      name: SELECTION_FEATURE,
      watch: [selectionState, hover, isEnabled],
      modifyColumns,
      mutation: {
        func: (rows) => {
          rowsCount.value = rows.length;
          return rows;
        },
        order: SELECTION_MUTATION_ORDER,
      },
      typeRenderer: {
        [SELECTION_COLUMN]: createTypeRenderer({
          header: {
            thAttributes: { class: "onyx-data-grid-selection-cell" },
            component: () =>
              h(OnyxCheckbox, {
                label:
                  selectionState.value.selectMode === "include"
                    ? ctx.i18n.t.value("dataGrid.head.selection.selectAll")
                    : ctx.i18n.t.value("dataGrid.head.selection.deselectAll"),
                value: `selection-all-rows`,
                hideLabel: true,
                indeterminate: isIndeterminate(),
                "onUpdate:modelValue": (checked) => updateSelectMode(checked),
                modelValue: isChecked(),
              }),
          },
          cell: {
            tdAttributes: {
              class: {
                "onyx-data-grid-selection-cell": true,
              },
            },
            component: ({ row }) => {
              const modelValue = getCheckState(row.id);
              const idAsString = String(row.id);
              const label =
                selectionState.value.selectMode === "include"
                  ? ctx.i18n.t.value("dataGrid.head.selection.select", { id: idAsString })
                  : ctx.i18n.t.value("dataGrid.head.selection.deselect", { id: idAsString });
              return h(OnyxCheckbox, {
                class: {
                  "onyx-data-grid-selection-cell__checkbox": true,
                  "onyx-data-grid-selection-cell__checkbox--hover": hover.value,
                  "onyx-data-grid-selection-cell__checkbox--checked": modelValue,
                },
                value: `selection-${idAsString}`,
                hideLabel: true,
                "onUpdate:modelValue": (checked) => updateToggleState(checked, row.id),
                label,
                modelValue,
              });
            },
          },
        }),
      },
    };
  });
