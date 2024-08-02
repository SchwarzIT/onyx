<script lang="ts" setup>
import { computed, ref } from "vue";
import { useResizeObserver } from "../../../composables/useResizeObserver";

const overlayRef = ref<HTMLElement>();

const { width } = useResizeObserver(overlayRef);

const columnCount = computed(() => {
  if (!overlayRef.value) return 0;
  width.value; // call it here so the computed is re-evaluated when the width changes
  return +getComputedStyle(overlayRef.value).getPropertyValue("--onyx-grid-columns");
});

defineExpose({ columnCount });
</script>

<template>
  <div ref="overlayRef" class="overlay onyx-grid-container">
    <div class="onyx-grid overlay__grid">
      <div v-for="i in columnCount" :key="i" class="overlay__column onyx-grid-span-1"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background-color: var(--onyx-color-text-icons-danger-soft);
  padding-top: 0;
  padding-bottom: 0;
  height: 1.5rem;

  &__grid {
    background-color: var(--onyx-color-text-icons-info-soft);
    height: 100%;
  }

  &__column {
    background-color: var(--onyx-color-text-icons-warning-soft);
  }
}
</style>
