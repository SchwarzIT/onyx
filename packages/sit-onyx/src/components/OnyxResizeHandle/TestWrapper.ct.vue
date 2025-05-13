<script lang="ts" setup>
import { ref, useTemplateRef } from "vue";
import OnyxResizeHandle from "./OnyxResizeHandle.vue";
import type { ResizeHandleAlignment } from "./types";

const props = defineProps<{
  /** Alignment of the resize handle */
  alignment?: ResizeHandleAlignment;
}>();

const container = useTemplateRef("containerRef");
const width = ref<number>();
</script>

<template>
  <div
    ref="containerRef"
    class="onyx-component container"
    :style="{ width: width ? `${width}px` : undefined }"
  >
    <OnyxResizeHandle
      :element="container"
      :alignment="props.alignment"
      @update-width="width = $event"
      @auto-size="width = undefined"
    />
  </div>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss" scoped>
.container {
  position: relative;
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-info-100);
  width: 2rem;
  min-width: 1rem;
  max-width: 8rem;
  height: 8rem;
}
</style>
