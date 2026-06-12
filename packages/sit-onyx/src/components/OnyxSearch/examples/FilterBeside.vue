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
</script>

<template>
  <OnyxUnstableSearch
    v-model:show-filters="showFilters"
    v-model="filters.search"
    with-shortcut
    filter-position="inline"
  >
    <OnyxSelect
      v-model="filters.status"
      class="select"
      hide-label
      label="Status"
      :options="statusOptions"
      placeholder="Select status"
      list-label="Available status"
    />
    <OnyxSelect
      v-model="filters.category"
      class="select"
      hide-label
      label="Category"
      :options="categoryOptions"
      placeholder="Select category"
      list-label="Available categories"
    />
    <OnyxButton label="Clear" @click="filters = {}" />
  </OnyxUnstableSearch>
</template>

<style lang="scss" scoped>
.select {
  width: 16rem;
}
</style>
