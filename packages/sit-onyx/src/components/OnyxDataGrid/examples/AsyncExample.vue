<script setup lang="ts">
import { ref, watch } from "vue";
import { DataGridFeatures, normalizedIncludes, OnyxDataGrid, type ColumnConfig } from "../../..";

/**
 * ====================
 * Basic datagrid setup
 * ====================
 */

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

/**
 * ====================
 * Async feature setup
 * ====================
 */

// Initialize datagrid states, which we want to observe to query an API with
const filterState = ref<DataGridFeatures.FilterState<Entry>>({});
const withFiltering = DataGridFeatures.useFiltering<Entry>({ filterState });

const sortState = ref<DataGridFeatures.SortState<Entry>>({ column: undefined, direction: "none" });
const withSorting = DataGridFeatures.useSorting<Entry>({
  sortState,
  columns: { birthday: { enabled: false } },
});

const features = [withFiltering, withSorting];

// While an async operation is performed, we show the skeleton mode of the data grid
const skeleton = ref(false);

watch([filterState, sortState], simulateAsyncUpdate, { deep: true, immediate: true }); // initially and in case the sorting or filtering changes we simulate an API request
watch(data, () => (skeleton.value = false)); // whenever the data changes, we turn the skeleton off again

/**
 * Simulate asynchronous data update from a backend.
 * This function simulates a delay when fetching data and applying filters and sorting.
 * It also shows a skeleton while the data is being "fetched".
 *
 * Note: You can ignore this function for the purpose if this example.
 * As this is a simplified example, requirements of real-world applications like error handling and pagination are not considered.
 */
function simulateAsyncUpdate() {
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
}
</script>

<template>
  <!-- Async is set to true, so that the features data transformation is disabled -->
  <OnyxDataGrid async :columns :data :features :skeleton />
</template>
