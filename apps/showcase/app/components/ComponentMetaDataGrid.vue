<script setup lang="ts">
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  type ColumnConfig,
  type TypeRenderMap,
} from "sit-onyx";
import type { PropertyMeta, PropertyMetaSchema } from "vue-component-meta";
import ComponentMetaTag from "./ComponentMetaTag.vue";

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
  /**
   * JSDoc tags.
   */
  tags?: PropertyMeta["tags"];
};

type TEntry = ComponentMetaItem & { id: string };

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
    .map<TEntry>((item) => {
      return {
        ...item,
        id: item.name,
        // we only want to include certain tags
        tags: item.tags?.filter((tag) => tag.name === "deprecated"),
      };
    })
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
  const _columns: ColumnConfig<TEntry, typeof features>[] = [
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
      width: "minmax(4rem, 16rem)",
    });
  }

  const hasTags = data.value.some((row) => row.tags?.length);
  if (hasTags) {
    _columns.push({
      key: "tags",
      label: t("components.tags"),
      type: "tags",
      width: "max-content",
    });
  }

  return _columns;
});

const withCustomTypes = createFeature(() => ({
  name: Symbol("customTypes"),
  typeRenderer: {
    tags: DataGridFeatures.createTypeRenderer<object, TEntry>({
      cell: {
        component: ({ row }) => {
          const tags = row.tags;
          if (!tags?.length) return "-";

          return h(
            "div",
            { class: "tags" },
            tags.map((tag) => h(ComponentMetaTag, { label: tag.name, tooltipText: tag.text })),
          );
        },
      },
    }),
  } satisfies TypeRenderMap<TEntry>,
}));

const features = [customDataGridColumnTypes<TEntry>, withCustomTypes];
</script>

<template>
  <OnyxDataGrid :headline="{ text: props.headline, rowCount: true }" :columns :data :features />
</template>

<style lang="scss" scoped>
:deep(.tags) {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-2xs);
}
</style>
