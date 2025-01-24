<script lang="ts" setup>
import { useLink } from "../../composables/useLink";
import type { OnyxRouterLinkProps } from "./types";

const props = withDefaults(defineProps<OnyxRouterLinkProps>(), {
  target: "_self",
});

defineSlots<{
  default(): unknown;
}>();

const { navigate } = useLink();
</script>

<template>
  <a
    class="onyx-component onyx-router-link"
    :href="props.href"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noreferrer' : undefined"
    @click="navigate($event, props.href, props.target)"
  >
    <slot></slot>
  </a>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-router-link {
  @include layers.component() {
    all: inherit;
    cursor: pointer;
  }
}
</style>
