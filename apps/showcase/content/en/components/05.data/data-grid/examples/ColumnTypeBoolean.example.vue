<script setup lang="ts">
import { iconEye, iconEyeDisabled } from "@sit-onyx/icons";
import { OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  active?: boolean;
  visible?: boolean;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, active: false, visible: false },
    { id: 2, active: true, visible: true },
    { id: 3, active: false, visible: false },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "active", label: "Active?", type: "boolean" },
    {
      key: "visible",
      label: "Visible?",
      type: {
        name: "boolean",
        options: {
          truthy: {
            icon: iconEye,
            color: "success",
          },
          falsy: {
            icon: iconEyeDisabled,
            color: "danger",
          },
        },
      },
    },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data />
</template>
