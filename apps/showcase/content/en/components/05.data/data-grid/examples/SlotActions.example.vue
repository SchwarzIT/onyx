<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  createFeature,
  OnyxDataGrid,
  OnyxMenuItem,
  OnyxSplitButton,
  type ColumnConfig,
} from "sit-onyx";
import { computed, h } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Charlie" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Robin" },
    { id: 5, name: "John" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const withCustomSlots = createFeature(() => ({
  name: Symbol("customSlots"),
  // prefer the build-in "actions" API for using actions
  actions: () => {
    return [{ label: "Example action", icon: iconPlaceholder, color: "neutral" }];
  },
  slots: {
    // use the "actions" slots directly only if needed for custom content
    actions: (slotContent) => {
      return [
        ...slotContent(),
        h(
          OnyxSplitButton,
          { label: "Button" },
          {
            options: () => [
              h(OnyxMenuItem, { label: "Action 1" }),
              h(OnyxMenuItem, { label: "Action 2" }),
              h(OnyxMenuItem, { label: "Action 3" }),
            ],
          },
        ),
      ];
    },
  },
}));

const features = [withCustomSlots];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
