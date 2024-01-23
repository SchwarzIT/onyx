<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * Icon color.
     * @default "currentColor"
     */
    color?: string;
  }>(),
  { color: "currentColor" },
);
</script>

<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.9833 8.09473L9.76351 14.3145L7.29526 11.8455L6.23401 12.9067L9.76351 16.4317L17.0438 9.15148L15.9833 8.09473Z"
      :fill="props.color"
    />
  </svg>
</template>
