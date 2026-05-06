<script setup lang="ts">
import { MDC } from "#components";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
  type TypeRenderMap,
} from "sit-onyx";

type CustomColumnTypes = ColumnTypesFromFeatures<typeof withCustomTypes>;

const props = withDefaults(
  defineProps<{
    headline: string;
    items?: PropertyMeta[];
  }>(),
  { items: () => [] },
);

type TEntry = PropertyMeta & {
  id: string;
};

const data = computed(() => {
  return props.items
    .map<TEntry>((item) => ({ ...item, id: item.name }))
    .sort((a, b) => {
      if (a.required !== b.required) return a.required ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
});

const columns: ColumnConfig<TEntry, ColumnGroupConfig, CustomColumnTypes>[] = [
  { key: "name", label: "Name", width: "max-content", type: "name" },
  { key: "description", label: "Description", type: "markdown" },
  { key: "type", label: "Type", type: { name: "markdown", options: { code: true } } },
];

const withCustomTypes = createFeature(() => ({
  name: Symbol("componentMeta"),
  typeRenderer: {
    markdown: DataGridFeatures.createTypeRenderer<{ code?: boolean }, TEntry>({
      cell: {
        component: ({ modelValue, metadata }) => {
          if (typeof modelValue !== "string" || !modelValue) return "-";
          const value = metadata?.typeOptions?.code ? `\`${modelValue}\`` : modelValue;
          return h(MDC, { value, class: "markdown-cell" });
        },
      },
    }),
    name: DataGridFeatures.createTypeRenderer<object, TEntry>({
      cell: {
        component: ({ row }) => {
          return h("span", { class: { "onyx-required-marker": row.required } }, row.name);
        },
      },
    }),
  } satisfies TypeRenderMap<TEntry>,
}));

const features = [withCustomTypes];
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
