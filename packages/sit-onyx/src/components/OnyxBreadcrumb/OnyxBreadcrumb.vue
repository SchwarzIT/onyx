<script lang="ts" setup>
import home from "@sit-onyx/icons/home.svg?raw";
import { useDensity } from "../../composables/density";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";

import type { BreadcrumbHomeItem, OnyxBreadcrumbProps } from "./types";
const props = defineProps<OnyxBreadcrumbProps & BreadcrumbHomeItem>();

const slots = defineSlots<{
  default(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-component', 'onyx-breadcrumb', densityClass]">
    <!-- component HTML -->
    <div class="onyx-breadcrumb">
      <OnyxRouterLink v-if="!props.home" class="crumb" :href="props.link">
        <div class="label homeIcon">
          <OnyxIcon :icon="home" size="16px" />
        </div>
      </OnyxRouterLink>
      <OnyxBreadcrumbItem
        v-if="props.home"
        :label="props.home?.label ?? 'Home'"
        :link="props.home?.link ?? '/'"
        :first="false"
        :last="true"
      />
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-breadcrumb {
  @include layers.component() {
    .onyx-breadcrumb {
      display: flex;
      gap: 3px;
    }
  }
}
</style>
