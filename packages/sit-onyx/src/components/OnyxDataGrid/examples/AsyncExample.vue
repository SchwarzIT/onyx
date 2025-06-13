<script setup lang="ts">
import { ref, watch } from "vue";
import { DataGridFeatures, normalizedIncludes, OnyxDataGrid, type ColumnConfig } from "../../..";
import type { FilterState } from "../features/filtering/filtering";
import type { SortState } from "../features/sorting/types";

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
};

const EXAMPLE_DATA: Entry[] = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18") },
];

const data = ref<Entry[]>([]);

const columns: ColumnConfig<Entry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "birthday", label: "Birthday", type: "date" },
];

const filterState = ref({} as FilterState<Entry>);
const sortState = ref({} as SortState<Entry>);
const skeleton = ref(false);

const withFiltering = DataGridFeatures.useFiltering<Entry>({ filterState });
const withSorting = DataGridFeatures.useSorting<Entry>({ sortState });

const features = [withFiltering, withSorting];

/**
 * Simulate asynchronous data update from a backend.
 * This function simulates a delay when fetching data and applying filters and sorting.
 * It also shows a skeleton while the data is being fetched.
 *
 * Note: This is a simplified example, and real-world applications need to consider error handling and pagination.
 */
const simulateAsyncUpdate = () => {
  skeleton.value = true;

  setTimeout(() => {
    const copy = EXAMPLE_DATA.slice();

    // Filtering
    const filtered = copy.filter((e) =>
      Object.entries(filterState.value).every(([key, value]) =>
        normalizedIncludes(e[key as keyof Entry].toString(), value),
      ),
    );

    // Sorting
    const sortColumn = sortState.value.column;
    if (!sortColumn) {
      data.value = filtered;
      return;
    }
    const collator = new Intl.Collator();
    const sorted = filtered.sort((a, b) =>
      sortState.value.direction === "asc"
        ? collator.compare(a[sortColumn].toString(), b[sortColumn].toString())
        : collator.compare(b[sortColumn].toString(), a[sortColumn].toString()),
    );

    // Update data
    data.value = sorted;
  }, 1000);
};

watch([filterState, sortState], simulateAsyncUpdate, { deep: true, immediate: true });
watch(data, () => (skeleton.value = false));
</script>

<template>
  <OnyxDataGrid :columns :data :features async :skeleton />
</template>
