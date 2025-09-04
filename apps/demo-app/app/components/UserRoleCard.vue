<script lang="ts" setup>
import type { OnyxCheckboxProps } from "sit-onyx";

const props = defineProps<OnyxCheckboxProps>();
const isChecked = defineModel<boolean>({ default: false });
</script>

<template>
  <OnyxCard class="card">
    <div class="card__header"><BoxIcon /></div>

    <div class="card__content">
      <OnyxCheckbox v-bind="props" v-model="isChecked" />
      <OnyxInfoTooltip text="Example text" trigger="hover" />
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  padding: 0;

  &__header {
    background-color: var(--onyx-color-base-background-tinted);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--onyx-card-padding);
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: var(--onyx-spacing-3xl);
  }

  &__content {
    padding: 0 var(--onyx-card-padding) var(--onyx-card-padding) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &:has(.onyx-checkbox__input:checked) {
    border-color: var(--onyx-color-base-primary-500);

    .card__header {
      background-color: var(--onyx-color-base-primary-200);
    }
  }
}
</style>
