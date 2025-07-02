<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import type { OnyxSelectOptionProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSelectOptionProps>(), {
  active: false,
  multiple: false,
  truncation: "ellipsis",
});

defineSlots<{
  /**
   * Default slot to place the option label / text content.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxListItem
    class="onyx-component onyx-select-option"
    v-bind="props"
    :checked="!!$attrs['aria-checked']"
    :selected="!!$attrs['aria-selected']"
    :disabled="!!$attrs['aria-disabled']"
  >
    <input
      v-if="props.multiple"
      :checked="!!$attrs['aria-checked']"
      :aria-labelledby="$attrs.id as string"
      :disabled="!!$attrs['aria-disabled']"
      :indeterminate="props.indeterminate"
      aria-hidden="true"
      tabindex="-1"
      class="onyx-select-option__checkbox"
      type="checkbox"
    />

    <OnyxIcon v-if="props.icon" :icon="props.icon" />

    <span :class="[`onyx-truncation-${props.truncation}`]">
      <slot></slot>
    </span>
  </OnyxListItem>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/checkbox";

.onyx-select-option {
  @include checkbox.variables();

  @include layers.component() {
    &__checkbox {
      // prevent the checkbox to get squished by a long label
      flex-shrink: 0;

      @include checkbox.styles();
    }
  }
}
</style>
