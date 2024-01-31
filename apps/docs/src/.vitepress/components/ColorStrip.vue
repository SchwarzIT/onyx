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
      class="strip__color"
      v-for="color in props.colors"
      :key="color"
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
    height: 3.5rem;

    .strip__color {
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
    font-size: 0.8125rem;
  }
}
</style>
