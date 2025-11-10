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
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import ButtonOrLinkLayout from "../OnyxButton/ButtonOrLinkLayout.vue";
import { GLOBAL_SEARCH_INJECTION_KEY } from "../OnyxGlobalSearch/types.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxGlobalSearchOptionProps } from "./types.js";

const props = withDefaults(defineProps<OnyxGlobalSearchOptionProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const slots = defineSlots<{
  /**
   * Optional slot to override the option content. By default the `label` and `icon` property will be displayed.
   */
  default?(): unknown;
  /**
   * Optional slot to insert custom content on the right side / end of the option.
   */
  trailing?(): unknown;
}>();

const { densityClass } = useDensity(props);

const context = inject(GLOBAL_SEARCH_INJECTION_KEY, undefined);
const skeleton = useSkeletonContext(props);
</script>

<template>
  <li
    v-if="skeleton"
    role="none"
    :class="['onyx-component', 'onyx-global-search-option-skeleton', 'onyx-text', densityClass]"
  >
    <div class="onyx-global-search-option__content">
      <OnyxSkeleton class="onyx-global-search-option-skeleton__icon" />
      <OnyxSkeleton class="onyx-global-search-option-skeleton__label" />
    </div>
  </li>

  <li
    v-else
    :class="['onyx-component', 'onyx-global-search-option', 'onyx-text', densityClass]"
    role="none"
  >
    <ButtonOrLinkLayout
      class="onyx-global-search-option__content onyx-truncation-ellipsis"
      :link="props.link"
      :autofocus="props.autofocus"
      tabindex="-1"
      v-bind="
        context?.headless.elements.option.value({
          label: props.label,
          value: props.value,
          selected: context.activeValue.value === props.value,
        })
      "
    >
      <slot>
        <OnyxIcon
          v-if="props.icon"
          class="onyx-global-search-option__icon"
          :icon="props.icon"
          size="16px"
        />
        <span class="onyx-truncation-ellipsis">{{ props.label }}</span>
      </slot>
    </ButtonOrLinkLayout>

    <div v-if="slots.trailing" class="onyx-global-search-option__trailing">
      <slot name="trailing"></slot>
    </div>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-global-search-option,
.onyx-global-search-option-skeleton {
  @include layers.component() {
    --onyx-global-search-option-padding: var(--onyx-density-2xs);
  }
}

.onyx-global-search-option-skeleton {
  @include layers.component() {
    padding: var(--onyx-global-search-option-padding);
    list-style: none;

    &__icon {
      width: 1lh;
      height: 1lh;
      flex-shrink: 0;
      border-radius: var(--onyx-radius-full);
    }

    &__label {
      height: 1lh;
      flex-grow: 1;
    }
  }
}

.onyx-global-search-option {
  @include layers.component() {
    list-style: none;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    border-radius: var(--onyx-radius-sm);
    padding: var(--onyx-global-search-option-padding);
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
