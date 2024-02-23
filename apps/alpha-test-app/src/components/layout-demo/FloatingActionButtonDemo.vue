<script lang="ts" setup>
defineProps<{
  isOpen?: boolean;
}>();
</script>

<template>
  <div>
    Floating Action Button
    <span v-if="isOpen">open icon</span>
    <span v-if="isOpen">closed icon</span>
  </div>
</template>

<style lang="scss" scoped></style>
