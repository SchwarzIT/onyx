<script lang="ts" setup>
import { iconChevronRightSmall } from "@sit-onyx/icons";
import { useDensity } from "../../../../composables/density.js";
import { useRootAttrs } from "../../../../utils/attrs.js";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import type { OnyxMillerItemProps } from "./types.js";

const props = withDefaults(defineProps<OnyxMillerItemProps>(), {
  active: false,
  arrow: false,
  dot: false,
  dotColor: "var(--onyx-color-base-quantitatives-200)",
  count: undefined,
});

defineSlots<{
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);
const { rootAttrs } = useRootAttrs();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <li
    :class="[
      'onyx-component',
      'onyx-miller-item',
      { 'onyx-miller-item--active': props.active },
      densityClass,
    ]"
  >
    <button
      v-bind="rootAttrs"
      type="button"
      :aria-expanded="props.arrow ? (props.active ? 'true' : 'false') : undefined"
      class="onyx-miller-item__button"
    >
      <slot>
        {{ props.label }}
      </slot>
      <span v-if="props.count" class="onyx-miller-item__count">({{ props.count }})</span>
      <span v-if="props.dot" class="onyx-miller-item__dot" />
      <OnyxIcon
        v-if="props.arrow"
        class="onyx-miller-item__arrow"
        :icon="iconChevronRightSmall"
        size="24px"
        color="neutral"
      />
    </button>
  </li>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-miller-item {
  @include layers.component() {
    list-style: none;
    color: var(--onyx-color-text-icons-neutral-intense);
    border: 0.0625rem solid transparent;
    border-radius: var(--onyx-radius-md);
    &:hover {
      background-color: var(--onyx-color-base-primary-100);
    }
    &__button {
      font-family: var(--onyx-font-family-paragraph), var(--onyx-font-family-mono), sans-serif;
      font-weight: var(--onyx-font-weight-regular);
      font-style: normal;
      font-size: var(--onyx-font-size-md);
      line-height: var(--onyx-font-line-height-md);
      background: transparent;
      border: none;
      color: inherit;
      padding: var(--onyx-density-xs);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
    }
    &__count {
      font-weight: normal;
      color: var(--onyx-color-text-icons-neutral-medium);
    }
    &__dot {
      background-color: v-bind(dotColor);
      width: 0.5rem;
      height: 0.5rem;
      border: 0.0625rem solid transparent;
      border-radius: var(--onyx-radius-full);
      margin-right: 0.5rem;
    }
    &__dot,
    &__arrow {
      align-self: center;
      flex-shrink: 0;
      margin-left: auto;
    }
    &__dot + &__arrow {
      margin-left: 0;
    }
    &--active {
      font-family: var(--onyx-font-family-design-h3), var(--onyx-font-family-mono), sans-serif;
      font-weight: var(--onyx-font-weight-semibold);
      font-size: var(--onyx-font-size-md);
      line-height: var(--onyx-font-line-height-md);
      color: var(--onyx-color-text-icons-primary-bold);
    }
  }
}
</style>
