<script lang="ts" setup>
import { ref, type ComponentInstance } from "vue";
import OnyxRipple from "./OnyxRipple.vue";

const rippleRef = ref<ComponentInstance<typeof OnyxRipple>>();
</script>

<template>
  <button type="button" v-on="rippleRef?.events">
    Test button
    <OnyxRipple ref="rippleRef" />
  </button>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss" scoped>
button {
  position: relative;
  height: 16rem;
  width: 16rem;

  :deep(.onyx-ripple__element) {
    animation-duration: 5s;
  }
}
</style>
