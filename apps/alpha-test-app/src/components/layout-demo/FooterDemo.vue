<script lang="ts" setup>
defineProps<{
  detailFooter?: boolean;
}>();
</script>

<template>
  <div class="demo footer bottom-bar" :class="{ 'footer--detail': detailFooter }">
    <span v-if="detailFooter">Detail</span> Footer
  </div>
</template>

<style lang="scss" scoped></style>
