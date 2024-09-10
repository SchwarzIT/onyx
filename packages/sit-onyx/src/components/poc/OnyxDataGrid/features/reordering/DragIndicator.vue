<script setup lang="ts">
import { ref } from "vue";
import OnyxIcon from "../../../../OnyxIcon/OnyxIcon.vue";
import draggable from "@sit-onyx/icons/draggable.svg?raw";
import OnyxVisuallyHidden from "../../../../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";

const props = defineProps<{ rowId: string | number; row?: object }>();

const isDragging = ref(false);
const dragElement = ref<HTMLElement>();

const onDragStart = (event: DragEvent) => {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.setData("text/onyx-table-row-id-source", JSON.stringify(props.rowId));
  props.row && event.dataTransfer!.setData("application/json", JSON.stringify(props.row));
  event.dataTransfer!.setDragImage(dragElement.value!, 0, 0);
  event.dataTransfer!.effectAllowed = "move";
  isDragging.value = true;
};

const onDragEnd = () => (isDragging.value = false);
</script>
<template>
  <button
    type="button"
    class="draggable-indicator"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <OnyxIcon :icon="draggable" size="12px" />
    <OnyxVisuallyHidden>
      <div ref="dragElement" class="dragging-indicator">Dragging row...</div>
    </OnyxVisuallyHidden>
  </button>
</template>
<style lang="scss">
.draggable-indicator {
  cursor: grab;
}
.dragging-indicator {
  position: relative;
  width: fit-content;
  background-color: skyblue;
  cursor: grabbing;
}
</style>
