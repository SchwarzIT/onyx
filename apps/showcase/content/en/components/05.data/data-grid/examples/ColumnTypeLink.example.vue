<script setup lang="ts">
import { OnyxDataGrid, type ColumnConfig, type EditLinkValue } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  link?: string | EditLinkValue;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, link: "https://example.com" },
    { id: 2, link: { href: "/components/data/data-grid", label: "Custom label" } },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    {
      key: "link",
      label: "Link",
      type: {
        name: "link",
        // optionally add options such as open links in a new tab
        options: {
          target: "_blank",
        },
      },
    },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data />
</template>
