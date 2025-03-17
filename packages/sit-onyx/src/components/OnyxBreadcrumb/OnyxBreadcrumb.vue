<script lang="ts" setup>
import homeIcon from "@sit-onyx/icons/home.svg?raw";
import { useDensity } from "../../composables/density";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxBreadcrumbProps } from "./types";

const props = withDefaults(defineProps<OnyxBreadcrumbProps>(), {
  container: false,
  home: () => ({ link: "/" }),
});

defineSlots<{
  /**
   * Breadcrumb items (see `OnyxBreadcrumbItem` component).
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-component', 'onyx-breadcrumb', densityClass]">
    <OnyxRouterLink v-if="!props.home?.label" class="crumb" :href="props.home.link">
      <OnyxIcon :icon="homeIcon" size="16px" />
    </OnyxRouterLink>

    <OnyxBreadcrumbItem
      v-else
      :label="props.home.label"
      :link="props.home.link"
      :first="false"
      last
    />

    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-breadcrumb {
  @include layers.component() {
    display: flex;
    gap: 3px;
  }
}
</style>
