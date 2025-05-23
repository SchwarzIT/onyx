<script lang="ts" setup>
import type { SkeletonInjected } from "src/composables/useSkeletonState";
import { computed } from "vue";
import OnyxDataGrid from "./OnyxDataGrid.vue";

const props = defineProps<{
  /**
   * If true, no data is passed to the grid.
   */
  empty: boolean;
  /**
   * If true, column groups are displayed.
   */
  columnGroups: boolean;
  /**
   * Whether to show a skeleton.
   */
  skeleton?: SkeletonInjected;
}>();

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  nickname: string;
  favoriteColor: string;
};

const data = computed<Entry[]>(() =>
  props.empty
    ? []
    : [
        {
          id: 1,
          name: "Alice",
          age: 30,
          birthday: new Date("1990-01-01"),
          nickname: "Al",
          favoriteColor: "red",
        },
        {
          id: 2,
          name: "Charlie",
          age: 35,
          birthday: new Date("1998-02-11"),
          nickname: "Lee",
          favoriteColor: "red",
        },
        {
          id: 3,
          name: "Bob",
          age: 25,
          birthday: new Date("1995-06-15"),
          nickname: "Bo",
          favoriteColor: "blue",
        },
        {
          id: 4,
          name: "John",
          age: 28,
          birthday: new Date("2003-04-10"),
          nickname: "Joni",
          favoriteColor: "red",
        },
        {
          id: 5,
          name: "Charlotte",
          age: 28,
          birthday: new Date("2000-11-08"),
          nickname: "Char",
          favoriteColor: "red",
        },
      ],
);

const columnGroups = computed(() =>
  props.columnGroups
    ? {
        gdpr: { label: "Identifiable" },
        derived: { label: "Derived" },
      }
    : undefined,
);
</script>

<template>
  <OnyxDataGrid
    :skeleton
    :data
    :columns="[
      { key: 'name', type: 'string', columnGroupKey: props.columnGroups ? 'gdpr' : undefined },
      'favoriteColor',
      {
        key: 'age',
        type: 'number',
        width: '4rem',
        columnGroupKey: props.columnGroups ? 'derived' : undefined,
      },
      { key: 'nickname', type: 'string', columnGroupKey: props.columnGroups ? 'gdpr' : undefined },
      { key: 'birthday', type: 'date', columnGroupKey: props.columnGroups ? 'gdpr' : undefined },
    ]"
    :column-groups
  />
</template>

<style lang="scss">
.onyx-data-grid {
  max-width: 500px;
}
</style>
