<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxSelect, OnyxUnstableSearch, type SelectOption } from "../../../index.js";

type FilterState = Partial<{
  search: string;
  status: string;
  category: string;
}>;

const filters = ref<FilterState>({});
const showFilter = ref(false);

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
    v-model:show-filters="showFilter"
    label="Search"
    :model-value="filters.search"
    with-shortcut
    filter-position="inline"
  >
    <template #filters>
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
      <OnyxButton
        label="Clear"
        @click="
          () => {
            filters.status = undefined;
            filters.category = undefined;
          }
        "
      />
    </template>
  </OnyxUnstableSearch>
</template>

<style lang="scss" scoped>
.onyx-select {
  width: 15rem;
}
</style>
