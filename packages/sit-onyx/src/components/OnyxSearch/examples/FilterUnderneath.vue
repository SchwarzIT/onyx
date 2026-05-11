<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxSelect, OnyxUnstableSearch } from "../../../index.js";

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
];

const categoryOptions = [
  { value: "documents", label: "Documents" },
  { value: "images", label: "Images" },
  { value: "videos", label: "Videos" },
];
</script>

<template>
  <OnyxUnstableSearch
    v-model:show-filters="showFilters"
    v-model="filters.search"
    with-shortcut
    class="search"
  >
    <OnyxSelect
      v-model="filters.status"
      hide-label
      label="Status"
      :options="statusOptions"
      placeholder="Select status"
      list-label="Status"
    />
    <OnyxSelect
      v-model="filters.category"
      hide-label
      label="Category"
      :options="categoryOptions"
      placeholder="Select category"
      list-label="Category"
    />
    <OnyxButton label="Clear" @click="filters = {}" />
  </OnyxUnstableSearch>
</template>

<style lang="scss" scoped>
:deep(.onyx-search__input) {
  max-width: 24rem;
}
.onyx-select {
  width: 16rem;
}
</style>
