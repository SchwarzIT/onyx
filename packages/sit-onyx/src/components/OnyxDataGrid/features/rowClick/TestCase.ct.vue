<script setup lang="ts">
import { computed } from "vue";
import OnyxDataGrid from "../../OnyxDataGrid.vue";
import type { ColumnConfig } from "../index.js";
import { useRowClick } from "./rowClick.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
};

const props = withDefaults(
  defineProps<{
    ignoreSelection?: boolean;
    enabled?: boolean;
    /**
     * List of row IDs that should be disabled. We can not use the "enabled" function of the feature options
     * since functions props are not passed by Playwright.
     */
    disabledRows?: TEntry["id"][];
  }>(),
  {
    // eslint-disable-next-line vue/no-boolean-default -- used in test
    enabled: true,
  },
);

const emit = defineEmits<{
  rowClick: [row: TEntry];
}>();

const data: TEntry[] = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Charlie", age: 35 },
  { id: 3, name: "Bob", age: 25 },
  { id: 4, name: "Robin", age: 28 },
  { id: 5, name: "John", age: 42 },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "number" },
];

const withRowClick = computed(() =>
  useRowClick<TEntry>({
    ignoreSelection: props.ignoreSelection,
    enabled: props.disabledRows ? (row) => !props.disabledRows?.includes(row.id) : props.enabled,
    onClick: (row) => emit("rowClick", row),
  }),
);

const features = computed(() => [withRowClick.value]);
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
