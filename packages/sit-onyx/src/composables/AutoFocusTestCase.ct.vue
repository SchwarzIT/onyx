<script lang="ts" setup>
import { useTemplateRef } from "vue";
import { useAutofocus } from "./useAutoFocus.js";

const props = defineProps<{
  autofocus?: boolean;
  hidden?: boolean;
}>();

const input = useTemplateRef("input");
useAutofocus(input, props);
</script>

<template>
  <input ref="input" :style="{ opacity: props.hidden ? '0' : undefined }" class="onyx-component" />
</template>
