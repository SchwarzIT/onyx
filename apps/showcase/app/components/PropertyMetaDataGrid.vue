<script setup lang="ts">
import {
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
} from "sit-onyx";
import type { PropertyMeta } from "vue-component-meta";

type CustomColumnTypes = ColumnTypesFromFeatures<typeof customDataGridColumnTypes<TEntry>>;

const props = withDefaults(
  defineProps<{
    items?: PropertyMeta[];
  }>(),
  { items: () => [] },
);

type TEntry = Pick<PropertyMeta, "name" | "description" | "schema" | "required"> & { id: string };

const data = computed(() => {
  return props.items
    .map<TEntry>((item) => ({ ...item, id: item.name }))
    .sort((a, b) => {
      const aRequired = "required" in a && a.required;
      const bRequired = "required" in b && b.required;
      if (aRequired !== bRequired) return aRequired ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
});

const columns = computed<ColumnConfig<TEntry, ColumnGroupConfig, CustomColumnTypes>[]>(() => {
  return [
    {
      key: "name",
      label: "Name",
      width: "max-content",
      type: {
        name: "required",
        options: {
          required: (row) => row.required,
        },
      },
    },
    { key: "description", label: "Description", type: "markdown" },
    {
      key: "schema",
      label: "Type",
      type: "propertyMetaSchema",
    },
  ];
});

const features = [customDataGridColumnTypes<TEntry>];
</script>

<template>
  <OnyxDataGrid
    :headline="{ text: $t('components.property', 2), rowCount: true }"
    :columns
    :data
    :features
  />
</template>
