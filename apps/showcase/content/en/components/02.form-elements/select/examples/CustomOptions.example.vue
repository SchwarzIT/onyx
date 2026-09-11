<script lang="ts" setup>
import { OnyxSelect, OnyxTag, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>();

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect v-model="value" label="Example label" list-label="Available options" :options>
    <template #option="option">
      <div class="option">
        <!-- ellipsis class can be removed when using multiline truncation on the OnyxSelect -->
        <span class="onyx-truncation-ellipsis">{{ option.label }}</span>
        <OnyxTag label="Example" />
      </div>
    </template>
  </OnyxSelect>
</template>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--onyx-density-sm);
}
</style>
