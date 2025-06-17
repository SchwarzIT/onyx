<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    colors: string[];
    name?: string;
    orientation?: "vertical" | "horizontal";
  }>(),
  {
    orientation: "vertical",
  },
);
</script>

<template>
  <figure class="strip" :class="{ 'strip--horizontal': props.orientation === 'horizontal' }">
    <div
      v-for="color in props.colors"
      :key="color"
      class="strip__color"
      :style="{ backgroundColor: color }"
    ></div>
    <figcaption v-if="props.name" class="strip__name">{{ props.name }}</figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.strip {
  height: 19.5rem; // 18rem for the colors, 1.5rem line height for the name
  display: flex;
  flex-direction: column;

  &--horizontal {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    height: max-content;

    .strip__name {
      // make name full width
      grid-column: span 9;
    }

    .strip__color {
      height: 3.5rem;

      &:first-child {
        border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
      }

      &:last-child {
        border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      }
    }
  }

  &__color {
    width: 100%;
    height: 100%;

    &:first-child {
      border-radius: var(--onyx-radius-sm) var(--onyx-radius-sm) 0 0;
    }

    &:last-child {
      border-radius: 0 0 var(--onyx-radius-sm) var(--onyx-radius-sm);
    }
  }

  &__name {
    font-family: var(--onyx-font-family-mono);
    font-size: var(--onyx-font-size-sm);
  }
}
</style>
