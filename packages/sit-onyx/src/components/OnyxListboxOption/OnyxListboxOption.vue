<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxListboxOptionProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxOptionProps>(), {
  active: false,
  multiple: false,
  color: "primary",
});

defineSlots<{
  /**
   * Default slot to place the option label / text content.
   */
  default(): unknown;
}>();
</script>

<template>
  <li
    class="onyx-listbox-option"
    :class="{
      'onyx-listbox-option--active': props.active,
      'onyx-listbox-option--danger': props.color === 'danger',
    }"
  >
    <input
      v-if="props.multiple"
      :checked="!!$attrs['aria-checked']"
      :aria-labelledby="$attrs.id as string"
      :disabled="!!$attrs['aria-disabled']"
      :indeterminate="props.indeterminate"
      aria-hidden="true"
      tabindex="-1"
      class="onyx-listbox-option__checkbox"
      type="checkbox"
    />

    <OnyxIcon v-if="props.icon" :icon="props.icon" />

    <span class="onyx-truncation-ellipsis">
      <slot></slot>
    </span>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/checkbox";
@use "../../styles/mixins/listitem";

.onyx-listbox-option {
  @include checkbox.variables();

  @include layers.component() {
    @include listitem.styles(&);

    &__checkbox {
      @include checkbox.styles();
      // prevent the checkbox to get squished by a long label
      flex-shrink: 0;
    }
  }
}
</style>
