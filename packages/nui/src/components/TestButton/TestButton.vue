<script lang="ts" setup>
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <button class="button">{{ props.label }}</button>
</template>

<style lang="scss" scoped>
.button {
  padding: 12px 16px;
}
</style>
