<script lang="ts" setup>
import { ref } from "vue";
import { OnyxMenuItem, OnyxModal, OnyxSelect, OnyxUnstableSearch } from "../../../index.js";

const showFilter = ref(false);
const showPersonalFilter = ref(false);
const modelValue = ref();

const globalFilterStatus = ref();
const globalFilterCategory = ref();

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
      v-model:show-filter="showFilter"
      v-model:show-personal-filter="showPersonalFilter"
      label="Search"
      :model-value="modelValue"
      with-shortcut
    >
    </OnyxUnstableSearch>

    <div v-show="showFilter" class="filter-wrapper">
      <OnyxSelect
        v-model="globalFilterStatus"
        hide-label
        label="Status"
        :options="statusOptions"
        placeholder="Select status"
        list-label="Status"
      />
      <OnyxSelect
        v-model="globalFilterCategory"
        hide-label
        label="Category"
        :options="categoryOptions"
        placeholder="Select category"
        list-label="Category"
      />
    </div>

    <OnyxModal v-model:open="showPersonalFilter" label="Select Personal Filter">
      <OnyxMenuItem
        @click="
          () => {
            globalFilterStatus = 'pending';
            globalFilterCategory = 'documents';
            showPersonalFilter = false;
          }
        "
      >
        Personal Filter 1
      </OnyxMenuItem>
      <OnyxMenuItem
        @click="
          () => {
            globalFilterStatus = 'active';
            globalFilterCategory = 'images';
            showPersonalFilter = false;
          }
        "
      >
        Personal Filter 2
      </OnyxMenuItem>
    </OnyxModal>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  gap: var(--onyx-density-sm);
  width: 100vw;
  .onyx-search {
    width: 25rem;
  }
}
.filter-wrapper {
  display: flex;
  gap: var(--onyx-density-sm);
  .onyx-select {
    width: 10rem;
  }
}
</style>
