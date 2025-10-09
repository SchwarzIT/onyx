<script lang="ts" setup>
import { useTemplateRef } from "vue";
import OnyxRipple from "./OnyxRipple.vue";

const ripple = useTemplateRef("rippleRef");
</script>

<template>
  <button class="onyx-component" type="button" v-on="ripple?.events">
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
    // choose hight duration here to not hide the ripples automatically
    // so we can expect the count in the Playwright tests
    animation-duration: 999999s;
  }
}
</style>
