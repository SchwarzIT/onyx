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
  border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);
}
</style>
