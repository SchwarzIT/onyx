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
      d="M15 6V1.5H3V18H9V22.5H21V6H15ZM4.5 16.5V3H13.5V6H9V16.5H4.5ZM19.5 21H10.5V7.5H19.5V21Z"
      :fill="props.color"
    />
  </svg>
</template>
