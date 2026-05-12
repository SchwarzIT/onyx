<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxSelect, OnyxUnstableSearch, type SelectOption } from "../../../index.js";

type FilterState = Partial<{
  search: string;
  status: string;
  category: string;
}>;

const filters = ref<FilterState>({});
const showFilters = ref(false);

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived" },
] satisfies SelectOption[];

const categoryOptions = [
  { value: "documents", label: "Documents" },
  { value: "images", label: "Images" },
  { value: "videos", label: "Videos" },
] satisfies SelectOption[];

const handleClear = () => {
  filters.value = {};
  // optionally hide modal after clear
  // showFilters.value = false;
};
</script>

<template>
  <OnyxUnstableSearch
    v-model:show-filters="showFilters"
    v-model="filters.search"
    class="search"
    with-shortcut
    filter-position="modal"
  >
    <OnyxSelect
      v-model="filters.status"
      hide-label
      label="Status"
      :options="statusOptions"
      placeholder="Select status"
      list-label="Available status"
    />
    <OnyxSelect
      v-model="filters.category"
      hide-label
      label="Category"
      :options="categoryOptions"
      placeholder="Select category"
      list-label="Available categories"
    />
    <OnyxButton label="Clear" @click="handleClear" />
  </OnyxUnstableSearch>
</template>

<style lang="scss" scoped>
.search {
  --onyx-search-input-width: 20rem;
}
</style>
