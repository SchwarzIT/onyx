<script setup lang="ts">
import {
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
} from "sit-onyx";
import type { EventMeta, ExposeMeta, SlotMeta } from "vue-component-meta";

type CustomColumnTypes = ColumnTypesFromFeatures<typeof customDataGridColumnTypes<TEntry>>;
export type MetaItem = Pick<EventMeta | SlotMeta | ExposeMeta, "name" | "description">;

const props = defineProps<{
  headline: string;
  items: MetaItem[];
}>();

type TEntry = MetaItem & { id: string };

const data = computed(() => {
  return props.items
    .map<TEntry>((item) => ({ ...item, id: item.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const columns = computed<ColumnConfig<TEntry, ColumnGroupConfig, CustomColumnTypes>[]>(() => {
  return [
    { key: "name", label: "Name", width: "max-content" },
    { key: "description", label: "Description", type: "markdown" },
  ];
});

const features = [customDataGridColumnTypes<TEntry>];
</script>

<template>
  <OnyxDataGrid :headline="{ text: props.headline, rowCount: true }" :columns :data :features />
</template>
