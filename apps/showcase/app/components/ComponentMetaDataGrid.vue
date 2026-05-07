<script setup lang="ts">
import {
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
} from "sit-onyx";
import type { ExposeMeta, PropertyMeta } from "../utils/component-meta.js";

type CustomColumnTypes = ColumnTypesFromFeatures<typeof customDataGridColumnTypes<TEntry>>;
type MetaItem = PropertyMeta | EventMeta | SlotMeta | ExposeMeta;

const props = withDefaults(
  defineProps<{
    headline: string;
    items?: MetaItem[];
  }>(),
  { items: () => [] },
);

type TEntry = MetaItem & { id: string };

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
  const _columns: ColumnConfig<TEntry, ColumnGroupConfig, CustomColumnTypes>[] = [
    {
      key: "name",
      label: "Name",
      width: "max-content",
      type: {
        name: "required",
        options: {
          required: (row) => "required" in row && row.required,
        },
      },
    },
    { key: "description", label: "Description", type: "markdown" },
  ];

  if (data.value.some((row) => "type" in row && row.type)) {
    // TODO: use custom column type
    _columns.push({ key: "type", label: "Type" });
  }

  return _columns;
});

const features = [customDataGridColumnTypes<TEntry>];
</script>

<template>
  <OnyxDataGrid :headline="{ text: props.headline, rowCount: true }" :columns :data :features />
</template>

<style lang="scss" scoped>
:deep(.markdown-cell) {
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
}
</style>
