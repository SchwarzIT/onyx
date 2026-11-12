<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { useRootAttrs } from "../../utils/attrs.js";
import type { OnyxMillerColumnProps } from "./types.js";

const props = withDefaults(defineProps<OnyxMillerColumnProps>(), {
  itemsInView: 4,
  gap: "0rem",
  columnHeight: "20rem",
});

defineSlots<{
  /** main content*/
  default(): unknown;
}>();

const cols = computed(() => props.itemsInView);
const gap = computed(() => props.gap);

const { densityClass } = useDensity(props);
const { rootAttrs } = useRootAttrs();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-miller-column', densityClass]">
    <nav v-bind="rootAttrs" class="onyx-miller-column__nav">
      <slot />
    </nav>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/breakpoints.scss";

.onyx-miller-column {
  @include layers.component() {
    &__nav {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      gap: v-bind(gap);
      height: v-bind(columnHeight);
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      & > * {
        flex: 0 0 100%;
        height: 100%;
        box-sizing: border-box;
        @include breakpoints.screen(min, xs) {
          flex: 0 0 calc((100% - (2 - 1) * v-bind(gap)) / 2);
        }
        @include breakpoints.screen(min, md) {
          flex: 0 0 calc((100% - (v-bind(cols) - 1) * v-bind(gap)) / v-bind(cols));
        }
      }
    }
  }
}
</style>
