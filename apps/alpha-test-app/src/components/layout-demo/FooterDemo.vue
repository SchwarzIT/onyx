<script lang="ts" setup>
defineProps<{
  detailFooter?: boolean;
}>();
</script>

<template>
  <div class="footer"><span v-if="detailFooter">Detail</span> Footer</div>
</template>

<style lang="scss" scoped>
.footer {
  height: 3.125rem;
  border: 1px solid lightgrey;
  background-color: white;
}
</style>
