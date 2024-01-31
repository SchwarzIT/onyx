<script lang="ts" setup>
import OnyxIcon from "../../../../../packages/sit-onyx/src/components/OnyxIcon/OnyxIcon.vue";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  as: "raw",
  eager: true,
});
</script>

<template>
  <div class="icons">
    <OnyxIcon
      v-for="(icon, path) in ALL_ICONS"
      :key="path"
      :icon="icon"
      size="md"
      :title="path.split('/').at(-1)"
    />
  </div>
</template>

<style lang="scss" scoped>
.icons {
  display: grid;
  grid-gap: var(--onyx-spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
}
</style>
