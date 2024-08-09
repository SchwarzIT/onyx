<script lang="ts" setup>
const props = withDefaults(defineProps<{ columns?: number }>(), {
  columns: 16,
});
</script>

<template>
  <div class="overlay">
    <div class="overlay__container onyx-grid-container">
      <div class="onyx-grid overlay__grid">
        <div v-for="i in props.columns" :key="i" class="overlay__column onyx-grid-span-1"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background-color: var(--onyx-color-text-icons-danger-soft);
  height: 1.5rem;

  &__container {
    padding-top: 0;
    padding-bottom: 0;
    height: 100%;
  }

  &__grid {
    background-color: var(--onyx-color-text-icons-info-soft);
    height: 100%;
  }

  &__column {
    background-color: var(--onyx-color-text-icons-warning-soft);
  }
}
</style>
