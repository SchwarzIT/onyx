<script lang="ts" setup>
import { ref } from "vue";
import OnyxSelect from "../../OnyxSelect/OnyxSelect.vue";
import OnyxSearch from "../OnyxSearch.vue";

const showFilter = ref(false);
const showPersonalFilter = ref(false);
const modelValue = ref();

const globalFilterStatus = ref();
const globalFilterCategory = ref();
const personalFilterAuthor = ref();
const personalFilterVisibility = ref();

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

const authorOptions = [
  { value: "me", label: "Created by me" },
  { value: "team", label: "Created by my team" },
];

const visibilityOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Visible only to me" },
];
</script>

<template>
  <div class="search-wrapper">
    <OnyxSearch
      v-model:show-filter="showFilter"
      v-model:show-personal-filter="showPersonalFilter"
      label="Search..."
      :model-value="modelValue"
    />

    <div v-show="showFilter" class="filter-wrapper">
      <OnyxSelect
        v-model="globalFilterStatus"
        hide-label
        label="Status"
        :options="statusOptions"
        placeholder="Select status"
      />
      <OnyxSelect
        v-model="globalFilterCategory"
        hide-label
        label="Category"
        :options="categoryOptions"
        placeholder="Select category"
      />
    </div>

    <div v-show="showPersonalFilter" class="filter-wrapper">
      <OnyxSelect
        v-model="personalFilterAuthor"
        hide-label
        label="Author"
        :options="authorOptions"
        placeholder="Select author"
      />
      <OnyxSelect
        v-model="personalFilterVisibility"
        hide-label
        label="Visibility"
        :options="visibilityOptions"
        placeholder="Select visibility"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  gap: var(--onyx-density-sm);
  width: 100vw;
}
.filter-wrapper {
  display: flex;
  gap: var(--onyx-density-sm);
  .onyx-select {
    width: 10rem;
  }
}
</style>
