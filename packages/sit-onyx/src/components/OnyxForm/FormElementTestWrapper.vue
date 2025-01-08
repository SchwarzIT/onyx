<script setup lang="ts">
import { useTemplateRef, type Component } from "vue";

const props = defineProps<{
  /**
   * Name of the component
   */
  name: string;
  /**
   * Which component to wrap
   */
  is: Component;
}>();

const formElement = useTemplateRef<{ input: { focus: () => void } }>("fromElement");
</script>

<template>
  <!-- eslint-disable-next-line sitOnyx/require-root-class -->
  <button type="button" @click="formElement?.input.focus()">
    form-element-test-wrapper-focus-button-{{ props.name }}
  </button>
  <component
    :is="props.is"
    ref="formElement"
    :label="`form-element-test-wrapper-label-${props.name}`"
    :options="[]"
  />
</template>
