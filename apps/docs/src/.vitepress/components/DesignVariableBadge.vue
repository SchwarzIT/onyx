<script lang="ts" setup>
const props = defineProps<{
  text: string;
  active?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button type="button" @click="emit('click')">
    <Badge
      class="badge"
      :class="{ 'badge--active': props.active }"
      :text="props.text"
      type="info"
    />
  </button>
</template>

<style lang="scss" scoped>
.badge {
  cursor: pointer;
  font-size: var(--onyx-font-size-md);
  line-height: var(--onyx-font-line-height-md);
  padding: var(--onyx-spacing-4xs) var(--onyx-spacing-md);
  border-radius: var(--onyx-radius-full);

  &--active {
    color: var(--vp-c-brand-2);
    background-color: var(--vp-c-brand-soft);
  }
}
</style>
