<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxModal, OnyxSelect, OnyxUnstableSearch } from "../../../index.js";

const showFilter = ref(false);
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
      v-model:show-filters="showFilter"
      label="Search"
      :model-value="modelValue"
      with-shortcut
      filter-position="modal"
    >
      <template #filters>
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
        <OnyxButton
          label="Clear"
          @click="
            () => {
              globalFilterStatus = null;
              globalFilterCategory = null;
            }
          "
        />
      </template>
    </OnyxUnstableSearch>

    <OnyxModal v-model:open="showFilter" label="Select Filter">
      <div v-show="showFilter" class="filter-wrapper"></div>
    </OnyxModal>
  </div>
</template>

<style lang="scss" scoped>
.onyx-select {
  width: 15rem;
}
</style>
