<script lang="ts" setup>
import { computed, type AriaAttributes } from "vue";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import type { OnyxFormElementV2Props } from "./types.js";

const props = defineProps<OnyxFormElementV2Props>();

const slots = defineSlots<{
  default(props: { trigger?: AriaAttributes }): unknown;
  popover?(): unknown;
}>();

const label = computed(() => {
  return typeof props.label === "object" ? props.label.label : props.label;
});
</script>

<template>
  <OnyxBasicPopover v-if="slots.popover" class="onyx-form-element-v2__popover" :label fit-parent>
    <template #default="{ trigger }">
      <slot :trigger></slot>
    </template>

    <template #content>
      <slot name="popover"></slot>
    </template>
  </OnyxBasicPopover>

  <slot v-else></slot>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-v2 {
  @include layers.component() {
    &__popover {
      flex-grow: 1;
    }
  }
}
</style>
