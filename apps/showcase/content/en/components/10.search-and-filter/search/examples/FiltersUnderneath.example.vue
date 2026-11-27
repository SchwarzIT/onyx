<script lang="ts" setup>
import { OnyxButton, OnyxSelect, OnyxSearch, type SelectOption } from "sit-onyx";
import { ref } from "vue";

type FilterState = Partial<{
  search: string;
  status: string;
  category: string;
}>;

const filters = ref<FilterState>({});
const showFilters = ref(true);

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
  <OnyxSearch v-model:show-filters="showFilters" v-model="filters.search" class="search">
    <OnyxSelect
      v-model="filters.status"
      class="select"
      :label="{ label: 'Status', hidden: true }"
      :options="statusOptions"
      placeholder="Select status"
      list-label="Available status"
    />
    <OnyxSelect
      v-model="filters.category"
      class="select"
      :label="{ label: 'Category', hidden: true }"
      :options="categoryOptions"
      placeholder="Select category"
      list-label="Available categories"
    />
    <OnyxButton label="Clear" @click="filters = {}" />
  </OnyxSearch>
</template>

<style scoped>
.search {
  --onyx-search-input-width: 20rem;
}
.select {
  width: 16rem;
}
</style>
