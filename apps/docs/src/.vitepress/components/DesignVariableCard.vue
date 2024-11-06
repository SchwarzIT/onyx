<script lang="ts" setup>
import { computed, ref } from "vue";
import { getCssVariableValue } from "../utils-browser";
import DesignVariable from "./DesignVariable.vue";

const props = defineProps<{
  /** Variable name. */
  name: string;
  /** If true, both columns will take up 50% of the available width. */
  wideName?: boolean;
  /** Whether hide the variable value. */
  hideValue?: boolean;
}>();

const wrapperRef = ref<HTMLElement>();
const isCopied = ref(false);

const value = computed(() =>
  props.hideValue ? undefined : getCssVariableValue(props.name, wrapperRef.value),
);

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
          <!--
          client only is needed because we are using "value" here which is
          using the "getCssVariableValue" function but this is only available
          inside the browser/client
         -->
          <ClientOnly>
            <DesignVariable
              :name="props.name"
              :value="value"
              :is-copied="isCopied"
              allow-copy
              @copy="handleCopy"
            />
          </ClientOnly>
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

  border-radius: var(--onyx-radius-md);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  background: var(--onyx-color-base-background-blank);
  display: grid;
  grid-template-columns: 1fr 25%;

  &--wide {
    grid-template-columns: 1fr 1fr;
  }

  @include mixins.breakpoint(max, s, -1) {
    padding: var(--onyx-spacing-md);
    grid-template-columns: 1fr;
    gap: var(--onyx-spacing-md);
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--onyx-spacing-md);
  }

  &__value {
    font-weight: 600;
    color: var(--onyx-color-text-icons-neutral-soft);
  }

  @include mixins.breakpoint(min, s) {
    &__wrapper {
      flex-direction: column;
      align-items: normal;
      gap: 0;
    }

    &__name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      padding: var(--onyx-spacing-md) var(--padding-inline);
    }

    &__value {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      padding: var(--onyx-spacing-2xs) var(--padding-inline);
    }

    &__preview {
      padding: var(--onyx-spacing-md) var(--padding-inline);
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    }
  }
}
</style>
