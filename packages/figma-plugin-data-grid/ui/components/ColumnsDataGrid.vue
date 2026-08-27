<script setup lang="ts">
import { iconPlus, iconTrash } from "@sit-onyx/icons";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxIconButton,
  type ColumnConfig,
} from "sit-onyx";
import { computed, h, ref } from "vue";
import type { ColumnDefinition } from "../types/index.js";
import { useRowActions } from "../utils/data-grid/useRowActions/useRowActions.js";

type Entry = ColumnDefinition & {
  id: number;
};

const props = defineProps<{
  modelValue: ColumnDefinition[];
  skeleton?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [columns: ColumnDefinition[]];
}>();

const data = computed(() => {
  return props.modelValue.map<Entry>((column, index) => {
    return { ...column, id: index + 1 };
  });
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "id", label: "Order", width: "max-content" },
    { key: "headline", label: "Headline" },
    {
      key: "type",
      label: "Typ",
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
}));

const editState = ref<DataGridFeatures.EditState<Entry>>({});

const withEditing = DataGridFeatures.useEditing<Entry>({
  mode: "manual",
  editState,
  columns: {
    id: { enabled: false },
  },
});

const withRowActions = useRowActions<Entry>({
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

function handleAddColumn() {
  const newColumns: ColumnDefinition[] = [
    ...props.modelValue,
    { headline: "Headline", type: "text" },
  ];
  emit("update:modelValue", newColumns);
}

function handleDelete(row: Entry) {
  const newColumns = data.value.filter((column) => column.id !== row.id);
  emit("update:modelValue", newColumns);
}

const features = [withCustomTypes, withEditing, withRowActions];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Columns', rowCount: true }" :columns :data :features />
</template>

<style lang="scss" scoped>
:deep(td) {
  align-content: center;
}
</style>
