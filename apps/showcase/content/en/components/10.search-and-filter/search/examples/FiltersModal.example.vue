<script lang="ts" setup>
import { OnyxButton, OnyxSelect, OnyxUnstableSearch, type SelectOption } from "sit-onyx";
import { ref } from "vue";

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
  showFilters.value = false;
};
</script>

<template>
  <OnyxUnstableSearch
    v-model:show-filters="showFilters"
    v-model="filters.search"
    filter-position="modal"
  >
    <OnyxSelect
      v-model="filters.status"
      :label="{ label: 'Status', hidden: true }"
      :options="statusOptions"
      placeholder="Select status"
      list-label="Available status"
    />
    <OnyxSelect
      v-model="filters.category"
      :label="{ label: 'Category', hidden: true }"
      :options="categoryOptions"
      placeholder="Select category"
      list-label="Available categories"
    />
    <OnyxButton label="Clear" color="neutral" @click="handleClear" />
  </OnyxUnstableSearch>
</template>
