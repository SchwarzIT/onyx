import { computed, h, ref, type FunctionalComponent } from "vue";
import OnyxPagination from "../../../../OnyxPagination/OnyxPagination.vue";
import type { TableFeature } from "../../OnyxDataGrid.feature";
import type { TableEntry } from "../../OnyxDataGridRenderer";

const PAGINATION_FEATURE = Symbol("Pagination");

export const withPaginationFeature = <TEntry extends TableEntry>(): TableFeature<
  TEntry,
  never,
  typeof PAGINATION_FEATURE,
  { hidden: boolean }
> => {
  const pageSize = ref(20);
  const currentPage = ref(0);
  const offset = computed(() => ({
    first: pageSize.value * currentPage.value,
    last: pageSize.value * (currentPage.value + 1),
  }));
  const entriesCount = ref<number>(0);
  const pages = computed(() =>
    entriesCount.value ? Math.ceil(entriesCount.value / pageSize.value) : 0,
  );

  return {
    name: PAGINATION_FEATURE,
    state: [currentPage, pageSize, entriesCount],
    mutation: {
      order: 99,
      func: (state) => {
        entriesCount.value = state.length;
        console.log("🚀 ~ entriesCount.value:", entriesCount.value);
        const paged = state.slice(offset.value.first, offset.value.last);
        console.log("🚀 ~ offset:", offset.value);
        console.log("🚀 ~ paged:", paged);
        return paged;
      },
    },
    after: (() =>
      h(OnyxPagination, {
        modelValue: computed(() => currentPage.value + 1).value,
        pages: pages.value,
        "onUpdate:modelValue": (newVal) => (currentPage.value = newVal),
      })) satisfies FunctionalComponent,
  };
};
