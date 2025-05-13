<script lang="ts" setup>
import { ref, useTemplateRef } from "vue";
import OnyxResizeHandle from "../OnyxResizeHandle.vue";

const container = useTemplateRef("containerRef");
const width = ref<number>();
</script>

<template>
  <div>
    Drag the right border to see the resize handler in action.

    <div ref="containerRef" class="container" :style="{ width: width ? `${width}px` : undefined }">
      <OnyxResizeHandle
        :element="container"
        @update-width="width = $event"
        @auto-size="width = undefined"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-info-100);
  width: 4rem;
  max-width: 100%;
  height: 8rem;
}
</style>
