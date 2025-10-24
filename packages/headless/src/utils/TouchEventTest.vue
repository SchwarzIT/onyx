<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { isTouchEvent } from "./dom.js";

const buttonRef = useTemplateRef<HTMLButtonElement>("buttonRef");
const lastEventType = ref<string>("none");
const isTouchEventResult = ref<boolean>(false);

const handleEvent = (event: Event) => {
  // if it's a touch, prevent mouse/click
  if (event.type.startsWith("touch")) {
    event.preventDefault();
  }

  lastEventType.value = event.type;
  isTouchEventResult.value = isTouchEvent(event);
};
</script>

<template>
  <div>
    <button
      ref="buttonRef"
      type="button"
      tabindex="0"
      @click="handleEvent"
      @touchstart="handleEvent"
      @touchend="handleEvent"
      @pointerdown="handleEvent"
      @pointerup="handleEvent"
    >
      Last event: {{ lastEventType }}, Is touch: {{ isTouchEventResult }}
    </button>
  </div>
</template>
