<script lang="ts" setup>
import searchIcon from "@sit-onyx/icons/search.svg?raw";
import { computed } from "vue";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value as string),
});
</script>

<template>
  <label aria-label="Search" class="search">
    <input class="search__input" placeholder="Search" type="search" v-model="value" size="31" />
    <OnyxIcon :icon="searchIcon" />
  </label>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  width: 18.5rem;
  padding: var(--onyx-spacing-3xs);
  justify-content: space-between;
  border-radius: var(--onyx-radius-md);
  border: 1px solid var(--onyx-color-base-neutral-300);
  background: var(--onyx-color-base-background-blank);

  &__input {
    color: var(--onyx-color-text-icons-neutral-intense);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  }
}
</style>
