<script lang="ts" setup>
import type { DetailsItem } from "../DetailsList.vue";

const props = defineProps<{
  items?: DetailsItem[];
}>();

defineSlots<{
  /**
   * Preview content of the given typography.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="card onyx-grid-span-4">
    <div class="card__preview">
      <slot></slot>
    </div>

    <DetailsList v-if="props.items?.length" class="card__content" :items="props.items" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: 0;
  padding: 0;

  &__preview {
    padding: var(--onyx-card-padding);
    background-color: var(--onyx-color-base-background-tinted);
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    min-height: var(--onyx-font-line-height-xl);
    box-sizing: content-box;

    > * {
      margin-block: 0;
    }
  }

  &__content {
    padding: var(--onyx-card-padding);
  }
}
</style>
