<script setup lang="ts">
import {
  ColumnGroupConfig,
  ColumnTypesFromFeatures,
  createFeature,
  DataGridEntry,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxTag,
  OnyxTagProps,
  type ColumnConfig,
} from "sit-onyx";
import { computed, h } from "vue";

type Entry = {
  id: number;
  name: string;
  status: "online" | "offline";
};

type CustomColumnTypes = ColumnTypesFromFeatures<[typeof withCustomTypes]>;

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice", status: "online" },
    { id: 2, name: "Charlie", status: "offline" },
    { id: 3, name: "Bob", status: "offline" },
    { id: 4, name: "Robin", status: "online" },
    { id: 5, name: "John", status: "online" },
  ];
});

const columns = computed<ColumnConfig<Entry, ColumnGroupConfig, CustomColumnTypes>[]>(() => {
  return [
    { key: "name", label: "Name" },
    {
      key: "status",
      label: "Status",
      width: "max-content",
      type: {
        name: "tag",
        options: {
          tag: (row) => {
            if (row.status === "online") {
              return {
                color: "success",
              };
            }
            if (row.status === "offline") {
              return {
                color: "danger",
              };
            }
          },
        },
      },
    },
  ];
});

// place this feature in a dedicated .ts file so it can be reused by other data grids
type IconColumnTypeOptions<TEntry extends DataGridEntry> = {
  tag?: (row: TEntry) => Partial<OnyxTagProps> | undefined;
};

const useCustomTypes = <TEntry extends DataGridEntry>() =>
  createFeature(() => ({
    name: Symbol("customTypes"),
    typeRenderer: {
      tag: DataGridFeatures.createTypeRenderer<IconColumnTypeOptions<TEntry>, TEntry>({
        cell: {
          component: ({ modelValue, metadata, row }) => {
            if (!modelValue) return "-";
            const tagProps = metadata?.typeOptions?.tag?.(row) ?? {};
            return h(OnyxTag, { label: String(modelValue), ...tagProps });
          },
        },
      }),
    },
  }));

const withCustomTypes = useCustomTypes<Entry>();

const features = [withCustomTypes];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
