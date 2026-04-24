<script lang="ts" setup>
const props = defineProps<{
  align?: "left" | "center";
}>();
</script>

<template>
  <ul :class="['list', { 'list--center': props.align === 'center' }]">
    <li v-for="i in 5" :key="i" class="list__item">List item</li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: var(--onyx-density-xs) 0;
  border-radius: var(--onyx-radius-md);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-info-500);
  max-width: 100%;

  &--center {
    text-align: center;
  }

  &__item {
    padding: var(--onyx-density-xs) var(--onyx-density-md);

    &:first-of-type {
      background-color: var(--onyx-color-base-info-200);
      color: var(--onyx-color-text-icons-info-bold);
    }
  }
}
</style>
