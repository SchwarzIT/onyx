<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxSelect, OnyxUnstableSearch } from "../../../index.js";

const showFilter = ref(true);
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
  <OnyxUnstableSearch
    v-model:show-filters="showFilter"
    label="Search"
    :model-value="modelValue"
    with-shortcut
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
</template>

<style lang="scss" scoped>
.onyx-select {
  width: 15rem;
}
</style>
