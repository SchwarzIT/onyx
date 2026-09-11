<script setup lang="ts">
import { OnyxDataGrid, SelectOption, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  role: UserRole;
};

type UserRole = "user" | "editor" | "admin";

const data = computed<Entry[]>(() => {
  return [
    { id: 1, role: "user" },
    { id: 2, role: "admin" },
    { id: 3, role: "editor" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    {
      key: "role",
      label: "User role",
      type: {
        name: "select",
        options: {
          options: [
            { label: "User", value: "user" },
            { label: "Administrator", value: "admin" },
            { label: "Editor", value: "editor" },
          ] satisfies SelectOption<UserRole>[],
        },
      },
    },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data />
</template>
