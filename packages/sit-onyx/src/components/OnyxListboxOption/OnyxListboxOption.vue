<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import type { OnyxListboxOptionProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxOptionProps>(), {
  active: false,
  multiple: false,
  color: "primary",
});

const { densityClass } = useDensity(props);

defineSlots<{
  /**
   * Default slot to place the option label / text content.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxListItem
    :class="['onyx-listbox-option', densityClass]"
    :active="props.active"
    :color="props.color"
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
  </OnyxListItem>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/checkbox";
@use "../../styles/mixins/density.scss";

.onyx-listbox-option {
  @include density.compact {
    --onyx-listbox-option-padding: var(--onyx-spacing-4xs) var(--onyx-spacing-sm);
  }

  @include density.default {
    --onyx-listbox-option-padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  }

  @include density.cozy {
    --onyx-listbox-option-padding: var(--onyx-spacing-sm) var(--onyx-spacing-sm);
  }
}

.onyx-listbox-option {
  @include checkbox.variables();

  @include layers.component() {
    &__checkbox {
      @include checkbox.styles();
      // prevent the checkbox to get squished by a long label
      flex-shrink: 0;
    }
  }
}
</style>
