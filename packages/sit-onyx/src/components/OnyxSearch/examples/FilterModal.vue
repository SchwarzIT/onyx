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
  <div class="search-wrapper">
    <OnyxUnstableSearch
      v-model:show-filters="showFilters"
      v-model="filters.search"
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
      <OnyxButton label="Clear" @click="filters = {}" />
    </OnyxUnstableSearch>
  </div>
</template>

<style lang="scss" scoped>
.onyx-search {
  max-width: 24rem;
}
.select {
  width: 16rem;
}
</style>
