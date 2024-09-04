<script setup lang="ts">
import { ref } from "vue";
import OnyxIcon from "../../../../OnyxIcon/OnyxIcon.vue";
import draggable from "@sit-onyx/icons/draggable.svg?raw";
import OnyxVisuallyHidden from "../../../../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";

const props = defineProps<{ rowId: string | number }>();

const isDragging = ref(false);
const dragElement = ref<HTMLElement>();

const onDragStart = (event: DragEvent) => {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.setData("text/onyx-table-row-id", JSON.stringify(props.rowId));
  event.dataTransfer!.setDragImage(dragElement.value!, 0, 0);
  isDragging.value = true;
};

const onDragEnd = () => (isDragging.value = false);
</script>
<template>
  <button type="button" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd">
    <OnyxIcon :icon="draggable" size="12px" />
    <OnyxVisuallyHidden>
      <div ref="dragElement" class="dragging-indicator">Dragging row...</div>
    </OnyxVisuallyHidden>
  </button>
</template>
<style lang="scss">
.dragging-indicator {
  position: relative;
  width: fit-content;
  background-color: skyblue;
}
</style>
