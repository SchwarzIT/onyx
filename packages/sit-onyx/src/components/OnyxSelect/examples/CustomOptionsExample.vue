<script lang="ts" setup>
import bag from "@sit-onyx/icons/bag.svg?raw";
import { ref } from "vue";
import { OnyxBadge, OnyxIcon, OnyxSelect, OnyxTag, type SelectOption } from "../../../index.js";

const options = [
  { label: "In sale", value: "sale" },
  { label: "Price tag", value: "price-tag" },
  { label: "Shopping bag", value: "shopping-bag" },
] satisfies SelectOption[];

const value = ref<string>();
</script>

<template>
  <OnyxSelect
    v-model="value"
    class="select"
    label="Example select"
    list-label="List label"
    :options="options"
  >
    <template #option="option">
      <div class="select__option">
        <OnyxTag v-if="option.value === 'price-tag'" :label="option.label" />

        <template v-else>
          <OnyxIcon v-if="option.value === 'shopping-bag'" :icon="bag" />
          {{ option.label }}
          <OnyxBadge v-if="option.value === 'sale'" color="danger">Sale!</OnyxBadge>
        </template>
      </div>
    </template>
  </OnyxSelect>
</template>

<style lang="scss" scoped>
.select {
  max-width: 24rem;

  &__option {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
  }
}
</style>
