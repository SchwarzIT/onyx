<script setup lang="ts">
import {
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
} from "sit-onyx";
import type { PropertyMetaSchema } from "vue-component-meta";

export type ComponentMetaItem = {
  /**
   * Meta name (e.g. name of the property, event, slot etc.).
   */
  name: string;
  /**
   * Description about the item.
   */
  description: string;
  /**
   * Schema / type of the property, event etc.
   */
  schema?: PropertyMetaSchema;
  /**
   * Whether the item is required.
   */
  required?: boolean;
};

type TEntry = ComponentMetaItem & { id: string };
type CustomColumnTypes = ColumnTypesFromFeatures<typeof customDataGridColumnTypes<TEntry>>;

const props = defineProps<{
  /**
   * Data grid headline.
   */
  headline: string;
  /**
   * Meta items to render.
   */
  items: ComponentMetaItem[];
}>();

const { t } = useI18n();

const data = computed(() => {
  return props.items
    .map<TEntry>((item) => ({ ...item, id: item.name }))
    .sort((a, b) => {
      // 1. sort required items first
      const aRequired = "required" in a && a.required;
      const bRequired = "required" in b && b.required;
      if (aRequired !== bRequired) return aRequired ? -1 : 1;

      // 2. sort alphabetically
      return a.name.localeCompare(b.name);
    });
});

const columns = computed(() => {
  const _columns: ColumnConfig<TEntry, ColumnGroupConfig, CustomColumnTypes>[] = [
    {
      key: "name",
      label: t("name"),
      width: "max-content",
      type: { name: "required", options: { required: (row) => row.required ?? false } },
    },
    { key: "description", label: t("description"), type: "markdown" },
  ];

  const hasSchemas = data.value.some((row) => row.schema);
  if (hasSchemas) {
    _columns.push({
      key: "schema",
      label: t("components.schema"),
      type: "propertyMetaSchema",
    });
  }

  return _columns;
});

const features = [customDataGridColumnTypes<TEntry>];
</script>

<template>
  <OnyxDataGrid :headline="{ text: props.headline, rowCount: true }" :columns :data :features />
</template>
