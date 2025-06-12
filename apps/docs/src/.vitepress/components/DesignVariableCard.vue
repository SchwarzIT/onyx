<script lang="ts" setup>
import { ref, toRef, useTemplateRef } from "vue";
import { useCssVariableValue } from "../utils-browser";
import DesignVariable from "./DesignVariable.vue";

const props = defineProps<{
  /** Variable name. */
  name: string;
  /** If true, both columns will take up 50% of the available width. */
  wideName?: boolean;
  /** Whether hide the variable value. */
  hideValue?: boolean;
}>();

defineSlots<{
  /**
   * Display preview of the given variable.
   */
  default(props: { name: string }): unknown;
  /**
   * Optional slot to override variable name content.
   */
  name?(): unknown;
}>();

const wrapper = useTemplateRef("wrapperRef");
const isCopied = ref(false);

const { value } = useCssVariableValue({
  name: toRef(props, "name"),
  element: wrapper,
  disabled: toRef(props, "hideValue"),
});

const handleCopy = async () => {
  await navigator.clipboard.writeText(`var(--${props.name})`);
  isCopied.value = true;
  setTimeout(() => (isCopied.value = false), 3000);
};
</script>

<template>
  <div ref="wrapperRef" class="card vp-raw" :class="{ 'card--wide': props.wideName }">
    <div class="card__wrapper">
      <div class="card__name">
        <slot name="name">
          <DesignVariable :name="props.name" :is-copied="isCopied" allow-copy @copy="handleCopy" />
        </slot>
      </div>

      <div v-if="!props.hideValue" class="card__value onyx-text--small">
        {{ value }}
      </div>
    </div>

    <div class="card__preview">
      <slot v-bind="{ name }"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.card {
  --padding-inline: var(--onyx-spacing-2xl);
  --border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

  border-radius: var(--onyx-radius-md);
  border: var(--border);
  background: var(--onyx-color-base-background-blank);
  display: grid;
  grid-template-columns: 1fr 25%;

  &--wide {
    grid-template-columns: 1fr 1fr;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    padding: var(--onyx-spacing-md) var(--padding-inline);
  }

  &__value {
    font-weight: var(--onyx-font-weight-medium);
    color: var(--onyx-color-text-icons-neutral-soft);
    border-top: var(--border);
    padding: var(--onyx-spacing-2xs) var(--padding-inline);
  }

  &__preview {
    padding: var(--onyx-spacing-md) var(--padding-inline);
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: var(--border);
  }

  // small breakpoints
  @include mixins.breakpoint(max, s) {
    --padding-inline: var(--onyx-spacing-md);
    grid-template-columns: 1fr;

    &__value {
      border-bottom: var(--border);
    }

    &__preview {
      border-left: none;
      justify-content: flex-end;
    }
  }
}
</style>
