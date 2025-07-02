<script setup lang="ts">
import { onMounted } from "vue";
import { requestAnimationSync } from "../../composables/animation.js";

onMounted(() => requestAnimationSync("onyx-skeleton"));
</script>

<template>
  <figure aria-hidden="true" class="onyx-component onyx-skeleton"></figure>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-skeleton {
  @include layers.component() {
    border-radius: var(--onyx-radius-sm);

    // inherit size by default if not set explicitly
    height: 100%;
    width: 100%;

    background: linear-gradient(
      to right,
      var(--onyx-color-base-neutral-200) 20%,
      var(--onyx-color-base-neutral-300) 40%,
      var(--onyx-color-base-neutral-200) 60%
    );
    background-size: 500% 100%;
    animation: onyx-skeleton var(--onyx-duration-lg) ease infinite;

    @keyframes onyx-skeleton {
      0% {
        background-position: 100% 50%;
      }
      75% {
        background-position: 0 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  }
}
</style>
