<script setup lang="ts">
import { iconPlus, iconTrash } from "@sit-onyx/icons";
import {
  applyArrayOrder,
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxIconButton,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
} from "sit-onyx";
import { computed, h, ref, watch } from "vue";
import type { ColumnDefinition, GenerateDataGridPayload } from "../types/index.js";
import { useRowActions } from "../utils/data-grid/useRowActions/useRowActions.js";
import { getDefaultColumnDefinition } from "../utils/misc.js";
import ColumnWidthFormElement from "./ColumnWidthFormElement.vue";

type CustomColumnTypes = ColumnTypesFromFeatures<[typeof withCustomTypes]>;

const props = defineProps<{
  modelValue: ColumnDefinition[];
  mode: GenerateDataGridPayload["mode"];
  skeleton?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [columns: ColumnDefinition[]];
}>();

const columns = computed(() => {
  const _columns: ColumnConfig<ColumnDefinition, ColumnGroupConfig, CustomColumnTypes>[] = [
    { key: "id", label: "Order", width: "max-content", type: "order" },
    { key: "headline", label: "Headline" },
    {
      key: "type",
      label: "Typ",
      width: "12rem",
      type: {
        name: "select",
        options: {
          options: [
            { label: "Text", value: "text" },
            { label: "Checkbox", value: "checkbox" },
            { label: "Icon", value: "icon" },
            { label: "System button", value: "systemButton" },
            { label: "Tag", value: "tag" },
          ],
        },
      },
    },
  ];

  if (props.mode === "advanced") {
    _columns.push({
      key: "width",
      label: "Width",
      type: "columnWidth",
    });
  }

  return _columns;
});

const withCustomTypes = createFeature(() => ({
  name: Symbol("customTypes"),
  actions: () => {
    return [
      {
        label: "Add new column",
        icon: iconPlus,
        displayAs: "button",
        color: "neutral",
        onClick: handleAddColumn,
      },
    ];
  },
  typeRenderer: {
    order: DataGridFeatures.createTypeRenderer<object, ColumnDefinition>({
      cell: {
        component: ({ row }) => {
          const index = props.modelValue.findIndex((i) => i.id === row.id);
          return index === -1 ? "-" : index + 1;
        },
      },
    }),
    columnWidth: DataGridFeatures.createTypeRenderer<object, ColumnDefinition>({
      cell: {
        component: ({ row, metadata, ...rest }) => {
          if (!metadata?.editable) return row.width;
          return h(ColumnWidthFormElement, { ...rest, modelValue: row.width });
        },
      },
    }),
  },
}));

const editState = ref<DataGridFeatures.EditState<ColumnDefinition>>({});

// apply edit changes
watch(
  editState,
  () => {
    if (!Object.keys(editState.value)) return;

    const rows = props.modelValue.slice();

    Object.entries(editState.value).forEach(([id, editValue]) => {
      const row = rows.find((row) => row.id === id);
      if (!row || !editValue) return;
      rows[rows.indexOf(row)] = { ...row, ...editValue };
    });

    emit("update:modelValue", rows);
  },
  { deep: true },
);

const withEditing = DataGridFeatures.useEditing<ColumnDefinition>({
  mode: "manual",
  editState,
  columns: {
    id: { enabled: false },
  },
});

const withRowActions = useRowActions<ColumnDefinition>({
  actions: (row) => {
    return [
      h(OnyxIconButton, {
        label: "Delete",
        icon: iconTrash,
        color: "danger",
        onClick: () => handleDelete(row),
      }),
    ];
  },
});

const rowRearrangeState = ref<DataGridFeatures.RowRearrangeState<ColumnDefinition>>({
  active: true,
  order: new Map(),
});

// apply rearrange
watch(
  () => rowRearrangeState.value.order,
  (newOrder) => {
    if (!newOrder.size) return;
    const orderedData = applyArrayOrder(props.modelValue, newOrder, (item) => item.id);
    emit("update:modelValue", orderedData);
    rowRearrangeState.value.order.clear();
  },
  { deep: true },
);

const withRowRearrange = DataGridFeatures.useRowRearrange<ColumnDefinition>({
  state: rowRearrangeState,
  headless: true,
});

function handleAddColumn() {
  const newColumns: ColumnDefinition[] = [...props.modelValue, getDefaultColumnDefinition()];
  emit("update:modelValue", newColumns);
}

function handleDelete(row: ColumnDefinition) {
  const newColumns = props.modelValue.filter((column) => column.id !== row.id);
  emit("update:modelValue", newColumns);
}

const features = [withCustomTypes, withEditing, withRowActions, withRowRearrange];
</script>

<template>
  <OnyxDataGrid
    :headline="{ text: 'Columns', rowCount: true }"
    :columns
    :data="props.modelValue"
    :features
  />
</template>

<style lang="scss" scoped>
:deep(td) {
  align-content: center;

  // define min-height so the layout does not jump when switched between basic/advanced mode
  min-height: calc(2.125rem + 2 * var(--onyx-table-padding-block));
}
</style>
