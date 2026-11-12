<script lang="ts" setup>
import { OnyxResizeHandle } from "sit-onyx";
import { ref, useTemplateRef } from "vue";

const container = useTemplateRef("container");
const width = ref<number>();
</script>

<template>
  <div ref="container" class="container" :style="{ width: width ? `${width}px` : undefined }">
    <OnyxResizeHandle
      :element="container"
      @update-width="width = $event"
      @auto-size="width = undefined"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-info-100);
  width: 4rem;
  height: 8rem;
  max-width: 100%;
}
</style>
