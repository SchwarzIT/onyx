import { toRef, type Ref } from "vue";
import type { DataGridEntry } from "../../types.js";
import { createFeature, useFeatureContext } from "../index.js";
import type { EditOptions, EditState } from "./types.js";

export const EDITING_FEATURE = Symbol("Editing");
export const EDITING_MUTATION_ORDER = -1;

export const useEditing = <TEntry extends DataGridEntry>(options?: EditOptions<TEntry>) =>
  createFeature((ctx) => {
    const editState = toRef(options?.editState ?? {}) as Ref<EditState<DataGridEntry>>;
    const config = toRef(options?.columns);
    const enabled = toRef(options?.enabled);
    const { isEnabled } = useFeatureContext(ctx, options);
    let unedited: Readonly<DataGridEntry[]>;

    const isEditable = (entry: TEntry, columnKey: keyof TEntry) => {
      if (!isEnabled.value(columnKey)) {
        return false;
      }
      if (options?.isCellEditable) {
        return options.isCellEditable(entry, columnKey);
      }
      return true;
    };

    return {
      mutation: {
        func: (rows: Readonly<TEntry[]>) => {
          unedited = rows;
          return rows.map((r) => (editState.value[r.id] ? { ...r, ...editState.value[r.id] } : r));
        },
        order: EDITING_MUTATION_ORDER,
      },
      enhanceCells: {
        func: ({ props }, entry) => ({
          props: {
            metadata: {
              editable: isEditable(entry, props.column),
              ...props.metadata,
            },
            "onUpdate:modelValue": (newValue: unknown) => {
              const { id } = props.row;
              const { column: columnKey } = props;
              const originalValue = unedited.find((r) => r.id === id)?.[columnKey];
              if (originalValue === newValue) {
                delete editState.value[id]?.[props.column];
                if (Object.entries(editState.value[id] ?? {}).length === 0) {
                  delete editState.value[id];
                }
                return;
              }
              if (!editState.value[id]) {
                editState.value[id] = {};
              }
              editState.value[id][props.column] = newValue;
            },
          },
        }),
      },
      name: EDITING_FEATURE,
      watch: [editState, config, enabled],
    };
  });
