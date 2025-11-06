<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup>
import { inject } from "vue";
import { useDensity } from "../../composables/density.js";
import ButtonOrLinkLayout from "../OnyxButton/ButtonOrLinkLayout.vue";
import { GLOBAL_SEARCH_INJECTION_KEY } from "../OnyxGlobalSearch/types.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxGlobalSearchOptionProps } from "./types.js";

const props = defineProps<OnyxGlobalSearchOptionProps>();

const slots = defineSlots<{
  /**
   * Optional slot to insert custom content on the right side / end of the option.
   */
  trailing?(): unknown;
}>();

const { densityClass } = useDensity(props);

const context = inject(GLOBAL_SEARCH_INJECTION_KEY);
</script>

<template>
  <li
    :class="['onyx-component', 'onyx-global-search-option', 'onyx-text', densityClass]"
    role="none"
  >
    <ButtonOrLinkLayout
      class="onyx-global-search-option__content"
      :link="props.link"
      :autofocus="props.autofocus"
      tabindex="-1"
      v-bind="
        context?.headless.elements.option.value({
          label: props.label,
          value: props.value,
          selected: context.activeOption.value === props.value,
        })
      "
    >
      <OnyxIcon
        v-if="props.icon"
        class="onyx-global-search-option__icon"
        :icon="props.icon"
        size="16px"
      />
      {{ props.label }}
    </ButtonOrLinkLayout>

    <div v-if="slots.trailing" class="onyx-global-search-option__trailing">
      <slot name="trailing"></slot>
    </div>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-global-search-option {
  @include layers.component() {
    list-style: none;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    border-radius: var(--onyx-radius-sm);
    padding: var(--onyx-density-2xs);
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-density-sm);

    &:hover,
    &:has(&__content[aria-selected="true"]) {
      background-color: var(--onyx-color-base-neutral-200);
    }

    &__content {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);
      background-color: transparent;
      border: none;
      border-radius: inherit;
      font: inherit;
      color: inherit;
      flex-grow: 1;
      cursor: inherit;
      outline: none;
      padding: 0;
    }

    &__icon {
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__trailing {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-2xs);
    }
  }
}
</style>
