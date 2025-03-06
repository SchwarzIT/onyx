<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * The number of grid columns.
     */
    columns?: number;
    /**
     * The visibility of grid lines.
     */
    showGridLines: boolean;
  }>(),
  {
    columns: 16,
  },
);
</script>

<template>
  <div class="overlay">
    <div class="overlay__container onyx-grid-container">
      <div
        class="onyx-grid overlay__grid"
        :class="{ 'overlay__grid--lines-visible': props.showGridLines }"
      >
        <div v-for="i in props.columns" :key="i" class="overlay__column onyx-grid-span-1"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  height: 1.5rem;

  &__container {
    padding-top: 0;
    padding-bottom: 0;
    height: 100%;
    background-color: var(--onyx-color-text-icons-danger-soft);
  }

  &__grid {
    background-color: var(--onyx-color-text-icons-info-soft);
    height: 100%;

    &--lines-visible {
      .overlay__column {
        &::before {
          content: " ";
          position: absolute;
          height: 10000px;
          z-index: 60;
          border: var(--onyx-1px-in-rem) dashed var(--onyx-color-component-border-danger-hover);
        }

        &::after {
          content: " ";
          position: absolute;
          height: 10000px;
          z-index: 60;
          right: -1px;
          border: var(--onyx-1px-in-rem) dashed var(--onyx-color-component-border-danger-hover);
        }
      }
    }
  }

  &__column {
    background-color: var(--onyx-color-text-icons-warning-soft);
    position: relative;
  }

  &:has(.overlay__grid--lines-visible) {
    .overlay__container {
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-danger-hover);
    }
  }
}
</style>
