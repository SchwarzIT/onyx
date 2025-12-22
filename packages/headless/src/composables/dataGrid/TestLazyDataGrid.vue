<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { createDataGrid } from "./createDataGrid.js";

const A_CHAR_CODE = "a".charCodeAt(0);

const cols = Array.from({ length: 20 }, (_, x) => String.fromCharCode(A_CHAR_CODE + x));
const completeData = Array.from({ length: 20 }, (_, y) => cols.map((c, x) => y * 20 + x));

const loaded = ref({ x: 10, y: 10 });

const loadedData = computed(() =>
  completeData.slice(0, loaded.value.y).map((row) => row.slice(0, loaded.value.x)),
);

const {
  state: { busy },
  elements: { table, td, tr, label },
} = createDataGrid<true>({
  lazy: ref({
    totalRows: 20,
    totalCols: 20,
    requestLazyLoad: async (x, y) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await nextTick();
      loaded.value = {
        x: x + 10,
        y: y + 10,
      };
    },
  }),
});
</script>

<template>
  <table v-bind="table">
    <tr v-for="(row, i) in loadedData" :key="i" v-bind="tr({ rowId: i, rowIndex: i })">
      <td
        v-for="(col, j) in row"
        :key="j"
        v-bind="
          td({
            rowId: i.toString(),
            colKey: j.toString(),
            colIndex: j,
          })
        "
      >
        {{ col }}
      </td>
    </tr>
    <tr v-if="busy" role="none">
      <td colspan="10" role="none">is loading data...</td>
    </tr>
    <caption v-bind="label">
      Table with Data
    </caption>
  </table>
</template>
